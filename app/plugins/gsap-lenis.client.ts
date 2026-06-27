import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  if (!process.client) return

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger)

  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })

  // Synchronize ScrollTrigger updates with Lenis scrolling
  lenis.on('scroll', () => {
    ScrollTrigger.update()
  })

  // Hook Lenis into GSAP requestAnimationFrame ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Turn off lag smoothing for tighter visual sync
  gsap.ticker.lagSmoothing(0)

  // Listen to hash link clicks for premium smooth scroll-to transitions
  window.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a')
    if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
      const href = anchor.getAttribute('href')!
      if (href === '#') return
      
      e.preventDefault()
      const targetEl = document.querySelector(href)
      if (targetEl) {
        lenis.scrollTo(targetEl, {
          offset: -80,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    }
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
      lenis,
    },
  }
})
