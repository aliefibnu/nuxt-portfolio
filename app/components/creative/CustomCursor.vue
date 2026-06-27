<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursorRef = ref<HTMLElement | null>(null)
const ringRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const isVisible = ref(false)

const mouseX = ref(0)
const mouseY = ref(0)
const ringX = ref(0)
const ringY = ref(0)

const { $gsap } = useNuxtApp() as any

// Move handlers
const onMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  isVisible.value = true
}

const onMouseLeaveWindow = () => {
  isVisible.value = false
}

// Tick loop to animate ring with linear interpolation (lerp)
let tickerId: any = null

const tick = () => {
  // Lerp formula: current += (target - current) * factor
  ringX.value += (mouseX.value - ringX.value) * 0.15
  ringY.value += (mouseY.value - ringY.value) * 0.15

  if (cursorRef.value) {
    $gsap.set(cursorRef.value, { x: mouseX.value, y: mouseY.value })
  }
  if (ringRef.value) {
    $gsap.set(ringRef.value, { x: ringX.value, y: ringY.value })
  }
  tickerId = requestAnimationFrame(tick)
}

// Add hover styles
const addHover = () => {
  isHovered.value = true
}

const removeHover = () => {
  isHovered.value = false
}

// Set up listeners for interactive elements
const setupHoverListeners = () => {
  const elements = document.querySelectorAll('a, button, [role="button"], .interactive-hover')
  elements.forEach(el => {
    el.addEventListener('mouseenter', addHover)
    el.addEventListener('mouseleave', removeHover)
  })
}

// Watch DOM mutations to attach listeners to dynamically rendered elements
let observer: MutationObserver | null = null

onMounted(() => {
  // Check if system preferences reduce motion is enabled
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mediaQuery.matches) return

  // Start tracking mouse
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeaveWindow)
  
  // Launch animation tick
  tickerId = requestAnimationFrame(tick)

  // Initial bindings
  setupHoverListeners()

  // Track dynamic changes in the DOM
  observer = new MutationObserver(() => {
    setupHoverListeners()
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseleave', onMouseLeaveWindow)
  }
  if (tickerId) {
    cancelAnimationFrame(tickerId)
  }
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div 
    v-show="isVisible" 
    class="hidden md:block"
  >
    <!-- Core dot pointer -->
    <div 
      ref="cursorRef" 
      class="custom-cursor fixed pointer-events-none mix-blend-difference"
      :class="{ 'active': isHovered }"
    ></div>
    <!-- Inertia border tracking ring -->
    <div 
      ref="ringRef" 
      class="custom-cursor-ring fixed pointer-events-none mix-blend-difference"
      :class="{ 'active': isHovered }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor {
  z-index: 999999;
}
.custom-cursor-ring {
  z-index: 999998;
}
</style>
