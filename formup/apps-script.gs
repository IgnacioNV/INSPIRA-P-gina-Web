/**
 * Inspira RRHH — /formup (registro de asistencia)
 * Recibe un POST JSON del formulario y agrega una fila a la hoja activa.
 *
 * Importante: el cliente SOLO llama a este endpoint cuando la persona
 * tildó el opt-in de contacto futuro. Si no lo tildó, el formulario no
 * manda nada acá — por eso "Consiente contacto futuro" es siempre "Sí"
 * en cada fila que este script escribe.
 *
 * Despliegue: ver formup/DEPLOY.md
 */

// Nombre de la hoja donde se agregan los registros.
// Si no existe una hoja con este nombre, se usa la hoja activa del archivo.
const SHEET_NAME = 'Candidatos';

const HEADERS = [
  'Marca temporal',
  'Nombre y apellido',
  'Email',
  'Teléfono',
  'Experiencia laboral',
  'Interés',
  'Consiente contacto futuro',
  'Fecha de consentimiento',
  'Origen',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Sin datos en el request' });
    }

    const data = JSON.parse(e.postData.contents);

    const nombre = toText(data.nombre);
    const email = toText(data.email);
    const telefono = toText(data.telefono);
    const experienciaLaboral = toText(data.experienciaLaboral);
    const interes = joinIntereses(data.intereses);

    if (!nombre || !email) {
      return jsonResponse({ ok: false, error: 'Nombre y email son obligatorios' });
    }

    const sheet = getSheet();
    const now = new Date();

    sheet.appendRow([
      now, // Marca temporal
      nombre,
      email,
      telefono,
      experienciaLaboral,
      interes,
      'Sí', // Consiente contacto futuro — fijo: este endpoint solo se llama con opt-in tildado
      now, // Fecha de consentimiento — misma marca temporal del envío
      'UP - Psicología del Trabajo', // Origen (fijo)
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

// GET de prueba: abrir la URL /exec en el navegador debería mostrar esto.
function doGet() {
  return ContentService.createTextOutput(
    'Inspira RRHH /formup — endpoint activo. Este servicio solo acepta POST.'
  ).setMimeType(ContentService.MimeType.TEXT);
}

function joinIntereses(list) {
  if (!Array.isArray(list)) return '';
  const tiene = function (label) {
    return list.indexOf(label) !== -1;
  };
  const psico = tiene('Psicología del Trabajo');
  const rrhh = tiene('Recursos Humanos');
  if (psico && rrhh) return 'Ambos';
  if (psico) return 'Psicología del Trabajo';
  if (rrhh) return 'Recursos Humanos';
  return '';
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getActiveSheet();
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function toText(value) {
  return (value === undefined || value === null ? '' : String(value)).trim();
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Ejecutar UNA VEZ manualmente desde el editor (▶ Run > setupSheet) para
 * crear la hoja "Candidatos" con los encabezados correctos si todavía no
 * existe. No hace falta si ya vas a usar la hoja activa del archivo.
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
}
