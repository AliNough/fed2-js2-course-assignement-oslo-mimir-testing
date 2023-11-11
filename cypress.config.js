import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://dashing-kitten-c3574d.netlify.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
//added comment for no reason