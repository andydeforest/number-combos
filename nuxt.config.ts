// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/number-combos/',
    head: {
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Number Combos` : 'Number Combos';
      },
      meta: [
        { name: 'description', content: 'A number-based puzzle game!' },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: 'Number Combos' },
        { hid: 'og-desc', property: 'og:description', content: 'A number-based puzzle game!' },
        { hid: 'og-image', property: 'og:image', content: '/meta.jpg' }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: 'favicon.png' }]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/app.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: true,
          additionalData: '@import "~/assets/scss/mixins.scss"; @import "~/assets/scss/settings.scss";'
        }
      }
    }
  },
  modules: [
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    [
      '@pinia/nuxt', {
        autoImports: ['defineStore', 'acceptHMRUpdate']

      }
    ],
    '@pinia-plugin-persistedstate/nuxt'
  ],
  googleFonts: {
    families: {
      Raleway: [400, 600, 700, 800]
    },
    display: 'swap'
  },
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
  },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  imports: {
    dirs: ['stores']
  }
});
