import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
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
      // Atado al botón "Conversemos" del hero, no al final de toda la
      // sección: el de la navbar tiene que aparecer apenas el del hero
      // desaparece de pantalla, no cuando además se fue todo lo de abajo.
      const heroCta = hero.querySelector('.hero__cta')
      const bottom = heroCta ? heroCta.getBoundingClientRect().bottom : hero.getBoundingClientRect().bottom
      setCondensed(bottom <= 72)
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

  // Bloquear scroll de la pagina con el menu mobile abierto + cerrar con
  // Escape. overflow:hidden solo en el body no alcanza en mobile (iOS en
  // particular sigue dejando scrollear con el dedo por detras del menu) —
  // se fija el body en su posicion actual con position:fixed y se restaura
  // el scroll exacto al cerrar. overflow: clip (mismo valor en los dos
  // ejes) y no "hidden": probado en vivo que mezclar clip (X) con hidden
  // (Y) hace que el navegador baje el clip a hidden en los dos ejes (es
  // comportamiento real de CSS, no bug) — hidden en el eje X sigue
  // dejando mover el scroll horizontal por JS/touch, clip no.
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.overflow = 'clip'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.overflow = ''
      window.scrollTo(0, scrollY)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const conversemos = makeHashHandler(navigate, pathname, 'contacto', { focus: 'nombre' })
  const irAlInicio = makeHashHandler(navigate, pathname, 'inicio')

  const closeThen = useCallback(
    (fn) => (e) => {
      // preventDefault ya mismo (fn seguro lo llama también, pero de forma
      // diferida — más abajo — y para entonces ya es tarde para frenar la
      // navegación por default del link).
      e.preventDefault()
      setOpen(false)
      // Si fn corriera ya mismo, el cleanup del bloqueo de scroll (dispara
      // por el setOpen de arriba, corre después de este tick) pisaría el
      // scroll que fn recién hizo con el scroll viejo que tenía guardado
      // de antes de abrir el menú. Se difiere fn un tick para que ese
      // cleanup restaure primero, y recién ahí fn scrollee a su destino.
      setTimeout(() => fn(e), 0)
    },
    [],
  )

  return (
    <header
      className={`navbar ${condensed ? 'navbar--condensed' : ''}`}
      style={{ '--nav-list-shift': `${condensed ? 0 : listShift}px` }}
    >
      <div className="navbar__inner u-container" ref={innerRef}>
        <Link
          to="/"
          className="navbar__brand"
          aria-label="Inspira — Ir al inicio"
          onClick={irAlInicio}
        >
          <Logo tone="navy" />
        </Link>

        <nav className="navbar__desktop" aria-label="Principal">
          {/* Sobre el hero: a la derecha. Con el botón: al centro exacto. */}
          <ul className="navbar__list" ref={listRef}>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <NavLink to={`/servicios/${s.slug}`} className="navbar__link">
                  {s.navLabel ?? s.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/nosotros" className="navbar__link">
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/busquedas" className="navbar__link">
                Búsquedas/CV
              </NavLink>
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
        {/* Header propio del panel (logo + cerrar): el panel es fixed a toda
            pantalla y, con el scroll bloqueado (position:fixed en el body),
            el navbar de arriba pierde su "sticky" y puede quedar fuera de
            vista si el usuario abrió el menú ya scrolleado — este header no
            depende de eso, siempre está visible mientras el panel está abierto. */}
        <div className="navbar__mobile-header u-container">
          <Link
            to="/"
            className="navbar__brand"
            aria-label="Inspira — Ir al inicio"
            onClick={closeThen(irAlInicio)}
          >
            <Logo tone="navy" />
          </Link>
          <button
            type="button"
            className="navbar__mobile-close"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="navbar__mobile-inner u-container" aria-label="Menú principal">
          <ul className="navbar__mobile-list">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <NavLink to={`/servicios/${s.slug}`} className="navbar__mobile-link">
                  {s.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/nosotros" className="navbar__mobile-link">
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/busquedas" className="navbar__mobile-link">
                Búsquedas/CV
              </NavLink>
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
