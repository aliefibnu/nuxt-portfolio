<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const { $gsap } = useNuxtApp() as any

const onMouseMove = (e: MouseEvent) => {
  const card = cardRef.value
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left // Mouse position inside card
  const y = e.clientY - rect.top

  mouseX.value = x
  mouseY.value = y

  // Calculate percentage of mouse position relative to card boundaries
  const xc = rect.width / 2
  const yc = rect.height / 2

  // Max tilt: 10 degrees
  const tiltX = (yc - y) / yc * 8
  const tiltY = (x - xc) / xc * 8

  $gsap.to(card, {
    rotateX: tiltX,
    rotateY: tiltY,
    scale3d: [1.015, 1.015, 1.015],
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
  <!-- Card outer border container -->
  <div 
    ref="cardRef"
    class="relative group rounded-2xl p-[1.5px] bg-zinc-900 overflow-hidden cursor-pointer select-none transition-all duration-500 will-animate h-[320px] md:h-[400px]"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    style="transform-style: preserve-3d;"
  >
    <!-- Dynamic cursor spotlight glow border -->
    <div 
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
      :style="{
        background: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(106, 211, 247, 0.22), transparent 75%)`
      }"
    ></div>

    <!-- Card Inner Content container -->
    <div 
      class="relative z-10 w-full h-full bg-[#09090b]/95 hover:bg-[#0c0c0f]/95 rounded-[15px] p-6 md:p-8 flex flex-col justify-between overflow-hidden"
    >
      <!-- Background Ambient Glow -->
      <div 
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        :style="{
          background: `radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(106, 211, 247, 0.04), transparent 70%)`
        }"
      ></div>

      <!-- Project Index Header -->
      <div 
        class="relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500"
        style="transform: translateZ(30px);"
      >
        <span>{{ project.category }}</span>
        <span>{{ project.year }}</span>
      </div>

      <!-- Card text block -->
      <div 
        class="relative z-10 mt-auto space-y-4"
        style="transform: translateZ(45px);"
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
  </div>
</template>
