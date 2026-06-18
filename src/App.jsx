import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Servicios from './components/Servicios/Servicios'
import Clientes from './components/Clientes/Clientes'
// Ocultas temporalmente hasta completar contenido. No borrar.
// import Testimonios from './components/Testimonios/Testimonios'
// import Novedades from './components/Novedades/Novedades'
import Nosotros from './components/Nosotros/Nosotros'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Clientes />
        {/* Ocultas temporalmente hasta completar contenido. No borrar. */}
        {/* <Testimonios /> */}
        {/* <Novedades /> */}
        <Nosotros />
      </main>
      <Footer />
    </>
  )
}

export default App
