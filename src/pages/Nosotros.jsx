import { useEffect } from 'react'
import Button from '../components/ui/Button'
import ArcPattern from '../components/ui/ArcPattern'
import './Nosotros.css'

/*
 * Nosotros — copy institucional y bio de Federico portados TAL CUAL desde
 * inspira.ar (la página en producción, src/components/Nosotros/Nosotros.jsx
 * en este mismo repo). No se reescribió nada, incluido el corte abrupto de
 * la bio de Federico ("...") que ya venía así en el original — no se inventó
 * el final.
 *
 * TODO(video): el botón de play es un placeholder — en el sitio en
 * producción tampoco hay un video real cargado atrás, solo el ícono.
 * TODO(federico): el botón "Conocé más sobre Federico" no lleva a ningún
 * lado en el sitio original tampoco — decidir si suma una página/modal.
 */
function Nosotros() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="nosotros-page">
      <header className="nosotros-page__header u-container">
        <p className="t-overline nosotros-page__eyebrow">Nosotros</p>
        <h1 className="t-h1">Quiénes somos</h1>
      </header>

      <section className="nosotros-page__intro u-container">
        <p className="t-body">
          En <strong>Inspira Recursos Humanos</strong> acompañamos a organizaciones y líderes en
          procesos de desarrollo, transformación y fortalecimiento cultural. Creemos que los
          resultados sostenibles surgen del modo en que las personas piensan, conversan, deciden y
          construyen vínculos en contextos reales.
        </p>
        <p className="t-body">
          El nombre Inspira expresa nuestra esencia. Inspirar es tomar aire: generar energía, calma
          y claridad para reflexionar antes de actuar. Es también habilitar la creatividad, abrir
          nuevas miradas y encontrar soluciones que antes no estaban disponibles. Y, sobre todo, es
          movilizar: encender en otros la inspiración necesaria para emprender cambios
          significativos.
        </p>
        <p className="t-body">
          Trabajamos desde una mirada integradora que combina experiencia en consultoría, coaching
          ejecutivo y formación de líderes, junto con una sólida base académica desarrollada en
          espacios como la <strong>Universidad de Palermo</strong> y la{' '}
          <strong>Universidad de San Andrés</strong>.
        </p>
        <p className="t-body">
          Diseñamos intervenciones a medida — coaching ejecutivo, programas de liderazgo y
          desarrollo de equipos — con foco en generar impacto real, equilibrando resultados,
          conciencia y cuidado por las personas.
        </p>
      </section>

      <section className="nosotros-page__federico u-container">
        <p className="nosotros-page__federico-lead t-h3">
          Escuchemos la palabra de <strong>Federico Núñez</strong>
        </p>

        <div className="nosotros-page__federico-grid">
          <div className="nosotros-page__video">
            {/* TODO(video): placeholder — en producción tampoco hay video real cargado */}
            <ArcPattern variant="navy-crema" fade="none" scale={380} />
            <span className="nosotros-page__play" aria-hidden="true">
              <svg viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="29" fill="var(--c-white)" />
                <path d="M24 18l19 12-19 12V18Z" fill="var(--c-navy)" />
              </svg>
            </span>
          </div>

          <div className="nosotros-page__card">
            <img
              src="/nosotros/imagen-fede.png"
              alt="Federico Núñez"
              className="nosotros-page__photo"
              loading="lazy"
            />
            <div className="nosotros-page__card-body">
              <h2 className="t-h2">Mg. Federico Martín Núñez</h2>
              <p className="t-body-strong nosotros-page__role">CEO de Inspira Recursos Humanos</p>
              <p className="t-body">
                <strong>Licenciado en Psicología</strong> en la Universidad de Buenos Aires
              </p>
              <p className="t-body">
                <strong>Maestría de Recursos Humanos</strong> en la Universidad de San Andrés
              </p>
              <p className="t-body nosotros-page__bio">
                Amplia trayectoria en capacitaciones de líderes de empresas, búsqueda y...
              </p>
              {/* Span, no button: en el original tampoco lleva a ningún lado (ver TODO arriba) */}
              <span className="btn btn--secondary btn--md" aria-hidden="true">
                Conocé más sobre Federico
              </span>
            </div>
          </div>
        </div>

        <div className="nosotros-page__actions">
          <Button to="/" variant="secondary" size="md">
            Volver a la home
          </Button>
          <Button href="/#contacto" variant="primary" size="md">
            Conversemos
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Nosotros
