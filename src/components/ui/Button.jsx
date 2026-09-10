import { Link } from 'react-router-dom'
import './Button.css'

/**
 * Boton Inspira. Manual de Marca v1.2 §05.
 *
 * @param {'primary'|'secondary'} variant
 * @param {'lg'|'md'|'sm'} size
 * @param {string} [to]   ruta interna (react-router <Link>)
 * @param {string} [href] link externo / ancla
 * Sin `to` ni `href` => <button>.
 */
function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  )
}

export default Button
