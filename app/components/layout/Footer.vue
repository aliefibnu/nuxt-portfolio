<script setup lang="ts">
const profile = useProfile()
const socials = useSocials()
</script>

<template>
  <footer 
    id="contact"
    class="relative z-10 bg-[#050507] border-t border-white/5 pt-20 md:pt-32 pb-12 overflow-hidden"
  >
    <!-- Background glow accents -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vh] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between h-full">
      <!-- High Impact CTA Header -->
      <div class="max-w-3xl mb-16 md:mb-24">
        <span class="font-mono text-xs text-cyan-400 tracking-widest block mb-4 uppercase">KOLABORASI</span>
        <h2 class="text-4xl md:text-7xl font-headings font-extrabold text-white tracking-tight leading-[1.05] mb-8">
          Tertarik membangun proyek bersama? Mari terhubung!
        </h2>
        
        <!-- Large Magnetic Contact Button -->
        <UiMagneticButton>
          <a 
            :href="`mailto:${profile.email}`"
            class="inline-flex items-center gap-3 px-8 py-5 bg-white text-black font-headings font-bold text-lg md:text-xl rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-xl shadow-cyan-400/5 hover:shadow-cyan-400/20"
          >
            {{ profile.email }}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </UiMagneticButton>
      </div>

      <!-- Links Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-white/5">
        <!-- Identity -->
        <div>
          <h3 class="font-headings font-bold text-white text-lg mb-4">
            Alief Ibnu Hamdani
          </h3>
          <p class="text-xs text-zinc-500 font-mono leading-relaxed">
            Siswa SMK Negeri 7 Batam jurusan Rekayasa Perangkat Lunak. Berdedikasi tinggi membangun sistem web fullstack yang modern & scalable.
          </p>
        </div>

        <!-- Sitemap Quick links -->
        <div>
          <h3 class="font-headings font-bold text-white text-sm mb-4 uppercase tracking-wider">
            Sitemap
          </h3>
          <div class="flex flex-col gap-2 text-xs font-mono">
            <a href="#about" class="text-zinc-500 hover:text-white transition-colors">/ Tentang Saya</a>
            <a href="#projects" class="text-zinc-500 hover:text-white transition-colors">/ Proyek Pilihan</a>
            <a href="#experience" class="text-zinc-500 hover:text-white transition-colors">/ Pelatihan & Edukasi</a>
            <a href="#contact" class="text-zinc-500 hover:text-white transition-colors">/ Hubungi Saya</a>
          </div>
        </div>

        <!-- Location details -->
        <div>
          <h3 class="font-headings font-bold text-white text-sm mb-4 uppercase tracking-wider">
            Detail Lokasi
          </h3>
          <div class="text-xs font-mono text-zinc-500 space-y-1">
            <p>Batam, Kepulauan Riau</p>
            <p>Indonesia 🇮🇩 (WIB / UTC+7)</p>
            <p class="text-cyan-400/90 pt-1 font-semibold">Tersedia untuk Magang, Part-time & Freelance</p>
          </div>
        </div>
      </div>

      <!-- Footer bottom row -->
      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] md:text-xs font-mono text-zinc-600 gap-4">
        <div>
          <p>©{{ new Date().getFullYear() }} Alief Ibnu Hamdani. Seluruh hak cipta dilindungi.</p>
        </div>
        
        <!-- Social Link badges -->
        <div class="flex gap-4">
          <a 
            :href="socials.github" 
            target="_blank" 
            class="text-zinc-500 hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <span class="text-zinc-800">/</span>
          <a 
            :href="`mailto:${profile.email}`" 
            class="text-zinc-500 hover:text-white transition-colors"
          >
            EMAIL
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
