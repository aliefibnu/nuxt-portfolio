<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  FolderGit2, 
  Github
} from 'lucide-vue-next';
import FeaturedProjects from './FeaturedProjects.vue';
import GithubLiveProjects from './GithubLiveProjects.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  thumbnail: string;
  demo_url: string;
  repository_url: string;
  technologies: string[];
  year: number;
  category: string;
  featured: boolean;
  status: string;
  challenges: string;
  solutions: string;
  lessons_learned: string;
}

const props = defineProps<{
  projects: Project[];
}>();

const activeTab = ref<'featured' | 'github'>('featured');
let ctx: gsap.Context | null = null;

const switchTab = (tab: 'featured' | 'github') => {
  activeTab.value = tab;
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
};

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.projects-header', {
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
    });

    gsap.from('.projects-tab-container', {
      scrollTrigger: {
        trigger: '.projects-tab-container',
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.out',
      clearProps: 'all',
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="projects" class="py-24 bg-slate-50 border-b border-slate-200 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="projects-header text-left max-w-3xl mb-12 space-y-2">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
          Proyek & Repositori
        </h2>
        <p class="text-slate-500 text-base">
          Eksplorasi proyek aplikasi web unggulan serta repositori publik di GitHub.
        </p>
      </div>

      <!-- Light Mode Tab Switcher -->
      <div class="projects-tab-container flex justify-start mb-10">
        <div class="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <button
            @click="switchTab('featured')"
            class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            :class="[
              activeTab === 'featured'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            ]"
          >
            <FolderGit2 class="w-4 h-4" />
            <span>Proyek Unggulan</span>
          </button>

          <button
            @click="switchTab('github')"
            class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            :class="[
              activeTab === 'github'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            ]"
          >
            <Github class="w-4 h-4" />
            <span>Repositori GitHub</span>
          </button>
        </div>
      </div>

      <!-- Tab Contents -->
      <div>
        <transition
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div :key="activeTab">
            <FeaturedProjects 
              v-if="activeTab === 'featured'"
              :projects="projects"
            />

            <GithubLiveProjects 
              v-else-if="activeTab === 'github'"
            />
          </div>
        </transition>
      </div>

    </div>
  </section>
</template>
