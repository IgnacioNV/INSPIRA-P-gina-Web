import { Link } from 'react-router-dom'
import ArcPattern from '../ui/ArcPattern'
import { useReveal } from '../../lib/useReveal'
import { SERVICES } from '../../data/services'
import './Services.css'

/*
 * Los 4 pilares, reusados TAL CUAL de la vieja sección "Valores" standalone
 * (src/components/home/Pillars.jsx, borrada en 6491928) — mismos íconos,
 * mismos labels, mismas frases. Único cambio: el círculo "hueco" del ícono
 * de Personalización pintaba var(--c-cream) para camuflarse con el fondo
 * claro de la sección vieja; acá el fondo es navy, así que pinta
 * var(--c-navy) para seguir leyéndose como un aro hueco (mismo trazo, no es
 * un ícono nuevo).
 */
const PILLARS = [
  {
    key: 'trato-humano',
    label: 'Trato humano',
    phrase: 'Personas, no casos',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="18" cy="17" r="7" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="32" cy="20" r="5.5" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M7 40c1.5-7 6-11 11-11s9.5 4 11 11"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M28 40c1-4.5 3.8-8 7-8s5.4 2.6 6.4 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: 'experiencia',
    label: 'Experiencia',
    phrase: '+10 años en el rubro',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M8 34c0-9 7-16 16-16s16 7 16 16"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M15 34c0-5 4-9 9-9s9 4 9 9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="34" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'personalizacion',
    label: 'Personalización',
    phrase: 'Cada propuesta a medida',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 17h28M10 31h28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="19" cy="17" r="5" fill="var(--c-navy)" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="31" cy="31" r="5" fill="var(--c-navy)" stroke="currentColor" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    key: 'profesionalismo',
    label: 'Profesionalismo',
    phrase: 'Criterio y método',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M24 7l13 5v10c0 9-5.5 15.5-13 19-7.5-3.5-13-10-13-19V12l13-5Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M18 23.5l4.5 4.5L31 19"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

/*
 * Cada card de "Qué hacemos" se revela sola cuando el usuario scrollea
 * hasta ella (no todas juntas al entrar la sección, como antes) y entra
 * deslizando desde el lado por el que "mira" — mismo lado que su foto
 * (ver Services.css: nth-child(even) invierte el layout de la card).
 */
function ServiceItem({ s, i }) {
  const [ref, visible] = useReveal({ threshold: 0.2 })
  const fromRight = i % 2 === 1

  return (
    <li
      ref={ref}
      className={`services__item ${fromRight ? 'services__item--right' : 'services__item--left'} ${
        visible ? 'is-visible' : ''
      }`}
    >
      <article className="services-card">
        <div className="services-card__media">
          {s.photo ? (
            <img src={s.photo} alt="" className="services-card__photo" loading="lazy" />
          ) : (
            // TODO(foto): reemplazar por foto real cuando haya banco propio de imágenes
            <ArcPattern
              variant={s.pattern}
              fade="none"
              scale={130}
              className="services-card__pattern"
            />
          )}
        </div>

        <div className="services-card__body">
          <h3 className="services-card__name t-card-title">{s.name}</h3>
          <p className="services-card__hook t-body-strong">{s.hook}</p>

          {s.description ? (
            <p className="services-card__desc t-body">{s.description}</p>
          ) : (
            <div className="services-card__desc services-card__desc--pending">
              <span className="t-caption services-card__desc-label">Copy pendiente</span>
              <p className="t-body">
                Acá va un párrafo de 2-3 líneas describiendo el proceso o lo que se entrega en{' '}
                {s.name.toLowerCase()}.
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
  )
}

/*
 * "Qué hacemos" — sección insignia de la home.
 * 4 cards grandes (no una fila apretada): cada una trae el pilar de marca
 * que la respalda como tag, título, bajada, párrafo de proceso y "Ver más".
 * A diferencia del resto del sitio, el encabezado va alineado a la
 * izquierda (rompe a propósito el patrón "eyebrow + título centrados").
 * Cierra con una franja navy que resume los 4 pilares — ya no es una
 * sección propia, es la conclusión de lo que se acaba de mostrar.
 */
function Services() {
  const [pillarsRef, pillarsVisible] = useReveal({ threshold: 0.25 })

  return (
    <section id="servicios" className="services" aria-labelledby="services-title">
      <div className="u-container">
        <div className="services__header">
          {/* Patrón de fondo — position:absolute, sangrando por fuera del header
              (offsets negativos), igual que "Nosotros" en el sitio en producción
              (ver Nosotros.css: .nosotros-pattern). Es un fondo, no una tarjeta
              chica: sin caja, sin bordes redondeados. Acá un poco más repetido
              que ese original: tile más chico, se ven varias filas/columnas. */}
          <div className="services__header-pattern" aria-hidden="true">
            <ArcPattern variant="durazno-crema" fade="none" scale={240} />
          </div>
          <div className="services__header-text">
            <p className="services__overline t-overline">Qué hacemos</p>
            <h2 id="services-title" className="t-section-title services__title">
              Cuatro formas de acompañar a tu organización
            </h2>
          </div>
        </div>

        <ul className="services__list">
          {SERVICES.map((s, i) => (
            <ServiceItem key={s.slug} s={s} i={i} />
          ))}
        </ul>
      </div>

      {/* Cierre de "Qué hacemos": los 4 pilares como conclusión, no como afirmación suelta */}
      <div className="services__pillars" data-surface="dark" ref={pillarsRef}>
        <div className="u-container">
          <h3 className="services__pillars-title t-h2">
            Todo lo que hacemos se sostiene en 4 pilares
          </h3>

          <ul className={`services__pillars-grid ${pillarsVisible ? 'is-visible' : ''}`}>
            {PILLARS.map((p, i) => (
              <li
                key={p.key}
                className="services__pillars-item"
                style={{ '--reveal-delay': `${i * 100}ms` }}
              >
                <span className="services__pillars-icon">{p.icon}</span>
                <span className="services__pillars-label t-h3">{p.label}</span>
                <span className="services__pillars-phrase t-body">{p.phrase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Services
