'use client'

import type { Role } from './roles'
import { displayName } from './castStore'
import { EmptySeat } from './EmptySeat'
import { Portrait } from './Portrait'

type RoleCardProps = {
  role: Role
  value: string
  saving: boolean
  onChange: (name: string) => void
  onOpen?: () => void
}

export function RoleCard({ role, value, saving, onChange, onOpen }: RoleCardProps) {
  const fieldId = `role-${role.id}`
  const chosen = displayName(value)
  const art = chosen ? (
    <Portrait name={chosen} className="poster-face" />
  ) : (
    <EmptySeat />
  )
  const caption = (
    <span className="poster-caption">
      <span className="poster-role">{role.name}</span>
      <span className="poster-who">{saving ? 'Saving' : chosen || 'Choose'}</span>
    </span>
  )

  if (!onOpen) {
    return (
      <article className={chosen ? 'poster is-cast' : 'poster'}>
        <div className="poster-art">
          {art}
          <label className="poster-caption" htmlFor={fieldId}>
            <span className="poster-role">{role.name}</span>
            {saving ? <span className="poster-who">Saving</span> : null}
            {chosen ? <span className="poster-who">{chosen}</span> : null}
            <input
              id={fieldId}
              value={value}
              maxLength={60}
              placeholder="Type a name"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="done"
              onChange={(event) => onChange(event.target.value)}
            />
          </label>
        </div>
      </article>
    )
  }

  return (
    <button type="button" className={chosen ? 'poster is-cast' : 'poster'} onClick={onOpen}>
      <span className="poster-art">
        {art}
        {caption}
      </span>
    </button>
  )
}
