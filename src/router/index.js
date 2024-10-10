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
                path: '/heritage/heritageDetail/:id',
                name: 'heritageDetail',
                component: () => import('@/views/heritage/heritageDetail/index.vue'),
                alias: '/menu/heritage/heritageDetail/:id' // 设置别名
            },
            {
                path: '/route/heritageDetail/:id',
                name: 'routeDetail',
                component: () => import('@/views/route/routeDetail/index.vue'),
                alias: '/menu/route/routeDetail/:id' // 设置别名
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
