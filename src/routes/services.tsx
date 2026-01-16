import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: Services,
})

function Services() {
  return (
    <section>
      <h1>services</h1>
      <div className="services-list">
        <article>
          <h2>CTO as a Service</h2>
          <p>
            Direction technique à temps partiel pour startups et scale-ups.
            Stratégie, architecture, recrutement, structuration d'équipe.
          </p>
        </article>
        <article>
          <h2>Conseil & Architecture</h2>
          <p>
            Audit technique, choix technologiques, refonte d'architecture.
            Domain-driven design, clean architecture.
          </p>
        </article>
        <article>
          <h2>Accompagnement IA</h2>
          <p>
            Intégration de l'IA dans vos processus de développement.
            Stratégie, formation, mise en œuvre.
          </p>
        </article>
      </div>
    </section>
  )
}
