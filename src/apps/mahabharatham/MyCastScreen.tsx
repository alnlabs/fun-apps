import { useState } from 'react'
import { Link } from 'react-router-dom'
import { firebaseReady } from '../../firebaseConfig.ts'
import { CastList } from './CastList.tsx'
import { filledCount } from './castStore.ts'
import { useCast } from './useCast.ts'
import { trackRoleIds } from './roles.ts'

export function MyCastScreen() {
  const { visitorId, selections, extraCrewIds } = useCast()
  const [copied, setCopied] = useState(false)
  const [shareError, setShareError] = useState<string | null>(null)
  const tracked = trackRoleIds(extraCrewIds)
  const filled = filledCount(selections, tracked)
  const shareUrl = `${window.location.origin}/mahabharatham/c/${visitorId}`

  async function share() {
    setCopied(false)
    setShareError(null)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Mahabharatham cast', url: shareUrl })
        return
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
    } catch {
      setShareError(shareUrl)
    }
  }

  return (
    <div className="stack">
      <p className="summary">
        {filled} of {tracked.length} roles filled
      </p>
      <CastList selections={selections} extraCrewIds={extraCrewIds} />
      <button type="button" className="share" disabled={filled === 0} onClick={() => void share()}>
        {copied ? 'Link copied' : 'Share this cast'}
      </button>
      {shareError && <p className="quiet share-hint">Copy this link: {shareError}</p>}
      <p className="quiet share-hint">
        {firebaseReady
          ? 'Anyone with the link can view this cast. Because there is no sign-in, anyone with the link can also change it.'
          : 'The link only opens on this phone until Firebase is connected.'}
      </p>
      {filled === 0 && (
        <Link className="text-link" to="/mahabharatham">
          Pick the first name
        </Link>
      )}
    </div>
  )
}
