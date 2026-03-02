import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Servicios from './components/Servicios/Servicios'
import Clientes from './components/Clientes/Clientes'
import Testimonios from './components/Testimonios/Testimonios'
import Novedades from './components/Novedades/Novedades'
import Nosotros from './components/Nosotros/Nosotros'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Clientes />
        <Testimonios />
        <Novedades />
        <Nosotros />
        <section id="contacto" aria-label="Contacto" />
      </main>
    </>
  )
}

export default App
