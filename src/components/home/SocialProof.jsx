import { useReveal } from '../../lib/useReveal'
import './SocialProof.css'

/*
 * Prueba social — muro de logos de clientes.
 * Tratamiento unificado: misma caja, escala de grises, hover a color.
 *
 * TODO(logos-clientes): reemplazar los placeholders por los logos reales.
 * Formato sugerido: SVG o PNG con fondo transparente, cargados en /public/clientes/.
 * Rellenar cada entrada con { name, src }. La caja y el tratamiento ya estan listos:
 * no cambia nada de layout al enchufar los archivos.
 */
const LOGOS = Array.from({ length: 12 }, (_, i) => ({
  name: `Cliente ${i + 1}`,
  src: null, // TODO: '/clientes/<archivo>.svg'
}))

function SocialProof() {
  const [ref, visible] = useReveal({ threshold: 0.1 })

  return (
    <section
      id="clientes"
      className="social-proof u-section"
      aria-labelledby="social-proof-title"
      ref={ref}
    >
      <div className="u-container">
        <p className="social-proof__overline t-overline">Confían en nosotros</p>
        <h2 id="social-proof-title" className="t-section-title social-proof__title">
          Organizaciones que eligen a Inspira
        </h2>

        <ul className={`social-proof__grid ${visible ? 'reveal is-visible' : 'reveal'}`}>
          {LOGOS.map((logo) => (
            <li key={logo.name} className="social-proof__cell">
              {logo.src ? (
                <img
                  className="social-proof__logo"
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                />
              ) : (
                <span className="social-proof__placeholder" aria-hidden="true">
                  {/* placeholder neutro — TODO: logo real */}
                  <svg viewBox="0 0 120 40" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="118"
                      height="38"
                      rx="8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <circle cx="26" cy="20" r="7" fill="currentColor" />
                    <rect x="42" y="16" width="52" height="3.5" rx="1.75" fill="currentColor" />
                    <rect x="42" y="24" width="34" height="3.5" rx="1.75" fill="currentColor" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SocialProof
