import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="home">
      <div className="home-inner">
        <h1>Missing page</h1>
        <p className="lede">That address is not one of the apps.</p>
        <Link className="text-link" href="/">
          Back to Fun Projects
        </Link>
      </div>
    </div>
  )
}
