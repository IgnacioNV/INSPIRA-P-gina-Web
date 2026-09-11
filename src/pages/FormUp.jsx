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
 * - Checkbox de opt-in DESTILDADO por default. Si el usuario no lo tilda,
 *   el submit NUNCA llama a fetch — no se envia ni se guarda nada en
 *   ningun lado, solo se muestra el agradecimiento.
 * - Si lo tilda, recien ahi se manda el payload completo al Web App de
 *   Apps Script.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REDIRECT_URL = 'https://inspira.ar'
const REDIRECT_DELAY_MS = 4500
const ENDPOINT = import.meta.env.VITE_FORMUP_ENDPOINT

const initialValues = {
  nombre: '',
  email: '',
  telefono: '',
  experienciaLaboral: '',
  intereses: [], // 'Psicología del Trabajo' | 'Recursos Humanos'
  optIn: false,
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

function FormUp() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const nombreRef = useRef(null)
  const emailRef = useRef(null)

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

    const foundErrors = validate(values)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) {
      focusFirstError(foundErrors)
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
      telefono: values.telefono.trim(),
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
              aria-required="true"
              aria-invalid={Boolean(errors.nombre)}
              aria-describedby={errors.nombre ? 'nombre-error' : undefined}
            />
            {errors.nombre && (
              <p id="nombre-error" className="formup__field-error" role="alert">
                {errors.nombre}
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
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="formup__field-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="formup__field">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.telefono}
              onChange={(e) => setField('telefono', e.target.value)}
            />
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
