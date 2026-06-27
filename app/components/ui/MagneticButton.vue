<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const buttonRef = ref<HTMLElement | null>(null)
const { $gsap } = useNuxtApp() as any

const onMouseMove = (e: MouseEvent) => {
  const btn = buttonRef.value
  if (!btn) return

  const rect = btn.getBoundingClientRect()
  
  // Calculate relative distance of mouse from the center of the button
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  const distanceX = e.clientX - centerX
  const distanceY = e.clientY - centerY

  // pull factor strength: 0.35 max
  const pullStrength = 0.35
  
  $gsap.to(btn, {
    x: distanceX * pullStrength,
    y: distanceY * pullStrength,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onMouseLeave = () => {
  const btn = buttonRef.value
  if (!btn) return

  $gsap.to(btn, {
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'elastic.out(1.1, 0.4)'
  })
}

onMounted(() => {
  const btn = buttonRef.value
  if (!btn) return

  btn.addEventListener('mousemove', onMouseMove)
  btn.addEventListener('mouseleave', onMouseLeave)
})

onBeforeUnmount(() => {
  const btn = buttonRef.value
  if (!btn) return

  btn.removeEventListener('mousemove', onMouseMove)
  btn.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<template>
  <div 
    ref="buttonRef"
    class="inline-block interactive-hover"
  >
    <slot />
  </div>
</template>

<style scoped>
div {
  display: inline-block;
  will-change: transform;
}
</style>
