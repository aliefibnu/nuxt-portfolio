<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import portfolioData from '../../data/portfolio-data.json';

import Navbar from './Navbar.vue';
import HeroSection from './HeroSection.vue';
import AboutSection from './AboutSection.vue';
import EducationSection from './EducationSection.vue';
import SkillsSection from './SkillsSection.vue';
import ExperienceSection from './ExperienceSection.vue';
import ProjectsSection from './ProjectsSection.vue';
import CertificationsSection from './CertificationsSection.vue';
import FaqSection from './FaqSection.vue';
import SocialMediaSection from './SocialMediaSection.vue';
import Footer from './Footer.vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  nextTick(() => {
    ScrollTrigger.refresh();
  });
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-slate-900 selection:text-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content Stream -->
    <main>
      <!-- Hero Section (Data from JSON) -->
      <HeroSection :data="portfolioData" />

      <!-- About Section (Data from JSON) -->
      <AboutSection 
        :name="portfolioData.name"
        :title="portfolioData.title"
        :long-bio="portfolioData.long_bio" 
        :quote="portfolioData.about_quote"
        :avatar-url="portfolioData.avatar_image_url"
      />

      <!-- Pendidikan & Organisasi (Data from JSON) -->
      <EducationSection 
        :education="portfolioData.education"
        :organizations="portfolioData.organizations"
      />

      <!-- Tech Stack (Data from JSON) -->
      <SkillsSection :categories="portfolioData.skills" />

      <!-- Pengalaman & Karir Industri (Data from JSON) -->
      <ExperienceSection :items="portfolioData.experience" />

      <!-- Projects Section (Data from JSON) -->
      <ProjectsSection :projects="portfolioData.projects" />

      <!-- Certifications Section (Data from JSON) -->
      <CertificationsSection :items="portfolioData.certifications" />

      <!-- FAQ Section (Data from JSON) -->
      <FaqSection :items="portfolioData.faq" />

      <!-- Compact 1-Row Social Media Badges (Data from JSON) -->
      <SocialMediaSection :items="portfolioData.social_media" />
    </main>

    <!-- Footer (Data from JSON) -->
    <Footer :data="portfolioData.footer" />
  </div>
</template>
