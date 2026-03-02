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
            En <strong>Inspira Recursos Humanos</strong> acompañamos a organizaciones y líderes en procesos de 
            desarrollo, transformación y fortalecimiento cultural. Creemos que los resultados sostenibles 
            surgen del modo en que las personas piensan, conversan, deciden y construyen vínculos en 
            contextos reales.
          </p>
          <p>
            El nombre Inspira expresa nuestra esencia. Inspirar es tomar aire: generar energía, calma y 
            claridad para reflexionar antes de actuar. Es también habilitar la creatividad, abrir nuevas 
            miradas y encontrar soluciones que antes no estaban disponibles. Es movilizar, 
            encender en otros la inspiración necesaria para emprender cambios significativos.
          </p>
          <p>
            Trabajamos desde una mirada integradora que combina experiencia en consultoría, coaching 
            ejecutivo y formación de líderes, junto con una sólida base académica desarrollada en espacios 
            como la <strong>Universidad de Palermo</strong> y la <strong>Universidad de San Andrés</strong>.
          </p>
          <p>
            Diseñamos intervenciones a medida —coaching ejecutivo, programas de liderazgo y desarrollo 
            de equipos— con foco en generar impacto real, equilibrando resultados, conciencia y cuidado 
            por las personas.
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