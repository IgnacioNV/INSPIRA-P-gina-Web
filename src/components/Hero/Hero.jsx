import { useEffect, useState } from 'react'
import Logo from '../Logo/Logo'
import './Hero.css'

function Hero() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true))
    })
    return () => {}
  }, [])

  const handleConversemos = (e) => {
    e.preventDefault()
    const contacto = document.getElementById('contacto')
    const nombre = document.getElementById('nombre')

    if (!contacto || !nombre) return

    // Scroll instantáneo para que el focus no se cancele durante la animación
    contacto.scrollIntoView({ behavior: 'instant', block: 'start' })

    // Focus inmediato después del scroll instantáneo
    requestAnimationFrame(() => {
      nombre.focus()
    })
  }

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
        <Logo variant="dark" className="logo-inspira--hero" />
        <h1 className="hero__title" id="hero-title">
          Consultoría en Recursos Humanos
        </h1>
        <p className="hero__subtitle">
          Desarrollamos líderes y equipos que transforman organizaciones.
        </p>
        <a
          href="#contacto"
          className="hero__cta"
          onClick={handleConversemos}
        >
          Conversemos
        </a>
      </div>
    </section>
  )
}

export default Hero
