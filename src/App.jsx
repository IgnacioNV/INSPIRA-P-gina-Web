import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import Nosotros from './pages/Nosotros'
import Busquedas from './pages/Busquedas'
import FormUp from './pages/FormUp'

/*
 * Chrome del sitio (navbar + footer). /formup queda afuera a propósito:
 * es una ruta oculta (sin link en el menú ni en ningún sitemap) y no debe
 * exponer la navegación completa del sitio.
 */
function SiteLayout() {
  return (
    <>
      <a href="#contenido" className="u-skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/formup" element={<FormUp />} />
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios/:slug" element={<ServiceDetail />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/busquedas" element={<Busquedas />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
