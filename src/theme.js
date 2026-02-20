/**
 * Inspira – Sistema de colores centralizado
 * Solo usar estas variables. Sin colores nuevos.
 *
 * Uso en componentes:
 *   <Button variant="primary" color="orange" />
 *   → mapear internamente a var(--orange)
 *
 * Convenciones:
 *   --text-color    → texto principal, títulos, navegación
 *   --orange        → CTA, botones principales, acentos
 *   --blue          → estados secundarios, links, highlights
 *   --background-color → fondo general
 */

export const COLOR_VARS = {
  text: 'var(--text-color)',
  orange: 'var(--orange)',
  background: 'var(--background-color)',
  blue: 'var(--blue)',
}

/** Mapeo para props color / variant → variable CSS */
export function getColorVar(colorKey) {
  const key = colorKey?.toLowerCase()
  if (key && COLOR_VARS[key]) return COLOR_VARS[key]
  return COLOR_VARS.text
}
