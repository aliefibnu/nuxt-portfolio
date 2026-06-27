<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const profile = useProfile()
const config = usePortfolioConfig()

const isScrolled = ref(false)
const isVisible = ref(true)
const isMobileOpen = ref(false)

let lastScrollY = 0
const { $gsap } = useNuxtApp() as any

const onScroll = () => {
  const currentScrollY = window.scrollY
  
  // Highlight background on scroll down
  isScrolled.value = currentScrollY > 50

  // Hide header on scroll down, show on scroll up
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }
  
  lastScrollY = currentScrollY
}

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
  
  if (isMobileOpen.value) {
    // Lock scroll
    document.body.style.overflow = 'hidden'
    $gsap.fromTo('.mobile-nav-link', 
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
    )
  } else {
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-[40] transition-all duration-500 will-animate"
    :class="[
      isVisible ? 'translate-y-0' : '-translate-y-full',
      isScrolled ? 'py-4 bg-[#030303]/85 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent border-b border-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
      <!-- Logo / Name -->
      <a 
        href="#" 
        class="font-headings font-extrabold text-lg md:text-xl tracking-tight text-white flex items-center gap-2 group interactive-hover"
      >
        <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform duration-300"></span>
        {{ profile.nickname || 'ALIEF' }}<span class="text-cyan-400">.</span>
      </a>

      <!-- Desktop Nav Menu -->
      <nav class="hidden md:flex items-center gap-8 font-mono text-xs">
        <a href="#about" class="text-zinc-400 hover:text-white transition-colors duration-300 interactive-hover">ABOUT</a>
        <a v-if="config.features.projects" href="#projects" class="text-zinc-400 hover:text-white transition-colors duration-300 interactive-hover">WORK</a>
        <a v-if="config.features.experience" href="#experience" class="text-zinc-400 hover:text-white transition-colors duration-300 interactive-hover">TRAINING</a>
        <a href="#contact" class="text-zinc-400 hover:text-white transition-colors duration-300 interactive-hover">CONTACT</a>
      </nav>

      <!-- CTA Button -->
      <div class="hidden md:flex items-center">
        <a 
          :href="`mailto:${profile.email}`"
          class="font-mono text-xs tracking-wider px-5 py-2.5 bg-white text-black font-semibold rounded-full border border-white hover:bg-transparent hover:text-white transition-all duration-300 interactive-hover shadow-lg shadow-white/5"
        >
          GET IN TOUCH
        </a>
      </div>

      <!-- Hamburger Menu Icon (Mobile) -->
      <button 
        @click="toggleMobileMenu"
        class="block md:hidden text-white focus:outline-none w-8 h-8 relative interactive-hover z-[50]"
        aria-label="Toggle Menu"
      >
        <span 
          class="w-6 h-[2px] bg-white absolute left-1 transition-all duration-300"
          :class="isMobileOpen ? 'rotate-45 top-4' : 'top-2.5'"
        ></span>
        <span 
          class="w-6 h-[2px] bg-white absolute left-1 transition-all duration-300"
          :class="isMobileOpen ? '-rotate-45 top-4' : 'top-5'"
        ></span>
      </button>
    </div>

    <!-- Mobile Drawer Overlay -->
    <div 
      v-if="isMobileOpen"
      class="fixed inset-0 w-screen h-screen bg-[#030303] z-[45] flex flex-col justify-between p-8"
    >
      <div class="flex justify-between items-start mt-12">
        <span class="font-mono text-xs text-zinc-600">NAVIGATION</span>
      </div>

      <!-- Links -->
      <nav class="flex flex-col gap-6 text-4xl font-headings font-bold text-white select-none">
        <a 
          href="#about" 
          @click="toggleMobileMenu" 
          class="mobile-nav-link hover:text-cyan-400 transition-colors"
        >
          About
        </a>
        <a 
          v-if="config.features.projects"
          href="#projects" 
          @click="toggleMobileMenu" 
          class="mobile-nav-link hover:text-cyan-400 transition-colors"
        >
          Work
        </a>
        <a 
          v-if="config.features.experience"
          href="#experience" 
          @click="toggleMobileMenu" 
          class="mobile-nav-link hover:text-cyan-400 transition-colors"
        >
          Training
        </a>
        <a 
          href="#contact" 
          @click="toggleMobileMenu" 
          class="mobile-nav-link hover:text-cyan-400 transition-colors"
        >
          Contact
        </a>
      </nav>

      <!-- Drawer Footer details -->
      <div class="flex flex-col gap-4">
        <div class="h-[1px] bg-zinc-900 w-full"></div>
        <div class="flex justify-between items-center text-xs font-mono text-zinc-500">
          <span>volterotech@gmail.com</span>
          <span>BATAM, ID 🇮🇩</span>
        </div>
      </div>
    </div>
  </header>
</template>
