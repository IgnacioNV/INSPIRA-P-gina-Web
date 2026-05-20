import { useState } from 'react'
import { useFadeIn } from '../../hooks/useFadeIn'
import './Novedades.css'

const novedadesData = [
  {
    id: 1,
    titulo: 'Liderazgo situacional: por qué un solo estilo nunca alcanza',
    descripcion: 'Los líderes más efectivos no tienen un único modo de conducción. Aprenden a leer el nivel de madurez de cada colaborador y adaptan su enfoque. En este artículo exploramos los cuatro estilos del modelo y cómo aplicarlos en tu equipo.',
    fecha: '15/4/2025',
    imagen: '/novedades/nota-1.svg',
    link: '#'
  },
  {
    id: 2,
    titulo: 'Cómo diseñar una entrevista por competencias que realmente prediga el desempeño',
    descripcion: 'Las preguntas genéricas no sirven. La entrevista por competencias parte de comportamientos concretos del pasado para inferir conductas futuras. Te compartimos el modelo STAR y cómo construir una guía de entrevista sólida.',
    fecha: '2/3/2025',
    imagen: '/novedades/nota-2.svg',
    link: '#'
  },
  {
    id: 3,
    titulo: 'Cultura organizacional: el activo invisible que más impacta en la retención',
    descripcion: 'Las personas no renuncian a empresas, renuncian a culturas. Analizamos los factores culturales que más inciden en la decisión de quedarse o irse, y qué pueden hacer los líderes para intervenir con criterio.',
    fecha: '18/1/2025',
    imagen: '/novedades/nota-3.svg',
    link: '#'
  }
]

const Novedades = () => {
  const [ref, isVisible] = useFadeIn({ threshold: 0.1 })
  const [activeDot, setActiveDot] = useState(0)

  const handleScroll = (e) => {
    const container = e.target
    const scrollLeft = container.scrollLeft
    const cardWidth = container.querySelector('.novedad-card')?.offsetWidth || 0
    const gap = 16
    const index = Math.round(scrollLeft / (cardWidth + gap))
    setActiveDot(Math.min(index, novedadesData.length - 1))
  }

  return (
    <section className={`novedades ${isVisible ? 'novedades--visible' : ''}`} id='novedades' ref={ref}>
      <div className="novedades-pattern" />
      <div className="novedades-container">
        <div className="section-header">
          <h2 className="section-title">NOVEDADES</h2>
        </div>

        <div className="novedades-grid">
          {novedadesData.map((novedad) => (
            <article key={novedad.id} className="novedad-card">
              <div className="novedad-imagen">
                <img 
                  src={novedad.imagen}
                  alt={novedad.titulo}
                  loading="lazy"
                />
              </div>
              <div className="novedad-contenido">
                <h3 className="novedad-titulo">{novedad.titulo}</h3>
                <p className="novedad-descripcion">{novedad.descripcion}</p>
                <p className="novedad-fecha">Publicado el {novedad.fecha}</p>
                <a href={novedad.link} className="novedad-link">Ver nota</a>
              </div>
            </article>
          ))}
        </div>

        <div
          className="novedades-scroll"
          onScroll={handleScroll}
        >
          {novedadesData.map((novedad) => (
            <article key={novedad.id} className="novedad-card">
              <div className="novedad-imagen">
                <img 
                  src={novedad.imagen}
                  alt={novedad.titulo}
                  loading="lazy"
                />
              </div>
              <div className="novedad-contenido">
                <h3 className="novedad-titulo">{novedad.titulo}</h3>
                <p className="novedad-descripcion">{novedad.descripcion}</p>
                <p className="novedad-fecha">Publicado el {novedad.fecha}</p>
                <a href={novedad.link} className="novedad-link">Ver nota</a>
              </div>
            </article>
          ))}
        </div>

        <div className="novedades-dots" role="tablist" aria-label="Novedades">
          {novedadesData.map((_, i) => (
            <button
              key={i}
              className={`novedad-dot ${activeDot === i ? 'novedad-dot--active' : ''}`}
              onClick={() => {
                const container = document.querySelector('.novedades-scroll')
                const cardWidth = container.querySelector('.novedad-card')?.offsetWidth || 0
                const gap = 16
                container.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' })
                setActiveDot(i)
              }}
              role="tab"
              aria-selected={activeDot === i}
              aria-label={`Nota ${i + 1}`}
            />
          ))}
        </div>

        <div className="novedades-footer">
          <a href="#" className="ver-mas-link">Ver más notas</a>
          <a href="#" className="ver-mas-button">Ver más notas</a>
        </div>
      </div>
    </section>
  )
}

export default Novedades
