import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { FaArrowRight, FaLightbulb, FaShareAlt } from 'react-icons/fa'
import { TbAsterisk } from 'react-icons/tb'
import { BsPeopleFill } from 'react-icons/bs'

export const metadata: Metadata = {
  title: 'Fun Projects',
  description: 'Creative experiments, interactive concepts, and projects made for the joy of exploring what\'s possible.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Fun Projects', description: 'A playground for curiosity.', url: '/', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Fun Projects', description: 'A playground for curiosity.' },
}

export default function HomePage() {
  return (
    <div className="home">
      {/* ── Navbar ── */}
      <nav className="home-nav">
        <Link href="/" className="home-logo">
          <span className="home-logo-icon" aria-hidden="true"><TbAsterisk /></span>
          <span className="home-logo-name">Fun Projects</span>
        </Link>
        <div className="home-nav-links">
          <Link href="/" className="home-nav-link home-nav-link-active">Home</Link>
          <Link href="/" className="home-nav-link">Projects</Link>
          <Link href="/" className="home-nav-link">Suggest</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="home-hero" aria-label="Hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">A playground<br />for curiosity.</h1>
          <p className="home-hero-sub">Creative experiments, interactive concepts,<br />and projects made for the joy of exploring<br />what&apos;s possible.</p>
          <Link href="/mahabharatham" className="home-hero-cta">
            Discover the current project <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="home-hero-img-wrap" aria-hidden="true">
          <Image src="/hero-landscape.jpg" alt="" fill className="home-hero-img" priority />
        </div>
      </section>

      {/* ── Featured Project ── */}
      <section className="home-section">
        <p className="home-eyebrow">Featured Project</p>
        <h2 className="home-section-title">One epic. Your choices.</h2>
        <p className="home-section-sub">If the Mahabharatham were made into a movie today,<br />which actors would you choose for its legendary characters?</p>

        <div className="home-featured-card">
          <div className="home-featured-img-wrap">
            <Image src="/mahabharatham-card.jpg" alt="Warrior at sunset" fill className="home-featured-img" />
          </div>
          <div className="home-featured-body">
            <p className="home-featured-badge"><BsPeopleFill aria-hidden="true" /> Fan Project</p>
            <h3 className="home-featured-name">Mahabharatham:<br />Dream Cast</h3>
            <p className="home-featured-blurb">Pick actors for your favourite characters and create your own dream cast.</p>
            <Link href="/mahabharatham" className="home-featured-cta">
              Create your dream cast <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Be Part Of It ── */}
      <section className="home-section home-section-border">
        <p className="home-eyebrow">Be Part Of It</p>
        <h2 className="home-section-title">Your idea could be next.</h2>
        <p className="home-section-sub">Have a thought worth exploring? Suggest something new, or share this project with someone who would enjoy it.</p>

        <div className="home-actions">
          <a href="mailto:aln@example.com" className="home-action-card">
            <span className="home-action-icon"><FaLightbulb aria-hidden="true" /></span>
            <span className="home-action-body">
              <span className="home-action-title">Suggest an idea</span>
              <span className="home-action-sub">Pitch a project or a new feature.</span>
            </span>
            <FaArrowRight className="home-action-arrow" aria-hidden="true" />
          </a>
          <a href="https://twitter.com/intent/tweet" className="home-action-card">
            <span className="home-action-icon"><FaShareAlt aria-hidden="true" /></span>
            <span className="home-action-body">
              <span className="home-action-title">Share the project</span>
              <span className="home-action-sub">Bring someone else into the fun.</span>
            </span>
            <FaArrowRight className="home-action-arrow" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <div>
          <p className="home-footer-brand">Fun Projects</p>
          <p className="home-footer-tagline">Made for the curious.</p>
        </div>
        <div className="home-footer-right">
          <p className="home-footer-made">Made By</p>
          <p className="home-footer-maker">ALN Labs</p>
        </div>
      </footer>
    </div>
  )
}
