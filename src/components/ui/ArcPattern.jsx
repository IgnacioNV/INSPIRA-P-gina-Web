import './ArcPattern.css'

/*
 * Patron grafico Inspira — motivo de arcos alternados (V / ∩).
 * Archivos oficiales de Fede (carpeta "patrones"), no una aproximacion:
 * PNG transparente, tile de 243x181 repetido, con el degradado de opacidad
 * de fabrica del asset (10/30/60/80/100%, manual v1.2 §04) ya horneado
 * dentro de cada tile.
 *
 * 3 variantes, una por ocasion (igual que el manual):
 *  - durazno-crema: arcos durazno, para fondos crema/blancos
 *  - navy-crema:    arcos navy, para fondos crema/blancos (mas contraste)
 *  - crema-navy:    arcos crema, para fondos navy (piezas oscuras)
 * El propio PNG es transparente entre arcos: no lleva background-color
 * propio, deja ver lo que haya debajo (superficie de la seccion).
 *
 * El degradado de opacidad extra (fade up/down, para portadas y cierres de
 * seccion) NO se resuelve con mask-image: en Chrome/Safari, un elemento con
 * mask-image + background-image tileado dentro de un ancestro con overflow
 * hidden puede "pegarse" (glitch de repintado) durante transiciones/scroll,
 * que es justo lo que pasaba en el cierre navy. En vez de eso se superpone
 * un segundo div con un gradiente solido (transparente -> el color de fondo
 * de la seccion), asi el patron "se apaga" tapandose de a poco con el mismo
 * color de atras — mismo efecto visual, sin mask, sin glitch.
 *
 * @param {'durazno-crema'|'navy-crema'|'crema-navy'} variant
 * @param {'up'|'down'|'none'} fade  degradado de opacidad extra por seccion
 *   (portadas / cierres, manual §04) ademas del que ya trae el archivo
 * @param {number} scale  ancho de un tile en px (alto se ajusta a 181/243)
 */
const IMG = {
  'durazno-crema': '/patterns/arcos-durazno.png',
  'navy-crema': '/patterns/arcos-navy.png',
  'crema-navy': '/patterns/arcos-crema.png',
}
// Color al que se "apaga" el patron en cada variante (el fondo real de la
// seccion donde se usa cada una, ver manual §04).
const FADE_TO = {
  'durazno-crema': 'var(--c-cream)',
  'navy-crema': 'var(--c-cream)',
  'crema-navy': 'var(--c-navy)',
}
const TILE_W = 243
const TILE_H = 181

function ArcPattern({ variant = 'durazno-crema', fade = 'none', scale = 220, className = '' }) {
  const src = IMG[variant] ?? IMG['durazno-crema']
  const h = Math.round((scale * TILE_H) / TILE_W)

  return (
    <div
      className={`arc-pattern ${className}`.trim()}
      style={{ backgroundImage: `url(${src})`, backgroundSize: `${scale}px ${h}px` }}
      aria-hidden="true"
    >
      {fade !== 'none' && (
        <div
          className={`arc-pattern__fade arc-pattern__fade--${fade}`}
          style={{ '--fade-to': FADE_TO[variant] ?? 'var(--c-cream)' }}
        />
      )}
    </div>
  )
}

export default ArcPattern
