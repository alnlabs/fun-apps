const VISITOR_KEY = 'fun-projects-visitor-id'

export function getVisitorId(): string {
  const existing = localStorage.getItem(VISITOR_KEY)
  if (existing) return existing
  const id = crypto.randomUUID()
  localStorage.setItem(VISITOR_KEY, id)
  return id
}
