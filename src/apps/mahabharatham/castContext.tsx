import { useState, type ReactNode } from 'react'
import { displayName } from './castStore.ts'
import { isRoleId, popularCrewIds, roles } from './roles.ts'
import { useOwnCast, useVisitorId } from './useOwnCast.ts'
import { useTallies } from './useTallies.ts'
import { CastContext, type CastContextValue } from './useCast.ts'

const EXTRA_CREW_KEY = 'fun-projects-mahabharatham-extra-crew'

function loadAddedCrew(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(EXTRA_CREW_KEY) ?? '[]') as unknown
    if (!Array.isArray(raw)) return []
    return raw.filter(
      (roleId): roleId is string =>
        typeof roleId === 'string' && isRoleId(roleId) && !popularCrewIds.includes(roleId),
    )
  } catch {
    return []
  }
}

export function CastProvider({ children }: { children: ReactNode }) {
  const visitorId = useVisitorId()
  const cast = useOwnCast(visitorId)
  const community = useTallies()
  const [addedCrew, setAddedCrew] = useState(loadAddedCrew)
  const filledHidden = roles
    .filter(
      (role) =>
        role.group === 'crew' &&
        !popularCrewIds.includes(role.id) &&
        Boolean(displayName(cast.selections[role.id]?.name)),
    )
    .map((role) => role.id)
  const extraCrewIds = [...new Set([...addedCrew, ...filledHidden])]

  const addCrewRole = (roleId: string) => {
    if (!isRoleId(roleId) || popularCrewIds.includes(roleId)) return
    setAddedCrew((current) => {
      if (current.includes(roleId)) return current
      const next = [...current, roleId]
      localStorage.setItem(EXTRA_CREW_KEY, JSON.stringify(next))
      return next
    })
  }

  const value: CastContextValue = { visitorId, ...cast, ...community, extraCrewIds, addCrewRole }
  return <CastContext.Provider value={value}>{children}</CastContext.Provider>
}
