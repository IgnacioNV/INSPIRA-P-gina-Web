import './Clientes.css'

const Clientes = () => {
  return (
    <section className="clientes" id='clientes'>
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
          />
        </div>
      </div>
    </section>
  )
}

export default Clientes