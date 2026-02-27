import './Testimonios.css'

const testimoniosData = [
  {
    id: 1,
    nombre: 'Nachito Núñez',
    rol: 'Diseñador y Programador Front-End',
    texto: '"No es un servicio genérico: escuchan, se involucran,"',
    avatar: '/testimonios/primer-testimonio.png'
  },
  {
    id: 2,
    nombre: 'Martín Alejandro Ferreyra',
    rol: 'Gerente de Recursos Humanos – Laboratorios Andina S.A.',
    texto: '"INSPIRA entiende a las personas y a la cultura de las organización."',
    avatar: '/testimonios/segundo-testimonio.png'
  },
  {
    id: 3,
    nombre: 'Javier Nicolás Montoya',
    rol: 'Director de Capital Humano – BioPharma Río de la Plata',
    texto: '"Mirada senior, trato cercano y soluciones concretas."',
    avatar: '/testimonios/tercer-testimonio.png'
  }
]

const Testimonios = () => {
  return (
    <section className="testimonios">
      <div className="testimonios-container">
        <div className="section-header">
          <h2 className="section-title">TESTIMONIOS</h2>
          <p className="section-subtitle">
            Lo que cambia cuando el trabajo se hace con propósito y criterio.
          </p>
        </div>

        <div className="testimonios-wrapper">
          <div className="testimonios-grid">
            {testimoniosData.map((testimonio) => (
              <div key={testimonio.id} className="testimonio-card">
                <img 
                  src={testimonio.avatar}
                  alt={testimonio.nombre}
                  className="testimonio-avatar"
                />
                <h3 className="testimonio-nombre">{testimonio.nombre}</h3>
                <p className="testimonio-rol">{testimonio.rol}</p>
                <p className="testimonio-texto">{testimonio.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonios