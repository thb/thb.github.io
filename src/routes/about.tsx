import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <section>
      <h1>about</h1>
      <div className="about-content">
        <p>
          Développeur passionné par la création de solutions élégantes et performantes.
        </p>
        <div className="contact">
          <h2>contact</h2>
          <a href="https://github.com/thb">github</a>
        </div>
      </div>
    </section>
  )
}
