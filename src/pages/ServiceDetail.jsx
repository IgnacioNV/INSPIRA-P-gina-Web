import { useEffect } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { SERVICES } from '../data/services'
import './ServiceDetail.css'

/*
 * STUB de pagina interna de servicio.
 * TODO(servicios): aca va el copy tecnico completo de cada linea
 * (Coaching / Seleccion / Capacitaciones / Psicotecnicos), casos, metodologia, etc.
 * Por ahora solo confirma que la ruta existe y linkea de vuelta a la home.
 */
function ServiceDetail() {
  const { slug } = useParams()
  const service = SERVICES.find((s) => s.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!service) return <Navigate to="/" replace />

  return (
    <div className="service-detail u-container">
      <p className="t-overline service-detail__eyebrow">Servicios</p>
      <h1 className="t-h1">{service.name}</h1>
      <p className="t-body service-detail__hook">{service.hook}</p>

      <div className="service-detail__todo">
        {/* Visible a proposito hasta que carguemos el contenido real */}
        <p className="t-body-strong">Página en construcción</p>
        <p className="t-body">
          El contenido completo de {service.name.toLowerCase()} todavía no está cargado.
          <br />
          TODO(servicios): copy técnico, metodología, casos.
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

      <nav className="service-detail__siblings" aria-label="Otros servicios">
        {SERVICES.filter((s) => s.slug !== slug).map((s) => (
          <Link key={s.slug} to={`/servicios/${s.slug}`}>
            {s.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default ServiceDetail
