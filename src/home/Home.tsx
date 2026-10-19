import { Link } from 'react-router-dom'
import { funApps } from '../apps/registry.ts'
import { FirebaseNote } from '../apps/mahabharatham/FirebaseNote.tsx'

export function Home() {
  return (
    <div className="home">
      <div className="home-inner">
        <p className="eyebrow">Small apps</p>
        <h1>Fun Projects</h1>
        <p className="lede">One home for little apps. Open one, then come back for the next.</p>
        <FirebaseNote />
        <div className="app-list">
          {funApps.map((app, index) => {
            const number = String(index + 1).padStart(2, '0')
            if (app.status === 'soon') {
              return (
                <article key={app.id} className="app-card app-card-soon">
                  <p className="kicker">{number}</p>
                  <h2>{app.title}</h2>
                  <p>{app.blurb}</p>
                  <p className="open">Soon</p>
                </article>
              )
            }
            return (
              <Link key={app.id} className="app-card" to={app.path}>
                <p className="kicker">{number}</p>
                <h2>{app.title}</h2>
                <p>{app.blurb}</p>
                <p className="open">
                  <span>Open</span>
                  <span aria-hidden="true">→</span>
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
