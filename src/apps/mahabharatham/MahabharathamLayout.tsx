import { Link, NavLink, Outlet, useMatch } from 'react-router-dom'
import { CastProvider } from './castContext.tsx'
import { useCast } from './useCast.ts'
import { filledCount } from './castStore.ts'
import { trackRoleIds, visibleGroups } from './roles.ts'

export function MahabharathamLayout() {
  return (
    <CastProvider>
      <EpicShell />
    </CastProvider>
  )
}

function EpicShell() {
  const { selections, error, talliesError, extraCrewIds } = useCast()
  const isPick = useMatch({ path: '/mahabharatham', end: true })
  const isShared = useMatch('/mahabharatham/c/:castId')
  const tracked = trackRoleIds(extraCrewIds)
  const filled = filledCount(selections, tracked)
  const notice = error ?? talliesError

  return (
    <div className="epic">
      <div className="sheet">
        <div className="sticky-stack">
          <header className="top">
            <Link className="back" to="/">
              Fun Projects
            </Link>
            <div className="title-row">
              <h1>Mahabharatham</h1>
              {!isShared && (
                <p className="progress">
                  {filled} of {tracked.length}
                </p>
              )}
            </div>
            {!isShared && (
              <div className="meter" aria-hidden="true">
                <span style={{ width: `${(filled / tracked.length) * 100}%` }} />
              </div>
            )}
          </header>
          {notice && <p className="note">{notice}</p>}
        </div>
        {isPick && (
          <div className="groups">
            {visibleGroups().map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() =>
                  document.getElementById(`group-${group.id}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
              >
                {group.label}
              </button>
            ))}
          </div>
        )}
        <main className={isShared ? 'epic-main shared' : 'epic-main'}>
          <Outlet />
        </main>
        {!isShared && (
          <nav className="tabbar" aria-label="Mahabharatham">
            <NavLink to="/mahabharatham" end className={({ isActive }) => (isActive ? 'tab tab-on' : 'tab')}>
              Pick
            </NavLink>
            <NavLink
              to="/mahabharatham/community"
              className={({ isActive }) => (isActive ? 'tab tab-on' : 'tab')}
            >
              Community
            </NavLink>
            <NavLink
              to="/mahabharatham/mine"
              className={({ isActive }) => (isActive ? 'tab tab-on' : 'tab')}
            >
              Mine
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  )
}
