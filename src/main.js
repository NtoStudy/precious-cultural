import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'

// 创建Vue应用实例
const app = createApp(App)

// 注册Element Plus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 使用路由
app.use(router)

// 使用Element Plus并设置语言为中文
app.use(ElementPlus, {
    locale: zhCn,
})

// 挂载应用到#app元素
app.mount('#app')
