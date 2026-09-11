import lockupNavy from '../../assets/logo/inspira-lockup-navy.svg'
import lockupWhite from '../../assets/logo/inspira-lockup-white.svg'
import isotipo from '../../assets/logo/inspira-isotipo.svg'
import './Logo.css'

/**
 * Logo Inspira. Archivos oficiales, sin recolorear.
 * Regla del manual: texto Navy sobre fondo claro, texto Blanco sobre fondo oscuro.
 * El isotipo (naranja) no cambia.
 *
 * @param {'navy'|'white'} tone   color del wordmark segun el fondo
 * @param {'lockup'|'isotipo'} kind
 */
const SRC = {
  'lockup-navy': lockupNavy,
  'lockup-white': lockupWhite,
  isotipo,
}

function Logo({ tone = 'navy', kind = 'lockup', className = '' }) {
  const src = kind === 'isotipo' ? SRC.isotipo : SRC[`lockup-${tone}`]
  return (
    <img
      src={src}
      alt="Inspira"
      className={`logo logo--${kind} ${className}`.trim()}
      width={kind === 'isotipo' ? 40 : 132}
      height={kind === 'isotipo' ? 35 : 38}
      draggable="false"
    />
  )
}

export default Logo
