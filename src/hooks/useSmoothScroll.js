// Lightweight smooth scroll hook
// - Uses the real window scroll (no transform magic) so fixed elements behave correctly
// - Intercepts wheel and touch events and animates to a target position with easing
// - Works alongside GSAP / ScrollTrigger because it updates the real scroll position

import { useEffect, useRef } from 'react'

export default function useSmoothScroll({ ease = 0.12, mouseMultiplier = 1, touchMultiplier = 2 } = {}) {
  const animationRef = useRef(null)
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const isAnimating = useRef(false)

  useEffect(() => {
    // Respect user and device constraints. Disable smoothing when:
    // - user requests reduced motion
    // - device appears low-memory / low-core or has a coarse pointer (mobile)
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const deviceMemory = typeof navigator !== 'undefined' ? navigator.deviceMemory || 4 : 4
    const hwCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4
    const hasFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches

    // If the environment suggests we should not run heavy smooth animation, exit early
    if (prefersReducedMotion || deviceMemory < 2 || hwCores <= 1 || !hasFinePointer) {
      // Keep native scrolling behaviour — do not attach intercepting listeners.
      // This avoids heavy CPU use on low-power or touch devices.
      // Helpful for accessibility and power savings on battery devices.
      // eslint-disable-next-line no-console
      console.debug('[useSmoothScroll] disabled due to reduced-motion or low-power device')
      return undefined
    }
    // Keep references current
    targetRef.current = window.scrollY
    currentRef.current = window.scrollY

    const getDocumentHeight = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    const onWheel = (e) => {
      // Prevent the default touchpad/wheel behavior so we can animate to a new target.
      // When returning true, we call preventDefault so this listener must be non-passive.
      e.preventDefault()

      const delta = e.deltaY * mouseMultiplier
      targetRef.current = clamp(targetRef.current + delta, 0, getDocumentHeight() - window.innerHeight)
      startAnimation()
    }

    // support touch gestures
    let touchStartY = null
    const onTouchStart = (e) => {
      touchStartY = e.touches ? e.touches[0].clientY : e.clientY
    }
    const onTouchMove = (e) => {
      if (touchStartY === null) return
      e.preventDefault()
      const y = e.touches ? e.touches[0].clientY : e.clientY
      const delta = (touchStartY - y) * touchMultiplier
      touchStartY = y
      targetRef.current = clamp(targetRef.current + delta, 0, getDocumentHeight() - window.innerHeight)
      startAnimation()
    }
    const onTouchEnd = () => { touchStartY = null }

    // Animate current position -> target using linear interpolation
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      currentRef.current = lerp(currentRef.current, targetRef.current, ease)
      if (Math.abs(currentRef.current - targetRef.current) < 0.5) {
        window.scrollTo(0, Math.round(targetRef.current))
        isAnimating.current = false
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
        return
      }

      window.scrollTo(0, Math.round(currentRef.current))
      animationRef.current = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (isAnimating.current) return
      isAnimating.current = true
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      animationRef.current = requestAnimationFrame(animate)
    }

    // When native scroll occurs (eg user drags scroll bar or using keyboard) keep target synced
    const onNativeScroll = () => {
      if (isAnimating.current) return // ignore while we are animating to target
      targetRef.current = window.scrollY
      currentRef.current = window.scrollY
    }

    // Add non-passive listener so we can call preventDefault() on wheel/touchmove
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })
    window.addEventListener('scroll', onNativeScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener('wheel', onWheel, { passive: false })
      window.removeEventListener('touchstart', onTouchStart, { passive: false })
      window.removeEventListener('touchmove', onTouchMove, { passive: false })
      window.removeEventListener('touchend', onTouchEnd, { passive: false })
      window.removeEventListener('scroll', onNativeScroll, { passive: true })
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [ease, mouseMultiplier, touchMultiplier])
}
