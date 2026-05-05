import { useFadeIn } from '../../hooks/useFadeIn'
import './Clientes.css'

const Clientes = () => {
  const [ref, isVisible] = useFadeIn({ threshold: 0.15 })

  return (
    <section className={`clientes ${isVisible ? 'clientes--visible' : ''}`} id='clientes' ref={ref}>
      <div className="clientes-container">
        <div className="section-header">
          <h2 className="section-title">CLIENTES</h2>
          <p className="section-subtitle">
            Trabajamos con organizaciones que priorizan el desarrollo humano como ventaja competitiva.
          </p>
        </div>

        <div className="clientes-logos">
          <img 
            src="/Clientes - Empresas.png" 
            alt="Empresas clientes que confían en Inspira"
            className="clientes-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Clientes
