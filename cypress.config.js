const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "o2cfsa",
    viewportHeight:880,
    viewportWidth: 1280,
    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
    },
});
