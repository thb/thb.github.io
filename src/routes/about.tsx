import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <section className="about-page">
      <header className="about-header">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
          alt="Portrait"
          className="portrait"
        />
        <div>
          <h1>About</h1>
          <p className="about-intro">
            Tech, business, process, UX — une vision transversale
            pour aborder les problèmes dans leur globalité.
          </p>
        </div>
      </header>

      <div className="about-content">
        <article>
          <h2>Profil 360°</h2>
          <p>
            J'ai cultivé une approche qui va de la stratégie à l'implémentation,
            en passant par l'architecture, le recrutement et les process.
          </p>
          <p>Ma conviction : les meilleures solutions sont souvent les plus simples.</p>
        </article>

        <article>
          <h2>Rigueur + Créativité</h2>
          <p>
            Mon approche combine une exigence technique forte — architecture propre,
            domain-driven design — avec une liberté créative dans la résolution de problèmes.
          </p>
          <p>
            L'IA amplifie cette méthode : elle me permet d'être hyper-productif
            tout en maintenant un haut niveau de qualité.
          </p>
        </article>

        <article>
          <h2>Ce que j'apporte</h2>
          <ul>
            <li>Une vision holistique des enjeux tech et business</li>
            <li>La capacité de passer de la stratégie à l'implémentation</li>
            <li>Des solutions élégantes, maintenables, qui durent</li>
          </ul>
        </article>

        <div className="contact">
          <h2>Contact</h2>
          <a href="https://github.com/thb">github</a>
        </div>
      </div>
    </section>
  )
}
