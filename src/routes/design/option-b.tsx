import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/design/option-b')({
  component: OptionB,
})

function OptionB() {
  return (
    <div className="option-b">
      {/* Hero classique avec photo portrait */}
      <section className="hero-split">
        <div className="hero-text">
          <h1>thb</h1>
          <p className="tagline">Consultant Tech · CTO as a Service</p>
          <p className="baseline">Je transforme la complexité en solutions simples.</p>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
            alt="Portrait"
          />
        </div>
      </section>

      {/* Cases illustrées */}
      <section className="cases-section">
        <h2>Cases</h2>
        <div className="cases-list">
          <article className="case-item">
            <div className="case-image">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"
                alt="Code"
              />
            </div>
            <div className="case-content">
              <h3>Refonte architecture e-commerce</h3>
              <p>Migration vers une architecture DDD, réduction de 60% du temps de réponse API.</p>
              <div className="tags">
                <span>DDD</span>
                <span>Node.js</span>
                <span>PostgreSQL</span>
              </div>
            </div>
          </article>
          <article className="case-item">
            <div className="case-image">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
                alt="Dashboard"
              />
            </div>
            <div className="case-content">
              <h3>Dashboard IA pour retail</h3>
              <p>Conception et développement d'un outil de prédiction des ventes.</p>
              <div className="tags">
                <span>React</span>
                <span>Python</span>
                <span>ML</span>
              </div>
            </div>
          </article>
          <article className="case-item">
            <div className="case-image">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80"
                alt="Team"
              />
            </div>
            <div className="case-content">
              <h3>CTO as a Service - Startup fintech</h3>
              <p>Structuration de l'équipe tech de 0 à 8 personnes en 12 mois.</p>
              <div className="tags">
                <span>Management</span>
                <span>Recrutement</span>
                <span>Process</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Link to="/design" className="back-link">← Retour aux options</Link>
    </div>
  )
}
