import './Novedades.css'

const novedadesData = [
  {
    id: 1,
    titulo: 'Título de la nota',
    descripcion: 'Lorem ipsum dolor sit amet consectetur. Ultrices pellentesque sed tortor gravida nibh pulvinar morbi. Vitae enim a faucibus sapien orci urna suspendisse neque. Convallis enim vestibulum ut aliquam ult...',
    fecha: '11/2/2026',
    imagen: '/novedades/nota-1.svg',
    link: '#'
  },
  {
    id: 2,
    titulo: 'Título de la nota',
    descripcion: 'Lorem ipsum dolor sit amet consectetur. Ultrices pellentesque sed tortor gravida nibh pulvinar morbi. Vitae enim a faucibus sapien orci urna suspendisse neque. Convallis enim vestibulum ut aliquam ult...',
    fecha: '11/2/2026',
    imagen: '/novedades/nota-2.svg',
    link: '#'
  },
  {
    id: 3,
    titulo: 'Título de la nota',
    descripcion: 'Lorem ipsum dolor sit amet consectetur. Ultrices pellentesque sed tortor gravida nibh pulvinar morbi. Vitae enim a faucibus sapien orci urna suspendisse neque. Convallis enim vestibulum ut aliquam ult...',
    fecha: '11/2/2026',
    imagen: '/novedades/nota-3.svg',
    link: '#'
  }
]

const Novedades = () => {
  return (
    <section className="novedades" id='novedades'>
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

        <div className="novedades-footer">
          <a href="#" className="ver-mas-link">Ver más notas</a>
        </div>
      </div>
    </section>
  )
}

export default Novedades