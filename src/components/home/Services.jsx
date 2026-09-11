import { Link } from 'react-router-dom'
import ArcPattern from '../ui/ArcPattern'
import { useReveal } from '../../lib/useReveal'
import { SERVICES } from '../../data/services'
import './Services.css'

/*
 * "Qué hacemos" — sección insignia de la home.
 * 4 cards grandes (no una fila apretada): cada una trae el pilar de marca
 * que la respalda como tag, título, bajada, párrafo de proceso y "Ver más".
 * A diferencia del resto del sitio, el encabezado va alineado a la
 * izquierda (rompe a propósito el patrón "eyebrow + título centrados").
 */
function Services() {
  const [ref, visible] = useReveal({ threshold: 0.1 })

  return (
    <section id="servicios" className="services u-section" aria-labelledby="services-title" ref={ref}>
      <div className="u-container">
        <div className="services__header">
          <ArcPattern
            variant="durazno-crema"
            fade="none"
            scale={200}
            className="services__header-pattern"
          />
          <p className="services__overline t-overline">Qué hacemos</p>
          <h2 id="services-title" className="t-section-title services__title">
            Cuatro formas de acompañar a tu organización
          </h2>
        </div>

        <ul className={`services__list ${visible ? 'is-visible' : ''}`}>
          {SERVICES.map((s, i) => (
            <li
              key={s.slug}
              className="services__item"
              style={{ '--reveal-delay': `${i * 100}ms` }}
            >
              <article className="services-card">
                <div className="services-card__media">
                  {s.photo ? (
                    <img
                      src={s.photo}
                      alt=""
                      className="services-card__photo"
                      loading="lazy"
                    />
                  ) : (
                    // TODO(foto): reemplazar por foto real cuando haya banco propio de imágenes
                    <ArcPattern
                      variant={s.pattern}
                      fade="none"
                      scale={130}
                      className="services-card__pattern"
                    />
                  )}
                  {s.pillar && (
                    <span className="services-card__tag">
                      <span className="services-card__tag-dot" aria-hidden="true" />
                      {s.pillar}
                    </span>
                  )}
                </div>

                <div className="services-card__body">
                  <h3 className="services-card__name t-h2">{s.name}</h3>
                  <p className="services-card__hook t-body-strong">{s.hook}</p>

                  {s.description ? (
                    <p className="services-card__desc t-body">{s.description}</p>
                  ) : (
                    <div className="services-card__desc services-card__desc--pending">
                      <span className="t-caption services-card__desc-label">
                        Copy pendiente
                      </span>
                      <p className="t-body">
                        Acá va un párrafo de 2-3 líneas describiendo el proceso o lo
                        que se entrega en {s.name.toLowerCase()}.
                      </p>
                    </div>
                  )}

                  <Link to={`/servicios/${s.slug}`} className="services-card__link">
                    Ver más
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8h9M8.5 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
