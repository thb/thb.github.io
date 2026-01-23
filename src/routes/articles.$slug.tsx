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
  // 1. Extract code blocks to protect them from transformation
  const codeBlocks: string[] = []
  let processed = content
    // Code blocks with language
    .replace(/```(\w+)\n([\s\S]*?)```/g, (_, lang, code) => {
      const index = codeBlocks.length
      codeBlocks.push(`<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`)
      return `___CODEBLOCK_${index}___`
    })
    // Code blocks without language
    .replace(/```\n?([\s\S]*?)```/g, (_, code) => {
      const index = codeBlocks.length
      codeBlocks.push(`<pre><code>${escapeHtml(code)}</code></pre>`)
      return `___CODEBLOCK_${index}___`
    })

  // 2. Extract inline code
  const inlineCode: string[] = []
  processed = processed.replace(/`([^`]+)`/g, (_, code) => {
    const index = inlineCode.length
    inlineCode.push(`<code>${escapeHtml(code)}</code>`)
    return `___INLINECODE_${index}___`
  })

  // 3. Apply markdown transformations
  processed = processed
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Unordered lists
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(cell => cell.trim())
      if (cells.every(cell => cell.match(/^-+$/))) {
        return ''
      }
      return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<table>$&</table>')
    // Paragraphs - split by double newlines
    .split(/\n\n+/)
    .map(block => {
      block = block.trim()
      if (!block) return ''
      // Don't wrap if already a block element or placeholder
      if (block.match(/^<[huptbl]|^___CODEBLOCK/)) return block
      return `<p>${block.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')

  // 4. Restore inline code
  inlineCode.forEach((code, index) => {
    processed = processed.replace(`___INLINECODE_${index}___`, code)
  })

  // 5. Restore code blocks
  codeBlocks.forEach((block, index) => {
    processed = processed.replace(`___CODEBLOCK_${index}___`, block)
  })

  // 6. Clean up
  processed = processed
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p>(<(?:h[1-6]|ul|ol|table|pre|blockquote))/g, '$1')
    .replace(/(<\/(?:h[1-6]|ul|ol|table|pre|blockquote)>)<\/p>/g, '$1')

  return processed
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
