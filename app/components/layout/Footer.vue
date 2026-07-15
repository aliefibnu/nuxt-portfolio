<script setup lang="ts">
const profile = useProfile();
const socials = useSocials();
</script>

<template>
  <footer
    id="contact"
    class="relative z-10 bg-white border-t border-stone-200 pt-20 md:pt-32 pb-12 overflow-hidden"
  >
    <div
      class="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between h-full"
    >
      <!-- Links Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-t border-stone-200"
      >
        <!-- Identity -->
        <div>
          <h3 class="font-headings font-bold text-stone-900 text-lg mb-4">
            Alief Ibnu Hamdani
          </h3>
          <p class="text-xs text-stone-500 font-mono leading-relaxed">
            Siswa SMK Negeri 7 Batam jurusan Rekayasa Perangkat Lunak.
            Berdedikasi tinggi membangun sistem web fullstack yang modern &
            scalable.
          </p>
        </div>

        <!-- Location details -->
        <div>
          <h3
            class="font-headings font-bold text-stone-900 text-sm mb-4 uppercase tracking-wider"
          >
            Detail Lokasi
          </h3>
          <div class="text-xs font-mono text-stone-500 space-y-1">
            <p>Batam, Kepulauan Riau</p>
            <p>Indonesia 🇮🇩 (WIB / UTC+7)</p>
            <p class="text-blue-600 pt-1 font-semibold">
              Tersedia untuk Magang, Part-time & Freelance
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="pt-8 border-t border-stone-200 flex flex-col items-center gap-6"
      >
        <p class="text-[10px] md:text-xs font-mono text-stone-400 text-center">
          © {{ new Date().getFullYear() }} Alief Ibnu Hamdani. Seluruh hak cipta
          dilindungi.
        </p>

        <!-- Social Buttons -->
        <div class="flex flex-wrap justify-center gap-3">
          <!-- GitHub -->
          <a
            href="https://github.com/aliefibnu"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-xs font-mono text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
          >
            <Icon
              name="simple-icons:github"
              class="w-4 h-4 transition-transform group-hover:scale-110"
            />
            <span>aliefibnu</span>
          </a>

          <!-- Email -->
          <a
            href="mailto:volterotech@gmail.com"
            class="group flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-xs font-mono text-stone-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
          >
            <Icon
              name="lucide:mail"
              class="w-4 h-4 transition-transform group-hover:scale-110"
            />
            <span>volterotech@gmail.com</span>
          </a>

          <!-- LinkedIn -->
          <button
            disabled
            class="flex items-center gap-2 rounded-full border border-dashed border-stone-300 px-4 py-2 text-xs font-mono text-stone-400 cursor-not-allowed"
          >
            <Icon name="simple-icons:linkedin" class="w-4 h-4" />
            <span>Soon</span>
          </button>

          <!-- TikTok -->
          <a
            href="https://www.tiktok.com/@ftre_starr"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-xs font-mono text-stone-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
          >
            <Icon
              name="simple-icons:tiktok"
              class="w-4 h-4 transition-transform group-hover:scale-110"
            />
            <span>@ftre_starr</span>
          </a>

          <!-- Instagram -->
          <a
            href="https://instagram.com/alff.41_"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-xs font-mono text-stone-600 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300"
          >
            <Icon
              name="simple-icons:instagram"
              class="w-4 h-4 transition-transform group-hover:scale-110"
            />
            <span>@alff.41_</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
