<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle,
  FolderGit2
} from 'lucide-vue-next';

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

const repos = ref<GithubRepo[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchGithubRepos = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const res = await fetch('https://api.github.com/users/aliefibnu/repos?sort=updated&per_page=6');
    if (!res.ok) {
      throw new Error(`Gagal memuat data dari GitHub (${res.status})`);
    }
    const data: GithubRepo[] = await res.json();
    repos.value = data.slice(0, 6);
  } catch (err: any) {
    console.error('Error fetching GitHub repos:', err);
    error.value = err.message || 'Gagal terhubung ke API GitHub.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchGithubRepos();
});
</script>

<template>
  <div class="space-y-6">
    
    <!-- Refresh Button Header Bar -->
    <div class="flex items-center justify-end">
      <button 
        @click="fetchGithubRepos" 
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 text-xs font-semibold cursor-pointer transition-colors shadow-xs"
        :disabled="isLoading"
      >
        <RefreshCw class="w-3.5 h-3.5 text-slate-500" :class="{ 'animate-spin': isLoading }" />
        <span>Refresh Repositori</span>
      </button>
    </div>

    <!-- Loading Skeletons -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div 
        v-for="n in 6" 
        :key="n"
        class="mono-card rounded-3xl p-5 border border-slate-200 animate-pulse space-y-4"
      >
        <div class="h-5 bg-slate-200 rounded-md w-3/4"></div>
        <div class="h-3 bg-slate-100 rounded-md w-full"></div>
        <div class="h-3 bg-slate-100 rounded-md w-2/3"></div>
        <div class="pt-3 flex justify-between">
          <div class="h-4 bg-slate-200 rounded-md w-1/4"></div>
          <div class="h-4 bg-slate-200 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 text-center mono-card rounded-3xl border border-slate-200 space-y-3">
      <AlertCircle class="w-8 h-8 text-slate-500 mx-auto" />
      <p class="text-xs font-semibold text-slate-700">{{ error }}</p>
      <button 
        @click="fetchGithubRepos"
        class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Repositories Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div 
        v-for="repo in repos" 
        :key="repo.id"
        class="mono-card mono-card-hover rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 group"
      >
        <div class="space-y-3">
          <!-- Repo Name & GitHub Icon -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <FolderGit2 class="w-4 h-4 text-slate-500 shrink-0" />
              <h4 class="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-slate-700 transition-colors">
                {{ repo.name }}
              </h4>
            </div>

            <a 
              :href="repo.html_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Buka Repositori"
            >
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed min-h-[2.5rem] font-normal">
            {{ repo.description || 'Repositori public Alief Ibnu Hamdani di GitHub.' }}
          </p>
        </div>

        <!-- Footer Stats & Language -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          
          <!-- Primary Language -->
          <div v-if="repo.language" class="flex items-center gap-1.5 font-semibold">
            <span class="w-2 h-2 rounded-full bg-slate-400"></span>
            <span class="text-slate-700 text-[11px] font-mono">{{ repo.language }}</span>
          </div>
          <div v-else class="text-slate-400 font-medium text-[11px] font-mono">Text</div>

          <!-- Stars & Forks -->
          <div class="flex items-center gap-3 text-[11px] font-mono">
            <span class="flex items-center gap-1 text-slate-600">
              <Star class="w-3.5 h-3.5 text-slate-500" />
              {{ repo.stargazers_count }}
            </span>
            <span class="flex items-center gap-1 text-slate-600">
              <GitFork class="w-3.5 h-3.5 text-slate-500" />
              {{ repo.forks_count }}
            </span>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>
