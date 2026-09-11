import { useEffect, useRef, useState } from 'react'
import { CLIENTS } from '../../data/clients'
import './SocialProof.css'

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * Prueba social — muro de logos de clientes.
 * Sin caja/fondo por logo (pedido explícito, inspirado en la referencia que
 * pasó Fede): son imágenes en blanco y negro puestas directo sobre el fondo
 * de la sección, en una grilla pareja, sin card ni borde por logo.
 *
 * En desktop, la sección queda "pineada" (position: sticky) mientras el
 * usuario scrollea: los 41 logos se van revelando en función de cuánto
 * scrolleó dentro de ese rango, y recién cuando terminan de aparecer todos
 * se libera y sigue a la sección siguiente. Esto NO es scroll-jacking en el
 * sentido de interceptar la rueda/el touch — es sticky positioning puro, el
 * scroll nativo del usuario nunca se toca ni se previene, solo se lee su
 * posición para decidir cuántos logos ya se revelaron.
 *
 * En mobile (donde pinear una pantalla completa se siente raro con el
 * scroll táctil) no se pinea nada: la sección fluye normal y los logos
 * aparecen con un único reveal en cadena cuando la sección entra en
 * viewport, como el resto del sitio.
 */
function SocialProof() {
  const wrapRef = useRef(null)
  const [pinned, setPinned] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)

  // Decide una sola vez si esta carga pinea (desktop + sin reduced-motion)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const decide = () => setPinned(mq.matches && !prefersReducedMotion())
    decide()
    mq.addEventListener('change', decide)
    return () => mq.removeEventListener('change', decide)
  }, [])

  // Sin animación (reduced-motion): todo visible de una, sin listeners.
  useEffect(() => {
    if (prefersReducedMotion()) setRevealedCount(CLIENTS.length)
  }, [])

  // Desktop pineado: el scroll nativo decide cuántos logos ya aparecieron.
  useEffect(() => {
    if (!pinned || prefersReducedMotion()) return
    const el = wrapRef.current
    if (!el) return
    // El pin sticka a top:navbar-h (no 0, el navbar también es sticky ahí),
    // asi que el rango de scroll efectivo tiene que descontar esa altura
    // de los dos lados de la cuenta (offset de enganche + alto visible).
    const navbarH =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 68
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const pinH = window.innerHeight - navbarH
      const total = el.offsetHeight - pinH
      const scrolled = Math.min(Math.max(navbarH - rect.top, 0), Math.max(total, 0))
      const progress = total > 0 ? scrolled / total : 1
      setRevealedCount(Math.round(progress * CLIENTS.length))
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
  }, [pinned])

  // Mobile (sin pin): un único observer para toda la sección, reveal en
  // cadena vía CSS (--reveal-delay por logo), una sola vez.
  useEffect(() => {
    if (pinned || prefersReducedMotion()) return
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setRevealedCount(CLIENTS.length)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealedCount(CLIENTS.length)
          io.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [pinned])

  return (
    <section id="clientes" className="social-proof" aria-labelledby="social-proof-title">
      <div ref={wrapRef} className={`social-proof__pin-wrap ${pinned ? 'is-pinned' : ''}`}>
        <div className="social-proof__pin">
          <div className="u-container">
            <p className="social-proof__overline t-overline">Confían en nosotros</p>
            <h2 id="social-proof-title" className="t-section-title social-proof__title">
              Organizaciones que eligen a Inspira
            </h2>

            <ul className="social-proof__grid">
              {CLIENTS.map((client, i) => (
                <li
                  key={client.src}
                  className={`social-proof__cell ${i < revealedCount ? 'is-visible' : ''}`}
                  style={{ '--reveal-delay': `${(i % 9) * 60}ms` }}
                >
                  <img
                    className="social-proof__logo"
                    src={client.src}
                    alt={client.name}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
