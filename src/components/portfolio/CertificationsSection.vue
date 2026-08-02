<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Award } from 'lucide-vue-next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  title: string;
  issuer: string;
  year: number;
}

const props = defineProps<{
  items: Certification[];
}>();

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.cert-header', {
      scrollTrigger: {
        trigger: '#certifications',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
    });

    ScrollTrigger.batch('.cert-card', {
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 30,
          opacity: 0,
          scale: 0.96,
          duration: 0.5,
          stagger: 0.08,
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
  <section id="certifications" class="py-20 sm:py-24 bg-slate-50 border-b border-slate-200 relative">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header (NO TITLE BADGE - Strict AGENTS.md rule) -->
      <div class="cert-header text-left max-w-3xl mb-12 space-y-2">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
          Penghargaan & Sertifikasi
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Apresiasi atas prestasi akademik, sekolah, dan kompetisi.
        </p>
      </div>

      <!-- Certifications Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="cert in items"
          :key="cert.title"
          class="cert-card mono-card rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4 bg-white hover:border-slate-300 transition-all hover:shadow-2xs hover:-translate-y-0.5"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-sky-600 shrink-0">
              <Award class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 leading-snug">
                {{ cert.title }}
              </h3>
              <p class="text-xs text-slate-500 font-medium pt-0.5">{{ cert.issuer }}</p>
            </div>
          </div>

          <span class="text-xs font-mono font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
            {{ cert.year }}
          </span>
        </div>
      </div>

    </div>
  </section>
</template>
