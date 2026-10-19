import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  type DocumentData,
  type Unsubscribe,
} from 'firebase/firestore'
import { getDb } from '../../firebase.ts'
import { isRoleId, roleIds, roles, type Role } from './roles.ts'

export type Selection = { name: string }
export type Selections = Record<string, Selection>
export type TallyChoice = { name: string; count: number }
export type Tally = { total: number; top: TallyChoice[] }

const LOCAL_KEY = 'fun-projects-mahabharatham-cast'
const APP_ID = 'mahabharatham'

export function displayName(name: string | undefined): string {
  return (name ?? '').trim().replace(/\s+/g, ' ').slice(0, 60)
}

export function nameKey(name: string): string {
  const key = name
    .trim()
    .toLowerCase()
    .replace(/[.#$[\]/*]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
  return key || 'name'
}

export function loadLocalSelections(): Selections {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as { selections?: unknown }
    return sanitizeSelections(parsed.selections)
  } catch {
    return {}
  }
}

export function saveLocalSelections(selections: Selections) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify({ selections }))
}

export function sanitizeSelections(input: unknown): Selections {
  if (!input || typeof input !== 'object') return {}
  const next: Selections = {}
  for (const roleId of roleIds) {
    const value = (input as Record<string, { name?: unknown }>)[roleId]
    if (typeof value?.name !== 'string') continue
    const name = value.name.slice(0, 60)
    if (!displayName(name)) continue
    next[roleId] = { name }
  }
  return next
}

export function filledCount(selections: Selections, ids: string[] = roleIds): number {
  return ids.filter((roleId) => displayName(selections[roleId]?.name)).length
}

export function roleHolding(
  selections: Selections,
  name: string,
  exceptRoleId?: string,
): Role | undefined {
  const clean = displayName(name)
  if (!clean) return undefined
  const key = nameKey(clean)
  return roles.find((role) => {
    if (role.id === exceptRoleId) return false
    const picked = displayName(selections[role.id]?.name)
    return Boolean(picked) && nameKey(picked) === key
  })
}

export function applyChoiceChange(
  choices: Record<string, TallyChoice>,
  previousName: string,
  nextName: string,
): Record<string, TallyChoice> {
  const next = { ...choices }
  const prevKey = previousName ? nameKey(previousName) : ''
  const nextKey = nextName ? nameKey(nextName) : ''

  if (prevKey && prevKey === nextKey) {
    const existing = next[nextKey]
    next[nextKey] = existing ? { ...existing, name: nextName } : { name: nextName, count: 1 }
    return next
  }

  if (prevKey && next[prevKey]) {
    const count = next[prevKey].count - 1
    if (count <= 0) delete next[prevKey]
    else next[prevKey] = { ...next[prevKey], count }
  }

  if (nextKey) {
    const existing = next[nextKey]
    next[nextKey] = existing
      ? { name: nextName, count: existing.count + 1 }
      : { name: nextName, count: 1 }
  }

  return next
}

function topChoices(choices: Record<string, TallyChoice>): TallyChoice[] {
  return Object.values(choices)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 8)
}

function readChoices(data: DocumentData | undefined): Record<string, TallyChoice> {
  const raw = data?.choices
  if (!raw || typeof raw !== 'object') return {}
  const choices: Record<string, TallyChoice> = {}
  for (const [key, value] of Object.entries(raw as Record<string, { name?: unknown; count?: unknown }>)) {
    if (typeof value?.name === 'string' && typeof value.count === 'number' && value.count > 0) {
      choices[key] = { name: value.name, count: value.count }
    }
  }
  return choices
}

function castRef(castId: string) {
  const db = getDb()
  if (!db) return null
  return doc(db, 'apps', APP_ID, 'casts', castId)
}

function tallyRef(roleId: string) {
  const db = getDb()
  if (!db) return null
  return doc(db, 'apps', APP_ID, 'tallies', roleId)
}

export async function fetchCast(castId: string): Promise<Selections | null> {
  const ref = castRef(castId)
  if (!ref) return null
  const snap = await getDoc(ref)
  if (!snap.exists()) return {}
  return sanitizeSelections(snap.data().selections)
}

export async function saveRole(visitorId: string, roleId: string, rawName: string): Promise<void> {
  if (!isRoleId(roleId)) return
  const name = displayName(rawName)
  const db = getDb()
  const ref = castRef(visitorId)
  const tally = tallyRef(roleId)
  if (!db || !ref || !tally) return

  await runTransaction(db, async (tx) => {
    const castSnap = await tx.get(ref)
    const tallySnap = await tx.get(tally)
    const previous = displayName(
      ((castSnap.data()?.selections ?? {}) as Selections)[roleId]?.name,
    )
    const choices = applyChoiceChange(readChoices(tallySnap.data()), previous, name)
    const total = Object.values(choices).reduce((sum, choice) => sum + choice.count, 0)
    const selections = sanitizeSelections(castSnap.data()?.selections)

    if (name) selections[roleId] = { name }
    else delete selections[roleId]

    tx.set(tally, { total, choices, top: topChoices(choices) })
    tx.set(ref, {
      selections,
      createdAt: castSnap.exists() && castSnap.data()?.createdAt
        ? castSnap.data()?.createdAt
        : serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  })
}

export function watchTallies(
  onChange: (tallies: Record<string, Tally>) => void,
  onError?: (error: Error) => void,
): Unsubscribe | null {
  const db = getDb()
  if (!db) return null
  return onSnapshot(
    collection(db, 'apps', APP_ID, 'tallies'),
    (snap) => {
      const tallies: Record<string, Tally> = {}
      snap.forEach((item) => {
        if (!isRoleId(item.id)) return
        const data = item.data()
        const top = Array.isArray(data.top) ? data.top : []
        const cleanTop = top.filter(
          (choice): choice is TallyChoice =>
            !!choice &&
            typeof choice === 'object' &&
            typeof (choice as TallyChoice).name === 'string' &&
            typeof (choice as TallyChoice).count === 'number',
        )
        tallies[item.id] = {
          total: typeof data.total === 'number' ? data.total : 0,
          top: cleanTop,
        }
      })
      onChange(tallies)
    },
    (error) => onError?.(error),
  )
}
