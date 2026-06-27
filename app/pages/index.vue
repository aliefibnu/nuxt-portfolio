<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'

const profile = useProfile()
const socials = useSocials()
const portfolio = usePortfolio()
const config = usePortfolioConfig()
const siteConfig = useSiteConfig()

// Loading status inject
const isSiteLoaded = inject('isSiteLoaded', ref(false))

// FAQ active state
const activeFaq = ref<number | null>(null)

const { $gsap, $ScrollTrigger } = useNuxtApp() as any

// Toggle Accordions
const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// SEO Tags
useSeoMeta({
  title: () => `${profile.fullName} | ${profile.title}`,
  description: () => profile.longBio,
  ogTitle: () => `${profile.fullName} | ${profile.title}`,
  ogDescription: () => profile.longBio,
  ogImage: () => profile.avatar || 'https://github.com/aliefibnu.png',
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  // Wait for loading screen to complete before running entrance animations
  watch(isSiteLoaded, (loaded) => {
    if (loaded) {
      triggerHeroAnimation()
    }
  }, { immediate: true })

  // Trigger scroll-reveals for sections
  setupScrollReveals()
})

const triggerHeroAnimation = () => {
  const tl = $gsap.timeline()
  
  tl.fromTo('.hero-title-char',
    { yPercent: 110, rotateX: -60 },
    { yPercent: 0, rotateX: 0, duration: 1.2, stagger: 0.03, ease: 'power4.out' }
  )
  .fromTo('.hero-sub',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.6'
  )
  .fromTo('.hero-btn',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
    '-=0.4'
  )
}

