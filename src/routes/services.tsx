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
          <h2>Développement web</h2>
          <p>Sites et applications web modernes</p>
        </article>
        <article>
          <h2>Consulting</h2>
          <p>Conseil technique et architecture</p>
        </article>
        <article>
          <h2>Formation</h2>
          <p>Accompagnement et montée en compétences</p>
        </article>
      </div>
    </section>
  )
}
