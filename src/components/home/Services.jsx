import { Link } from 'react-router-dom'
import ArcPattern from '../ui/ArcPattern'
import { useReveal } from '../../lib/useReveal'
import { SERVICES } from '../../data/services'
import './Services.css'

/*
 * Las 4 lineas de servicio = la oferta comercial (distinta de los pilares).
 * Fondo de tarjeta con variantes del patron grafico. Hover: escala 1.02 + sombra.
 * Click -> pagina interna del servicio (el copy tecnico completo vive ahi).
 */
function Services() {
  const [ref, visible] = useReveal({ threshold: 0.15 })

  return (
    <section id="servicios" className="services u-section" aria-labelledby="services-title" ref={ref}>
      <div className="u-container">
        <p className="services__overline t-overline">Qué hacemos</p>
        <h2 id="services-title" className="t-section-title services__title">
          Cuatro formas de acompañar a tu organización
        </h2>

        <ul className={`services__grid ${visible ? 'is-visible' : ''}`}>
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="services__item" style={{ '--reveal-delay': `${i * 100}ms` }}>
              <Link to={`/servicios/${s.slug}`} className="services__card">
                <ArcPattern variant={s.pattern} scale={150} className="services__card-bg" />
                <span className="services__card-body">
                  <span className="services__name t-h3">{s.name}</span>
                  {/* TODO(copy): gancho borrador */}
                  <span className="services__hook t-caption">{s.hook}</span>
                  <span className="services__arrow" aria-hidden="true">
                    Ver más
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h9M8.5 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
