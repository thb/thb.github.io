import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/design/')({
  component: DesignIndex,
})

function DesignIndex() {
  return (
    <section>
      <h1>Design Options</h1>
      <div className="design-options">
        <Link to="/design/option-a">
          <article>
            <h2>Option A</h2>
            <p>Hero plein écran + portfolio visuel en grille asymétrique</p>
          </article>
        </Link>
        <Link to="/design/option-b">
          <article>
            <h2>Option B</h2>
            <p>Design actuel + section cases illustrée</p>
          </article>
        </Link>
        <Link to="/design/option-c">
          <article>
            <h2>Option C</h2>
            <p>Fond texturé + images intégrées au contenu</p>
          </article>
        </Link>
      </div>
    </section>
  )
}
