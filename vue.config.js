const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js'
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "primevue/resources/themes/saga-blue/theme.css";
          @import "primevue/resources/primevue.min.css";
          @import "primeicons/primeicons.css";
        `
      }
    }
  }
})