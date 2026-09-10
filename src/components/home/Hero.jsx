import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import ArcPattern from '../ui/ArcPattern'
import { makeHashHandler } from '../../lib/goToHash'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const conversemos = makeHashHandler(navigate, pathname, 'contacto', { focus: 'nombre' })

  return (
    <section id="inicio" className="hero" data-surface="dark" aria-labelledby="hero-title">
      {/*
        TODO(foto-hero): cuando haya una foto real propia (gente en una
        capacitacion o un momento de coaching — NO banco de imagenes, NO posado
        corporativo), ir a hero.css y setear:
            .hero { --hero-photo: url("/hero/<archivo>"); }
        La capa .hero__photo y el overlay navy ya estan listos.
        Mientras tanto el hero se resuelve con navy + patron + tipografia.
      */}
      <div className="hero__photo" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <ArcPattern variant="crema-navy" fade="up" scale={260} className="hero__pattern" />

      <div className="hero__content u-container">
        <Logo tone="white" className="hero__logo" />

        {/* TODO(copy): headline BORRADOR — revisar con Fede. Corto, sobre vinculo/personas. */}
        <h1 id="hero-title" className="hero__title t-display">
          Todo empieza por una conversación
        </h1>

        <Button
          size="lg"
          variant="primary"
          href="/#contacto"
          onClick={conversemos}
          className="hero__cta"
        >
          Conversemos
        </Button>
      </div>
    </section>
  )
}

export default Hero
