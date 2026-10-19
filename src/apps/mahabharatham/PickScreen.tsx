import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CastBanner } from './CastBanner.tsx'
import { CastModal } from './CastModal.tsx'
import { FirebaseNote } from './FirebaseNote.tsx'
import { RoleCard } from './RoleCard.tsx'
import { useCast } from './useCast.ts'
import { hiddenCrewRoles, rolesInGroup, visibleGroups, type Role } from './roles.ts'

export function PickScreen() {
  const { selections, setRole, saving, tallies, extraCrewIds, addCrewRole } = useCast()
  const location = useLocation()
  const [openRole, setOpenRole] = useState<Role | null>(null)
  const [addingCrew, setAddingCrew] = useState(false)
  const closeModal = useCallback(() => setOpenRole(null), [])
  const moreCrew = hiddenCrewRoles(extraCrewIds)

  useEffect(() => {
    if (!location.hash) return
    document.querySelector(location.hash)?.scrollIntoView({ block: 'start' })
  }, [location.hash])

  function chooseRole(role: Role) {
    setOpenRole(role)
  }

  return (
    <div>
      <FirebaseNote />
      <CastBanner selections={selections} extraCrewIds={extraCrewIds} onChoose={chooseRole} />
      {visibleGroups().map((group) => (
        <section
          key={group.id}
          id={group.id === 'crew' ? 'group-crew' : undefined}
          className={group.id === 'crew' ? 'poster-grid crew-grid' : 'poster-grid'}
        >
          <h2 className="group-title">{group.label}</h2>
          {rolesInGroup(group.id, extraCrewIds).map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              value={selections[role.id]?.name ?? ''}
              saving={Boolean(saving[role.id])}
              onChange={(name) => setRole(role.id, name)}
              onOpen={() => setOpenRole(role)}
            />
          ))}
          {group.id === 'crew' && moreCrew.length > 0 && (
            <div className="crew-add">
              <button type="button" aria-expanded={addingCrew} onClick={() => setAddingCrew((open) => !open)}>
                Add a crew job
              </button>
              {addingCrew && (
                <div className="crew-menu">
                  {moreCrew.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        addCrewRole(role.id)
                        setAddingCrew(false)
                        setOpenRole(role)
                      }}
                    >
                      {role.name}
                      <span>{role.epithet}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      ))}
      {openRole && (
        <CastModal
          role={openRole}
          value={selections[openRole.id]?.name ?? ''}
          suggestions={tallies[openRole.id]?.top ?? []}
          selections={selections}
          onSelect={(name) => setRole(openRole.id, name)}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
