import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
})

function Portfolio() {
  return (
    <section className="portfolio-page">
      <h1>Portfolio</h1>
      <p className="portfolio-intro">Une sélection de missions et projets.</p>

      <div className="portfolio-scroll">
        <article>
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80"
            alt="Architecture DDD"
          />
          <h2>Refonte architecture e-commerce</h2>
          <p>Migration DDD, -60% temps de réponse API</p>
          <div className="tags">
            <span>DDD</span>
            <span>Node.js</span>
          </div>
        </article>
        <article>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80"
            alt="Dashboard"
          />
          <h2>Dashboard IA retail</h2>
          <p>Prédiction des ventes, interface analytics</p>
          <div className="tags">
            <span>React</span>
            <span>Python</span>
          </div>
        </article>
        <article>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80"
            alt="Team"
          />
          <h2>CTO as a Service - Fintech</h2>
          <p>Équipe de 0 à 8 en 12 mois</p>
          <div className="tags">
            <span>Management</span>
            <span>Recrutement</span>
          </div>
        </article>
        <article>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80"
            alt="Data"
          />
          <h2>Refonte SI groupe média</h2>
          <p>Unification de 5 systèmes legacy</p>
          <div className="tags">
            <span>Architecture</span>
            <span>API</span>
          </div>
        </article>
      </div>
    </section>
  )
}
