<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const cardRef = ref<HTMLElement | null>(null)
const { $gsap } = useNuxtApp() as any

const onMouseMove = (e: MouseEvent) => {
  const card = cardRef.value
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left // Mouse position inside card
  const y = e.clientY - rect.top

  // Calculate percentage of mouse position relative to card boundaries
  const xc = rect.width / 2
  const yc = rect.height / 2

  // Max tilt: 12 degrees
  const tiltX = (yc - y) / yc * 10
  const tiltY = (x - xc) / xc * 10

  $gsap.to(card, {
    rotateX: tiltX,
    rotateY: tiltY,
    scale3d: [1.02, 1.02, 1.02],
    duration: 0.5,
    ease: 'power2.out',
    transformPerspective: 1000
  })
}

const onMouseLeave = () => {
  const card = cardRef.value
  if (!card) return

  $gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale3d: [1, 1, 1],
    duration: 0.8,
    ease: 'power3.out'
  })
}

onMounted(() => {
  const card = cardRef.value
  if (!card) return

  // Scroll Reveal entrance
  $gsap.fromTo(card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  )
})
</script>

<template>
  <div 
    ref="cardRef"
    class="relative group glass-panel p-6 flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-all duration-300 will-animate h-[320px] md:h-[400px] border border-white/5 bg-zinc-950/40 hover:border-cyan-400/30"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    style="transform-style: preserve-3d;"
  >
    <!-- Background Gradient Card glow -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/0 to-cyan-400/5 group-hover:to-cyan-400/10 transition-all duration-500 pointer-events-none"></div>

    <!-- Project Index Indicator -->
    <div 
      class="flex justify-between items-start font-mono text-xs text-zinc-500"
      style="transform: translateZ(30px);"
    >
      <span>{{ project.category }}</span>
      <span>{{ project.year }}</span>
    </div>

    <!-- Card Inner Content -->
    <div 
      class="mt-auto space-y-3"
      style="transform: translateZ(50px);"
    >
      <!-- Technologies list -->
      <div class="flex flex-wrap gap-1.5">
        <span 
          v-for="tech in project.technologies.slice(0, 3)" 
          :key="tech"
          class="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-cyan-400/90"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Title & description -->
      <h3 class="text-2xl md:text-3xl font-headings font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-xs md:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Repository / Arrow link -->
      <div class="pt-4 flex items-center gap-2 font-mono text-[10px] text-zinc-500 group-hover:text-white transition-colors">
        <span>VIEW PROJECT</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          class="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
        >
          <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>
