import {createWebHashHistory, createRouter} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/menu'
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
                component: () => import('@/views/home/index.vue'),
                meta: { hasBackground: true } // 添加元信息
            },
            {
                name:'heritage',
                path:'heritage',
                component: () => import('@/views/home/heritage/index.vue')
            },
            {
                name:'route',
                path:'route',
                component: () => import('@/views/home/route/index.vue')
            },
            {
                name:'fictitious',
                path:'fictitious',
                component: () => import('@/views/fictitious/index.vue')
            },
            {
                name:'forum',
                path:'forum',
                component: () => import('@/views/forum/index.vue')
            },
            {
                name:'about',
                path:'about',
                component: () => import('@/views/about/index.vue')
            },
            {
                name:'shopping',
                path:'shopping',
                component: () => import('@/views/shopping/index.vue')
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: () => import( '@/views/detail/index.vue'),
            },
        ]
    },
]


// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
