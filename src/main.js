import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "./styles/normalize.scss"
import 'highlight.js/scss/atom-one-dark.scss'
// 创建Vue应用实例
const app = createApp(App)
// 注册Element Plus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 创建Pinia实例
const pinia = createPinia()
// 挂载持久化Pinia插件
pinia.use(piniaPluginPersistedstate)
// 使用Pinia
app.use(pinia)
// 使用路由
app.use(router)
// 使用Element Plus并设置语言为中文
app.use(ElementPlus, {
locale: zhCn,
})
// 挂载应用到#app元素
app.mount('#app')
