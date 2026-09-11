import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { SERVICES } from '../../data/services'
import './Footer.css'

/*
 * Footer — estructura ya validada en la auditoria. Solo se reaplico
 * la paleta / tipografia nueva. El formulario de contacto vive aca
 * (id="contacto", input id="nombre") y postea a /api/contacto (Resend).
 *
 * TODO(contacto): confirmar con Fede email / direccion / redes antes de publicar.
 */
function Footer() {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    const form = e.target
    const data = {
      nombre: form.nombre.value,
      organizacion: form.organizacion.value,
      email: form.email.value,
      mensaje: form.mensaje.value,
    }
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setErrorMsg('Hubo un problema al enviar el mensaje. Probá de nuevo en un momento.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('No se pudo conectar con el servidor. Probá de nuevo en un momento.')
    }
  }

  return (
    <footer className="footer" data-surface="dark">
      <section className="footer__contact" id="contacto">
        <div className="footer__contact-inner u-container">
          <div className="footer__contact-text">
            <h2 className="t-h2">Conversemos sobre tu próximo paso</h2>
            <p className="t-body">
              Escribinos a{' '}
              {/* TODO(contacto): confirmar email */}
              <a href="mailto:info@inspira.ar" className="footer__email">
                info@inspira.ar
              </a>{' '}
              o dejanos un mensaje.
            </p>
          </div>

          <form className="footer__form" onSubmit={handleSubmit} noValidate>
            <div className="footer__field">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" required autoComplete="name"
                disabled={status === 'submitting'} />
            </div>
            <div className="footer__field">
              <label htmlFor="organizacion">Organización</label>
              <input id="organizacion" name="organizacion" type="text" autoComplete="organization"
                disabled={status === 'submitting'} />
            </div>
            <div className="footer__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                disabled={status === 'submitting'} />
            </div>
            <div className="footer__field">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="4" disabled={status === 'submitting'} />
            </div>

            <p
              className="footer__form-msg"
              role="status"
              aria-live="polite"
              data-state={status}
            >
              {status === 'error' && errorMsg}
              {status === 'success' && '¡Mensaje enviado! Te respondemos a la brevedad.'}
            </p>

            <button
              type="submit"
              className="btn btn--primary btn--lg footer__submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </section>

      <div className="footer__main">
        <div className="footer__main-inner u-container">
          <div className="footer__col footer__col--brand">
            <Link to="/" aria-label="Inspira — Ir al inicio">
              <Logo tone="white" />
            </Link>
          </div>

          <nav className="footer__col" aria-label="Mapa del sitio">
            <h3 className="footer__col-title t-overline">Mapa del sitio</h3>
            <ul className="footer__links">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/servicios/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link to="/busquedas">Búsquedas/CV</Link>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__col-title t-overline">Dónde estamos</h3>
            {/* TODO(contacto): confirmar direccion */}
            <address className="footer__address t-body">
              Godoy Cruz 2449, Oficina 108
              <br />
              Buenos Aires, Argentina
            </address>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title t-overline">Seguinos</h3>
            {/* TODO(contacto): confirmar redes */}
            <div className="footer__social">
              <a
                href="https://www.instagram.com/inspira.ar/"
                aria-label="Instagram de Inspira"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/inspira-recursos-humanos/"
                aria-label="LinkedIn de Inspira"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__legal">
        <div className="u-container">
          <p className="t-caption">
            © {new Date().getFullYear()} Inspira Recursos Humanos — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
