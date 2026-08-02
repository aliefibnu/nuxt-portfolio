<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  Github, 
  Calendar, 
  ArrowUpRight,
  Code2,
  ExternalLink
} from 'lucide-vue-next';
import ProjectModal from './ProjectModal.vue';
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

const selectedProject = ref<Project | null>(null);
const isModalOpen = ref(false);
let ctx: gsap.Context | null = null;

const openModal = (project: Project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProject.value = null;
};

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.batch('.featured-project-card', {
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 35,
          opacity: 0,
          scale: 0.96,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          overwrite: 'auto',
          clearProps: 'all',
        });
      },
      start: 'top 85%',
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div 
        v-for="project in projects" 
        :key="project.slug"
        class="featured-project-card mono-card rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group bg-white"
      >
        <!-- Compact Image Preview Banner (Controlled Height: h-32 sm:h-36 md:h-40) -->
        <div 
          @click="openModal(project)"
          class="relative h-32 sm:h-36 md:h-40 bg-slate-100 overflow-hidden cursor-pointer group/img border-b border-slate-100"
        >
          <img 
            :src="project.thumbnail" 
            :alt="project.title"
            class="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          <!-- Category & Year Overlay Badges -->
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <span class="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md border border-slate-200/80 text-slate-800 text-xs font-bold font-mono shadow-2xs">
              {{ project.category }}
            </span>
            <span class="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md border border-slate-200/80 text-slate-600 text-xs font-mono font-medium flex items-center gap-1 shadow-2xs">
              <Calendar class="w-3 h-3 text-slate-500" />
              {{ project.year }}
            </span>
          </div>
        </div>

        <!-- Card Body Content -->
        <div class="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div class="space-y-1">
            <!-- Project Title -->
            <h3 
              @click="openModal(project)"
              class="text-base font-extrabold text-slate-900 font-heading tracking-tight group-hover:text-slate-700 transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>{{ project.title }}</span>
              <ArrowUpRight class="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors shrink-0" />
            </h3>

            <!-- Short Description -->
            <p class="text-xs text-slate-600 leading-snug font-normal line-clamp-2">
              {{ project.description }}
            </p>
          </div>

          <div class="space-y-3 pt-1">
            <!-- Tech Stack Pills -->
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Actions Row: Compact Buttons -->
            <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <button 
                @click="openModal(project)"
                class="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs hover:scale-[1.02]"
              >
                <Code2 class="w-3.5 h-3.5" />
                <span>Detail</span>
              </button>

              <div class="flex items-center gap-1">
                <a 
                  v-if="project.demo_url && project.demo_url !== '#'"
                  :href="project.demo_url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer"
                  title="Lihat Live Demo"
                >
                  <ExternalLink class="w-3.5 h-3.5" />
                </a>

                <a 
                  v-if="project.repository_url && project.repository_url !== '#'"
                  :href="project.repository_url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer"
                  title="Lihat Repositori GitHub"
                >
                  <Github class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Project Detail Modal -->
    <ProjectModal 
      :project="selectedProject"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>
