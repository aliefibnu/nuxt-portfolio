export function useProfile() {
  const config = useRuntimeConfig()

  return {
    fullName: config.public.fullName,
    nickname: config.public.nickname,
    title: config.public.title,
    tagline: config.public.tagline,
    location: config.public.location,
    email: config.public.email,
    phone: config.public.phone,
    website: config.public.website,
    contact: {
      email: config.public.contactEmail || config.public.email,
      phone: config.public.contactPhone || config.public.phone,
      whatsapp: config.public.contactWhatsapp,
    }
  }
}
