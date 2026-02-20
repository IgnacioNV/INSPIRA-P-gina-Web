import './LogoInspira.css'

function LogoInspira({ variant = 'default' }) {
  const isHero = variant === 'hero'

  return (
    <span
      className={`logo-inspira-inspira ${isHero ? 'logo-inspira-inspira--hero' : ''}`}
      aria-label="Inspira"
    >
      <img
        src="/logo-inspira.png"
        alt="Inspira"
        className="logo-inspira-inspira__img"
        width="180"
        height="48"
        decoding="async"
        fetchPriority="high"
      />
    </span>
  )
}

export default LogoInspira
