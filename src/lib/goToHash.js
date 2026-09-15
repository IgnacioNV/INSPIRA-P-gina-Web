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
  if (!focus) return
  const target = document.getElementById(focus)
  if (!target) return
  const doFocus = () => target.focus({ preventScroll: true })
  if (reduce) {
    // Sin animación: ya estamos en destino, foco inmediato.
    doFocus()
    return
  }
  // Antes se forzaba un segundo scroll instantáneo acá para poder enfocar
  // ya mismo — pero eso cancelaba de raíz la animación smooth de arriba
  // (el CTA "Conversemos" saltaba en vez de recorrer la página). Ahora se
  // espera a que el scroll termine para enfocar, sin tocar el scroll de
  // nuevo. "scrollend" y un timeout corren en paralelo (gana el que llegue
  // primero): si ya estábamos en destino (distancia ~0) algunos navegadores
  // no llegan a disparar "scrollend", y ahí el timeout es el que salva el
  // foco en vez de quedar colgado para siempre.
  let focused = false
  const finish = () => {
    if (focused) return
    focused = true
    window.removeEventListener('scrollend', finish)
    clearTimeout(timer)
    doFocus()
  }
  window.addEventListener('scrollend', finish)
  const timer = setTimeout(finish, 700)
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
