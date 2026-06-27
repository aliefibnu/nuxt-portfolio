import fs from 'node:fs'
import path from 'node:path'

export default defineCachedEventHandler(async (event) => {
  // 1. Read curated local projects from compiled json
  let localProjects: any[] = []
  try {
    const filePath = path.resolve('./app/data/portfolio-data.json')
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const parsedData = JSON.parse(fileContent)
      localProjects = parsedData.projects || []
    }
  } catch (err) {
    console.error('Failed to read local projects:', err)
  }

  // 2. Fetch public repositories from GitHub
  const config = useRuntimeConfig()
  // Extract username from NUXT_PUBLIC_GITHUB (e.g., "https://github.com/aliefibnu")
  const githubUrl = config.public.github || 'https://github.com/aliefibnu'
  const username = githubUrl.split('/').pop() || 'aliefibnu'

  try {
    const repos = await $fetch<any[]>(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers: {
        'User-Agent': 'nuxt-portfolio-server'
      }
    })

    // Map GitHub repos to our standard Project structure
    const githubProjects = repos
      // Filter out forks to showcase original work
      .filter(repo => !repo.fork)
      .map(repo => {
        // Clean repo name for display title
        const cleanTitle = repo.name
          .replace(/-/g, ' ')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c: string) => c.toUpperCase())

        return {
          title: cleanTitle,
          slug: repo.name,
          description: repo.description || 'No description provided.',
          long_description: repo.description || 'No description provided.',
          thumbnail: '',
          gallery: [],
          demo_url: repo.homepage || '#',
          repository_url: repo.html_url,
          // Extract main language and topic tags
          technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
          year: new Date(repo.created_at).getFullYear(),
          category: 'Open Source',
          featured: repo.stargazers_count > 0,
          status: 'Active',
          challenges: '',
          solutions: '',
          lessons_learned: '',
          stars: repo.stargazers_count,
          forks: repo.forks_count
        }
      })

    // 3. Merge lists: prioritize local curated projects, append non-duplicate GitHub repos
    const localSlugs = new Set(localProjects.map(p => p.slug))
    const uniqueGithubProjects = githubProjects.filter(p => !localSlugs.has(p.slug))

    return [ ...uniqueGithubProjects]
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error)
    // If API fetch fails (rate-limit, offline), gracefully fall back to local projects
    return localProjects
  }
}, {
  maxAge: 60 * 60, // Cache response for 1 hour to prevent hitting rate limits
  name: 'github-projects'
})
