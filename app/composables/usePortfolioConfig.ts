export function usePortfolioConfig() {
  const config = useRuntimeConfig()

  return {
    name: config.appName,
    description: config.appDescription,
    url: config.appUrl,
    env: config.appEnv,
    author: config.appAuthor,
    theme: {
      defaultTheme: config.public.defaultTheme,
      accentColor: config.public.accentColor,
      enableCursor: config.public.enableCursor,
      enablePreloader: config.public.enablePreloader,
      enableSound: config.public.enableSound,
      enableAnimation: config.public.enableAnimation,
      enableReducedMotion: config.public.enableReducedMotion,
    },
    features: {
      blog: config.public.enableBlog,
      projects: config.public.enableProjects,
      testimonials: config.public.enableTestimonials,
      stats: config.public.enableStats,
      contactForm: config.public.enableContactForm,
      openSource: config.public.enableOpenSource,
      experience: config.public.enableExperience,
    },
    api: {
      base: config.public.apiBase,
      version: config.public.apiVersion,
    }
  }
}
