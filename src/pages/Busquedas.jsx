import { useEffect } from 'react'
import Button from '../components/ui/Button'
import './ServiceDetail.css'

/*
 * STUB de la pagina Búsquedas / CV.
 * TODO(busquedas): listado de búsquedas activas + formulario / mailto para
 * enviar el CV. Confirmar con Fede si el CV va a un email, a un ATS, o a un
 * form propio.
 */
function Busquedas() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="service-detail u-container">
      <p className="t-overline service-detail__eyebrow">Búsquedas / CV</p>
      <h1 className="t-h1">Búsquedas activas</h1>
      <p className="t-body service-detail__hook">
        Sumá tu CV a nuestra base o postulate a una búsqueda abierta.
      </p>

      <div className="service-detail__todo">
        <p className="t-body-strong">Página en construcción</p>
        <p className="t-body">
          TODO(busquedas): listado de búsquedas activas y canal para recibir CVs.
        </p>
      </div>

      <div className="service-detail__actions">
        <Button to="/" variant="secondary" size="md">
          Volver a la home
        </Button>
        <Button href="/#contacto" variant="primary" size="md">
          Conversemos
        </Button>
      </div>
    </div>
  )
}

export default Busquedas
