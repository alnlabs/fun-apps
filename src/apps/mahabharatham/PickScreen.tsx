'use client'

import { useCallback, useMemo, useState } from 'react'
import { FaSearch, FaChevronDown, FaCheckCircle, FaTimes } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CastModal } from './CastModal'
import { Portrait } from './Portrait'
import { EmptySeat } from './EmptySeat'
import { useCast } from './useCast'
import { displayName } from './castStore'
import { groups, rolesInGroup, hiddenCrewRoles, type Role, type GroupId } from './roles'

type TabId = 'all' | GroupId

export function PickScreen() {
  const { selections, setRole, saving, tallies, extraCrewIds, addCrewRole } = useCast()
  const [openRole, setOpenRole] = useState<Role | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [search, setSearch] = useState('')
  const closeModal = useCallback(() => setOpenRole(null), [])

  const allRoles = useMemo(() => {
    return groups.flatMap((g) => rolesInGroup(g.id, extraCrewIds))
  }, [extraCrewIds])

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase()
    return groups.map((g) => ({
      ...g,
      roles: rolesInGroup(g.id, extraCrewIds).filter((role) => {
        if (activeTab !== 'all' && role.group !== activeTab) return false
        if (!q) return true
        const actor = displayName(selections[role.id]?.name) ?? ''
        return role.name.toLowerCase().includes(q) || actor.toLowerCase().includes(q)
      }),
    })).filter((g) => g.roles.length > 0)
  }, [extraCrewIds, selections, activeTab, search])

  // Count per group tab
  const countAll = allRoles.length
  const groupCounts = useMemo(() => {
    const map: Record<string, number> = {}
    groups.forEach((g) => { map[g.id] = rolesInGroup(g.id, extraCrewIds).length })
    return map
  }, [extraCrewIds])

  function selectAll(groupId: GroupId) {
    rolesInGroup(groupId, extraCrewIds).forEach((role) => {
      if (!selections[role.id]?.name) setOpenRole(role)
    })
  }

  return (
    <div className="pick">
      {/* ── Filter bar ── */}
      <div className="pick-bar">
        <div className="pick-tabs" role="tablist" aria-label="Filter by group">
          <button
            role="tab"
            aria-selected={activeTab === 'all'}
            className={activeTab === 'all' ? 'pick-tab pick-tab-on' : 'pick-tab'}
            onClick={() => setActiveTab('all')}
          >
            All <span className="pick-tab-count">({countAll})</span>
          </button>
          {groups.map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={activeTab === g.id}
              className={activeTab === g.id ? 'pick-tab pick-tab-on' : 'pick-tab'}
              onClick={() => setActiveTab(g.id as TabId)}
            >
              {g.label} <span className="pick-tab-count">({groupCounts[g.id]})</span>
            </button>
          ))}
        </div>

        <div className="pick-controls">
          <label className="pick-search">
            <FaSearch className="pick-search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search characters or actors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pick-search-input"
            />
            {search && (
              <button className="pick-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                <FaTimes aria-hidden="true" />
              </button>
            )}
          </label>
          <div className="pick-sort">
            <span>Name</span>
            <FaChevronDown aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ── Groups ── */}
      <div className="pick-groups">
        {filteredGroups.map((group) => (
          <section key={group.id} className="pick-group">
            <div className="pick-group-header">
              <h2 className="pick-group-title">
                {group.label.toUpperCase()}
                <span className="pick-group-count">{group.roles.length} roles</span>
              </h2>
              <button
                type="button"
                className="pick-select-all"
                onClick={() => selectAll(group.id as GroupId)}
              >
                ☑ Select all
              </button>
            </div>
            <div className="pick-grid">
              {group.roles.map((role) => {
                const chosen = displayName(selections[role.id]?.name)
                const isSaving = Boolean(saving[role.id])
                return (
                  <PickCard
                    key={role.id}
                    role={role}
                    chosen={chosen}
                    saving={isSaving}
                    onOpen={() => setOpenRole(role)}
                    onClear={() => setRole(role.id, '')}
                  />
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* ── Add crew ── */}
      {(activeTab === 'all' || activeTab === 'crew') && hiddenCrewRoles(extraCrewIds).length > 0 && (
        <div className="pick-add-crew">
          {hiddenCrewRoles(extraCrewIds).map((role) => (
            <button
              key={role.id}
              type="button"
              className="pick-add-crew-btn"
              onClick={() => { addCrewRole(role.id); setOpenRole(role) }}
            >
              + {role.name}
            </button>
          ))}
        </div>
      )}

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

function PickCard({
  role,
  chosen,
  saving,
  onOpen,
  onClear,
}: {
  role: Role
  chosen: string | null
  saving: boolean
  onOpen: () => void
  onClear: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <article className={chosen ? 'pcard pcard-selected' : 'pcard'}>
      <button type="button" className="pcard-main" onClick={onOpen} aria-label={`${role.name}${chosen ? `, ${chosen}` : ''}`}>
        <span className="pcard-portrait">
          {chosen ? <Portrait name={chosen} className="pcard-img" /> : <EmptySeat />}
        </span>
        <span className="pcard-info">
          <span className="pcard-role">{role.name}</span>
          {chosen ? (
            <span className="pcard-actor">{saving ? 'Saving…' : chosen}</span>
          ) : (
            <span className="pcard-choose">+ Choose actor</span>
          )}
          {chosen && (
            <span className="pcard-badge">
              <FaCheckCircle aria-hidden="true" /> Selected
            </span>
          )}
        </span>
      </button>
      {chosen && (
        <div className="pcard-menu-wrap">
          <button
            type="button"
            className="pcard-menu-btn"
            aria-label="Options"
            aria-expanded={menuOpen}
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v) }}
          >
            <BsThreeDotsVertical aria-hidden="true" />
          </button>
          {menuOpen && (
            <div className="pcard-menu" role="menu">
              <button role="menuitem" type="button" className="pcard-menu-item" onClick={() => { onOpen(); setMenuOpen(false) }}>Change</button>
              <button role="menuitem" type="button" className="pcard-menu-item pcard-menu-remove" onClick={() => { onClear(); setMenuOpen(false) }}>Remove</button>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
