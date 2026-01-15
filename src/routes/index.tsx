import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <section className="hero">
      <h1>thb</h1>
      <p className="tagline">developer & creator</p>
    </section>
  )
}
