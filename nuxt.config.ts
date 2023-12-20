// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@invictus.codes/nuxt-vuetify'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    '@': resolve(__dirname, "/"),
  },
  css: ["~/assets/main.scss"],
  runtimeConfig: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  }

});
