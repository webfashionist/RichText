const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: 0,
    defaultCommandTimeout: 500,
    baseUrl: "http://localhost:8080"
  },
});
