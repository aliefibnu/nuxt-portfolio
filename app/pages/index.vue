<script setup lang="ts">
import { ref, inject, onMounted, computed } from "vue";

const profile = useProfile();
const socials = useSocials();
const portfolio = usePortfolio();
const config = usePortfolioConfig();
const siteConfig = useSiteConfig();

// Fetch projects dynamically from local files + Github API
const { data: projects } = await useFetch("/api/projects", {
  default: () => portfolio.projects,
});

// View more projects state
const showAllProjects = ref(false);
const displayedProjects = computed(() => {
  const list = projects.value || [];
  return showAllProjects.value ? list : list.slice(0, 4);
});

// Loading status inject
const isSiteLoaded = inject("isSiteLoaded", ref(false));

// FAQ active state
const activeFaq = ref<number | null>(null);

const { $gsap, $ScrollTrigger } = useNuxtApp() as any;

// Toggle Accordions
const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

// SEO Tags
useSeoMeta({
  title: () => `${profile.fullName} | ${profile.title}`,
  description: () => profile.longBio,
  keywords: () => siteConfig.keywords,
  ogTitle: () => `${profile.fullName} | ${profile.title}`,
  ogDescription: () => profile.longBio,
  ogImage: () => siteConfig.image || "/alief.jpg",
  twitterCard: "summary_large_image",
});

// JSON-LD Structured Data for Google Rich Snippets & Canonical Links
useHead({
  htmlAttrs: {
    lang: siteConfig.language || "id",
  },
  link: [
    { rel: "canonical", href: config.url || "https://github.com/aliefibnu" },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.fullName,
        alternateName: profile.nickname,
        jobTitle: profile.title,
        url: config.url || "https://github.com/aliefibnu",
        image: profile.avatar,
        email: profile.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Batam",
          addressRegion: "Kepulauan Riau",
          addressCountry: "ID",
        },
        description: profile.shortBio,
        sameAs: [socials.github, `mailto:${profile.email}`].filter(Boolean),
      }),
    },
  ],
});

onMounted(() => {
  // Wait for loading screen to complete before running entrance animations
  watch(
    isSiteLoaded,
    (loaded) => {
      if (loaded) {
        triggerHeroAnimation();
      }
    },
    { immediate: true },
  );

  // Trigger scroll-reveals for sections
  setupScrollReveals();
});

const triggerHeroAnimation = () => {
  const tl = $gsap.timeline();

  tl.fromTo(
    ".hero-title-char",
    { yPercent: 110, rotateX: -60 },
    {
      yPercent: 0,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.03,
      ease: "power4.out",
    },
  )
    .fromTo(
      ".hero-sub",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6",
    )
    .fromTo(
      ".hero-btn",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.4",
    );
};

