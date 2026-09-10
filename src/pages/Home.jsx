import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/home/Hero'
import Pillars from '../components/home/Pillars'
import SocialProof from '../components/home/SocialProof'
import Services from '../components/home/Services'
import FinalCta from '../components/home/FinalCta'
import { scrollToId } from '../lib/goToHash'

function Home() {
  const { state } = useLocation()

  // Llega desde otra ruta pidiendo scroll a una seccion
  useEffect(() => {
    if (state?.scrollTo) {
      requestAnimationFrame(() =>
        scrollToId(state.scrollTo, state.focus ? { focus: state.focus } : undefined),
      )
    }
  }, [state])

  return (
    <>
      <Hero />
      <Pillars />
      <SocialProof />
      <Services />
      <FinalCta />
    </>
  )
}

export default Home
