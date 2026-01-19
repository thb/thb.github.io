import { createFileRoute, Link } from '@tanstack/react-router'
import { articles } from '../data/articles'

export const Route = createFileRoute('/articles/')({
  component: Articles,
})

function Articles() {
  return (
    <section className="articles-page">
      <h1>Articles</h1>
      <p className="articles-intro">
        Retours d'expérience sur l'utilisation des agents IA en développement.
      </p>
      <ul className="post-list">
        {articles.map((article) => (
          <li key={article.slug}>
            <article>
              <time>{article.date}</time>
              <h2>
                <Link to="/articles/$slug" params={{ slug: article.slug }}>
                  {article.title}
                </Link>
              </h2>
              <p>{article.description}</p>
              <div className="tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
