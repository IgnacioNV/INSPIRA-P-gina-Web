import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import Nosotros from './pages/Nosotros'

function App() {
  return (
    <>
      <a href="#contenido" className="u-skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios/:slug" element={<ServiceDetail />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
