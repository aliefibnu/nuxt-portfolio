<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { ArrowUp } from 'lucide-vue-next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterData {
  name: string;
  role: string;
}

const props = defineProps<{
  data: FooterData;
}>();

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.footer-content', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 95%',
      },
      y: 15,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'all',
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <footer class="bg-white text-slate-900 py-8 relative border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="footer-content flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        <div class="flex items-center gap-2 text-slate-700 font-medium">
          <span class="font-bold text-slate-900 font-heading">{{ data.name || "Alief Ibnu Hamdani" }}</span>
          <span class="text-slate-300">•</span>
          <span class="text-slate-500 font-mono">{{ data.role || "Fullstack & Backend Developer" }}</span>
        </div>

        <div class="flex items-center gap-4 text-slate-500 font-mono">
          <span>© {{ new Date().getFullYear() }}</span>
          <button 
            @click="scrollToTop"
            class="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-bold cursor-pointer transition-colors"
            title="Kembali ke atas"
          >
            <span>Atas</span>
            <ArrowUp class="w-3.5 h-3.5 text-sky-600" />
          </button>
        </div>

      </div>
    </div>
  </footer>
</template>
