<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const cardRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const { $gsap } = useNuxtApp() as any;

const onMouseMove = (e: MouseEvent) => {
  const card = cardRef.value;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // Mouse position inside card
  const y = e.clientY - rect.top;

  mouseX.value = x;
  mouseY.value = y;

  // Calculate percentage of mouse position relative to card boundaries
  const xc = rect.width / 2;
  const yc = rect.height / 2;

  // Max tilt: 10 degrees
  const tiltX = ((yc - y) / yc) * 8;
  const tiltY = ((x - xc) / xc) * 8;

  $gsap.to(card, {
    rotateX: tiltX,
    rotateY: tiltY,
    scale3d: [1.015, 1.015, 1.015],
    duration: 0.5,
    ease: "power2.out",
    transformPerspective: 1000,
  });
};

const onMouseLeave = () => {
  const card = cardRef.value;
  if (!card) return;

  $gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale3d: [1, 1, 1],
    duration: 0.8,
    ease: "power3.out",
  });
};

onMounted(() => {
  const card = cardRef.value;
  if (!card) return;

  // Scroll Reveal entrance
  $gsap.fromTo(
    card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    },
  );
});
</script>

<template>
  <!-- Card outer border container -->
  <div
    ref="cardRef"
    class="relative group rounded-2xl border border-stone-200 bg-white overflow-hidden cursor-pointer select-none transition-all duration-500 will-animate h-[240px] md:h-[280px] shadow-sm hover:shadow-md hover:border-stone-400"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    style="transform-style: preserve-3d"
  >
    <!-- Card Inner Content container -->
    <div
      class="relative z-10 w-full h-full bg-white rounded-[15px] p-5 md:p-6 flex flex-col justify-between overflow-hidden"
    >
      <!-- Project Index Header -->
      <div
        class="relative z-10 flex justify-between items-start font-mono text-[10px] text-stone-400"
        style="transform: translateZ(20px)"
      >
        <span>{{ project.category }}</span>
        <span>{{ project.year }}</span>
      </div>

      <!-- Card text block -->
      <div
        class="relative z-10 mt-auto space-y-1"
        style="transform: translateZ(30px)"
      >
        <!-- Technologies list -->
        <div class="flex flex-wrap gap-1">
          <span
            v-for="tech in project.technologies.slice(0, 3)"
            :key="tech"
            class="font-mono text-[8px] md:text-[9px] px-2 py-0.5 rounded bg-stone-100 border border-stone-200/50 text-stone-600"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Title & description -->
        <h3
          class="text-sm md:text-base lg:text-lg font-headings font-bold text-stone-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1"
        >
          {{ project.title }}
        </h3>
        <p
          class="text-[10px] md:text-xs text-stone-500 line-clamp-2 leading-relaxed"
        >
          {{ project.description }}
        </p>

        <!-- Action Buttons -->
        <div class="pt-3 flex items-center gap-2">
          <!-- View Project -->
          <a
            :href="
              project.demo_url !== '#'
                ? project.demo_url
                : project.repository_url
            "
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 text-stone-600 hover:text-white hover:bg-stone-900 hover:border-stone-900 transition-all duration-300 text-[9px] font-mono"
          >
            <span>VIEW PROJECT</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </a>

          <!-- GitHub Profile -->
          <a
            href="https://github.com/aliefibnu"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 text-stone-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.95c.58.1.79-.25.79-.56v-2.02c-3.26.71-3.95-1.57-3.95-1.57-.53-1.34-1.3-1.69-1.3-1.69-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.43.98.11-.76.41-1.28.74-1.58-2.6-.3-5.33-1.3-5.33-5.79 0-1.28.46-2.33 1.21-3.15-.12-.3-.52-1.53.12-3.2 0 0 .99-.32 3.25 1.2a11.2 11.2 0 015.92 0c2.26-1.52 3.25-1.2 3.25-1.2.64 1.67.24 2.9.12 3.2.75.82 1.21 1.87 1.21 3.15 0 4.5-2.73 5.49-5.34 5.78.42.36.79 1.08.79 2.17v3.22c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
