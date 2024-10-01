import {createRouter, createWebHistory} from 'vue-router'
import ImagePage from "@/pages/ImagePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'image',
            component: ImagePage
        },
    ]
})

export default router
