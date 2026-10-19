'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaChevronLeft, FaEye, FaSave } from 'react-icons/fa'
import { BsPeopleFill } from 'react-icons/bs'
import { CastProvider } from '@/apps/mahabharatham/castContext'
import { useCast } from '@/apps/mahabharatham/useCast'
import { filledCount } from '@/apps/mahabharatham/castStore'
import { trackRoleIds } from '@/apps/mahabharatham/roles'

export default function MahabharathamLayout({ children }: { children: React.ReactNode }) {
  return (
    <CastProvider>
      <EpicShell>{children}</EpicShell>
    </CastProvider>
  )
}

function EpicShell({ children }: { children: React.ReactNode }) {
  const { selections, error, talliesError, extraCrewIds, saving } = useCast()
  const pathname = usePathname()
  const router = useRouter()
  const isShared = pathname.startsWith('/mahabharatham/c/')
  const tracked = trackRoleIds(extraCrewIds)
  const filled = filledCount(selections, tracked)
  const pct = Math.round((filled / tracked.length) * 100)
  const notice = error ?? talliesError
  const isSaving = Object.values(saving).some(Boolean)

  return (
    <div className="epic">
      {/* ── Top bar ── */}
      <header className="epic-header">
        <div className="epic-header-left">
          <Link href="/" className="epic-back">
            <FaChevronLeft aria-hidden="true" />
            Fun Projects
          </Link>
          <div className="epic-title-block">
            <h1 className="epic-title">Mahabharatham: Dream Cast</h1>
            <p className="epic-subtitle">Choose who plays each role and build your dream cast.</p>
          </div>
        </div>

        {!isShared && (
          <div className="epic-header-right">
            <div className="epic-progress-block">
              <span className="epic-progress-label">{filled} of {tracked.length} selected</span>
              <div className="epic-progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                <span className="epic-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="epic-progress-pct">{pct}%</span>
            </div>
            <div className="epic-actions">
              <Link href="/mahabharatham/mine" className="epic-action-btn">
                <FaEye aria-hidden="true" />
                Preview
              </Link>
              <Link href="/mahabharatham/community" className="epic-action-btn">
                <BsPeopleFill aria-hidden="true" />
                Community
              </Link>
              <button
                type="button"
                className="epic-action-btn epic-action-btn-primary"
                disabled={isSaving}
                onClick={() => router.push('/mahabharatham/mine')}
              >
                <FaSave aria-hidden="true" />
                {isSaving ? 'Saving…' : 'Save Cast'}
              </button>
            </div>
          </div>
        )}
      </header>

      {notice && <p className="epic-notice">{notice}</p>}

      <main className="epic-body">
        {children}
      </main>
    </div>
  )
}
