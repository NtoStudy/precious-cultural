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
                name: 'home',
                path: 'home',
                component: () => import('@/views/home/index.vue'),
            },
            {
                name: 'heritage',
                path: 'heritage',
                component: () => import('@/views/heritage/index.vue'),
            },
            {
                name: 'fictitious',
                path: 'fictitious',
                component: () => import('@/views/fictitious/index.vue')
            },
            {
                name: 'forum',
                path: 'forum',
                component: () => import('@/views/forum/index.vue')

            },
            {
                name: 'about',
                path: 'about',
                component: () => import('@/views/about/index.vue')
            },
            {
                name: 'userManage',
                path: 'userManage/:infoId',
                component: () => import('@/views/userManage/index.vue')
            },
            {
                name: 'userInfo',
                path:'userInfo/:infoId',
                component: () => import('@/views/userInfo/index.vue'),

            },
            {
                path: '/menu/heritage/heritageDetail/:heritageId',
                name: 'heritageDetail',
                component: () => import('@/views/heritage/heritageDetail/index.vue'),
                props: true,
            },
            {
                path: '/menu/forum/forumDetail/:articleId',
                name: 'forumDetail',
                component: () => import('@/views/forum/forumDetail/index.vue'),
                props: true,
            },

        ]
    },
    {
        path: '/menu/fictitious/fictitiousDetail/:fictitiousId',
        name: 'fictitiousDetail',
        component: () => import('@/views/fictitious/fictitiousDetail/index.vue'),
        props: true,
    }]


// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth'
            };
        }
    }
})

export default router
