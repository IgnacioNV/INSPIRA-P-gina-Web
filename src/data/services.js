/*
 * Las 4 lineas de servicio (oferta comercial). `pillar` documenta que pilar
 * de marca respalda mejor a cada servicio — ya no se muestra como tag sobre
 * la card (se sacó por pedido explícito), queda solo como referencia; los
 * 4 pilares en sí se muestran juntos en la franja de cierre de la sección.
 *
 * `photo` y `description` son la foto y el copy real ya publicados en
 * inspira.ar (la página en producción) — se portaron tal cual, sin reescribir.
 *
 * TODO(paginas): /servicios/:slug hoy son stubs — falta el contenido real ahí.
 */
export const SERVICES = [
  {
    slug: 'coaching',
    name: 'Coaching',
    navLabel: 'Coaching',
    hook: 'Liderazgo, conversaciones y desarrollo', // draft
    pillar: 'Trato humano', // borrador: coaching es el servicio más relacional/humano de los 4
    pattern: 'durazno-crema',
    photo: '/servicios/servicios-coaching.JPG',
    description:
      'En Inspira concebimos el coaching como un espacio de reflexión que permite comprender lo que una persona atraviesa en su trabajo, reconocer recursos y desarrollar nuevas formas de actuar. Acompañamos procesos orientados a fortalecer liderazgo, comunicación y desarrollo profesional, con enfoque personalizado conectado con desafíos del rol.',
  },
  {
    slug: 'seleccion',
    name: 'Selección de personal',
    navLabel: 'Selección', // etiqueta corta para el navbar
    hook: 'Personas alineadas al puesto y a la cultura', // draft
    pillar: 'Experiencia', // borrador: +10 años de trayectoria en búsqueda y selección
    pattern: 'navy-crema',
    photo: '/servicios/servicios-busqueda.JPG',
    description:
      'Acompañamos a las organizaciones en la búsqueda e incorporación de personas alineadas con el puesto, la cultura y los objetivos del negocio. Trabajamos cada proceso de forma personalizada, comprendiendo la posición, evaluando con criterio y presentando candidatos con competencias técnicas y humanas para aportar valor e integrarse al equipo.',
  },
  {
    slug: 'capacitaciones',
    name: 'Capacitaciones',
    navLabel: 'Capacitaciones',
    hook: 'Aprendizaje a medida, impacto real', // draft
    pillar: 'Personalización', // borrador: "a medida" ya está en el propio hook
    pattern: 'durazno-crema',
    photo: '/servicios/servicios-capacitaciones.JPG',
    description:
      'En Inspira entendemos la capacitación como un espacio para reflexionar, adquirir herramientas y abrir nuevas posibilidades de acción. Diseñamos propuestas a medida, enfocadas en las necesidades reales de cada cliente, buscando que el aprendizaje se traduzca en mejores prácticas, vínculos más efectivos y mayor impacto en el trabajo cotidiano.',
  },
  {
    slug: 'psicotecnicos',
    name: 'Psicotécnicos',
    navLabel: 'Psicotécnicos',
    hook: 'Evaluación con criterio para decidir mejor', // draft
    pillar: 'Profesionalismo', // borrador: evaluación técnica = el más "profesional" de los 4
    pattern: 'navy-crema',
    photo: '/servicios/servicios-evaluacionespsi.JPG',
    description:
      'Realizamos evaluaciones psicotécnicas para apoyar procesos de selección y decisiones de desarrollo, aportando una mirada profesional sobre el perfil y su adecuación al rol. Trabajamos cada caso de forma contextualizada, considerando competencias, función y organización, ofreciendo información clara y útil para decisiones más sólidas.',
  },
]
