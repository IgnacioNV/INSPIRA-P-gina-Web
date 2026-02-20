import './Logo.css'

function Logo({ variant = 'default' }) {
  const isHero = variant === 'hero'

  return (
    <div
      className={`logo-inspira ${isHero ? 'logo-inspira--hero' : ''}`}
      aria-label="Inspira"
    >
      <img
        src="/logo-inspira.png"
        alt="Inspira"
        className="logo-inspira__img"
        width="180"
        height="48"
      />
    </div>
  )
}

export default Logo
