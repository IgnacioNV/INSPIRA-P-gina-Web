import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import ArcPattern from '../ui/ArcPattern'
import { makeHashHandler } from '../../lib/goToHash'
import './Hero.css'

// TODO(copy): confirmar con Fede los 3 (o más) datos de esta fila.
const HIGHLIGHTS = [
  'Más de 10 años de experiencia en el rubro',
  'Desarrollando líderes',
  'Consultoría de RRHH',
]

function Hero() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const conversemos = makeHashHandler(navigate, pathname, 'contacto', { focus: 'nombre' })

  return (
    <section id="inicio" className="hero" data-surface="dark" aria-labelledby="hero-title">
      <div className="hero__photo" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <ArcPattern variant="crema-navy" fade="up" scale={260} className="hero__pattern" />

      <div className="hero__content u-container">
        <Logo tone="white" className="hero__logo" />

        <h1 id="hero-title" className="hero__title t-display">
          Creemos que todo empieza por{' '}
          <span className="hero__title-break">una conversación</span>
        </h1>

        <p className="hero__lead">Desarrollamos líderes de empresas</p>

        <Button
          size="lg"
          variant="primary"
          href="/#contacto"
          onClick={conversemos}
          className="hero__cta"
        >
          Conversemos
        </Button>

        <ul className="hero__highlights">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="hero__highlight">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero
