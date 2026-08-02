<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  Briefcase,
  Calendar,
  Building2,
  Award,
  CheckCircle2,
  Code2,
  Sparkles,
  Layers,
  Clock,
  ArrowUpRight,
  GraduationCap,
} from "lucide-vue-next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
}

const props = defineProps<{
  items: ExperienceItem[];
}>();

const activeFilter = ref<"all" | "industry" | "training">("all");
let ctx: gsap.Context | null = null;

const isTrainingOrComp = (item: ExperienceItem) => {
  const role = item.role.toLowerCase();
  const company = item.company.toLowerCase();
  return (
    role.includes("trainee") ||
    role.includes("juara") ||
    company.includes("lks")
  );
};

const filteredItems = computed(() => {
  if (activeFilter.value === "all") return props.items;
  if (activeFilter.value === "industry") {
    return props.items.filter((item) => !isTrainingOrComp(item));
  }
  return props.items.filter((item) => isTrainingOrComp(item));
});

const getIcon = (item: ExperienceItem) => {
  if (item.role.toLowerCase().includes("juara")) return Award;
  if (item.role.toLowerCase().includes("trainee")) return GraduationCap;
  return Briefcase;
};

onMounted(() => {
  ctx = gsap.context(() => {
    // Header reveal
    gsap.from(".exp-header", {
      scrollTrigger: {
        trigger: "#experience",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
    });

    // Timeline Line Scrub progress animation
    gsap.fromTo(
      ".exp-line-progress",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-timeline-stream",
          start: "top 75%",
          end: "bottom 75%",
          scrub: 0.2,
        },
      }
    );

    // Timeline Items batch reveal
    ScrollTrigger.batch(".exp-timeline-item", {
      onEnter: (batch) => {
        gsap.from(batch, {
          x: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: "auto",
          clearProps: "all",
        });

        // Animate nodes inside the batch
        batch.forEach((el) => {
          const node = el.querySelector(".exp-node");
          if (node) {
            gsap.from(node, {
              scale: 0,
              rotate: -45,
              duration: 0.4,
              delay: 0.1,
              ease: "back.out(1.7)",
              clearProps: "all",
            });
          }
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
    id="experience"
    class="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative overflow-hidden"
  >
    <!-- Subtle Grid Background Pattern -->
    <div
      class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"
    ></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- 2-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <!-- LEFT COLUMN: Sticky Section Info & Stats -->
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-28 space-y-6">
            <!-- Section Header -->
            <div class="exp-header space-y-3">
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading"
              >
                Pelatihan & Pengalaman Industri
              </h2>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                Menggabungkan pembelajaran kurikulum sekolah dengan
                keikutsertaan intensif di dunia industri digital dan kompetensi
                keahlian.
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Interactive Timeline Stream with Scrub Line -->
        <div
          class="exp-timeline-stream lg:col-span-7 relative ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-8 sm:space-y-10"
        >
          <!-- Background Base Line -->
          <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 pointer-events-none"></div>
          <!-- Animated Scrub Line -->
          <div class="exp-line-progress absolute left-0 top-0 bottom-0 w-0.5 bg-slate-900 origin-top pointer-events-none"></div>

          <TransitionGroup
            name="timeline-list"
            tag="div"
            class="space-y-8 sm:space-y-10"
          >
            <div
              v-for="(exp, idx) in filteredItems"
              :key="exp.company + exp.role"
              class="exp-timeline-item relative group"
            >
              <!-- Timeline Icon Node -->
              <div
                class="exp-node absolute -left-[43px] sm:-left-[59px] top-1.5 w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 shadow-2xs group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-10"
              >
                <component
                  :is="getIcon(exp)"
                  class="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <!-- Main Card Container -->
              <div
                class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-400 transition-all duration-300 space-y-4 hover:-translate-y-0.5"
              >
                <!-- Header Info -->
                <div
                  class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3"
                >
                  <div>
                    <h3
                      class="text-lg sm:text-xl font-bold text-slate-900 font-heading tracking-tight group-hover:text-slate-800 transition-colors flex items-center gap-2"
                    >
                      <span>{{ exp.role }}</span>
                    </h3>

                    <div
                      class="flex items-center gap-1.5 text-xs text-slate-600 font-medium pt-0.5"
                    >
                      <Building2 class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{{ exp.company }}</span>
                    </div>
                  </div>

                  <div
                    class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 text-slate-700 font-mono text-xs font-semibold self-start sm:self-center shrink-0"
                  >
                    <Calendar class="w-3.5 h-3.5 text-slate-500" />
                    <span>{{ exp.duration }}</span>
                  </div>
                </div>

                <!-- Responsibilities List -->
                <div class="space-y-2">
                  <span
                    class="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block"
                    >Tanggung Jawab & Kegiatan</span
                  >
                  <ul class="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li
                      v-for="(resp, rIdx) in exp.responsibilities"
                      :key="rIdx"
                      class="flex items-start gap-2.5 group/item"
                    >
                      <CheckCircle2
                        class="w-4 h-4 text-slate-400 group-hover/item:text-slate-900 shrink-0 mt-0.5 transition-colors duration-200"
                      />
                      <span
                        class="leading-relaxed group-hover/item:text-slate-900 transition-colors duration-200"
                        >{{ resp }}</span
                      >
                    </li>
                  </ul>
                </div>

                <!-- Achievements Callout Box -->
                <div
                  v-if="exp.achievements && exp.achievements.length"
                  class="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium group-hover:bg-slate-100/60 transition-colors"
                >
                  <Award class="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                  <div>
                    <span>{{ exp.achievements.join(" ") }}</span>
                  </div>
                </div>

                <!-- Tech Stack Tags -->
                <div
                  v-if="exp.technologies && exp.technologies.length"
                  class="pt-1 flex flex-wrap items-center gap-1.5"
                >
                  <span
                    v-for="tech in exp.technologies"
                    :key="tech"
                    class="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 cursor-default shadow-2xs hover:scale-105"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-list-enter-active,
.timeline-list-leave-active {
  transition: all 0.4s ease;
}
.timeline-list-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.timeline-list-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
