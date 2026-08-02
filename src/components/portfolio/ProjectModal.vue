<script setup lang="ts">
import { 
  X, 
  Github, 
  ExternalLink,
  Calendar, 
  HelpCircle,
  Lightbulb,
  BookOpen
} from 'lucide-vue-next';

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
  project: Project | null;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isOpen && project" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto"
      @click.self="emit('close')"
    >
      <div 
        class="mono-card rounded-2xl border border-slate-200 max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden bg-white relative animate-in fade-in zoom-in-95 duration-200"
        @click.stop
      >
        <!-- Modal Top Bar -->
        <div class="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold">
              {{ project.category }}
            </span>
            <span class="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono font-medium flex items-center gap-1">
              <Calendar class="w-3 h-3 text-slate-500" />
              {{ project.year }}
            </span>
            <span v-if="project.status" class="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono font-bold">
              {{ project.status }}
            </span>
          </div>

          <button 
            @click="emit('close')"
            class="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Modal Body Content (Scrollable) -->
        <div class="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm">
          
          <!-- Controlled Height Image Preview Header (h-36 sm:h-44) -->
          <div class="h-36 sm:h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
            <img 
              :src="project.thumbnail" 
              :alt="project.title" 
              class="w-full h-full object-cover object-top"
            />
          </div>

          <!-- Project Title -->
          <div class="space-y-1">
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
              {{ project.title }}
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {{ project.long_description || project.description }}
            </p>
          </div>

          <!-- Technologies Stack -->
          <div class="space-y-1.5 pt-2 border-t border-slate-100">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Teknologi Digunakan:</h4>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Key Highlights -->
          <div class="space-y-2.5 pt-2 border-t border-slate-100">
            <div v-if="project.challenges" class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div class="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                <HelpCircle class="w-3.5 h-3.5 text-slate-700" />
                <span>Tantangan Utama</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ project.challenges }}
              </p>
            </div>

            <div v-if="project.solutions" class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div class="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                <Lightbulb class="w-3.5 h-3.5 text-slate-700" />
                <span>Solusi Arsitektur</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ project.solutions }}
              </p>
            </div>

            <div v-if="project.lessons_learned" class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div class="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                <BookOpen class="w-3.5 h-3.5 text-slate-700" />
                <span>Pembelajaran Utama</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ project.lessons_learned }}
              </p>
            </div>
          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <a 
              v-if="project.repository_url && project.repository_url !== '#'"
              :href="project.repository_url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Github class="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a 
              v-if="project.demo_url && project.demo_url !== '#'"
              :href="project.demo_url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ExternalLink class="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          </div>

          <button 
            @click="emit('close')"
            class="px-3.5 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>
