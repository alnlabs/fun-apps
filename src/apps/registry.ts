export type FunAppStatus = 'live' | 'soon'

export type FunApp = {
  id: string
  title: string
  blurb: string
  path: string
  status: FunAppStatus
  /** Home featured section — all optional so future apps can omit */
  sectionTitle?: string
  sectionSub?: string
  badge?: string
  cardBlurb?: string
  cta?: string
}

export const funApps: FunApp[] = [
  {
    id: 'mahabharatham',
    title: 'Mahabharatham: Dream Cast',
    blurb: 'Pick who plays every role, save your dream cast, and see the names other people chose.',
    path: '/mahabharatham',
    status: 'live',
    sectionTitle: 'One epic. Your choices.',
    sectionSub:
      'If the Mahabharatham were made into a movie today, which actors would you choose for its legendary characters?',
    badge: 'Fan Project',
    cardBlurb: 'Pick actors for your favourite characters and create your own dream cast.',
    cta: 'Create your dream cast',
  },
]