const setupScrollReveals = () => {
  // 1. Statistics counter scrolling trigger
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const rawVal = parseInt(stat.getAttribute("data-value") || "0");
    if (isNaN(rawVal)) return;

    $gsap.fromTo(
      stat,
      { textContent: "0" },
      {
        textContent: rawVal.toString(),
        duration: 2.0,
        ease: "power3.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // 2. Generic stagger reveal for all elements inside container elements with data-scroll-group
  const groups = document.querySelectorAll("[data-scroll-group]");
  groups.forEach((group) => {
    // Select all animable children
    const children = group.querySelectorAll(
      "h2, h3, h4, p, span:not(.stat-number):not(.hero-title-char), li, .glass-panel, .timeline-item, img, a, button, .relative.pl-8",
    );

    // Filter out nested layout elements to prevent double triggers
    const animTargets = Array.from(children).filter((child) => {
      const nearestGroup = child.closest("[data-scroll-group]");
      return nearestGroup === group;
    });

    $gsap.fromTo(
      animTargets,
      { opacity: 0, y: 35, rotateX: -6 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
};
</script>

<template>
  <div class="relative overflow-hidden w-full bg-[#FAFAF9]">
    <!-- =========================================================================
         SECTION 1: HERO VIEWPORT
         ========================================================================= -->
    <section
      id="hero"
      class="relative min-h-[100dvh] flex items-center justify-center pt-24 overflow-hidden border-b border-stone-200/60 bg-cover bg-center bg-no-repeat"
      style="background-image: url(&quot;/bg-hero.webp&quot;)"
    >
      <!-- Soft ambient overlay to ensure high readability -->
      <div
        class="absolute inset-0 bg-[#FAFAF9]/60 backdrop-blur-[2px] z-0"
      ></div>

      <div
        class="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-0 text-center"
      >
        <!-- Display Name -->
        <div
          class="overflow-hidden mb-6 flex justify-center flex-wrap select-none"
        >
          <h1
            class="text-5xl md:text-8xl lg:text-[8rem] font-headings font-extrabold text-stone-900 tracking-tighter leading-none flex flex-wrap justify-center"
          >
            <span
              v-for="(char, idx) in profile.devname.split(' ')"
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
          <p
            class="font-mono text-blue-600 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold"
          >
            {{ profile.title }}
          </p>
          <p
            class="text-sm md:text-lg text-stone-600 font-sans leading-relaxed"
          >
            {{ profile.tagline }}
          </p>
        </div>

        <!-- CTA Trigger Button -->
        <div class="mt-10 hero-btn opacity-0">
          <UiMagneticButton>
            <a
              href="#about"
              class="inline-flex items-center justify-center w-12 h-12 rounded-full border border-stone-300 text-stone-600 hover:border-stone-950 hover:text-stone-950 transition-colors duration-300 shadow-sm"
              aria-label="Scroll Down"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5 animate-bounce"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
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
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 relative z-10"
      data-scroll-group
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <!-- Biography details -->
        <div class="lg:col-span-7 space-y-8">
          <span
            class="font-mono text-xs text-blue-600 tracking-widest block uppercase font-semibold"
            >TENTANG SAYA</span
          >
          <h2
            class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-stone-900 leading-tight"
          >
            Membangun sistem modern, andal, dan siap skala.
          </h2>
          <p
            class="text-sm md:text-base text-stone-600 font-sans leading-relaxed"
          >
            {{ portfolio.longBio }}
          </p>

          <!-- Interactive info cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div class="glass-panel p-6 border border-stone-200 bg-white">
              <h4 class="font-headings font-bold text-stone-900 mb-2 text-lg">
                Pendidikan
              </h4>
              <p class="text-xs text-stone-500 font-mono">
                SMK Negeri 7 Batam - Rekayasa Perangkat Lunak (RPL)
              </p>
            </div>
            <div class="glass-panel p-6 border border-stone-200 bg-white">
              <h4 class="font-headings font-bold text-stone-900 mb-2 text-lg">
                Lokasi & Jam Kerja
              </h4>
              <p class="text-xs text-stone-500 font-mono">
                Batam, Indonesia (WIB / UTC+7)
              </p>
            </div>
          </div>
        </div>

        <!-- Avatar Portrait block -->
        <div class="lg:col-span-5 flex justify-center">
          <div
            class="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden group shadow-md border border-stone-200 bg-white"
          >
            <img
              src="/alief.jpg"
              alt="Alief Portrait"
              class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      <!-- Skills Category Boards -->
      <div class="mt-24 md:mt-32 space-y-12">
        <h3
          class="font-headings font-extrabold text-2xl md:text-3xl text-stone-900"
        >
          Teknologi Yang Dikuasai
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="group in portfolio.skills"
            :key="group.category"
            class="glass-panel p-6 border border-stone-200 bg-white space-y-6"
          >
            <h4
              class="font-headings font-bold text-stone-900 text-lg border-b border-stone-100 pb-3"
            >
              {{ group.category }}
            </h4>

            <div class="space-y-4">
              <div
                v-for="skill in group.items"
                :key="skill.name"
                class="flex flex-col gap-1.5"
              >
                <div
                  class="flex justify-between items-center text-xs font-mono text-stone-600"
                >
                  <span>{{ skill.name }}</span>
                  <span class="text-stone-400 text-[10px]">{{
                    skill.level
                  }}</span>
                </div>
                <!-- Mini Skill Bar -->
                <div
                  class="w-full h-[3px] bg-stone-100 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-blue-600 rounded-full"
                    :style="{
                      width:
                        skill.level === 'Expert'
                          ? '95%'
                          : skill.level === 'Advanced'
                            ? '80%'
                            : '60%',
                    }"
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
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-stone-200"
      data-scroll-group
    >
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
      >
        <div>
          <span
            class="font-mono text-xs text-blue-600 tracking-widest block uppercase mb-4 font-semibold"
            >SHOWCASE</span
          >
          <h2
            class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-stone-900 leading-tight"
          >
            Gallery Proyek
          </h2>
        </div>
      </div>

      <!-- Grid Projects Container (4 cols on desktop, 2 cols on mobile) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <UiProjectCard
          v-for="project in displayedProjects"
          :key="project.slug"
          :project="project"
        />
      </div>

      <!-- View More Button -->
      <div
        v-if="projects && projects.length > 4"
        class="mt-12 text-center relative z-10"
      >
        <UiMagneticButton>
          <button
            @click="showAllProjects = !showAllProjects"
            class="px-6 py-3 border border-stone-300 hover:border-stone-900 rounded-full text-xs font-mono text-stone-600 hover:text-stone-900 transition-all duration-300 shadow-sm"
          >
            {{ showAllProjects ? "VIEW LESS" : "VIEW MORE" }}
          </button>
        </UiMagneticButton>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 4: EXPERIENCE / TRAINING
         ========================================================================= -->
    <section
      v-if="config.features.experience"
      id="experience"
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-stone-200"
      data-scroll-group
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Pinned left-column title -->
        <div class="lg:col-span-5 space-y-4">
          <span
            class="font-mono text-xs text-blue-600 tracking-widest block uppercase font-semibold"
            >RIWAYAT</span
          >
          <h2
            class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-stone-900 leading-tight"
          >
            Pelatihan & Pengalaman Industri
          </h2>
          <p
            class="text-xs md:text-sm text-stone-500 font-mono leading-relaxed max-w-sm pt-4"
          >
            Menggabungkan pembelajaran kurikulum sekolah dengan keikutsertaan
            intensif di dunia industri digital.
          </p>
        </div>

        <!-- Right scrolling list -->
        <div class="lg:col-span-7 space-y-12">
          <div
            v-for="(job, index) in portfolio.experience"
            :key="job.company"
            class="relative pl-8 border-l border-stone-200"
          >
            <!-- Timeline dot indicator -->
            <div
              class="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-stone-900 shadow-sm"
            ></div>

            <div class="space-y-4">
              <div class="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3
                    class="font-headings font-bold text-stone-900 text-xl md:text-2xl"
                  >
                    {{ job.role }}
                  </h3>
                  <p class="font-mono text-xs text-stone-500">
                    {{ job.company }}
                  </p>
                </div>
                <span
                  class="font-mono text-[10px] text-stone-600 px-3 py-1 bg-stone-100 rounded-full border border-stone-200"
                >
                  {{ job.duration }}
                </span>
              </div>

              <!-- Responsibilities lists -->
              <ul
                class="space-y-2 text-xs md:text-sm text-stone-600 font-sans list-disc list-inside leading-relaxed"
              >
                <li v-for="resp in job.responsibilities" :key="resp">
                  {{ resp }}
                </li>
              </ul>

              <!-- Technologies tags -->
              <div class="flex flex-wrap gap-1.5 pt-2">
                <span
                  v-for="tech in job.technologies"
                  :key="tech"
                  class="font-mono text-[9px] px-2 py-0.5 rounded bg-stone-100 border border-stone-200/50 text-stone-600"
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
      class="bg-stone-100/50 border-y border-stone-200 py-16 md:py-24 relative z-10"
      data-scroll-group
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div
            v-for="stat in portfolio.statistics"
            :key="stat.key"
            class="text-center md:text-left space-y-2"
          >
            <!-- Label -->
            <span
              class="font-mono text-[10px] text-stone-500 uppercase tracking-wider block"
            >
              {{ stat.label }}
            </span>
            <!-- Value counter -->
            <p
              class="font-headings font-black text-4xl md:text-6xl text-stone-900 tracking-tight leading-none"
            >
              <span
                class="stat-number inline-block"
                :data-value="stat.raw_number"
              >
                0
              </span>
              <span v-if="stat.value.includes('+')" class="text-blue-600"
                >+</span
              >
              <span
                v-else-if="stat.value.includes('st')"
                class="text-blue-600 text-2xl md:text-3xl font-bold"
                >st</span
              >
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 6: FAQ ACCORDION
         ========================================================================= -->
    <section
      class="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 relative z-10 border-b border-stone-200"
      data-scroll-group
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div class="lg:col-span-5 space-y-4">
          <span
            class="font-mono text-xs text-blue-600 tracking-widest block uppercase font-semibold"
            >JAWABAN</span
          >
          <h2
            class="text-3xl md:text-5xl font-headings font-extrabold tracking-tight text-stone-900 leading-tight"
          >
            Pertanyaan Umum
          </h2>
          <p
            class="text-xs md:text-sm text-stone-500 font-mono leading-relaxed max-w-sm pt-4"
          >
            Beberapa informasi tambahan untuk memudahkan Anda mengenali workflow
            saya.
          </p>
        </div>

        <div class="lg:col-span-7 space-y-6">
          <div
            v-for="(faq, idx) in portfolio.faq"
            :key="idx"
            class="border-b border-stone-200 pb-4 cursor-pointer group"
            @click="toggleFaq(idx)"
          >
            <div class="flex justify-between items-center py-2 text-stone-900">
              <h3
                class="font-headings font-bold text-base md:text-lg group-hover:text-blue-600 transition-colors duration-300"
              >
                {{ faq.question }}
              </h3>
              <!-- Arrow toggle indicator -->
              <span
                class="text-stone-400 transform transition-transform duration-300"
                :class="{ 'rotate-180 text-blue-600': activeFaq === idx }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            <!-- Expanded text container -->
            <div
              v-show="activeFaq === idx"
              class="pt-2 text-xs md:text-sm text-stone-600 font-sans leading-relaxed transition-all duration-300"
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
