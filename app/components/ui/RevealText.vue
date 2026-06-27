<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'p'
  },
  delay: {
    type: Number,
    default: 0
  }
})

const textRef = ref<HTMLElement | null>(null)
const { $gsap, $ScrollTrigger } = useNuxtApp() as any

onMounted(() => {
  if (!textRef.value) return

  // Scope anims to prevent conflicts
  const chars = textRef.value.querySelectorAll('.char-inner')
  
  $gsap.fromTo(chars, 
    { yPercent: 100, rotateX: -40 },
    {
      yPercent: 0,
      rotateX: 0,
      duration: 1.0,
      stagger: 0.02,
      ease: 'power4.out',
      delay: props.delay,
      scrollTrigger: {
        trigger: textRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  )
})
</script>

<template>
  <component 
    :is="tag" 
    ref="textRef"
    class="reveal-text-container select-none"
  >
    <!-- Split word-by-word, character-by-character -->
    <span 
      v-for="(word, wIdx) in text.split(' ')" 
      :key="wIdx" 
      class="inline-block whitespace-nowrap mr-[0.25em]"
    >
      <span 
        v-for="(char, cIdx) in word.split('')" 
        :key="cIdx" 
        class="inline-block overflow-hidden vertical-align-bottom"
      >
        <span class="char-inner inline-block will-animate">
          {{ char }}
        </span>
      </span>
    </span>
  </component>
</template>

<style scoped>
.reveal-text-container {
  perspective: 400px;
}
.char-inner {
  transform-style: preserve-3d;
}
</style>