const setupScrollReveals = () => {
  // Statistics counter scrolling trigger
  const stats = document.querySelectorAll('.stat-number')
  stats.forEach(stat => {
    const rawVal = parseInt(stat.getAttribute('data-value') || '0')
    if (isNaN(rawVal)) return

    $gsap.fromTo(stat,
      { textContent: '0' },
      {
        textContent: rawVal.toString(),
        duration: 2.0,
        ease: 'power3.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  // Fade sections on scroll
  const sections = document.querySelectorAll('.scroll-fade')
  sections.forEach(section => {
    $gsap.fromTo(section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  })
}
</script>

<template>
  <div class="relative overflow-hidden w-full">
    <!-- =========================================================================
         SECTION 1: HERO VIEWPORT
         ========================================================================= -->
    <section 
      id="hero"
      class="relative min-h-[100dvh] flex items-center justify-center pt-24 overflow-hidden border-b border-white/5"
    >
      <!-- Generative Interactive Flow Field particles -->
      <CreativeFlowField />

      <div class="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 text-center">
        <!-- Display Name -->
        <div class="overflow-hidden mb-6 flex justify-center flex-wrap select-none">
          <h1 class="text-5xl md:text-8xl lg:text-[9.5rem] font-headings font-extrabold text-white tracking-tighter leading-none flex flex-wrap justify-center">
            <span 
              v-for="(char, idx) in profile.fullName.split('')" 
              :key="idx"
              class="hero-title-char inline-block will-animate"
              :class="{ 'mr-4 md:mr-8': char === ' ' }"
            >
              {{ char }}
            </span>
          </h1>
        </div>

        <!-- Tagline / Title subheaders -->
        <div class="max-w-2xl mx-auto space-y-6 hero-sub opacity-0">
          <p class="font-mono text-cyan-400 text-xs md:text-sm tracking-[0.2em] uppercase">
            {{ profile.title }}
          </p>
          <p class="text-sm md:text-lg text-zinc-400 font-sans leading-relaxed">
            {{ profile.tagline }}
          </p>
        </div>

        <!-- CTA Trigger Button -->
        <div class="mt-10 hero-btn opacity-0">
          <UiMagneticButton>
            <a 
              href="#about"
              class="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/15 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Scroll Down"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 animate-bounce">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </UiMagneticButton>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 2: ABOUT & SKILLS
         ========================================================================= -->
    <section 
      id="about"
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 relative z-10 scroll-fade"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Biography details -->
        <div class="lg:col-span-7 space-y-8">
          <span class="font-mono text-xs text-cyan-400 tracking-widest block uppercase">TENTANG SAYA</span>
          <h2 class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-white leading-tight">
            Membangun sistem modern, andal, dan siap skala.
          </h2>
          <p class="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            {{ portfolio.longBio }}
          </p>

          <!-- Interactive info cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div class="glass-panel p-6 border border-white/5 bg-zinc-950/20">
              <h4 class="font-headings font-bold text-white mb-2">Pendidikan</h4>
              <p class="text-xs text-zinc-500 font-mono">
                SMK Negeri 7 Batam - Rekayasa Perangkat Lunak (RPL)
              </p>
            </div>
            <div class="glass-panel p-6 border border-white/5 bg-zinc-950/20">
              <h4 class="font-headings font-bold text-white mb-2">Lokasi & Jam Kerja</h4>
              <p class="text-xs text-zinc-500 font-mono">
                Batam, Indonesia (WIB / UTC+7)
              </p>
            </div>
          </div>
        </div>

        <!-- Avatar Portrait block -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden group shadow-2xl shadow-cyan-500/5 border border-white/5">
            <div class="absolute inset-0 bg-cyan-400/10 mix-blend-color group-hover:opacity-0 transition-opacity duration-500"></div>
            <img 
              :src="profile.avatar" 
              alt="Alief Portrait" 
              class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      <!-- Skills Category Boards -->
      <div class="mt-24 md:mt-32 space-y-12">
        <h3 class="font-headings font-extrabold text-2xl md:text-3xl text-white">
          Teknologi Yang Dikuasai
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="group in portfolio.skills" 
            :key="group.category"
            class="glass-panel p-6 border border-white/5 bg-zinc-950/20 space-y-6"
          >
            <h4 class="font-headings font-bold text-white text-lg border-b border-white/5 pb-3">
              {{ group.category }}
            </h4>
            
            <div class="space-y-4">
              <div 
                v-for="skill in group.items" 
                :key="skill.name"
                class="flex flex-col gap-1.5"
              >
                <div class="flex justify-between items-center text-xs font-mono text-zinc-400">
                  <span>{{ skill.name }}</span>
                  <span class="text-zinc-600 text-[10px]">{{ skill.level }}</span>
                </div>
                <!-- Mini Skill Bar -->
                <div class="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-cyan-400/80 rounded-full"
                    :style="{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : '60%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 3: PORTFOLIO WORKS
         ========================================================================= -->
    <section 
      v-if="config.features.projects"
      id="projects"
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-white/5 scroll-fade"
    >
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <span class="font-mono text-xs text-cyan-400 tracking-widest block uppercase mb-4">SHOWCASE</span>
          <h2 class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-white leading-tight">
            Proyek Pilihan
          </h2>
        </div>
        <p class="text-xs md:text-sm text-zinc-500 font-mono max-w-xs">
          Galeri aplikasi modern yang dibangun dengan fokus pada performa dan skalabilitas database.
        </p>
      </div>

      <!-- Grid Projects Container -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UiProjectCard 
          v-for="project in portfolio.projects" 
          :key="project.slug"
          :project="project"
        />
      </div>
    </section>

    <!-- =========================================================================
         SECTION 4: EXPERIENCE / TRAINING
         ========================================================================= -->
    <section 
      v-if="config.features.experience"
      id="experience"
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-white/5 scroll-fade"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Pinned left-column title -->
        <div class="lg:col-span-5 space-y-4">
          <span class="font-mono text-xs text-cyan-400 tracking-widest block uppercase">RIWAYAT</span>
          <h2 class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-white leading-tight">
            Pelatihan & Pengalaman Industri
          </h2>
          <p class="text-xs md:text-sm text-zinc-500 font-mono leading-relaxed max-w-sm pt-4">
            Menggabungkan pembelajaran kurikulum sekolah dengan keikutsertaan intensif di dunia industri digital.
          </p>
        </div>

        <!-- Right scrolling list -->
        <div class="lg:col-span-7 space-y-12">
          <div 
            v-for="(job, index) in portfolio.experience" 
            :key="job.company"
            class="relative pl-8 border-l border-white/5"
          >
            <!-- Timeline dot indicator -->
            <div class="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50"></div>

            <div class="space-y-4">
              <div class="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 class="font-headings font-bold text-white text-xl md:text-2xl">
                    {{ job.role }}
                  </h3>
                  <p class="font-mono text-xs text-zinc-500">
                    {{ job.company }}
                  </p>
                </div>
                <span class="font-mono text-[10px] text-cyan-400 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  {{ job.duration }}
                </span>
              </div>

              <!-- Responsibilities lists -->
              <ul class="space-y-2 text-xs md:text-sm text-zinc-400 font-sans list-disc list-inside leading-relaxed">
                <li v-for="resp in job.responsibilities" :key="resp">
                  {{ resp }}
                </li>
              </ul>

              <!-- Technologies tags -->
              <div class="flex flex-wrap gap-1.5 pt-2">
                <span 
                  v-for="tech in job.technologies" 
                  :key="tech"
                  class="font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 5: STATS BANNER
         ========================================================================= -->
    <section 
      v-if="config.features.stats"
      class="bg-[#050507] border-y border-white/5 py-16 md:py-24 relative z-10 scroll-fade"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div 
            v-for="stat in portfolio.statistics" 
            :key="stat.key"
            class="text-center md:text-left space-y-2"
          >
            <!-- Label -->
            <span class="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
              {{ stat.label }}
            </span>
            <!-- Value counter -->
            <p class="font-headings font-black text-4xl md:text-6xl text-white tracking-tight leading-none">
              <span 
                class="stat-number inline-block"
                :data-value="stat.raw_number"
              >
                0
              </span>
              <span v-if="stat.value.includes('+')" class="text-cyan-400">+</span>
              <span v-else-if="stat.value.includes('st')" class="text-cyan-400 text-2xl md:text-3xl font-bold">st</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 6: FAQ ACCORDION
         ========================================================================= -->
    <section 
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 relative z-10 scroll-fade border-b border-white/5"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div class="lg:col-span-5 space-y-4">
          <span class="font-mono text-xs text-cyan-400 tracking-widest block uppercase">JAWABAN</span>
          <h2 class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-white leading-tight">
            Pertanyaan Umum
          </h2>
          <p class="text-xs md:text-sm text-zinc-500 font-mono leading-relaxed max-w-sm pt-4">
            Beberapa informasi tambahan untuk memudahkan Anda mengenali workflow saya.
          </p>
        </div>

        <div class="lg:col-span-7 space-y-6">
          <div 
            v-for="(faq, idx) in portfolio.faq" 
            :key="idx"
            class="border-b border-white/5 pb-4 cursor-pointer group"
            @click="toggleFaq(idx)"
          >
            <div class="flex justify-between items-center py-2 text-white">
              <h3 class="font-headings font-bold text-base md:text-lg group-hover:text-cyan-300 transition-colors duration-300">
                {{ faq.question }}
              </h3>
              <!-- Arrow toggle indicator -->
              <span class="text-zinc-500 transform transition-transform duration-300" :class="{ 'rotate-180 text-cyan-400': activeFaq === idx }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </div>
            <!-- Expanded text container -->
            <div 
              v-show="activeFaq === idx"
              class="pt-2 text-xs md:text-sm text-zinc-400 font-sans leading-relaxed transition-all duration-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 7: FOOTER
         ========================================================================= -->
    <LayoutFooter />
  </div>
</template>

<style scoped>
.hero-title-char {
  display: inline-block;
  transform-style: preserve-3d;
}
</style>
