import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <section className="hero">
      <h1>thb</h1>
      <p className="tagline">Consultant Tech · CTO as a Service</p>
      <p className="baseline">Je transforme la complexité en solutions simples.</p>
    </section>
  )
}
