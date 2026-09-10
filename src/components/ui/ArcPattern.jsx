import { useId } from 'react'
import './ArcPattern.css'

/*
 * Patron grafico Inspira — motivo de arcos alternados (V / ∩).
 * Silueta trazada del tile oficial del Manual de Marca v1.2 §04
 * (un unico tile fuente de 243 x 181; match ~99.5% con el archivo del manual).
 *
 * TODO(patron): el manual deja abierta la regla de cobertura para tiling
 * vertical / fondo completo. Hoy se usa como banda horizontal en bordes de
 * seccion, con degradado de opacidad (stops 10 · 30 · 60 · 80 · 100 %).
 *
 * @param {'durazno-crema'|'navy-crema'|'crema-navy'} variant
 * @param {'up'|'down'|'none'} fade  direccion del degradado de opacidad
 * @param {number} scale   tamaño del tile en px de ancho (default 220)
 */
const UNIT_W = 243
const UNIT_H = 181
const D =
  'M30 0 46 0 64 3 73 8 78 14 84 35 84 79 91 121 100 143 116 163 129 149 141 123 148 85 149 31 155 13 166 4 186 0 208 1 220 6 229 17 233 36 233 124 230 137 224 148 216 156 201 164 170 170 62 170 38 166 14 154 5 143 0 128 0 31 2 21 7 11 18 3 30 0 Z'

function ArcPattern({ variant = 'durazno-crema', fade = 'none', scale = 220, className = '' }) {
  const id = useId().replace(/:/g, '')
  const ratio = scale / UNIT_W

  return (
    <div
      className={`arc-pattern arc-pattern--${variant} arc-pattern--fade-${fade} ${className}`.trim()}
      aria-hidden="true"
    >
      <svg className="arc-pattern__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`arc-${id}`}
            patternUnits="userSpaceOnUse"
            width={UNIT_W * ratio}
            height={UNIT_H * ratio}
            patternTransform={`scale(${ratio})`}
          >
            <path d={D} className="arc-pattern__shape" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#arc-${id})`} />
      </svg>
    </div>
  )
}

export default ArcPattern
