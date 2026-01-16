import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/design/option-a')({
  component: OptionA,
})

function OptionA() {
  return (
    <div className="option-a">
      {/* Hero plein écran */}
      <section className="hero-fullscreen">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80"
          alt="Hero"
        />
        <div className="hero-overlay">
          <h1>thb</h1>
          <p>Consultant Tech · CTO as a Service</p>
        </div>
      </section>

      {/* Intro */}
      <section className="intro-minimal">
        <p>Je transforme la complexité en solutions simples.</p>
      </section>

      {/* Portfolio grille asymétrique */}
      <section className="portfolio-grid-asym">
        <h2>Cases</h2>
        <div className="grid-asym">
          <article className="large">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
              alt="Projet code"
            />
            <div className="overlay">
              <span>Architecture DDD</span>
            </div>
          </article>
          <article className="small">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
              alt="Dashboard"
            />
            <div className="overlay">
              <span>Dashboard Analytics</span>
            </div>
          </article>
          <article className="medium">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80"
              alt="Data"
            />
            <div className="overlay">
              <span>Refonte SI</span>
            </div>
          </article>
          <article className="small">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
              alt="Team"
            />
            <div className="overlay">
              <span>Structuration équipe</span>
            </div>
          </article>
        </div>
      </section>

      {/* Image vélo */}
      <section className="image-break">
        <img
          src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&q=80"
          alt="Cycliste"
        />
      </section>

      {/* Contact minimal */}
      <section className="contact-minimal">
        <p>Discutons de votre projet</p>
        <a href="mailto:contact@thb.io">contact@thb.io</a>
      </section>

      <Link to="/design" className="back-link">← Retour aux options</Link>
    </div>
  )
}
