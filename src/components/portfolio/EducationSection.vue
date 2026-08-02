<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { GraduationCap, Users } from 'lucide-vue-next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Education {
  degree: string;
  institution: string;
  duration: string;
}

interface Organization {
  name: string;
  role: string;
  description: string;
}

const props = defineProps<{
  education: Education[];
  organizations: Organization[];
}>();

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    // Header reveal
    gsap.from('.edu-header', {
      scrollTrigger: {
        trigger: '#education',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // Education and Organization Cards staggered slide up
    gsap.from('.edu-card', {
      scrollTrigger: {
        trigger: '.edu-card-container',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // Sub-items stagger inside cards
    gsap.from('.edu-item', {
      scrollTrigger: {
        trigger: '.edu-card-container',
        start: 'top 75%',
      },
      y: 15,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
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
  <section id="education" class="py-20 sm:py-24 bg-slate-50 border-b border-slate-200 relative">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header (NO TITLE BADGE - Strict AGENTS.md rule) -->
      <div class="edu-header text-left max-w-3xl mb-12 space-y-2">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
          Pendidikan & Organisasi
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Latar belakang pendidikan formal dan aktivitas keorganisasian sekolah.
        </p>
      </div>

      <div class="edu-card-container grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Pendidikan Card -->
        <div class="edu-card mono-card rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 bg-white hover:border-slate-300 transition-colors">
          <div class="flex items-center gap-3 text-slate-900 font-bold text-lg font-heading">
            <div class="p-2.5 rounded-xl bg-slate-50 text-sky-600 border border-slate-200">
              <GraduationCap class="w-5 h-5" />
            </div>
            <span>Pendidikan Formal</span>
          </div>

          <div v-for="(edu, idx) in education" :key="idx" class="edu-item p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:bg-white hover:shadow-2xs transition-all hover:-translate-y-0.5">
            <span class="text-sm font-bold text-slate-900 block">{{ edu.degree }}</span>
            <p class="text-xs text-slate-600 font-medium">{{ edu.institution }}</p>
            <span class="text-xs text-slate-500 font-mono inline-block pt-0.5">{{ edu.duration }}</span>
          </div>
        </div>

        <!-- Organisasi Card -->
        <div class="edu-card mono-card rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 bg-white hover:border-slate-300 transition-colors">
          <div class="flex items-center gap-3 text-slate-900 font-bold text-lg font-heading">
            <div class="p-2.5 rounded-xl bg-slate-50 text-indigo-600 border border-slate-200">
              <Users class="w-5 h-5" />
            </div>
            <span>Aktivitas Organisasi</span>
          </div>

          <div v-for="org in organizations" :key="org.name" class="edu-item p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:bg-white hover:shadow-2xs transition-all hover:-translate-y-0.5">
            <span class="text-sm font-bold text-slate-900 block">{{ org.name }}</span>
            <span class="text-xs text-slate-700 font-semibold block">{{ org.role }}</span>
            <p class="text-xs text-slate-600 leading-relaxed font-normal pt-0.5">{{ org.description }}</p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
