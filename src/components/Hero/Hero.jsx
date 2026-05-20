import { useEffect, useState } from 'react'
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

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
        <h1 className="hero__title" id="hero-title">
          El talento no se encuentra.<br />Se construye.
        </h1>
        <p className="hero__subtitle">
          Acompañamos a líderes y organizaciones a transformar su cultura desde adentro.
        </p>
        <a
          href="#contacto"
          className="hero__cta"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          Conversemos
        </a>
      </div>
    </section>
  )
}

export default Hero
