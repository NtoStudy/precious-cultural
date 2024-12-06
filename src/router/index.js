import { createWebHistory, createRouter } from 'vue-router'
import { useUserInfoStore } from '@/store/modules/user'

const routes = [
    {
        path: '/',
        redirect: '/menu'
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: { 
            title: '登录',
            requiresAuth: false 
        }
    },
    {
        name: 'menu',
        path: '/menu',
        component: () => import('@/views/menu/index.vue'),
        redirect: '/menu/home',
        meta: { requiresAuth: true },
        children: [
            {
                name: 'home',
                path: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: { title: '首页' }
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
            },
            {
                name: 'fictitiousDetail',
                path: 'fictitious/fictitiousDetail/:fictitiousId',
                component: () => import('@/views/fictitious/fictitiousDetail/index.vue'),
                props: true,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} - 遗珍非往` : '遗珍非往'
    
    const userStore = useUserInfoStore()
    const isAuthenticated = userStore.userInfo?.token
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
