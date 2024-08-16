const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "primevue/resources/themes/saga-blue/theme.css";
          @import "primevue/resources/primevue.min.css";
          @import "primeicons/primeicons.css";
          @import "primeflex/primeflex.css";
        `
      }
    }
  }
})