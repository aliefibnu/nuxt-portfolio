<script setup lang="ts">
import { ref, provide } from 'vue'

const isLoaded = ref(false)
const profile = useProfile()

// Provide loading state globally so page components can wait for the preloader to exit
provide('isSiteLoaded', isLoaded)

const onPreloadComplete = () => {
  isLoaded.value = true
}
</script>

<template>
  <div 
    class="relative min-h-screen bg-[#030303] text-white selection:bg-cyan-400 selection:text-black"
    :style="{ '--accent-color': profile.contact?.whatsapp || '#6AD3F7' }"
  >
    <!-- Entry preloader sequence -->
    <LayoutPreloader @loaded="onPreloadComplete" />

    <!-- Premium custom mouse cursor pointer -->
    <CreativeCustomCursor />

    <!-- Terminal Command Sandbox Easter Egg -->
    <CreativeTerminalSandbox />

    <!-- Atmospheric grain and grid graphics -->
    <div class="noise-overlay"></div>
    <div class="cyber-grid"></div>
    <div class="ambient-glow"></div>

    <!-- Centralised Navbar header -->
    <LayoutNavbar />

    <!-- Route page injection mount -->
    <main 
      class="relative z-10 transition-opacity duration-700"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
    >
      <slot />
    </main>
  </div>
</template>
