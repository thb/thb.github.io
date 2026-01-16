import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="home-page">
      <section className="hero-textured">
        <h1>thb</h1>
        <p className="tagline">Consultant Tech · CTO as a Service</p>
        <p className="baseline">Je transforme la complexité en solutions simples.</p>
      </section>

      <section className="content-with-image">
        <div className="text-block">
          <h2>Profil 360°</h2>
          <p>
            Tech, business, process, UX — j'ai cultivé une vision transversale
            qui me permet d'aborder les problèmes dans leur globalité.
          </p>
        </div>
        <figure className="inline-image">
          <img
            src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80"
            alt="Performance et liberté"
          />
          <figcaption>Performance & Liberté</figcaption>
        </figure>
      </section>

      <section className="horizontal-scroll">
        <h2>Projets</h2>
        <div className="scroll-container">
          <article>
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80"
              alt="Code"
            />
            <h3>Architecture DDD</h3>
          </article>
          <article>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80"
              alt="Dashboard"
            />
            <h3>Dashboard Analytics</h3>
          </article>
          <article>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80"
              alt="Data"
            />
            <h3>Refonte SI</h3>
          </article>
          <article>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80"
              alt="Team"
            />
            <h3>Équipe tech</h3>
          </article>
        </div>
      </section>

      <section className="portrait-section">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
          alt="Portrait"
        />
        <div className="portrait-text">
          <h2>Contact</h2>
          <p>Discutons de votre projet</p>
          <a href="mailto:contact@thb.io">contact@thb.io</a>
        </div>
      </section>
    </div>
  )
}
