<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['loaded'])

const progress = ref(0)
const statusIndex = ref(0)
const isVisible = ref(true)
const preloaderRef = ref<HTMLElement | null>(null)

const statusMessages = [
  'INITIALIZING SYSTEM...',
  'RESOLVING CORE CONFIGURATIONS...',
  'FETCHING PORTFOLIO DATABASE...',
  'HYDRATING INTERACTIVE INTERFACES...',
  'COMPILATION COMPLETE. WELCOME.'
]

const { $gsap } = useNuxtApp() as any

onMounted(() => {
  // Prevent body scroll during preload
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }

  // Update status message dynamically
  const statusInterval = setInterval(() => {
    if (statusIndex.value < statusMessages.length - 1) {
      statusIndex.value++
    }
  }, 900)

  // GSAP Counter Progress
  const tl = $gsap.timeline({
    onComplete: () => {
      clearInterval(statusInterval)
      progress.value = 100
      statusIndex.value = statusMessages.length - 1
      
      // Animate out preloader
      $gsap.to(preloaderRef.value, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.5,
        onComplete: () => {
          isVisible.value = false
          if (typeof document !== 'undefined') {
            document.body.style.overflow = ''
          }
          emit('loaded')
        }
      })
    }
  })

  // Smooth progress calculation
  tl.to(progress, {
    value: 100,
    duration: 3.5,
    ease: 'power2.out',
    onUpdate: () => {
      progress.value = Math.floor(progress.value)
    }
  })

  // Text status fades
  $gsap.fromTo('.preloader-status', 
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, repeat: -1, yoyo: true }
  )
})
</script>

<template>
  <div
    v-if="isVisible"
    ref="preloaderRef"
    class="fixed inset-0 bg-[#FAFAF9] z-[99999] flex flex-col justify-between p-8 md:p-16 will-animate select-none"
  >
    <!-- Logo Grid/Details -->
    <div class="flex justify-between items-start font-mono text-[10px] md:text-xs text-stone-400">
      <div>
        <p>SYSTEM ACCESS LEVEL: PUBLIC</p>
        <p>BUILD VERSION: V4.0.0-PROD</p>
      </div>
      <div class="text-right">
        <p>LATENCY: 12ms</p>
        <p>FRAME BUDGET: 60FPS / 16.6ms</p>
      </div>
    </div>

    <!-- Center Progress Indicators -->
    <div class="flex flex-col items-center justify-center text-center my-auto">
      <div class="mb-4">
        <!-- Huge Percent Number -->
        <span class="font-sans font-black text-7xl md:text-9xl text-stone-900 tracking-tighter leading-none select-none">
          {{ progress.toString().padStart(3, '0') }}%
        </span>
      </div>
      
      <!-- Progress Bar (Thin line) -->
      <div class="w-full max-w-sm h-[2px] bg-stone-200 overflow-hidden mb-6 relative">
        <div 
          class="h-full bg-stone-900 absolute top-0 left-0 transition-all duration-75"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <!-- Live Loading Description -->
      <div class="h-6 overflow-hidden">
        <p class="font-mono text-xs md:text-sm text-stone-600 preloader-status tracking-widest">
          {{ statusMessages[statusIndex] }}
        </p>
      </div>
    </div>

    <!-- Decorative Bottom Footer -->
    <div class="flex justify-between items-end font-mono text-[10px] md:text-xs text-stone-400">
      <div>
        <p>©{{ new Date().getFullYear() }} ALIEF IBNU HAMDANI</p>
        <p>REKAYASA PERANGKAT LUNAK</p>
      </div>
      <div class="text-right">
        <p>READY_TO_HYDRATE=TRUE</p>
      </div>
    </div>
  </div>
</template>
