import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="servicios" aria-label="Servicios" />
        <section id="clientes" aria-label="Clientes" />
        <section id="novedades" aria-label="Novedades" />
        <section id="nosotros" aria-label="Nosotros" />
        <section id="contacto" aria-label="Contacto" />
      </main>
    </>
  )
}

export default App
