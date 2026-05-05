import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  })

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const listener = (e) => setIsMobile(e.matches)

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [breakpoint])

  return isMobile
}
