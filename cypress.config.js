import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  video: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
