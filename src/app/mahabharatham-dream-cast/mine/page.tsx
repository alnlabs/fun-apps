import type { Metadata } from 'next'
import { MyCastScreen } from '@/apps/mahabharatham/MyCastScreen'

export const metadata: Metadata = {
  title: 'My cast — Mahabharatham',
  description: 'Your Mahabharatham dream cast. Share a link so others can see who you chose for every role.',
  alternates: { canonical: '/mahabharatham/mine' },
  // Personal page — exclude from search index
  robots: { index: false, follow: false },
  openGraph: {
    title: 'My Mahabharatham cast',
    description: 'My dream cast for a Mahabharatham film.',
    url: '/mahabharatham/mine',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'My Mahabharatham cast',
    description: 'My dream cast for a Mahabharatham film.',
  },
}

export default function MinePage() {
  return <MyCastScreen />
}
