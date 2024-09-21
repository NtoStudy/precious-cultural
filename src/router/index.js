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
            },
            {
                name:'heritage',
                path:'heritage',
                component: () => import('@/views/heritage/index.vue')
            },
            {
                name:'route',
                path:'route',
                component: () => import('@/views/route/index.vue')
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
                path: '/heritage/detail/:id',
                name: 'heritageDetail',
                component: () => import('@/views/heritage/detail/index.vue'),
                alias: '/menu/heritage/detail/:id' // 设置别名
            },
            {
                path: '/route/detail/:id',
                name: 'routeDetail',
                component: () => import('@/views/route/detail/index.vue'),
                alias: '/menu/route/detail/:id' // 设置别名
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
