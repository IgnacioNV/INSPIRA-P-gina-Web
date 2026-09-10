import { useReveal } from '../../lib/useReveal'
import './Pillars.css'

/*
 * Los 4 pilares de marca = atributos (como se siente trabajar con Inspira).
 * NO son los servicios (esos van en <Services/>).
 * Iconos de linea, trazo redondeado, coherentes con el isotipo. Sin fotos.
 *
 * TODO(copy): las frases de 2-3 palabras son BORRADOR — revisar con Fede.
 */
const PILLARS = [
  {
    key: 'trato-humano',
    label: 'Trato humano',
    phrase: 'Personas, no casos', // draft
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
    phrase: '+10 años en el rubro', // draft
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
    phrase: 'Cada propuesta a medida', // draft
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 17h28M10 31h28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="19" cy="17" r="5" fill="var(--c-cream)" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="31" cy="31" r="5" fill="var(--c-cream)" stroke="currentColor" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    key: 'profesionalismo',
    label: 'Profesionalismo',
    phrase: 'Criterio y método', // draft
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

function Pillars() {
  const [ref, visible] = useReveal({ threshold: 0.2 })

  return (
    <section className="pillars u-section" aria-labelledby="pillars-title" ref={ref}>
      <div className="u-container">
        <h2 id="pillars-title" className="sr-only">
          Cómo trabajamos
        </h2>
        <ul className={`pillars__grid ${visible ? 'is-visible' : ''}`}>
          {PILLARS.map((p, i) => (
            <li
              key={p.key}
              className="pillars__item"
              style={{ '--reveal-delay': `${i * 100}ms` }}
            >
              <span className="pillars__icon">{p.icon}</span>
              <span className="pillars__label t-h3">{p.label}</span>
              {/* TODO(copy): frase borrador */}
              <span className="pillars__phrase t-caption">{p.phrase}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Pillars
