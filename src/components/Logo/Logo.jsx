import './Logo.css'

const LOGO_SRC = {
  dark: '/logo-inspira-dark.png',
  light: '/logo-inspira-light.png',
}

function Logo({ variant = 'light', className = '' }) {
  const src = LOGO_SRC[variant] ?? LOGO_SRC.light

  return (
    <span
      className={`logo-inspira ${className}`.trim()}
      aria-label="Inspira"
    >
      <img
        src={src}
        alt="Inspira logo"
        className="logo-inspira__img"
      />
    </span>
  )
}

export default Logo
