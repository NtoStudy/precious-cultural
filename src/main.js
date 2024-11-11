import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import mavonEditor from 'mavon-editor'
import "./styles/normalize.scss"
import 'highlight.js/scss/atom-one-dark.scss'
import "./styles/highLight.scss"
import 'mavon-editor/dist/css/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// 创建Vue应用实例
const app = createApp(App);

// 创建Pinia实例并使用持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// 使用Element Plus并设置语言为中文
app.use(ElementPlus, { locale: zhCn });

// 注册Element Plus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 使用mavonEditor
app.use(mavonEditor);

// 使用路由
app.use(router)

// 使用Element Plus并设置语言为中文
app.use(ElementPlus, {
locale: zhCn,
})
// 挂载应用到#app元素
app.mount('#app')
