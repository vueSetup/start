import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { staticRoutes as routes } from "@/config/router.config";

export default createRouter({
    history:
        process.env.NODE_ENV === 'production'
            ? createWebHashHistory(process.env.BASE_URL)
            : createWebHistory(process.env.BASE_URL),
    routes,
})
