import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <section className="hero">
        <h1>thb</h1>
        <p className="tagline">Consultant Tech · CTO as a Service</p>
        <p className="baseline">Je transforme la complexité en solutions simples.</p>
      </section>

      <figure className="signature-image">
        <img
          src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80"
          alt="Performance et liberté"
        />
      </figure>
    </>
  )
}
