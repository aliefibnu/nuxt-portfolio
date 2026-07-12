<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({ statusCode: 404, message: 'Page not found' })
  }
})

const isGlitching = ref(true)
const profile = useProfile()
const config = usePortfolioConfig()

const handleClearError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="relative min-h-screen bg-[#FAFAF9] text-[#1C1917] flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none">
    <!-- Background layers -->
    <div class="noise-overlay"></div>
    <div class="cyber-grid"></div>
    <div class="ambient-glow"></div>

    <!-- Top Branding row -->
    <div class="relative z-10 flex justify-between items-start font-mono text-xs text-stone-400">
      <div>
        <p>SYSTEM STATUS: ANOMALY_DETECTED</p>
        <p>CODE: {{ error.statusCode }}</p>
      </div>
      <div class="text-right">
        <a href="/" class="hover:text-stone-900 transition-colors duration-300">/ HOME</a>
      </div>
    </div>

    <!-- Central Error content -->
    <div class="relative z-10 my-auto text-center space-y-8 max-w-lg mx-auto">
      <div class="relative inline-block select-none">
        <!-- Glitched massive error code -->
        <h1 
          class="font-headings font-black text-8xl md:text-9xl tracking-tighter leading-none relative text-stone-900"
          :class="{ 'animate-pulse': isGlitching }"
        >
          {{ error.statusCode }}
        </h1>
        <span class="absolute inset-0 text-blue-600 opacity-10 -translate-x-1 translate-y-1 font-headings font-black text-8xl md:text-9xl tracking-tighter leading-none blur-[2px] pointer-events-none select-none">
          {{ error.statusCode }}
        </span>
      </div>

      <!-- Description -->
      <div class="space-y-3">
        <p class="font-mono text-xs text-blue-600 tracking-[0.2em] uppercase font-semibold">
          ANOMALY DETECTED
        </p>
        <p class="text-sm md:text-base text-stone-600 leading-relaxed font-sans">
          {{ error.message || 'Halaman yang Anda cari telah dipindahkan, dihapus, atau tidak pernah ada.' }}
        </p>
      </div>

      <!-- CTA Back Home -->
      <div class="pt-4">
        <UiMagneticButton>
          <button 
            @click="handleClearError"
            class="px-8 py-4 bg-stone-900 text-white font-headings font-bold rounded-full hover:bg-blue-600 transition-all duration-300 shadow-sm"
          >
            KEMBALI KE BERANDA
          </button>
        </UiMagneticButton>
      </div>
    </div>

    <!-- Bottom details row -->
    <div class="relative z-10 flex justify-between items-end font-mono text-[10px] md:text-xs text-stone-400">
      <div>
        <p>©{{ new Date().getFullYear() }} ALIEF IBNU HAMDANI</p>
      </div>
      <div class="text-right">
        <p>SYSTEM_EXIT=FALSE</p>
      </div>
    </div>
  </div>
</template>
