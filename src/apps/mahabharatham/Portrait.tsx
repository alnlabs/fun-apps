import { useState } from 'react'
import { portraitFor } from './portraits.ts'

type PortraitProps = {
  name: string
  className?: string
}

export function Portrait({ name, className = 'portrait' }: PortraitProps) {
  const src = portraitFor(name)
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  if (!src || failed) {
    return (
      <span className={`portrait-frame ${className} portrait-fallback`} aria-hidden="true">
        {initials}
      </span>
    )
  }

  return (
    <span className={`portrait-frame ${className}`}>
      <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
    </span>
  )
}
