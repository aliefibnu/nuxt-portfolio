<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { ChevronDown, Code2 } from "lucide-vue-next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioData {
  name?: string;
  title?: string;
  short_bio?: string;
}

const props = defineProps<{
  data: PortfolioData;
}>();

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    // Hero Entrance Timeline with clearProps to avoid inline opacity/transform lock
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-title", {
      opacity: 0,
      y: 35,
      duration: 1,
      clearProps: "opacity,transform",
    })
      .from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          clearProps: "opacity,transform",
        },
        "-=0.5"
      )
      .from(
        ".hero-scroll-btn",
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.7)",
          clearProps: "opacity,transform",
        },
        "-=0.4"
      );

    // Continuous floating ambient glow
    gsap.to(".hero-glow", {
      y: -15,
      scale: 1.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Parallax effect on scroll down (clean, hardware-accelerated transform)
    gsap.to(".hero-bg-img", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
    });

    gsap.to(".hero-content-box", {
      y: -25,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});

const scrollToAbout = () => {
  const el = document.getElementById("about");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <section
    id="hero"
    class="relative w-full min-h-screen flex flex-col items-center justify-between pt-28 pb-12 overflow-hidden bg-slate-50"
  >
    <!-- Background Image (Clear & Crisp with Subtle Light Overlay & GSAP Parallax) -->
    <div class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <img
        src="/bg-hero.webp"
        alt="Hero Background"
        class="hero-bg-img w-full h-full object-cover object-center filter brightness-95 contrast-[1.02] origin-center will-change-transform"
      />
      <!-- Subtle Overlay for Clear & Crisp Background -->
      <div class="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
    </div>

    <!-- Ambient Light Glow with floating loop -->
    <div
      class="hero-glow absolute w-[500px] h-[500px] bg-slate-200/30 rounded-full blur-3xl pointer-events-none z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    ></div>

    <!-- Center Content: All data dynamically bound from JSON -->
    <div
      class="hero-content-box my-auto max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-4 relative z-10 will-change-transform"
    >
      <!-- Main Name from JSON -->
      <h1
        class="hero-title font-heading text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight select-none"
      >
        {{ data.name || "Alief Ibnu Hamdani" }}
      </h1>

      <!-- Title / Role from JSON with subtle icon color accent -->
      <div class="hero-subtitle flex items-center justify-center gap-2 text-slate-700">
        <Code2 class="w-4 h-4 text-sky-600 shrink-0" />
        <p
          class="text-sky-600 text-sm sm:text-base font-semibold font-mono tracking-wide"
        >
          {{ data.title || "Fullstack & Backend Developer" }}
        </p>
      </div>
    </div>

    <!-- Animated Scroll Down Arrow Button -->
    <div class="hero-scroll-btn relative z-10 pt-4">
      <button
        @click="scrollToAbout"
        class="group p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-sky-500 transition-all duration-300 shadow-2xs cursor-pointer flex flex-col items-center gap-1 hover:scale-105"
        aria-label="Scroll ke Section Berikutnya"
        title="Scroll ke bawah"
      >
        <ChevronDown
          class="w-5 h-5 text-sky-600 group-hover:text-slate-900 animate-bounce"
        />
      </button>
    </div>
  </section>
</template>
