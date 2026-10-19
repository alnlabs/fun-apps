'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { allActors, allCrew, candidatesFor } from './candidates'
import { displayName, nameKey, type Selections, type TallyChoice } from './castStore'
import { Portrait } from './Portrait'
import { roles, type Role } from './roles'

type CastModalProps = {
  role: Role
  value: string
  suggestions: TallyChoice[]
  selections: Selections
  onSelect: (name: string) => void
  onClose: () => void
}

export function CastModal({ role, value, suggestions, selections, onSelect, onClose }: CastModalProps) {
  const titleId = useId()
  const [query, setQuery] = useState('')
  const [custom, setCustom] = useState('')
  const [takenNote, setTakenNote] = useState<string | null>(null)
  const chosen = displayName(value).toLowerCase()
  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const choice of suggestions) map.set(choice.name.toLowerCase(), choice.count)
    return map
  }, [suggestions])

  const suggested = useMemo(() => {
    const listed = candidatesFor(role.id)
    const known = new Set(listed.map((name) => name.toLowerCase()))
    const extras = suggestions
      .map((choice) => choice.name)
      .filter((name) => !known.has(name.toLowerCase()))
    return [...listed, ...extras]
  }, [role.id, suggestions])

  const crewRole = role.group === 'crew'
  const others = useMemo(() => {
    const known = new Set(suggested.map((name) => name.toLowerCase()))
    const pool = crewRole ? allCrew : allActors
    return pool.filter((name) => !known.has(name.toLowerCase()))
  }, [crewRole, suggested])

  const takenBy = useMemo(() => {
    const map = new Map<string, string>()
    for (const castRole of roles) {
      if (castRole.id === role.id) continue
      const picked = displayName(selections[castRole.id]?.name)
      if (picked) map.set(nameKey(picked), castRole.name)
    }
    return map
  }, [role.id, selections])

  const needle = query.trim().toLowerCase()
  const matches = (name: string) => !needle || name.toLowerCase().includes(needle)
  const visibleSuggested = suggested.filter(matches)
  const visibleOthers = others.filter(matches)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  function heldBy(name: string): string | undefined {
    const clean = displayName(name)
    if (!clean) return undefined
    return takenBy.get(nameKey(clean))
  }

  function choose(name: string) {
    const clean = displayName(name)
    if (!clean) return
    const otherRole = heldBy(clean)
    if (otherRole) {
      setTakenNote(`${clean} is already cast as ${otherRole}.`)
      return
    }
    onSelect(clean)
    onClose()
  }

  function renderOption(name: string) {
    const selected = nameKey(name) === nameKey(displayName(value))
    const otherRole = selected ? undefined : heldBy(name)
    const count = counts.get(name.toLowerCase())
    return (
      <button
        key={name}
        type="button"
        className={selected ? 'cast-option on' : 'cast-option'}
        aria-pressed={selected}
        disabled={Boolean(otherRole)}
        onClick={() => choose(name)}
      >
        <Portrait name={name} />
        <span className="cast-name">
          {name}
          {otherRole ? <span className="cast-taken">Cast as {otherRole}</span> : null}
        </span>
        {count && !otherRole ? <span className="cast-count">{count}</span> : null}
      </button>
    )
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <h2 id={titleId}>{crewRole ? `Who is the ${role.name.toLowerCase()}?` : `Who plays ${role.name}?`}</h2>
            <p>{role.epithet}</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <label className="modal-search">
          <span className="sr-only">{crewRole ? 'Search names' : 'Search actors'}</span>
          <input
            autoFocus
            value={query}
            placeholder={crewRole ? 'Search names' : 'Search actors'}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="cast-options">
          {visibleSuggested.length === 0 && visibleOthers.length === 0 && (
            <p className="quiet">No one in this list matches that search.</p>
          )}
          {visibleSuggested.length > 0 && <p className="cast-heading">Suggested</p>}
          {visibleSuggested.map((name) => renderOption(name))}
          {visibleOthers.length > 0 && <p className="cast-heading">{crewRole ? 'All crew' : 'All actors'}</p>}
          {visibleOthers.map((name) => renderOption(name))}
        </div>
        <form
          className="someone-else"
          onSubmit={(event) => {
            event.preventDefault()
            choose(custom)
          }}
        >
          <input
            value={custom}
            maxLength={60}
            placeholder="Someone else"
            onChange={(event) => setCustom(event.target.value)}
          />
          <button type="submit" disabled={!displayName(custom) || Boolean(heldBy(custom))}>
            Use this name
          </button>
          {takenNote && <p className="taken-note">{takenNote}</p>}
          {chosen && (
            <button
              type="button"
              className="text-clear"
              onClick={() => {
                onSelect('')
                onClose()
              }}
            >
              Clear pick
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
