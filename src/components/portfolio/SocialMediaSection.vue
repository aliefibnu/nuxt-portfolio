<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import {
  Instagram,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Video,
} from "lucide-vue-next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SocialMedia {
  name: string;
  label: string;
  url: string;
  badgeClass: string;
  iconColor?: string;
  type: string;
}

const props = defineProps<{
  items: SocialMedia[];
}>();

let ctx: gsap.Context | null = null;

const getIcon = (type: string) => {
  switch (type) {
    case "instagram":
      return Instagram;
    case "tiktok":
      return Video;
    case "whatsapp":
      return MessageCircle;
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "gmail":
      return Mail;
    default:
      return Mail;
  }
};

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.batch(".social-badge", {
      onEnter: (batch) => {
        gsap.from(batch, {
          scale: 0.85,
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.5)",
          overwrite: "auto",
          clearProps: "all",
        });
      },
      start: "top 90%",
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section class="py-10 bg-slate-50 border-b border-slate-200">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          v-for="social in items"
          :key="social.name"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-badge px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-sm bg-white text-slate-800 border border-slate-200 hover:bg-slate-900 hover:text-white group"
        >
          <component
            :is="getIcon(social.type)"
            :class="['w-4 h-4 transition-colors', social.iconColor || 'text-slate-800', 'group-hover:text-white']"
          />
          <span>{{ social.name }}</span>
          <span class="text-slate-500 group-hover:text-slate-300 font-mono text-xs font-normal transition-colors"
            >({{ social.label }})</span
          >
        </a>
      </div>
    </div>
  </section>
</template>
