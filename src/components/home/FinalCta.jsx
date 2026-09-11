import ArcPattern from '../ui/ArcPattern'
import { useReveal } from '../../lib/useReveal'
import './FinalCta.css'

/*
 * Cierre cálido antes del formulario de contacto (que viene justo después,
 * en el footer). Sin CTA propio: un botón acá solo repetiría el scroll al
 * mismo form que ya está a un scroll de distancia — no aporta nada.
 */
function FinalCta() {
  const [ref, visible] = useReveal({ threshold: 0.3 })

  return (
    <section className="final-cta" data-surface="dark" aria-labelledby="final-cta-title" ref={ref}>
      <ArcPattern variant="crema-navy" fade="down" scale={280} className="final-cta__pattern" />
      <div className={`final-cta__content u-container ${visible ? 'reveal is-visible' : 'reveal'}`}>
        {/* TODO(copy): frase de cierre BORRADOR — calida, corta, sobre lo humano. Revisar con Fede. */}
        <h2 id="final-cta-title" className="final-cta__title t-h1">
          Detrás de cada proceso hay personas. Empecemos por ahí.
        </h2>
      </div>
    </section>
  )
}

export default FinalCta
