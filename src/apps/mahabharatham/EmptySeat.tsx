'use client'

import { BsPersonFill } from 'react-icons/bs'

export function EmptySeat() {
  return (
    <span className="frame-empty" aria-hidden="true">
      <BsPersonFill className="seat-mark" />
    </span>
  )
}
