import { useEffect, useRef, useState } from 'react'
import Logo from '../components/ui/Logo'
import './FormUp.css'

/*
 * /formup — registro de asistencia (Inspira RRHH).
 * Sin link en ningún menú/sitemap; accesible solo por URL directa.
 * No lleva Navbar/Footer del sitio (ver SiteLayout en App.jsx) para no
 * exponer la navegación completa del sitio en una ruta que se comparte
 * por afuera del flujo normal.
 *
 * Logica de guardado (a proposito, no es un detalle menor):
 * - Checkbox de opt-in tildado por default (el usuario lo puede
 *   destildar). Si queda destildado, el submit NUNCA llama a fetch — no
 *   se envia ni se guarda nada en ningun lado, solo se muestra el
 *   agradecimiento.
 * - Si queda tildado, recien ahi se manda el payload completo al Web App
 *   de Apps Script.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REDIRECT_URL = 'https://inspira.ar'
const REDIRECT_DELAY_MS = 4500
const ENDPOINT = import.meta.env.VITE_FORMUP_ENDPOINT

// Lista corta, no exhaustiva — cubre Argentina (default) + los países más
// probables para una consultora de RRHH en Buenos Aires. Fácil de sumar más.
const COUNTRY_CODES = [
  { name: 'Argentina', dial: '+54', flag: '🇦🇷' },
  { name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
  { name: 'Chile', dial: '+56', flag: '🇨🇱' },
  { name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
  { name: 'Brasil', dial: '+55', flag: '🇧🇷' },
  { name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
  { name: 'Perú', dial: '+51', flag: '🇵🇪' },
  { name: 'Colombia', dial: '+57', flag: '🇨🇴' },
  { name: 'México', dial: '+52', flag: '🇲🇽' },
  { name: 'España', dial: '+34', flag: '🇪🇸' },
  { name: 'Estados Unidos', dial: '+1', flag: '🇺🇸' },
]

const initialValues = {
  nombre: '',
  email: '',
  telefonoPais: COUNTRY_CODES[0].dial,
  telefonoNumero: '',
  experienciaLaboral: '',
  intereses: [], // 'Psicología del Trabajo' | 'Recursos Humanos'
  optIn: true,
}

function validate(values) {
  const errors = {}
  if (!values.nombre.trim()) {
    errors.nombre = 'Ingresá tu nombre y apellido.'
  }
  if (!values.email.trim()) {
    errors.email = 'Ingresá tu email.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Ingresá un email con formato válido.'
  }
  return errors
}

// "1112345678" -> "11 1234 - 5678" (área + dos bloques de 4, formateado a
// medida que se escribe). Tope de 10 dígitos.
function formatPhoneLocal(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)} - ${digits.slice(6)}`
}

function FormUp() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const nombreRef = useRef(null)
  const emailRef = useRef(null)

  // Se recalcula en cada render a partir de values — permite marcar
  // errores a medida que el usuario completa, no solo al enviar.
  const errors = validate(values)

  useEffect(() => {
    window.scrollTo(0, 0)

    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  function setField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function markTouched(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  // Un campo solo muestra su error una vez que el usuario pasó por él
  // (blur) o después de un intento de envío — así no lo recibe en blanco.
  function fieldError(field) {
    return touched[field] || submitAttempted ? errors[field] : undefined
  }

  function toggleInteres(label) {
    setValues((prev) => ({
      ...prev,
      intereses: prev.intereses.includes(label)
        ? prev.intereses.filter((i) => i !== label)
        : [...prev.intereses, label],
    }))
  }

  function focusFirstError(foundErrors) {
    if (foundErrors.nombre) nombreRef.current?.focus()
    else if (foundErrors.email) emailRef.current?.focus()
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setSubmitAttempted(true)
    if (Object.keys(errors).length > 0) {
      focusFirstError(errors)
      return
    }

    // Sin opt-in: cierre inmediato, no se toca la red ni se guarda nada.
    if (!values.optIn) {
      setStatus('success')
      return
    }

    setStatus('submitting')

    const payload = {
      nombre: values.nombre.trim(),
      email: values.email.trim(),
      telefono: values.telefonoNumero
        ? `${values.telefonoPais} ${values.telefonoNumero}`
        : '',
      experienciaLaboral: values.experienciaLaboral.trim(),
      intereses: values.intereses,
      optIn: true,
    }

    try {
      if (!ENDPOINT) {
        throw new Error('missing-endpoint')
      }

      // Sin header Content-Type explícito: el body string cae en
      // text/plain, que es "simple request" y evita el preflight OPTIONS
      // que el Web App de Apps Script no sabe responder.
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => null)

      if (!res.ok || !data || data.ok === false) {
        throw new Error(data?.error || 'request-failed')
      }

      setStatus('success')
    } catch (err) {
      console.error('FormUp: error al enviar', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <ThankYou />
  }

  return (
    <div className="formup">
      <div className="formup__card u-container">
        <div className="formup__brand">
          <Logo tone="navy" />
        </div>

        <header className="formup__header">
          <h1 className="t-h1">Registro de asistencia</h1>
          <p className="t-body formup__intro">
            Completá tus datos para registrar tu asistencia a la clase.
          </p>
        </header>

        <form
          className="formup__form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={status === 'submitting'}
        >
          <div className="formup__field">
            <label htmlFor="nombre">
              Nombre y apellido <span aria-hidden="true">*</span>
            </label>
            <input
              ref={nombreRef}
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={values.nombre}
              onChange={(e) => setField('nombre', e.target.value)}
              onBlur={() => markTouched('nombre')}
              aria-required="true"
              aria-invalid={Boolean(fieldError('nombre'))}
              aria-describedby={fieldError('nombre') ? 'nombre-error' : undefined}
            />
            {fieldError('nombre') && (
              <p id="nombre-error" className="formup__field-error" role="alert">
                {fieldError('nombre')}
              </p>
            )}
          </div>

          <div className="formup__field">
            <label htmlFor="email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => markTouched('email')}
              aria-required="true"
              aria-invalid={Boolean(fieldError('email'))}
              aria-describedby={fieldError('email') ? 'email-error' : undefined}
            />
            {fieldError('email') && (
              <p id="email-error" className="formup__field-error" role="alert">
                {fieldError('email')}
              </p>
            )}
          </div>

          <div className="formup__field">
            <label htmlFor="telefono-numero">Teléfono</label>
            <div className="formup__phone">
              <select
                className="formup__phone-country"
                aria-label="Prefijo de país"
                value={values.telefonoPais}
                onChange={(e) => setField('telefonoPais', e.target.value)}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.dial + c.name} value={c.dial}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>
              <input
                id="telefono-numero"
                name="telefono"
                type="tel"
                autoComplete="tel-national"
                inputMode="numeric"
                placeholder="11 1234 - 5678"
                value={values.telefonoNumero}
                onChange={(e) =>
                  setField('telefonoNumero', formatPhoneLocal(e.target.value))
                }
              />
            </div>
          </div>

          <div className="formup__field">
            <label htmlFor="experienciaLaboral">
              Contanos brevemente tu experiencia laboral, si tenés
            </label>
            <textarea
              id="experienciaLaboral"
              name="experienciaLaboral"
              rows={4}
              value={values.experienciaLaboral}
              onChange={(e) => setField('experienciaLaboral', e.target.value)}
            />
          </div>

          <fieldset className="formup__fieldset">
            <legend>¿En qué te interesa más profundizar?</legend>
            <div className="formup__checkbox-group">
              <label className="formup__checkbox">
                <input
                  type="checkbox"
                  checked={values.intereses.includes('Psicología del Trabajo')}
                  onChange={() => toggleInteres('Psicología del Trabajo')}
                />
                <span>Psicología del Trabajo</span>
              </label>
              <label className="formup__checkbox">
                <input
                  type="checkbox"
                  checked={values.intereses.includes('Recursos Humanos')}
                  onChange={() => toggleInteres('Recursos Humanos')}
                />
                <span>Recursos Humanos</span>
              </label>
            </div>
          </fieldset>

          <div className="formup__optin">
            <label className="formup__optin-label">
              <input
                type="checkbox"
                checked={values.optIn}
                onChange={(e) => setField('optIn', e.target.checked)}
              />
              <span>
                Quiero que Inspira me tenga en cuenta para búsquedas
                laborales y me contacte más adelante con información
                relacionada.
              </span>
            </label>
          </div>

          {status === 'error' && (
            <p className="formup__status" data-state="error" role="alert">
              No pudimos guardar tu registro. Revisá tu conexión e intentá de
              nuevo — tus datos no se perdieron.
            </p>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--lg formup__submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Enviando…' : 'Enviar registro'}
          </button>
        </form>
      </div>
    </div>
  )
}

function ThankYou() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = REDIRECT_URL
    }, REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="formup">
      <div className="formup__card u-container formup__thanks" role="status" aria-live="polite">
        <div className="formup__brand">
          <Logo tone="navy" />
        </div>
        <h1 className="t-h1">¡Gracias por completar el registro!</h1>
        <p className="t-body formup__intro">
          En unos segundos te vamos a redirigir a la página de Inspira.
        </p>
        <a className="btn btn--primary btn--lg" href={REDIRECT_URL}>
          Ir ahora
        </a>
      </div>
    </div>
  )
}

export default FormUp
