import { firebaseReady } from '../../firebaseConfig.ts'

export function FirebaseNote() {
  if (firebaseReady) return null
  return (
    <p className="note">
      Picks stay on this phone until Firebase is connected.
    </p>
  )
}
