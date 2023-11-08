import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://incredible-cassata-878ab6.netlify.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
