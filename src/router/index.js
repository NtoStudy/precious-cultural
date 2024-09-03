import {createWebHashHistory, createRouter} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        name: 'menu',
        path: '/menu',
        component: () => import('@/views/menu/index.vue'),
        redirect: '/menu/home',
        children: [
            {
                name:'home',
                path:'home',
                component: () => import('@/views/home/index.vue')
            }
        ]
    },


]


// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
