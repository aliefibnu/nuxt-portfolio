import portfolioData from '@/data/portfolio-data.json'

export function usePortfolio() {
  return {
    shortBio: portfolioData.short_bio,
    longBio: portfolioData.long_bio,
    avatarImageUrl: portfolioData.avatar_image_url,
    resumeDownloadUrl: portfolioData.resume_download_url,
    languages: portfolioData.languages || [],
    skills: portfolioData.skills || [],
    experience: portfolioData.experience || [],
    projects: portfolioData.projects || [],
    certifications: portfolioData.certifications || [],
    education: portfolioData.education || [],
    openSource: portfolioData.open_source_contributions || [],
    organizations: portfolioData.organizations || [],
    statistics: portfolioData.statistics_sources || [],
    faq: portfolioData.faq || [],
    timeline: portfolioData.timeline || [],
  }
}
