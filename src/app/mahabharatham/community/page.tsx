import type { Metadata } from 'next'
import { CommunityScreen } from '@/apps/mahabharatham/CommunityScreen'

export const metadata: Metadata = {
  title: 'Community picks — Mahabharatham',
  description: 'See which actors the community is choosing for every role in a Mahabharatham film. Live vote counts for Pandavas, Kauravas, allies, elders, and crew.',
  alternates: { canonical: '/mahabharatham/community' },
  openGraph: {
    title: 'Community picks — Mahabharatham',
    description: 'See which actors the community is choosing for every role in a Mahabharatham film.',
    url: '/mahabharatham/community',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Community picks — Mahabharatham',
    description: 'See which actors the community is choosing for every role.',
  },
}

export default function CommunityPage() {
  return <CommunityScreen />
}
