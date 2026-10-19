'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { firebaseReady } from '@/lib/firebaseConfig'
import { getVisitorId } from '@/lib/visitor'
import {
  displayName,
  fetchCast,
  loadLocalSelections,
  roleHolding,
  saveLocalSelections,
  saveRole,
  type Selections,
} from './castStore'
import { roleIds } from './roles'

export function useVisitorId() {
  const [visitorId] = useState(getVisitorId)
  return visitorId
}

export function useOwnCast(visitorId: string) {
  const [selections, setSelections] = useState<Selections>(() => loadLocalSelections())
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<string | null>(null)
  const dirty = useRef(new Set<string>())
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const selectionsRef = useRef(selections)
  useEffect(() => {
    selectionsRef.current = selections
  }, [selections])

  useEffect(() => {
    const pending = timers.current
    return () => {
      for (const timer of Object.values(pending)) clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!firebaseReady) return
    let cancel = false

    async function load() {
      try {
        const remote = await fetchCast(visitorId)
        if (cancel || !remote) return
        if (Object.keys(remote).length === 0) {
          const local = loadLocalSelections()
          for (const roleId of roleIds) {
            if (dirty.current.has(roleId)) continue
            const name = displayName(local[roleId]?.name)
            if (name) await saveRole(visitorId, roleId, name)
          }
          return
        }
        if (cancel) return
        setSelections((current) => {
          const next: Selections = { ...remote }
          for (const roleId of dirty.current) {
            if (current[roleId]) next[roleId] = current[roleId]
            else delete next[roleId]
          }
          saveLocalSelections(next)
          return next
        })
      } catch (err) {
        console.error(err)
        if (!cancel) setError('Could not load your cast. Picks on this phone are still here.')
      }
    }

    void load()
    return () => {
      cancel = true
    }
  }, [visitorId])

  const setRole = useCallback(
    (roleId: string, name: string) => {
      const typed = name.slice(0, 60)
      const taken = roleHolding(selectionsRef.current, typed, roleId)
      if (taken) {
        setError(`${displayName(typed)} is already cast as ${taken.name}.`)
        return
      }
      dirty.current.add(roleId)
      setError(null)
      setSelections((current) => {
        const next = { ...current }
        if (typed) next[roleId] = { name: typed }
        else delete next[roleId]
        saveLocalSelections(next)
        return next
      })

      const existing = timers.current[roleId]
      if (existing) clearTimeout(existing)
      timers.current[roleId] = setTimeout(() => {
        if (!firebaseReady) return
        setSaving((current) => ({ ...current, [roleId]: true }))
        void saveRole(visitorId, roleId, typed)
          .catch((err: unknown) => {
            console.error(err)
            setError('Could not save online. Your pick is still on this phone.')
          })
          .finally(() => {
            setSaving((current) => ({ ...current, [roleId]: false }))
          })
      }, 700)
    },
    [visitorId],
  )

  return { selections, setRole, saving, error }
}
