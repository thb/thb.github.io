import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getArticleBySlug } from '../data/articles'

export const Route = createFileRoute('/articles/$slug')({
  component: ArticlePage,
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug)
    if (!article) {
      throw notFound()
    }
    return { article }
  },
})

function ArticlePage() {
  const { article } = Route.useLoaderData()

  return (
    <article className="article-page">
      <header className="article-header">
        <Link to="/articles" className="back-link">
          &larr; Retour aux articles
        </Link>
        <time>{article.date}</time>
        <h1>{article.title}</h1>
        <div className="tags">
          {article.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
      />
    </article>
  )
}

function parseMarkdown(content: string): string {
  return content
    // Code blocks with language
    .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Code blocks without language
    .replace(/```\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Unordered lists
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Tables (basic support)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(cell => cell.trim())
      if (cells.every(cell => cell.match(/^-+$/))) {
        return ''
      }
      const isHeader = match.includes('---') === false
      const tag = isHeader ? 'td' : 'td'
      return '<tr>' + cells.map(cell => `<${tag}>${cell}</${tag}>`).join('') + '</tr>'
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<table>$&</table>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[huptol])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[huptol])/g, '$1')
    .replace(/(<\/[huptol][^>]*>)<\/p>/g, '$1')
}
