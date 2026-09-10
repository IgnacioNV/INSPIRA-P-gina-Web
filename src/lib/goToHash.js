/*
 * Navega a una ancla de la home desde cualquier ruta.
 * Si ya estamos en "/", scrollea; si no, navega y despues scrollea.
 */
export function scrollToId(id, { focus } = {}) {
  const reduce =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (focus) {
    const target = document.getElementById(focus)
    if (target) {
      // scroll instantaneo cuando hay que enfocar, para que el focus no se cancele
      el.scrollIntoView({ behavior: 'auto', block: 'start' })
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
