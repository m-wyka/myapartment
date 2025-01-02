// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@nuxt/icon",
  ],
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
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  css: ["~/assets/scss/main.scss"],
  vite: {
    optimizeDeps: {
      exclude: ["vee-validate"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern", // For remove warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
          additionalData: `
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_headings.scss" as *;
            @use "@/assets/scss/components/index.scss" as *;
          `,
        },
      },
    },
  },
  googleFonts: {
    families: {
      Roboto: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  routeRules: {
    "/admin/management/floors/**": { ssr: false },
  },
});