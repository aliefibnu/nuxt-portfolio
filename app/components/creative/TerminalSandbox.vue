<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const isOpen = ref(false)
const commandInput = ref('')
const terminalHistory = ref<string[]>([
  'ALIEFIBNU CORE OS v4.0.0-PROD (BATAM, ID)',
  'Hydration sequence complete. Type "help" for a list of available commands.',
  ''
])

const terminalBodyRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const profile = useProfile()
const portfolio = usePortfolio()
const config = usePortfolioConfig()

// Typing sequence tracking
let keyBuffer: string[] = []
const triggerWord = 'alief'

const handleGlobalKeys = (e: KeyboardEvent) => {
  if (isOpen.value) return // Ignore while typing inside terminal
  
  keyBuffer.push(e.key.toLowerCase())
  if (keyBuffer.length > triggerWord.length) {
    keyBuffer.shift()
  }

  if (keyBuffer.join('') === triggerWord) {
    toggleTerminal()
  }
}

const toggleTerminal = () => {
  isOpen.value = !isOpen.value
  keyBuffer = []
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      inputRef.value?.focus()
    })
  } else {
    document.body.style.overflow = ''
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBodyRef.value) {
      terminalBodyRef.value.scrollTop = terminalBodyRef.value.scrollHeight
    }
  })
}

const executeCommand = () => {
  const rawCmd = commandInput.value.trim()
  commandInput.value = ''
  if (!rawCmd) return

  const cmd = rawCmd.toLowerCase()
  terminalHistory.value.push(`alief@portfolio:~$ ${rawCmd}`)

  switch (cmd) {
    case 'help':
      terminalHistory.value.push(
        'Available commands:',
        '  about       Display biography details',
        '  skills      List master developer skill groups',
        '  projects    Show project portfolio cases',
        '  stats       Show github and education statistics',
        '  socials     Output contact & connection endpoints',
        '  clear       Clear terminal screen history',
        '  exit        Close terminal prompt overlay',
        '  sudo rm -rf /  ??? [CAUTION]'
      )
      break
    case 'about':
      terminalHistory.value.push(
        `Name: ${profile.fullName}`,
        `Role: ${profile.title}`,
        `Location: ${profile.location}`,
        `Bio: ${portfolio.longBio}`
      )
      break
    case 'skills':
      portfolio.skills.forEach(group => {
        terminalHistory.value.push(`[${group.category.toUpperCase()}]`)
        const items = group.items.map(i => `${i.name} (${i.level})`).join(', ')
        terminalHistory.value.push(`  ${items}`)
      })
      break
    case 'projects':
      projects.value.forEach(p => {
        terminalHistory.value.push(`- ${p.title} (${p.year}): ${p.description}`)
      })
      break
    case 'stats':
      portfolio.statistics.forEach(s => {
        terminalHistory.value.push(`  ${s.label}: ${s.value}`)
      })
      break
    case 'socials':
      terminalHistory.value.push(
        `Email: ${profile.email}`,
        `GitHub: ${profile.website}`
      )
      break
    case 'clear':
      terminalHistory.value = []
      break
    case 'exit':
      toggleTerminal()
      break
    case 'sudo rm -rf /':
      terminalHistory.value.push(
        'CRITICAL ALERT: REMOVING ROOT SYSTEM FILES...',
        'Wiping user profiles...',
        'Injecting glitch codes...',
        '..................................................',
        'SYSTEM FAILURE. JUST KIDDING.⚽'
      )
      break
    default:
      terminalHistory.value.push(`Command not found: "${rawCmd}". Type "help" for a list of endpoints.`)
  }

  terminalHistory.value.push('')
  scrollToBottom()
}

const projects = ref<any[]>(portfolio.projects)

onMounted(async () => {
  window.addEventListener('keydown', handleGlobalKeys)
  try {
    const res = await $fetch<any[]>('/api/projects')
    if (res && res.length) {
      projects.value = res
    }
  } catch (err) {
    console.error('Failed to fetch projects inside Terminal:', err)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleGlobalKeys)
  }
})
</script>

<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 w-screen h-screen z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
    @click.self="toggleTerminal"
  >
    <!-- Terminal Shell Window -->
    <div class="w-full max-w-3xl h-[70vh] bg-[#0c0c0e] border border-zinc-800 rounded-lg flex flex-col overflow-hidden shadow-2xl shadow-blue-500/10">
      <!-- Window Titlebar Header -->
      <div class="px-4 py-3 bg-[#16161a] border-b border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
        <div class="flex gap-1.5">
          <span class="w-3 h-3 rounded-full bg-red-500/60 block interactive-hover cursor-pointer" @click="toggleTerminal"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500/60 block"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/60 block"></span>
        </div>
        <div>alief@portfolio: ~/terminal</div>
        <div>bash</div>
      </div>

      <!-- Console Body Logs -->
      <div 
        ref="terminalBodyRef"
        class="flex-1 p-6 overflow-y-auto font-mono text-xs md:text-sm text-blue-400 space-y-2 select-text selection:bg-blue-500/20 selection:text-white"
        @click="inputRef?.focus()"
      >
        <div 
          v-for="(line, idx) in terminalHistory" 
          :key="idx"
          class="whitespace-pre-wrap leading-relaxed"
        >
          <span v-if="line.startsWith('alief@portfolio:~$')" class="text-zinc-500">{{ line.slice(0, 18) }}</span>
          <span v-if="line.startsWith('alief@portfolio:~$')">{{ line.slice(18) }}</span>
          <span v-else-if="line.includes('Command not found:')" class="text-red-400">{{ line }}</span>
          <span v-else-if="line.includes('SYSTEM FAILURE.')" class="text-yellow-400 font-bold">{{ line }}</span>
          <span v-else>{{ line }}</span>
        </div>

        <!-- Terminal command input prompt -->
        <div class="flex items-center gap-2 mt-4 text-white">
          <span class="text-zinc-500">alief@portfolio:~$</span>
          <input
            ref="inputRef"
            v-model="commandInput"
            type="text"
            class="flex-1 bg-transparent focus:outline-none caret-blue-400 font-mono text-xs md:text-sm text-white"
            @keydown.enter="executeCommand"
            autofocus
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
