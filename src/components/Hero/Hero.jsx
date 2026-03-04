import Logo from '../Logo/Logo'
import './Hero.css'

function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <Logo variant="dark" className="logo-inspira--hero" />
        <h1 className="hero__title" id="hero-title">
          Consultoría en Recursos Humanos
        </h1>
        <p className="hero__subtitle">
          Acompañamos a personas y equipos a ordenar, decidir y crecer.
        </p>
      </div>
    </section>
  )
}

export default Hero
