import { useCallback } from 'react'
import Logo from '../Logo/Logo'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'Servicios', id: 'servicios' },
  { label: 'Clientes', id: 'clientes' },
  { label: 'Novedades', id: 'novedades' },
  { label: 'Nosotros', id: 'nosotros' },
]

function Navbar() {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleLogoClick = useCallback((e) => {
    e.preventDefault()
    scrollTo('inicio')
  }, [scrollTo])

  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner">
        <a
          href="#inicio"
          className="navbar__logo"
          onClick={handleLogoClick}
          aria-label="Inspira - Ir al inicio"
        >
          <Logo variant="light" />
        </a>

        <nav className="navbar__nav" aria-label="Principal">
          <ul className="navbar__list">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id} className="navbar__item">
                <a
                  href={`#${id}`}
                  className="navbar__link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(id)
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__cta">
          <a
            href="#contacto"
            className="navbar__button"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('contacto')
            }}
          >
            Conversemos
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
