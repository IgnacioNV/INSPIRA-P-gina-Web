/*
 * Navega a una ancla de la home desde cualquier ruta.
 * Si ya estamos en "/", scrollea; si no, navega y despues scrollea.
 */

// Alto real del navbar sticky (--navbar-h en tokens.css) + un poco de aire
// extra arriba, para que el destino no quede pegado/tapado por el navbar.
const SCROLL_OFFSET = 68 + 24

function scrollWithOffset(el, behavior) {
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
  window.scrollTo({ top, behavior })
}

export function scrollToId(id, { focus } = {}) {
  const reduce =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const el = document.getElementById(id)
  if (!el) return
  scrollWithOffset(el, reduce ? 'auto' : 'smooth')
  if (focus) {
    const target = document.getElementById(focus)
    if (target) {
      // scroll instantaneo cuando hay que enfocar, para que el focus no se cancele
      scrollWithOffset(el, 'instant')
      requestAnimationFrame(() => target.focus({ preventScroll: true }))
    }
  }
}

export function makeHashHandler(navigate, pathname, id, opts) {
  return (e) => {
    e.preventDefault()
    if (pathname === '/') {
      scrollToId(id, opts)
    } else {
      navigate('/', { state: { scrollTo: id, focus: opts?.focus } })
    }
  }
}
