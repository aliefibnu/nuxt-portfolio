import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

// =========================================================================
// AUTO-COMPILE my-data.md -> app/data/portfolio-data.json
// =========================================================================
const dataFilePath = path.resolve("./my-data.md");
const outputDir = path.resolve("./app/data");
const outputFilePath = path.resolve(outputDir, "portfolio-data.json");

if (fs.existsSync(dataFilePath)) {
  try {
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    let yamlContent = fileContent;
    if (fileContent.trim().startsWith("---")) {
      const parts = fileContent.split("---");
      if (parts.length >= 3) {
        yamlContent = parts.slice(1).join("---");
      }
    }
    const parsedData = YAML.parse(yamlContent);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(parsedData, null, 2),
      "utf8",
    );
    console.log(
      "Successfully auto-compiled my-data.md to app/data/portfolio-data.json",
    );
  } catch (err) {
    console.error("Error auto-compiling my-data.md:", err);
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxtjs/tailwindcss", "@vue-gsap-flip/nuxt", "@nuxt/icon"],

  app: {
    head: {
      title: "Alief Ibnu Hamdani | Fullstack Web & Backend Developer",
      htmlAttrs: {
        lang: "id",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  build: {
    transpile: ["gsap", "@vue-gsap-flip"],
  },

  runtimeConfig: {
    // Private keys (server-only)
    appName: process.env.APP_NAME || "Alief Ibnu Hamdani | Portfolio",
    appDescription:
      process.env.APP_DESCRIPTION ||
      "Fullstack Web & Backend Developer Portfolio",
    appUrl: process.env.APP_URL || "http://localhost:3000",
    appEnv: process.env.APP_ENV || "development",
    appAuthor: process.env.APP_AUTHOR || "Alief Ibnu Hamdani",

    // Public keys (both client and server)
    public: {
      siteName: "",
      siteDescription: "",
      siteKeywords: "",
      siteLanguage: "id",
      siteLocale: "id_ID",
      siteImage: "",
      fullName: "",
      devname: "",
      nickname: "",
      title: "",
      tagline: "",
      location: "",
      email: "",
      phone: "",
      website: "",
      github: "",
      gitlab: "",
      linkedin: "",
      instagram: "",
      x: "",
      youtube: "",
      discord: "",
      telegram: "",
      facebook: "",
      gaId: "",
      gtmId: "",
      umamiId: "",
      plausibleDomain: "",
      defaultTheme: "dark",
      accentColor: "#6AD3F7",
      enableCursor: true,
      enablePreloader: true,
      enableSound: false,
      enableAnimation: true,
      enableReducedMotion: true,
      enableBlog: false,
      enableProjects: true,
      enableTestimonials: false,
      enableStats: true,
      enableContactForm: true,
      enableOpenSource: true,
      enableExperience: true,
      contactEmail: "",
      contactPhone: "",
      contactWhatsapp: "",
      apiBase: "",
      apiVersion: "v1",
    },
  },
});
