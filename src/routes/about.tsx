import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <section>
      <h1>about</h1>
      <div className="about-content">
        <article>
          <h2>Profil 360°</h2>
          <p>
            Tech, business, process, UX — j'ai cultivé une vision transversale
            qui me permet d'aborder les problèmes dans leur globalité.
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
