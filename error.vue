<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
  <div class="relative min-h-screen bg-[#030303] text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none">
    <!-- Background layers -->
    <div class="noise-overlay"></div>
    <div class="cyber-grid"></div>
    <div class="ambient-glow"></div>
    
    <!-- Generative flowing particles back panel -->
    <CreativeFlowField />

    <!-- Top Branding row -->
    <div class="relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500">
      <div>
        <p>SYSTEM STATUS: ANOMALY_DETECTED</p>
        <p>CODE: {{ error.statusCode }}</p>
      </div>
      <div class="text-right">
        <a href="/" class="hover:text-white transition-colors duration-300">/ HOME</a>
      </div>
    </div>

    <!-- Central Error content -->
    <div class="relative z-10 my-auto text-center space-y-8 max-w-lg mx-auto">
      <div class="relative inline-block select-none">
        <!-- Glitched massive error code -->
        <h1 
          class="font-headings font-black text-8xl md:text-9xl tracking-tighter leading-none relative text-white"
          :class="{ 'animate-pulse': isGlitching }"
        >
          {{ error.statusCode }}
        </h1>
        <span class="absolute inset-0 text-cyan-400 opacity-20 -translate-x-1 translate-y-1 font-headings font-black text-8xl md:text-9xl tracking-tighter leading-none blur-[2px] pointer-events-none select-none">
          {{ error.statusCode }}
        </span>
      </div>

      <!-- Description -->
      <div class="space-y-3">
        <p class="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase">
          ANOMALY DETECTED IN THE DATABASE
        </p>
        <p class="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
          {{ error.message || 'Halaman yang Anda cari telah dipindahkan, dihapus, atau tidak pernah ada.' }}
        </p>
      </div>

      <!-- CTA Back Home -->
      <div class="pt-4">
        <UiMagneticButton>
          <button 
            @click="handleClearError"
            class="px-8 py-4 bg-white text-black font-headings font-bold rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-xl shadow-cyan-400/5 hover:shadow-cyan-400/20"
          >
            KEMBALI KE BERANDA
          </button>
        </UiMagneticButton>
      </div>
    </div>

    <!-- Bottom details row -->
    <div class="relative z-10 flex justify-between items-end font-mono text-[10px] md:text-xs text-zinc-600">
      <div>
        <p>©{{ new Date().getFullYear() }} ALIEF IBNU HAMDANI</p>
      </div>
      <div class="text-right">
        <p>SYSTEM_EXIT=FALSE</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.02;
  pointer-events: none;
  z-index: 9999;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.cyber-grid {
  position: fixed;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;
  pointer-events: none;
  z-index: 0;
}

.ambient-glow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vh;
  background: radial-gradient(circle, rgba(106, 211, 247, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  filter: blur(80px);
}
</style>
