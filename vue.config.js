// vue.config.js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  transpileDependencies: [
    'primevue', // 如果没有特定的依赖需要转译，可以留空数组 []
  ],
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        files: 'src/**/*.{js,vue}', // 确保使用 files 选项
        fix: true, // 自动修复发现的可修复问题
        emitWarning: true, // 保证 ESLint 报错不阻断编译
      }),
    ],
    cache: {
      type: 'filesystem', // 使用 Webpack 5 的文件系统缓存
    },
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
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
  }
};
