import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/home/Hero'
import SocialProof from '../components/home/SocialProof'
import Services from '../components/home/Services'
import FinalCta from '../components/home/FinalCta'
import { scrollToId } from '../lib/goToHash'

function Home() {
  const { state } = useLocation()

  // Llega desde otra ruta pidiendo scroll a una seccion. React Router no
  // resetea el scroll en un push normal, así que Home puede montar en
  // cualquier scrollY heredado de la ruta anterior — desde ahí la animación
  // hacia la sección quedaba corta o directamente parecía un salto. Se
  // resetea a top (instantáneo) antes de animar, así siempre se ve recorrer
  // la página entera.
  useEffect(() => {
    if (state?.scrollTo) {
      window.scrollTo(0, 0)
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          scrollToId(state.scrollTo, state.focus ? { focus: state.focus } : undefined),
        ),
      )
    }
  }, [state])

  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <FinalCta />
    </>
  )
}

export default Home
