<script setup lang="ts">
interface TimelineItem {
  year: string;
  title?: string;
  event: string;
}

const props = defineProps<{
  items: TimelineItem[];
}>();
</script>

<template>
  <section id="timeline" class="py-24 bg-white border-b border-slate-200 relative">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-left max-w-3xl mb-12 space-y-2">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Milestones Perjalanan
        </h2>
        <p class="text-slate-500 text-base">
          Rekam jejak dan tahapan penting dalam perjalanan belajar dan karir.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="item in items" 
          :key="item.year"
          class="mono-card mono-card-hover rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3"
        >
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs inline-block">
              {{ item.year }}
            </span>
            <span v-if="item.title" class="text-xs font-bold text-slate-900">
              {{ item.title }}
            </span>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed font-normal">
            {{ item.event }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
