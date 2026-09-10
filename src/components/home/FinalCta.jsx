import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import ArcPattern from '../ui/ArcPattern'
import { useReveal } from '../../lib/useReveal'
import { makeHashHandler } from '../../lib/goToHash'
import './FinalCta.css'

function FinalCta() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [ref, visible] = useReveal({ threshold: 0.3 })
  const conversemos = makeHashHandler(navigate, pathname, 'contacto', { focus: 'nombre' })

  return (
    <section className="final-cta" data-surface="dark" aria-labelledby="final-cta-title" ref={ref}>
      <ArcPattern variant="crema-navy" fade="down" scale={280} className="final-cta__pattern" />
      <div className={`final-cta__content u-container ${visible ? 'reveal is-visible' : 'reveal'}`}>
        {/* TODO(copy): frase de cierre BORRADOR — calida, corta, sobre lo humano. Revisar con Fede. */}
        <h2 id="final-cta-title" className="final-cta__title t-h1">
          Detrás de cada proceso hay personas. Empecemos por ahí.
        </h2>
        <Button size="lg" variant="primary" href="/#contacto" onClick={conversemos}>
          Conversemos
        </Button>
      </div>
    </section>
  )
}

export default FinalCta
