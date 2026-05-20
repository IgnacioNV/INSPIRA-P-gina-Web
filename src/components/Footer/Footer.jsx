import { useState } from 'react'
import './Footer.css'
import Logo from '../Logo/Logo'

const Footer = () => {
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('submitting')
    setTimeout(() => {
      setFormStatus('success')
      e.target.reset()
      setTimeout(() => setFormStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <footer className="footer">
      <section className="footer-contact" id='contacto'>
        <div className="footer-container">
          <div className="contact-content">
            <div className="contact-text">
              <p>Te invitamos a que nos escribas a</p>
              <a href="mailto:info@inspira.ar" className="contact-email">
                info@inspira.ar
              </a>
              <p>ante cualquier duda o consulta.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre" className="sr-only">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Nombre*"
                  required
                  className="form-input"
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="organizacion" className="sr-only">Organización</label>
                <input
                  id="organizacion"
                  type="text"
                  name="organizacion"
                  placeholder="Organización"
                  className="form-input"
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  className="form-input"
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mensaje" className="sr-only">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Mensaje"
                  rows="4"
                  className="form-input form-textarea"
                  disabled={formStatus === 'submitting'}
                ></textarea>
              </div>
              
              <button type="submit" className="contact-button" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Enviando...' : formStatus === 'success' ? '¡Enviado!' : 'Hablemos'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="footer-divider"></div>

      <section className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <Logo variant="dark" />
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Mapa del sitio</h4>
              <nav className="footer-nav">
                <ul className="footer-links">
                  <li><a href="#servicios">Servicios</a></li>
                  <li><a href="#clientes">Clientes</a></li>
                  <li><a href="#novedades">Novedades</a></li>
                  <li><a href="#nosotros">Nosotros</a></li>
                  <li><a href="#contacto">Contacto</a></li>
                </ul>
              </nav>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Ubicación</h4>
              <div className="location-content">
                <div className="location-map">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.763424658241!2d-58.43000152350437!3d-34.581305956316186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb585486c453f%3A0xad6967057634cdb!2sGodoy%20Cruz%202449%2C%20C1056ABA%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e1!3m2!1ses!2sar!4v1772423455209!5m2!1ses!2sar" 
                    width="100%" 
                    height="120" 
                    style={{border: 0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Inspira - Godoy Cruz 2449, Buenos Aires"
                  ></iframe>
                </div>
                <address className="location-address">
                  Godoy Cruz 2449<br />
                  Oficina 108<br />
                  Buenos Aires, Argentina
                </address>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Seguinos en nuestras redes</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/inspira.ar/" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/inspira-recursos-humanos/posts/?feedView=all" aria-label="LinkedIn" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-copyright">
        <div className="footer-container">
          <p>Copyright © 2025 Inspira – Todos los derechos reservados.</p>
        </div>
      </section>
    </footer>
  )
}

export default Footer
