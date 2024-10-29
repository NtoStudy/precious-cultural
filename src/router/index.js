import { createWebHashHistory, createRouter } from 'vue-router'

// 定义路由配置
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
                name: 'editor',
                path: 'editor',
                component: () => import('@/views/editor/index.vue')
            },
            {
                name: 'userManage',
                path: 'userManage/:infoId',
                component: () => import('@/views/userManage/index.vue')
            },
            {
                name: 'userInfo',
                path: 'userInfo/:infoId',
                component: () => import('@/views/userInfo/index.vue'),
            },
            {
                name: 'heritageDetail',
                path: 'heritage/heritageDetail/:heritageId',
                component: () => import('@/views/heritage/heritageDetail/index.vue'),
                props: true,
            },
            {
                name: 'forumDetail',
                path: 'forum/forumDetail/:articleId',
                component: () => import('@/views/forum/forumDetail/index.vue'),
                props: true,
            }
        ]
    },
    {
        name: 'fictitiousDetail',
        path: '/menu/fictitious/fictitiousDetail/:fictitiousId',
        component: () => import('@/views/fictitious/fictitiousDetail/index.vue'),
        props: true,
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 添加全局错误处理
router.onError((error) => {
    console.error('路由错误:', error);
    // 这里可以添加更多的错误处理逻辑，例如通知用户
});

export default router
