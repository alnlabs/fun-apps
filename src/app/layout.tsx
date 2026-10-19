import type { Metadata, Viewport } from 'next'
import './globals.css'

// Resolves the canonical base URL in order of priority:
// 1. NEXT_PUBLIC_BASE_URL — set this on your host (e.g. https://yourapp.com)
// 2. VERCEL_URL — auto-set by Vercel deployments
// 3. RAILWAY_PUBLIC_DOMAIN — auto-set by Railway
// 4. Fallback to localhost for local dev
function resolveBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const BASE_URL = resolveBaseUrl()

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Fun Projects',
    template: '%s | Fun Projects',
  },
  description: 'One home for little apps. Open one, then come back for the next.',
  keywords: ['fun apps', 'mahabharatham', 'dream cast', 'film cast picker'],

  openGraph: {
    type: 'website',
    siteName: 'Fun Projects',
    title: 'Fun Projects',
    description: 'One home for little apps. Open one, then come back for the next.',
    url: '/',
  },

  twitter: {
    card: 'summary',
    title: 'Fun Projects',
    description: 'One home for little apps. Open one, then come back for the next.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f6efe4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Outfit:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
