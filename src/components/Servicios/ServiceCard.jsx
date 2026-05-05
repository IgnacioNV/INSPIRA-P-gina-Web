import './ServiceCard.css'

const ServiceCard = ({ title, description, image }) => {
  return (
    <article className="service-card">
      <div className="service-card__image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
        <span className="service-card__link">
          Leer más
          <span className="service-card__arrow">›</span>
        </span>
      </div>
    </article>
  )
}

export default ServiceCard
