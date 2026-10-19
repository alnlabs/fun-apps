import { Suspense } from 'react'
import type { Metadata } from 'next'
import { PickScreen } from '@/apps/mahabharatham/PickScreen'

export const metadata: Metadata = {
  title: 'Pick your cast — Mahabharatham',
  description: 'Pick who plays every role in a Mahabharatham film — Pandavas, Kauravas, allies, elders, and crew. Save your dream cast and see what others chose.',
  alternates: { canonical: '/mahabharatham' },
  openGraph: {
    title: 'Pick your Mahabharatham cast',
    description: 'Pick who plays every role — Pandavas, Kauravas, allies, elders, and crew. Save and share your dream cast.',
    url: '/mahabharatham',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pick your Mahabharatham cast',
    description: 'Pick who plays every role and share your dream cast.',
  },
}

export default function MahabharathamPage() {
  return (
    <Suspense>
      <PickScreen />
    </Suspense>
  )
}
