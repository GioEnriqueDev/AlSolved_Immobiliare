import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

export function useIsTouch() {
  const [isTouch, setIsTouch] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(pointer: coarse)").matches
  })

  React.useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)")
    const onChange = () => {
      setIsTouch(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setIsTouch(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isTouch
}

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => {
      setPrefersReduced(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setPrefersReduced(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return prefersReduced
}
