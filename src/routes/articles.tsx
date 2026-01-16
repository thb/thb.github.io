import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/articles')({
  component: Articles,
})

function Articles() {
  return (
    <section>
      <h1>Articles</h1>
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
