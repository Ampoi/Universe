// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  nitro: {
    preset: "vercel"
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap" }
      ]
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
  }
})