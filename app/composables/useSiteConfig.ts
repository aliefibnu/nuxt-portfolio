export function useSiteConfig() {
  const config = useRuntimeConfig()

  return {
    name: config.public.siteName,
    description: config.public.siteDescription,
    keywords: config.public.siteKeywords,
    language: config.public.siteLanguage,
    locale: config.public.siteLocale,
    image: config.public.siteImage,
    analytics: {
      gaId: config.public.gaId,
      gtmId: config.public.gtmId,
      umamiId: config.public.umamiId,
      plausibleDomain: config.public.plausibleDomain,
    }
  }
}
