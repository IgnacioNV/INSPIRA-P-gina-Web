import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { SERVICES } from '../../data/services'
import { makeHashHandler } from '../../lib/goToHash'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  // "condensed" = el usuario ya pasó el hero: aparece sombra + el CTA en la
  // navbar y los links se centran entre el logo y el botón.
  const [condensed, setCondensed] = useState(false)
  // Desplazamiento de los links: sobre el hero van a la derecha del todo;
  // al aparecer el botón se corren al centro exacto de la navbar.
  const [listShift, setListShift] = useState(0)
  const innerRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const calc = () => {
      const inner = innerRef.current
      const list = listRef.current
      if (!inner || !list || list.offsetParent === null) return
      const gutter = parseFloat(getComputedStyle(inner).paddingRight) || 0
      setListShift(Math.max(0, inner.offsetWidth / 2 - gutter - list.offsetWidth / 2))
    }
    calc()
    // Recalcular cuando termina de cargar la tipografía (cambia el ancho real)
    if (document.fonts?.ready) document.fonts.ready.then(calc)
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const hero = document.getElementById('inicio')
      if (!hero) {
        // Rutas sin hero (servicios, nosotros): el CTA va siempre visible.
        setCondensed(true)
        return
      }
      setCondensed(hero.getBoundingClientRect().bottom <= 72)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  // Cerrar menu al cambiar de ruta
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Bloquear scroll del body con el menu mobile abierto + cerrar con Escape
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const conversemos = makeHashHandler(navigate, pathname, 'contacto', { focus: 'nombre' })

  const closeThen = useCallback(
    (fn) => (e) => {
      setOpen(false)
      fn(e)
    },
    [],
  )

  return (
    <header
      className={`navbar ${condensed ? 'navbar--condensed' : ''}`}
      style={{ '--nav-list-shift': `${condensed ? 0 : listShift}px` }}
    >
      <div className="navbar__inner u-container" ref={innerRef}>
        <Link to="/" className="navbar__brand" aria-label="Inspira — Ir al inicio">
          <Logo tone="navy" />
        </Link>

        <nav className="navbar__desktop" aria-label="Principal">
          {/* Sobre el hero: a la derecha. Con el botón: al centro exacto. */}
          <ul className="navbar__list" ref={listRef}>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios/${s.slug}`} className="navbar__link">
                  {s.navLabel ?? s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/nosotros" className="navbar__link">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/busquedas" className="navbar__link">
                Búsquedas/CV
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar__cta-slot">
          <Button
            size="md"
            variant="primary"
            href="/#contacto"
            className="navbar__cta"
            onClick={conversemos}
            tabIndex={condensed ? 0 : -1}
            aria-hidden={condensed ? undefined : 'true'}
          >
            Conversemos
          </Button>
        </div>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="navbar-mobile"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>
      </div>

      <div
        id="navbar-mobile"
        className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}
        hidden={!open}
      >
        <nav className="navbar__mobile-inner u-container" aria-label="Menú principal">
          <ul className="navbar__mobile-list">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios/${s.slug}`} className="navbar__mobile-link">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/nosotros" className="navbar__mobile-link">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/busquedas" className="navbar__mobile-link">
                Búsquedas/CV
              </Link>
            </li>
          </ul>
          <Button
            size="lg"
            variant="primary"
            href="/#contacto"
            className="navbar__mobile-cta"
            onClick={closeThen(conversemos)}
          >
            Conversemos
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
