import './ServiceItem.css'

const ServiceItem = ({ title, description, isActive }) => {
  return (
    <div className={`service-item ${isActive ? 'active' : ''}`}>
      <div className="service-header">
        <h3 className="service-title">{title}</h3>
      </div>
      
      <div className="service-content">
        <p className="service-description">{description}</p>
        <div className="service-link">
          <span>Leer más</span>
          <span className="arrow">→</span>
        </div>
      </div>
    </div>
  )
}

export default ServiceItem