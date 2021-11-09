import { RouteRecordRaw } from "vue-router"
import { BasicLayout } from "@/layouts"

const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                meta: { title: '首页' },
                component: () => import(/* webpackChunkName: "welcome" */ '@/views/welcome')
            },
            {
                path: '/scenes/table/:operationId',
                name: 'table',
                meta: { title: '表格' },
                component: () => import(/* webpackChunkName: "welcome" */ '@/views/scenes/table'),
                props: true
            },
            {
                path: '/scenes/editor/:operationId',
                name: 'editor',
                meta: { title: '图表' },
                component: () => import(/* webpackChunkName: "welcome" */ '@/views/editor'),
                props: true
            }
        ]
    },
    // {
    //     path: '/:pathMatch(.*)',
    //     component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue'),
    // },
]

export { staticRoutes }