import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './home/Home.tsx'

const MahabharathamLayout = lazy(() =>
  import('./apps/mahabharatham/MahabharathamLayout.tsx').then((mod) => ({
    default: mod.MahabharathamLayout,
  })),
)
const PickScreen = lazy(() =>
  import('./apps/mahabharatham/PickScreen.tsx').then((mod) => ({ default: mod.PickScreen })),
)
const CommunityScreen = lazy(() =>
  import('./apps/mahabharatham/CommunityScreen.tsx').then((mod) => ({
    default: mod.CommunityScreen,
  })),
)
const MyCastScreen = lazy(() =>
  import('./apps/mahabharatham/MyCastScreen.tsx').then((mod) => ({ default: mod.MyCastScreen })),
)
const SharedCastScreen = lazy(() =>
  import('./apps/mahabharatham/SharedCastScreen.tsx').then((mod) => ({
    default: mod.SharedCastScreen,
  })),
)

function ThemeColor() {
  const location = useLocation()
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    meta.setAttribute(
      'content',
      '#f6efe4',
    )
  }, [location.pathname])
  return null
}

function NotFound() {
  return (
    <div className="home">
      <div className="home-inner">
        <h1>Missing page</h1>
        <p className="lede">That address is not one of the apps.</p>
        <Link className="text-link" to="/">
          Back to Fun Projects
        </Link>
      </div>
    </div>
  )
}

function Opening() {
  return (
    <div className="epic">
      <div className="sheet">
        <p className="empty">Opening Mahabharatham</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeColor />
      <Suspense fallback={<Opening />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mahabharatham" element={<MahabharathamLayout />}>
            <Route index element={<PickScreen />} />
            <Route path="community" element={<CommunityScreen />} />
            <Route path="mine" element={<MyCastScreen />} />
            <Route path="c/:castId" element={<SharedCastScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
