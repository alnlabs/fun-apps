import { firebaseReady } from '../../firebaseConfig.ts'
import { FirebaseNote } from './FirebaseNote.tsx'
import { useCast } from './useCast.ts'
import { rolesInGroup, visibleGroups } from './roles.ts'

export function CommunityScreen() {
  const { tallies, extraCrewIds } = useCast()

  if (!firebaseReady) {
    return (
      <div>
        <FirebaseNote />
        <p className="empty">Community totals show up here after Firebase is connected.</p>
      </div>
    )
  }

  return (
    <div>
      {visibleGroups().map((group) => (
        <section key={group.id} className="group-section">
          <h2 className="group-title">{group.label}</h2>
          {rolesInGroup(group.id, extraCrewIds).map((role) => {
            const top = tallies[role.id]?.top ?? []
            const max = top[0]?.count ?? 1
            return (
              <article key={role.id} className="role-card">
                <h3>{role.name}</h3>
                <p className="epithet">{role.epithet}</p>
                {top.length === 0 ? (
                  <p className="quiet">No picks yet</p>
                ) : (
                  top.map((choice) => (
                    <div key={choice.name} className="bar-block">
                      <div className="bar-label">
                        <span>{choice.name}</span>
                        <span>{choice.count}</span>
                      </div>
                      <div className="bar-track" aria-hidden="true">
                        <div
                          className="bar-fill"
                          style={{ width: `${Math.max(8, (choice.count / max) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </article>
            )
          })}
        </section>
      ))}
    </div>
  )
}
