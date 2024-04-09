// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vite-pwa/nuxt"],
  css: ["~/assets/main.css"],
  nitro: {
    preset: "vercel"
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap" },

        { rel: 'icon', href: `/favicon.ico`, sizes: "48x48" },
        { rel: 'apple-touch-icon', href: `/apple-touch-icon-180x180.png` },
      ],
    }
  },
  runtimeConfig: {
    openaiApiKey: "",
    qdrant: {
      url: "",
      apiKey: ""
    },
    public: {
      firebaseConfig: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      }
    }
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: 'Universe',
      description: "An app to save your thoughts.",
      lang: "ja",
      short_name: "Universe",
      start_url: "/universe",
      display: "standalone",
      background_color: "#000000",
      icons: [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    }
  }
})