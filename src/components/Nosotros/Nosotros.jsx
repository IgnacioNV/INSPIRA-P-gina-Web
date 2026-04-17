import './Nosotros.css'

function Nosotros() {
  return (
    <section className="nosotros" id='nosotros'>
      <div className="nosotros-pattern" />
      <div className="nosotros-container">
        <div className="section-header">
          <h2 className="section-title">NOSOTROS</h2>
        </div>

        <div className="nosotros-texto-institucional">
          <p>
            En <b>Inspira Recursos Humanos</b> acompañamos a organizaciones, equipos y líderes en sus procesos de desarrollo, ofreciendo servicios de selección de personal, evaluaciones psicotécnicas, capacitación y coaching. Trabajamos con una mirada profesional, cercana y personalizada, buscando comprender en profundidad cada contexto para diseñar propuestas que resulten útiles, aplicables y valiosas.
            <br /><br />El nombre Inspira expresa parte central de nuestra identidad. Inspirar es ayudar a que otros puedan detenerse, reflexionar, ampliar su mirada, crear soluciones e implementarlas con sentido. También remite a la pausa y a la respiración: a ese espacio necesario para pensar con mayor claridad, conectar ideas y habilitar nuevas posibilidades. 
            <br /><br />Desde esa convicción, promovemos intervenciones que combinan solidez técnica, sensibilidad humana y foco en el desarrollo real de las personas y las organizaciones.

          </p>
        </div>

        <div className="nosotros-subtitulo">
          <p>Escuchemos la palabra de <strong>Federico Núñez</strong></p>
        </div>

        <div className="nosotros-contenido-principal">
          <div className="nosotros-video">
            <div className="video-play-button">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect width="60" height="60" fill="white" rx="4"/>
                <path d="M23 18L40 30L23 42V18Z" fill="#333"/>
              </svg>
            </div>
          </div>

          <div className="nosotros-perfil-card">
            <div className="perfil-imagen">
              <img src="/nosotros/imagen-fede.png" alt="Federico Núñez" />
            </div>
            <div className="perfil-contenido">
              <h3 className="perfil-nombre">Mg. Federico Martín Núñez</h3>
              <p className="perfil-cargo">CEO de Inspira Recursos Humanos</p>
              <p className="perfil-formacion">
                <span className="titulo-destacado">Licenciado en Psicología</span> en la Universidad de Buenos Aires
              </p>
              <p className="perfil-formacion">
                <span className="titulo-destacado">Maestría de Recursos Humanos</span> en la Universidad de San Andrés
              </p>
              <p className="perfil-descripcion">
                Amplia trayectoria en capacitaciones de líderes de empresas, búsqueda y...
              </p>
              <button className="perfil-boton">Conoce más sobre Federico</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Nosotros