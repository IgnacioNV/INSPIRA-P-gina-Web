import { useCallback, useState, useEffect } from 'react'
import Logo from '../Logo/Logo'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'Servicios', id: 'servicios' },
  { label: 'Clientes', id: 'clientes' },
  { label: 'Novedades', id: 'novedades' },
  { label: 'Nosotros', id: 'nosotros' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return

    const OFFSET = 80
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      OFFSET

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    })
  }, [])

  const handleLinkClick = useCallback(
    (id) => {
      setIsOpen(false)
      scrollTo(id)
    },
    [scrollTo]
  )

  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault()
      setIsOpen(false)
      scrollTo('inicio')
    },
    [scrollTo]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar')) {
        setIsOpen(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

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
                    handleLinkClick(id)
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
              handleLinkClick('contacto')
            }}
          >
            Conversemos
          </a>
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="navbar__toggle-line" />
          <span className="navbar__toggle-line" />
          <span className="navbar__toggle-line" />
        </button>
      </div>

      <div className={`navbar__mobile-menu ${isOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <nav className="navbar__mobile-nav" aria-label="Menú principal">
          <ul className="navbar__mobile-list">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id} className="navbar__mobile-item">
                <a
                  href={`#${id}`}
                  className="navbar__mobile-link"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(id)
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-cta">
            <a
              href="#contacto"
              className="navbar__button navbar__button--mobile"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick('contacto')
              }}
            >
              Conversemos
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
