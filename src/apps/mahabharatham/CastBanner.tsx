'use client'

import { displayName, type Selections } from './castStore'
import { EmptySeat } from './EmptySeat'
import { Portrait } from './Portrait'
import { rolesInGroup, visibleGroups, type Role } from './roles'

type CastBannerProps = {
  selections: Selections
  extraCrewIds?: string[]
  onChoose?: (role: Role) => void
}

export function CastBanner({ selections, extraCrewIds = [], onChoose }: CastBannerProps) {
  return (
    <section className="cast-banner" aria-label="Cast lineup">
      <div className="banner-head">
        <p>The cast</p>
        <p className="banner-note">Tap a seat. Empty ones are still open.</p>
      </div>
      <div className="banner-strip">
        {visibleGroups().map((group) => (
          <div
            className="banner-group"
            id={group.id === 'crew' ? 'banner-crew' : `group-${group.id}`}
            key={group.id}
          >
            <p className="banner-label">{group.label}</p>
            <div className="banner-slots">
              {rolesInGroup(group.id, extraCrewIds).map((role) => {
                const name = displayName(selections[role.id]?.name)
                const label = name ? `${role.name}, ${name}` : `${role.name}, not chosen`
                const frame = (
                  <>
                    <span className="slot-frame">
                      {name ? (
                        <Portrait name={name} className="slot-face" />
                      ) : (
                        <EmptySeat />
                      )}
                    </span>
                    <span className="slot-role">{role.name}</span>
                    <span className="slot-who">{name || 'Choose'}</span>
                  </>
                )
                if (!onChoose) {
                  return (
                    <div className={name ? 'slot is-cast' : 'slot'} key={role.id}>
                      {frame}
                    </div>
                  )
                }
                return (
                  <button
                    key={role.id}
                    type="button"
                    className={name ? 'slot is-cast' : 'slot'}
                    aria-label={label}
                    onClick={() => onChoose(role)}
                  >
                    {frame}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
