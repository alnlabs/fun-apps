import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { firebaseReady } from '../../firebaseConfig.ts'
import { CastList } from './CastList.tsx'
import { fetchCast, type Selections } from './castStore.ts'
import { useCast } from './useCast.ts'

const CAST_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function SharedCastScreen() {
  const { castId = '' } = useParams()
  const { visitorId, selections: mine } = useCast()
  const isMine = castId === visitorId
  const [theirs, setTheirs] = useState<Selections | null>(null)
  const [missing, setMissing] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (isMine || !firebaseReady || !CAST_ID.test(castId)) return
    let cancel = false
    void fetchCast(castId)
      .then((selections) => {
        if (cancel || !selections) return
        if (Object.keys(selections).length === 0) setMissing(true)
        else setTheirs(selections)
      })
      .catch((err: unknown) => {
        console.error(err)
        if (!cancel) setFailed(true)
      })
    return () => {
      cancel = true
    }
  }, [castId, isMine])

  const selections = isMine ? mine : theirs
  const loading =
    CAST_ID.test(castId) && firebaseReady && !isMine && !theirs && !missing && !failed

  return (
    <div className="stack">
      <p className="summary">{isMine ? 'This is your cast' : 'A dream cast'}</p>
      {!CAST_ID.test(castId) && <p className="empty">This link does not match a cast.</p>}
      {CAST_ID.test(castId) && !firebaseReady && !isMine && (
        <p className="empty">This link needs Firebase before it can load on this phone.</p>
      )}
      {loading && <p className="empty">Loading this cast.</p>}
      {failed && <p className="empty">Could not load this cast.</p>}
      {missing && <p className="empty">This cast is still empty.</p>}
      {selections && <CastList selections={selections} />}
      <Link className="share" to={isMine ? '/mahabharatham' : '/'}>
        {isMine ? 'Edit your cast' : 'Build your own'}
      </Link>
    </div>
  )
}
