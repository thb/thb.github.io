import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
})

function Portfolio() {
  return (
    <section>
      <h1>portfolio</h1>
      <div className="project-grid">
        <article className="project">
          <h2>Projet 1</h2>
          <p>Description du projet</p>
          <div className="tags">
            <span>react</span>
            <span>typescript</span>
          </div>
        </article>
        <article className="project">
          <h2>Projet 2</h2>
          <p>Description du projet</p>
          <div className="tags">
            <span>node</span>
            <span>api</span>
          </div>
        </article>
      </div>
    </section>
  )
}
