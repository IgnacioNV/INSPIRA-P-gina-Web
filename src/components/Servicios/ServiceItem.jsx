import './ServiceItem.css'

const ServiceItem = ({ title, description, isActive, onServiceTap }) => {
  return (
    <div
      className={`service-item ${isActive ? 'active' : ''}`}
      onClick={onServiceTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onServiceTap()
        }
      }}
    >
      <div className="service-header">
        <h3 className="service-title">{title}</h3>
        <span className="service-indicator" aria-hidden="true">+</span>
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
