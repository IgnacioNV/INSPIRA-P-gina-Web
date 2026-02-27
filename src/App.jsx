import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Servicios from './components/Servicios/Servicios'
import Clientes from './components/Clientes/Clientes'
import Testimonios from './components/Testimonios/Testimonios'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Clientes />
        <Testimonios />
        <section id="novedades" aria-label="Novedades" />
        <section id="nosotros" aria-label="Nosotros" />
        <section id="contacto" aria-label="Contacto" />
      </main>
    </>
  )
}

export default App
