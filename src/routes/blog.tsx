import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: Blog,
})

function Blog() {
  return (
    <section>
      <h1>blog</h1>
      <ul className="post-list">
        <li>
          <article>
            <time>2025-01-15</time>
            <h2>Premier article</h2>
            <p>Description de l'article...</p>
          </article>
        </li>
      </ul>
    </section>
  )
}
