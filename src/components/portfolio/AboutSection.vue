<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { User, Quote } from 'lucide-vue-next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  name?: string;
  title?: string;
  longBio: string;
  avatarUrl: string;
  quote?: string;
}>();

let ctx: gsap.Context | null = null;
const photoRef = ref<HTMLElement | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  if (!photoRef.value) return;
  const rect = photoRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(photoRef.value, {
    rotateY: x * 0.04,
    rotateX: -y * 0.04,
    ease: "power1.out",
    duration: 0.4,
  });
};

const handleMouseLeave = () => {
  if (!photoRef.value) return;
  gsap.to(photoRef.value, {
    rotateY: 0,
    rotateX: 0,
    ease: "power2.out",
    duration: 0.6,
  });
};

onMounted(() => {
  ctx = gsap.context(() => {
    // Header reveal
    gsap.from(".about-header", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
    });

    // Editorial Card reveal
    gsap.from(".about-card", {
      scrollTrigger: {
        trigger: ".about-card",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      scale: 0.98,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
    });

    // Stagger photo & bio text inside
    gsap.from(".about-photo-wrapper", {
      scrollTrigger: {
        trigger: ".about-card",
        start: "top 80%",
      },
      x: -25,
      opacity: 0,
      duration: 0.7,
      delay: 0.2,
      ease: "power2.out",
      clearProps: "all",
    });

    gsap.from(".about-bio-wrapper", {
      scrollTrigger: {
        trigger: ".about-card",
        start: "top 80%",
      },
      x: 25,
      opacity: 0,
      duration: 0.7,
      delay: 0.3,
      ease: "power2.out",
      clearProps: "all",
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="about" class="py-20 sm:py-24 relative bg-slate-50 border-b border-slate-200 overflow-hidden">
    <!-- Subtle Monochrome Grid Background -->
    <div class="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
      
      <!-- Section Header (NO TITLE BADGE - Strict AGENTS.md rule) -->
      <div class="about-header text-left max-w-2xl space-y-2">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
          Tentang Saya
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Mengenal lebih dekat sosok di balik baris kode dan pengembangan aplikasi.
        </p>
      </div>

      <!-- Editorial Card (Foto + Bio Desktop/Mobile) -->
      <div class="about-card mono-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs bg-white relative overflow-hidden hover:border-slate-300 transition-colors">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Column 1: Portrait Photo Frame (5 Cols) -->
          <div class="about-photo-wrapper lg:col-span-5 flex justify-center perspective-1000">
            <div 
              ref="photoRef"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
              class="relative group w-full max-w-xs aspect-4/5 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 cursor-pointer"
            >
              <img 
                :src="avatarUrl" 
                :alt="name || 'Alief Ibnu Hamdani'" 
                class="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                @error="(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'; }"
              />
            </div>
          </div>

          <!-- Column 2: Name & Detailed Bio from JSON (7 Cols) -->
          <div class="about-bio-wrapper lg:col-span-7 space-y-5">
            
            <!-- Header Name & Title from JSON -->
            <div class="space-y-1 border-b border-slate-100 pb-4">
              <div class="flex items-center gap-2 text-slate-900">
                <User class="w-5 h-5 text-sky-600" />
                <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
                  {{ name || 'Alief Ibnu Hamdani' }}
                </h3>
              </div>
              <p class="text-xs sm:text-sm font-semibold text-slate-500 font-mono tracking-wide pl-7">
                {{ title || 'Fullstack & Backend Developer' }}
              </p>
            </div>

            <!-- Quote Accent Box from JSON -->
            <div v-if="quote" class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 relative overflow-hidden">
              <Quote class="w-6 h-6 text-slate-300 absolute top-3 right-3 pointer-events-none" />
              <p class="text-xs sm:text-sm font-medium text-slate-700 italic leading-relaxed relative z-10">
                "{{ quote }}"
              </p>
            </div>

            <!-- Long Bio Text from JSON -->
            <div class="text-slate-600 leading-relaxed text-xs sm:text-sm font-normal space-y-3">
              <p class="first-letter:text-3xl first-letter:font-extrabold first-letter:font-heading first-letter:text-slate-900 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {{ longBio }}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>
