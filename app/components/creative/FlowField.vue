<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null

// Particle structure
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
}

onMounted(() => {
  const canvas = canvasRef.current
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Setup canvas size
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const particles: Particle[] = []
  const maxParticles = Math.min(100, Math.floor((width * height) / 12000)) // Throttle density
  
  // Mouse position tracking
  let mouse = { x: -1000, y: -1000, active: false }

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }

  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.active = true
  }

  const handleMouseLeave = () => {
    mouse.active = false
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)

  // Initialize particles
  const createParticle = (): Particle => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.5 + 0.1,
      color: `hsla(${180 + Math.random() * 30}, 80%, 70%, `
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle())
  }

  // Animation Loop
  const draw = () => {
    ctx.fillStyle = 'rgba(3, 3, 3, 0.08)' // Leave visual trail
    ctx.fillRect(0, 0, width, height)

    particles.forEach((p) => {
      // Flow calculations based on sine waves + time
      const time = Date.now() * 0.0005
      let angle = Math.sin(p.x * 0.005 + time) * Math.cos(p.y * 0.005 + time) * Math.PI * 2

      // Push force towards grid flow
      p.vx += Math.cos(angle) * 0.02
      p.vy += Math.sin(angle) * 0.02

      // Mouse interactive repulsion force
      if (mouse.active) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        
        if (dist < 180) {
          const force = (180 - dist) / 180
          const forceX = (dx / dist) * force * 0.6
          const forceY = (dy / dist) * force * 0.6
          
          // Repel from mouse
          p.vx -= forceX
          p.vy -= forceY
        }
      }

      // Max velocity speed clamping
      const speed = Math.hypot(p.vx, p.vy)
      const maxSpeed = 1.8
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed
        p.vy = (p.vy / speed) * maxSpeed
      }

      // Update positions
      p.x += p.vx
      p.y += p.vy

      // Draw particle lines
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3) // Stretch line based on speed
      ctx.strokeStyle = p.color + `${p.alpha})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Boundary wraps
      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0
    })

    animationFrameId = requestAnimationFrame(draw)
  }

  // Check visibility before running to conserve resources (Intersection Observer)
  let observer: IntersectionObserver | null = null
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationFrameId) draw()
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
      }
    })
  })
  observer.observe(canvas)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    if (observer) {
      observer.disconnect()
    }
  })
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="absolute inset-0 w-full h-full pointer-events-none select-none z-[1]"
  ></canvas>
</template>
