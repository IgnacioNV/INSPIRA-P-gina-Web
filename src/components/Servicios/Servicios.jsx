import { useState, useEffect, useRef } from 'react'
import ServiceItem from './ServiceItem'
import './Servicios.css'

const serviciosData = [
  {
    id: 1,
    title: 'Búsqueda y Selección',
    description:
      'Nos especializamos en la identificación y captación de los mejores talentos para tu organización.',
    image: '/servicios-busqueda.svg'
  },
  {
    id: 2,
    title: 'Capacitaciones',
    description:
      'Diseñamos programas de formación personalizados que potencian las competencias de tu equipo.',
    image: '/servicios-capacitaciones.svg'
  },
  {
    id: 3,
    title: 'Coaching',
    description:
      'Acompañamos a líderes y equipos en su desarrollo profesional y personal.',
    image: '/servicios-coaching.svg'
  },
  {
    id: 4,
    title: 'Evaluaciones psicotécnicas',
    description:
      'Implementamos herramientas de evaluación psicológica y técnica de última generación.',
    image: '/servicios-evaluaciones.svg'
  },
  {
    id: 5,
    title: 'Consultoría en RRHH',
    description:
      'Ofrecemos asesoría estratégica integral en gestión de recursos humanos.',
    image: '/servicios-consultoria.svg'
  }
]

const Servicios = () => {
  const [activeService, setActiveService] = useState(1)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      // Definimos cuándo empieza y termina la animación
      const start = viewportHeight * 0.3
      const end = viewportHeight * 0.7

      // Si la sección todavía no llegó o ya pasó, no animamos
      if (rect.top > end || rect.bottom < start) return

      const totalScrollable = sectionHeight - (end - start)
      const currentScroll = start - rect.top

      const scrollProgress = Math.max(
        0,
        Math.min(1, currentScroll / totalScrollable)
      )

      const serviceIndex = Math.floor(
        scrollProgress * serviciosData.length
      )

      const newActiveService = Math.min(
        serviciosData.length,
        Math.max(1, serviceIndex + 1)
      )

      if (newActiveService !== activeService) {
        setActiveService(newActiveService)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeService])

  return (
    <section className="servicios" id='servicios' ref={sectionRef}>
      <div className="servicios-container">
        <div className="servicios-header">
          <h2 className="servicios-title">SERVICIOS</h2>
          <p className="servicios-subtitle">
            Soluciones integrales en gestión de talento humano
          </p>
        </div>

        <div className="servicios-content">
          <div className="servicios-list">
            {serviciosData.map((servicio) => (
              <ServiceItem
                key={servicio.id}
                title={servicio.title}
                description={servicio.description}
                isActive={activeService === servicio.id}
              />
            ))}
          </div>

          <div className="servicios-image">
            <div className="image-container">
              <img
                src={serviciosData[activeService - 1].image}
                alt={serviciosData[activeService - 1].title}
                className="service-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Servicios
