export type GroupId = 'pandavas' | 'allies' | 'kauravas' | 'elders' | 'crew'

export type Role = {
  id: string
  name: string
  epithet: string
  group: GroupId
}

export const groups: { id: GroupId; label: string }[] = [
  { id: 'pandavas', label: 'Pandavas' },
  { id: 'allies', label: 'Allies' },
  { id: 'kauravas', label: 'Kauravas' },
  { id: 'elders', label: 'Elders' },
  { id: 'crew', label: 'Crew' },
]

export const roles: Role[] = [
  { id: 'yudhishthira', name: 'Yudhishthira', epithet: 'the eldest Pandava', group: 'pandavas' },
  { id: 'bhima', name: 'Bhima', epithet: 'of the mace', group: 'pandavas' },
  { id: 'arjuna', name: 'Arjuna', epithet: 'the archer', group: 'pandavas' },
  { id: 'nakula', name: 'Nakula', epithet: 'the handsome twin', group: 'pandavas' },
  { id: 'sahadeva', name: 'Sahadeva', epithet: 'the quiet twin', group: 'pandavas' },
  { id: 'draupadi', name: 'Draupadi', epithet: 'born of fire', group: 'pandavas' },
  { id: 'kunti', name: 'Kunti', epithet: 'mother of the Pandavas', group: 'pandavas' },
  { id: 'abhimanyu', name: 'Abhimanyu', epithet: "Arjuna's son", group: 'pandavas' },
  { id: 'ghatotkacha', name: 'Ghatotkacha', epithet: "Bhima's son", group: 'pandavas' },
  { id: 'krishna', name: 'Krishna', epithet: 'charioteer of Arjuna', group: 'allies' },
  { id: 'subhadra', name: 'Subhadra', epithet: "Krishna's sister", group: 'allies' },
  { id: 'ekalavya', name: 'Ekalavya', epithet: 'the self-taught archer', group: 'allies' },
  { id: 'duryodhana', name: 'Duryodhana', epithet: 'first of the Kauravas', group: 'kauravas' },
  { id: 'dushasana', name: 'Dushasana', epithet: "Duryodhana's brother", group: 'kauravas' },
  { id: 'shakuni', name: 'Shakuni', epithet: 'the uncle with the dice', group: 'kauravas' },
  { id: 'karna', name: 'Karna', epithet: 'the generous warrior', group: 'kauravas' },
  { id: 'ashwatthama', name: 'Ashwatthama', epithet: 'son of Drona', group: 'kauravas' },
  { id: 'bhishma', name: 'Bhishma', epithet: 'the grandsire', group: 'elders' },
  { id: 'dronacharya', name: 'Dronacharya', epithet: 'teacher of the princes', group: 'elders' },
  { id: 'dhritarashtra', name: 'Dhritarashtra', epithet: 'the blind king', group: 'elders' },
  { id: 'gandhari', name: 'Gandhari', epithet: 'queen of Hastinapura', group: 'elders' },
  { id: 'vidura', name: 'Vidura', epithet: 'the wise counselor', group: 'elders' },
  { id: 'director', name: 'Director', epithet: 'shapes the film', group: 'crew' },
  { id: 'producer', name: 'Producer', epithet: 'puts the film together', group: 'crew' },
  { id: 'screenwriter', name: 'Screenwriter', epithet: 'the story', group: 'crew' },
  { id: 'dialogue-writer', name: 'Dialogue writer', epithet: 'the spoken lines', group: 'crew' },
  { id: 'music-director', name: 'Music director', epithet: 'the score', group: 'crew' },
  { id: 'lyricist', name: 'Lyricist', epithet: 'the songs', group: 'crew' },
  { id: 'cinematographer', name: 'Cinematographer', epithet: 'the camera', group: 'crew' },
  { id: 'editor', name: 'Editor', epithet: 'the cut', group: 'crew' },
  { id: 'costume-designer', name: 'Costume designer', epithet: 'what they wear', group: 'crew' },
  { id: 'production-designer', name: 'Production designer', epithet: 'the world on screen', group: 'crew' },
  { id: 'choreographer', name: 'Choreographer', epithet: 'the movement', group: 'crew' },
  { id: 'vfx-supervisor', name: 'VFX supervisor', epithet: 'the impossible shots', group: 'crew' },
]

export const roleIds = roles.map((role) => role.id)

export const popularCrewIds = ['director', 'music-director', 'lyricist']

export function isShownCrew(roleId: string, extraCrewIds: string[] = []): boolean {
  return popularCrewIds.includes(roleId) || extraCrewIds.includes(roleId)
}

export function rolesInGroup(groupId: GroupId, extraCrewIds: string[] = []): Role[] {
  return roles.filter((role) => {
    if (role.group !== groupId) return false
    if (role.group !== 'crew') return true
    return isShownCrew(role.id, extraCrewIds)
  })
}

export function hiddenCrewRoles(extraCrewIds: string[] = []): Role[] {
  return roles.filter((role) => role.group === 'crew' && !isShownCrew(role.id, extraCrewIds))
}

export function visibleGroups() {
  return groups
}

export function trackRoleIds(extraCrewIds: string[] = []): string[] {
  return roles
    .filter((role) => role.group !== 'crew' || isShownCrew(role.id, extraCrewIds))
    .map((role) => role.id)
}

export function isRoleId(value: string): boolean {
  return roleIds.includes(value)
}
