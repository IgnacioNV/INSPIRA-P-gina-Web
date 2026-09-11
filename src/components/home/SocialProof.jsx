import { useReveal } from '../../lib/useReveal'
import { CLIENTS } from '../../data/clients'
import './SocialProof.css'

/*
 * Prueba social — muro de logos de clientes.
 * Tratamiento unificado: misma caja para todos, y los 41 archivos ya vienen
 * pre-procesados a blanco y negro (ver src/data/clients.js) — nada de CSS
 * filter en runtime, ni "hover a color": se decidió no reintroducir el color
 * de marca de terceros ni en hover, para no competir con la paleta Inspira.
 *
 * Reveal on scroll: cada logo tiene su propio observer (no uno solo para
 * toda la grilla) — así van apareciendo de a uno/fila a medida que el
 * usuario baja, no todos juntos cuando la sección entra en viewport. Una
 * vez visible queda visible (useReveal ya es "once"). Con
 * prefers-reduced-motion, useReveal arranca todo visible sin animar.
 */
function LogoCell({ client, index }) {
  const [ref, visible] = useReveal({ threshold: 0.2, rootMargin: '0px 0px -8% 0px' })

  return (
    <li
      ref={ref}
      className={`social-proof__cell reveal ${visible ? 'is-visible' : ''}`}
      style={{ '--reveal-delay': `${(index % 6) * 90}ms` }}
    >
      <img className="social-proof__logo" src={client.src} alt={client.name} loading="lazy" />
    </li>
  )
}

function SocialProof() {
  return (
    <section id="clientes" className="social-proof u-section" aria-labelledby="social-proof-title">
      <div className="u-container">
        <p className="social-proof__overline t-overline">Confían en nosotros</p>
        <h2 id="social-proof-title" className="t-section-title social-proof__title">
          Organizaciones que eligen a Inspira
        </h2>

        <ul className="social-proof__grid">
          {CLIENTS.map((client, i) => (
            <LogoCell key={client.src} client={client} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SocialProof
