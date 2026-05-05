import { useState, useEffect, useRef, useCallback } from 'react'
import ServiceItem from './ServiceItem'
import ServiceCard from './ServiceCard'
import { throttle } from '../../utils/throttle'
import { useFadeIn } from '../../hooks/useFadeIn'
import { useIsMobile } from '../../hooks/useIsMobile'
import './Servicios.css'

const serviciosData = [
  {
    id: 1,
    title: 'Búsqueda y Selección',
    description:
      'Acompañamos a las organizaciones en la búsqueda e incorporación de personas alineadas con el puesto, la cultura y los objetivos del negocio. Trabajamos cada proceso de forma personalizada, comprendiendo la posición, evaluando con criterio y presentando candidatos con competencias técnicas y humanas para aportar valor e integrarse al equipo.',
    image: '/servicios/servicios-busqueda.jpg'
  },
  {
    id: 2,
    title: 'Capacitaciones',
    description:
      'En Inspira entendemos la capacitación como un espacio para reflexionar, adquirir herramientas y abrir nuevas posibilidades de acción. Diseñamos propuestas a medida, enfocadas en las necesidades reales de cada cliente, buscando que el aprendizaje se traduzca en mejores prácticas, vínculos más efectivos y mayor impacto en el trabajo cotidiano.',
    image: '/servicios/servicios-capacitaciones.jpg'
  },
  {
    id: 3,
    title: 'Coaching',
    description:
      'En Inspira concebimos el coaching como un espacio de reflexión que permite comprender lo que una persona atraviesa en su trabajo, reconocer recursos y desarrollar nuevas formas de actuar. Acompañamos procesos orientados a fortalecer liderazgo, comunicación y desarrollo profesional, con enfoque personalizado conectado con desafíos del rol.',
    image: '/servicios/servicios-coaching.jpg'
  },
  {
    id: 4,
    title: 'Evaluaciones psicotécnicas',
    description:
      'Realizamos evaluaciones psicotécnicas para apoyar procesos de selección y decisiones de desarrollo, aportando una mirada profesional sobre el perfil y su adecuación al rol. Trabajamos cada caso de forma contextualizada, considerando competencias, función y organización, ofreciendo información clara y útil para decisiones más sólidas.',
    image: '/servicios/servicios-evaluacionespsi.jpg'
  },
]

const Servicios = () => {
  const isMobileView = useIsMobile(768)
  const [activeService, setActiveService] = useState(1)
  const sectionRef = useRef(null)
  const [ref, isVisible] = useFadeIn({ threshold: 0.1 })
  const activeServiceRef = useRef(1)

  useEffect(() => {
    activeServiceRef.current = activeService
  }, [activeService])

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || isMobileView) return

    const section = sectionRef.current
    const rect = section.getBoundingClientRect()
    const sectionHeight = section.offsetHeight
    const viewportHeight = window.innerHeight

    const start = viewportHeight * 0.3
    const end = viewportHeight * 0.7

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

    if (newActiveService !== activeServiceRef.current) {
      setActiveService(newActiveService)
    }
  }, [isMobileView])

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16)
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  const handleServiceTap = (id) => {
    setActiveService(id)
  }

  const displayIndex = activeService - 1

  return (
    <section
      className={`servicios ${isVisible ? 'servicios--visible' : ''} ${isMobileView ? 'servicios--mobile' : ''}`}
      id='servicios'
      ref={(node) => {
        sectionRef.current = node
        ref.current = node
      }}
    >
      <div className="servicios-pattern" />
      <div className="servicios-container">
        <div className="servicios-header">
          <h2 className="servicios-title">SERVICIOS</h2>
          <p className="servicios-subtitle">
            Soluciones integrales en gestión de talento humano
          </p>
        </div>

        {isMobileView ? (
          <div className="servicios-cards">
            {serviciosData.map((servicio) => (
              <ServiceCard
                key={servicio.id}
                title={servicio.title}
                description={servicio.description}
                image={servicio.image}
              />
            ))}
          </div>
        ) : (
          <div className="servicios-content">
            <div className="servicios-list">
              {serviciosData.map((servicio) => (
                <ServiceItem
                  key={servicio.id}
                  title={servicio.title}
                  description={servicio.description}
                  isActive={activeService === servicio.id}
                  onServiceTap={() => handleServiceTap(servicio.id)}
                />
              ))}
            </div>

            <div className="servicios-image">
              <div className="image-container">
                <img
                  src={serviciosData[displayIndex].image}
                  alt={serviciosData[displayIndex].title}
                  className="service-image"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Servicios
