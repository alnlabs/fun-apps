import { createContext, useContext } from 'react'
import type { Selections, Tally } from './castStore.ts'

export type CastContextValue = {
  visitorId: string
  selections: Selections
  setRole: (roleId: string, name: string) => void
  saving: Record<string, boolean>
  error: string | null
  tallies: Record<string, Tally>
  talliesError: string | null
  extraCrewIds: string[]
  addCrewRole: (roleId: string) => void
}

export const CastContext = createContext<CastContextValue | null>(null)

export function useCast(): CastContextValue {
  const value = useContext(CastContext)
  if (!value) throw new Error('useCast must be used inside CastProvider')
  return value
}
