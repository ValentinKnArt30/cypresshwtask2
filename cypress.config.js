const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7ngid6",
  
  e2e: {
    baseUrl: "http://qamid.tmweb.ru",

    viewportWidth: 1440,
    viewportHeight: 900,

    video: false,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
