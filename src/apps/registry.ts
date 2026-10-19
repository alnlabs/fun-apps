export type FunAppStatus = 'live' | 'soon'

export type FunApp = {
  id: string
  title: string
  blurb: string
  path: string
  status: FunAppStatus
}

export const funApps: FunApp[] = [
  {
    id: 'mahabharatham',
    title: 'Mahabharatham',
    blurb: 'Pick who plays every role, save your dream cast, and see the names other people chose.',
    path: '/mahabharatham',
    status: 'live',
  },
]
