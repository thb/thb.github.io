import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="container">
      <header>
        <nav>
          <Link to="/" className="logo">thb</Link>
          <div className="nav-links">
            <Link to="/articles">articles</Link>
            <Link to="/projets">projets</Link>
            <Link to="/services">services</Link>
            <Link to="/about">about</Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} thb</p>
      </footer>
    </div>
  ),
})
