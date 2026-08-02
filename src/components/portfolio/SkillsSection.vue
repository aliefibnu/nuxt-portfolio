<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  Code,
  Layers,
  Server,
  Database,
  Smartphone,
  Cpu,
  Info,
} from "lucide-vue-next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  icon: string;
  level: string;
  years: number;
  description: string;
  featured: boolean;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

const props = defineProps<{
  categories: SkillCategory[];
}>();

const hoveredSkill = ref<string | null>(null);
let ctx: gsap.Context | null = null;

// Category Icons Meta with 25% optional icon color accent
const getCategoryMeta = (category: string) => {
  switch (category) {
    case "Languages":
      return { icon: Code, color: "text-sky-600" };
    case "Frontend":
      return { icon: Layers, color: "text-indigo-600" };
    case "Backend":
      return { icon: Server, color: "text-emerald-600" };
    case "Database & Cloud":
      return { icon: Database, color: "text-violet-600" };
    case "Mobile":
      return { icon: Smartphone, color: "text-amber-600" };
    default:
      return { icon: Cpu, color: "text-slate-700" };
  }
};

onMounted(() => {
  ctx = gsap.context(() => {
    // Header reveal
    gsap.from(".skills-header", {
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "opacity,transform",
    });

    // Category cards batch reveal with clean clearProps
    ScrollTrigger.batch(".skills-cat-card", {
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 35,
          opacity: 0,
          scale: 0.96,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: "auto",
          clearProps: "all",
        });
      },
      start: "top 85%",
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    id="skills"
    class="py-24 bg-white border-b border-slate-200 relative"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header (Clean H2 Title + Optional Desc - Strict AGENTS.md rule) -->
      <div class="skills-header text-left max-w-3xl mb-14 space-y-2">
        <h2
          class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading"
        >
          Tech Stack & Ekosistem Teknologi
        </h2>
        <p class="text-slate-500 text-base">
          Penguasaan bahasa pemrograman, framework, dan database.
        </p>
      </div>

      <!-- Category Cards Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
      >
        <div
          v-for="cat in categories"
          :key="cat.category"
          class="skills-cat-card mono-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 relative flex flex-col justify-between bg-white hover:border-slate-400 transition-all duration-300"
        >
          <!-- Category Card Header -->
          <div class="flex items-center gap-3 pb-4 border-b border-slate-100">
            <!-- Monochrome Element Background, Optional 25% Icon Color Accent -->
            <div
              class="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800"
            >
              <component 
                :is="getCategoryMeta(cat.category).icon" 
                :class="['w-5 h-5', getCategoryMeta(cat.category).color]" 
              />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 tracking-tight font-heading">
                {{ cat.category }}
              </h3>
              <span class="text-xs text-slate-500 font-medium font-mono"
                >{{ cat.items.length }} Teknologi</span
              >
            </div>
          </div>

          <!-- Unified Skills List Inside Category Card -->
          <div class="flex flex-wrap gap-2.5 relative">
            <div
              v-for="skill in cat.items"
              :key="skill.name"
              @mouseenter="hoveredSkill = `${cat.category}-${skill.name}`"
              @mouseleave="hoveredSkill = null"
              class="skills-chip relative group/chip"
            >
              <!-- Default Chip (Strict Monochrome Element Background & Text) -->
              <div
                class="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-2xs hover:scale-[1.03]"
              >
                <span>{{ skill.name }}</span>
                <Info
                  class="w-3 h-3 text-slate-400 group-hover/chip:text-white transition-colors"
                />
              </div>

              <!-- Hover Detail Popover -->
              <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 translate-y-1 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 translate-y-1 scale-95"
              >
                <div
                  v-if="hoveredSkill === `${cat.category}-${skill.name}`"
                  class="absolute bottom-full left-0 mb-2 w-64 z-30 p-4 rounded-2xl bg-white text-slate-800 border border-slate-200 shadow-xl space-y-2 pointer-events-none"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-extrabold text-slate-900">{{
                      skill.name
                    }}</span>
                    <span
                      class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200 font-mono"
                    >
                      {{ skill.level }}
                    </span>
                  </div>

                  <p
                    class="text-[11px] text-slate-600 leading-relaxed font-normal"
                  >
                    {{ skill.description }}
                  </p>

                  <div
                    class="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono"
                  >
                    <span>Pengalaman</span>
                    <span class="font-bold font-mono text-slate-800"
                      >{{ skill.years }} Tahun</span
                    >
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
