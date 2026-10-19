import { displayName, type Selections } from './castStore.ts'
import { CastBanner } from './CastBanner.tsx'
import { popularCrewIds, roles } from './roles.ts'

export function CastList({
  selections,
  extraCrewIds,
}: {
  selections: Selections
  extraCrewIds?: string[]
}) {
  const extra =
    extraCrewIds ??
    roles
      .filter(
        (role) =>
          role.group === 'crew' &&
          !popularCrewIds.includes(role.id) &&
          Boolean(displayName(selections[role.id]?.name)),
      )
      .map((role) => role.id)

  return <CastBanner selections={selections} extraCrewIds={extra} />
}
