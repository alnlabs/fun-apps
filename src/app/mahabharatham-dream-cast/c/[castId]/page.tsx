import type { Metadata } from 'next'
import { SharedCastScreen } from '@/apps/mahabharatham/SharedCastScreen'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ castId: string }>
}): Promise<Metadata> {
  const { castId } = await params
  const url = `/mahabharatham/c/${castId}`
  return {
    title: 'A dream cast — Mahabharatham',
    description: 'Someone\'s Mahabharatham dream cast. See who they picked for every role — and build your own.',
    alternates: { canonical: url },
    // Shared casts are public but shouldn't be indexed individually
    robots: { index: false, follow: true },
    openGraph: {
      title: 'A Mahabharatham dream cast',
      description: 'See who they picked for every role — then build your own.',
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'A Mahabharatham dream cast',
      description: 'See who they picked for every role — then build your own.',
    },
  }
}

export default async function SharedCastPage({
  params,
}: {
  params: Promise<{ castId: string }>
}) {
  const { castId } = await params
  return <SharedCastScreen castId={castId} />
}
