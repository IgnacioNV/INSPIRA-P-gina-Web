import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Servicios from './components/Servicios/Servicios'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <section id="clientes" aria-label="Clientes" />
        <section id="novedades" aria-label="Novedades" />
        <section id="nosotros" aria-label="Nosotros" />
        <section id="contacto" aria-label="Contacto" />
      </main>
    </>
  )
}

export default App
