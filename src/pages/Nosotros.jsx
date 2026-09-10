import { useEffect } from 'react'
import Button from '../components/ui/Button'
import './ServiceDetail.css'

/*
 * STUB de la pagina Nosotros.
 * El wireframe v1 no pone "Nosotros" como seccion de la home: es su propia pagina.
 * TODO(nosotros): portar el copy institucional + bio de Fede que hoy vive en
 * src/components/Nosotros/Nosotros.jsx, reestilado con los tokens nuevos,
 * y sumar el video cuando haya asset.
 */
function Nosotros() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="service-detail u-container" id="nosotros">
      <p className="t-overline service-detail__eyebrow">Nosotros</p>
      <h1 className="t-h1">Quiénes somos</h1>

      <div className="service-detail__todo">
        <p className="t-body-strong">Página en construcción</p>
        <p className="t-body">
          TODO(nosotros): copy institucional, equipo y bio de Federico Núñez
          (el borrador ya existe en el repo).
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

export default Nosotros
