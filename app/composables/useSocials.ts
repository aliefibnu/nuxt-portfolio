export function useSocials() {
  const config = useRuntimeConfig()

  return {
    github: config.public.github,
    gitlab: config.public.gitlab,
    linkedin: config.public.linkedin,
    instagram: config.public.instagram,
    x: config.public.x,
    youtube: config.public.youtube,
    discord: config.public.discord,
    telegram: config.public.telegram,
    facebook: config.public.facebook,
  }
}
