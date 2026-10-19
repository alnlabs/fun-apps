import { useEffect, useState } from 'react'
import { watchTallies, type Tally } from './castStore.ts'

export function useTallies() {
  const [tallies, setTallies] = useState<Record<string, Tally>>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = watchTallies(setTallies, () => {
      setError('Could not load community picks.')
    })
    return () => unsubscribe?.()
  }, [])

  return { tallies, talliesError: error }
}
