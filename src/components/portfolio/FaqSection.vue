<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronDown, MessageSquare } from 'lucide-vue-next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  question: string;
  answer: string;
}

const props = defineProps<{
  items: FaqItem[];
}>();

const openIndex = ref<number | null>(0);
let ctx: gsap.Context | null = null;

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.faq-header', {
      scrollTrigger: {
        trigger: '#faq',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
    });

    ScrollTrigger.batch('.faq-card', {
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 30,
          opacity: 0,
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
  <section id="faq" class="py-20 sm:py-24 bg-white border-b border-slate-200 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header (NO TITLE BADGE - Strict AGENTS.md rule) -->
      <div class="faq-header text-left mb-12 space-y-2">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
          Pertanyaan Umum
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Informasi mengenai kompetensi, ketersediaan magang, dan kolaborasi.
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(item, idx) in items" 
          :key="idx"
          class="faq-card mono-card rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 bg-white hover:border-slate-300"
        >
          <button 
            @click="toggleFaq(idx)"
            class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-slate-700 transition-colors cursor-pointer"
          >
            <span class="flex items-center gap-3">
              <MessageSquare class="w-4 h-4 text-sky-600 shrink-0" />
              {{ item.question }}
            </span>
            <ChevronDown 
              class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
              :class="{ 'rotate-180 text-slate-900': openIndex === idx }"
            />
          </button>

          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div 
              v-if="openIndex === idx" 
              class="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 mt-1 font-normal"
            >
              {{ item.answer }}
            </div>
          </Transition>
        </div>
      </div>

    </div>
  </section>
</template>
