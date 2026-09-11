/*
 * Las 4 lineas de servicio (oferta comercial). Desde que "Valores" se fusionó
 * acá, cada servicio también lleva el pilar de marca que mejor lo respalda
 * (ver `pillar`) — así el valor queda demostrado por un servicio real en vez
 * de ser una afirmación suelta.
 *
 * TODO(valores): el mapeo servicio → pilar es un borrador razonado (ver abajo
 * de cada entrada), falta confirmarlo con Fede.
 * TODO(copy): `description` es el párrafo de 2-3 líneas de cada card grande
 * de "Qué hacemos" — todavía no tenemos el texto real, se deja `null` y la
 * card lo marca como "Copy pendiente" en vez de inventarlo.
 * TODO(foto): `photo` queda `null` hasta tener banco de fotos propio; la
 * card resuelve con el patrón de marca de fondo mientras tanto.
 * TODO(paginas): /servicios/:slug hoy son stubs — falta el contenido real.
 */
export const SERVICES = [
  {
    slug: 'coaching',
    name: 'Coaching',
    navLabel: 'Coaching',
    hook: 'Liderazgo, conversaciones y desarrollo', // draft
    pillar: 'Trato humano', // borrador: coaching es el servicio más relacional/humano de los 4
    pattern: 'durazno-crema',
    photo: null,
    description: null,
  },
  {
    slug: 'seleccion',
    name: 'Selección de personal',
    navLabel: 'Selección', // etiqueta corta para el navbar
    hook: 'Personas alineadas al puesto y a la cultura', // draft
    pillar: 'Experiencia', // borrador: +10 años de trayectoria en búsqueda y selección
    pattern: 'navy-crema',
    photo: null,
    description: null,
  },
  {
    slug: 'capacitaciones',
    name: 'Capacitaciones',
    navLabel: 'Capacitaciones',
    hook: 'Aprendizaje a medida, impacto real', // draft
    pillar: 'Personalización', // borrador: "a medida" ya está en el propio hook
    pattern: 'durazno-crema',
    photo: null,
    description: null,
  },
  {
    slug: 'psicotecnicos',
    name: 'Psicotécnicos',
    navLabel: 'Psicotécnicos',
    hook: 'Evaluación con criterio para decidir mejor', // draft
    pillar: 'Profesionalismo', // borrador: evaluación técnica = el más "profesional" de los 4
    pattern: 'navy-crema',
    photo: null,
    description: null,
  },
]
