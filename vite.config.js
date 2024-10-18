import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve} from 'path'
const pathResolve = dir => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  server: {
    proxy: {
      '^/api': {
        // target: "http://maddfu.natappfree.cc",
        changeOrigin: true, //支持跨域

      }
    }
  },
  resolve:{
    alias: {
      '@': pathResolve('./src')
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  }
})
