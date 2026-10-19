import { initializeApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { firebaseConfig, firebaseReady } from './firebaseConfig'

let db: Firestore | null = null

export function getDb(): Firestore | null {
  if (!firebaseReady) return null
  if (!db) db = getFirestore(initializeApp(firebaseConfig))
  return db
}
