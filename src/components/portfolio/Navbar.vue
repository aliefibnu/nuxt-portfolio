<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  Terminal,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  Award,
  HelpCircle,
  Menu,
  X,
  Github,
} from "lucide-vue-next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const activeSection = ref("hero");
let ctx: gsap.Context | null = null;

const navItems = [
  { name: "Tentang", href: "#about", icon: User },
  { name: "Pendidikan", href: "#education", icon: Briefcase },
  { name: "Tech Stack", href: "#skills", icon: Cpu },
  { name: "Karir", href: "#experience", icon: Briefcase },
  { name: "Proyek", href: "#projects", icon: FolderGit2 },
  { name: "Sertifikasi", href: "#certifications", icon: Award },
  { name: "FAQ", href: "#faq", icon: HelpCircle },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;

  const sections = [
    "hero",
    "about",
    "education",
    "skills",
    "experience",
    "projects",
    "certifications",
    "faq",
  ];

  const scrollPosition = window.scrollY + 100;

  for (const sectionId of sections) {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = sectionId;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  ctx = gsap.context(() => {
    // Scroll progress bar indicator
    gsap.to(".nav-progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    // Navbar items gentle entrance stagger on load
    gsap.from(".nav-brand-logo", {
      opacity: 0,
      x: -15,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
    });

    gsap.from(".nav-link-item", {
      opacity: 0,
      y: -10,
      duration: 0.5,
      stagger: 0.04,
      ease: "power2.out",
      delay: 0.15,
      clearProps: "all",
    });
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  ctx?.revert();
});

const scrollTo = (href: string) => {
  mobileMenuOpen.value = false;
  const targetId = href.replace("#", "");
  const el = document.getElementById(targetId);
  if (el) {
    const yOffset = -70;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[isScrolled ? 'mono-nav py-3 shadow-2xs' : 'bg-transparent py-4']"
  >
    <!-- Scroll Progress Line -->
    <div class="absolute top-0 left-0 right-0 h-0.5 bg-slate-200 overflow-hidden pointer-events-none">
      <div class="nav-progress-bar h-full bg-slate-900 origin-left scale-x-0 transition-transform"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Brand Logo -->
        <a
          href="#hero"
          @click.prevent="scrollTo('#hero')"
          class="nav-brand-logo flex items-center gap-2.5 cursor-pointer group"
        >
          <div
            class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-slate-800 transition-colors"
          >
            <Terminal class="w-4 h-4 text-sky-400" />
          </div>
          <div class="flex flex-col">
            <span class="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight font-heading">
              Alief Ibnu
            </span>
            <span
              class="text-xs font-mono font-medium text-slate-500 uppercase -mt-0.5"
            >
              Fullstack Dev
            </span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollTo(item.href)"
            class="nav-link-item px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            :class="[
              activeSection === item.href.replace('#', '')
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
            ]"
          >
            <component :is="item.icon" class="w-3.5 h-3.5" />
            {{ item.name }}
          </a>
        </nav>

        <!-- Right Quick Actions -->
        <div class="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/aliefibnu"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-all cursor-pointer shadow-2xs"
            title="GitHub Profile"
          >
            <Github class="w-4 h-4 text-slate-900" />
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer shadow-2xs"
          aria-label="Toggle Menu"
        >
          <Menu v-if="!mobileMenuOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden mt-2 px-4 pb-4">
        <div
          class="mono-card rounded-2xl p-3 space-y-1 border border-slate-200 shadow-xl bg-white"
        >
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollTo(item.href)"
            class="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            :class="[
              activeSection === item.href.replace('#', '')
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100',
            ]"
          >
            <component :is="item.icon" class="w-4 h-4" />
            {{ item.name }}
          </a>

          <div
            class="pt-3 border-t border-slate-100 flex items-center justify-between px-2"
          >
            <span class="text-xs text-slate-500 font-medium">Status:</span>
            <div
              class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold font-mono border border-slate-200"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open for Hire
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
