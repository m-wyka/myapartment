// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  i18n: {
    strategy: "no_prefix",
    locales: ["pl"],
    defaultLocale: "pl",
    lazy: true,
    vueI18n: "./i18n/i18n.config.ts",
    detectBrowserLanguage: false,
    experimental: {
      localeDetector: "locale-detector.ts",
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  css: ["~/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern", // For remove warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
        },
      },
    },
  },
});