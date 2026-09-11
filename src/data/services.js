/*
 * Las 4 lineas de servicio (oferta comercial — distinta de los pilares de marca).
 * El copy tecnico completo vive en la pagina interna de cada servicio.
 *
 * TODO(copy): revisar con Fede el "gancho" de 3-4 palabras de cada tarjeta.
 * TODO(paginas): /servicios/:slug hoy son stubs — falta el contenido real.
 */
export const SERVICES = [
  {
    slug: 'coaching',
    name: 'Coaching',
    navLabel: 'Coaching',
    hook: 'Liderazgo, conversaciones y desarrollo', // draft
    pattern: 'durazno-crema',
  },
  {
    slug: 'seleccion',
    name: 'Selección de personal',
    navLabel: 'Selección', // etiqueta corta para el navbar
    hook: 'Personas alineadas al puesto y a la cultura', // draft
    pattern: 'navy-crema',
  },
  {
    slug: 'capacitaciones',
    name: 'Capacitaciones',
    navLabel: 'Capacitaciones',
    hook: 'Aprendizaje a medida, impacto real', // draft
    pattern: 'durazno-crema',
  },
  {
    slug: 'psicotecnicos',
    name: 'Psicotécnicos',
    navLabel: 'Psicotécnicos',
    hook: 'Evaluación con criterio para decidir mejor', // draft
    pattern: 'navy-crema',
  },
]
