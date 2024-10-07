import {createRouter, createWebHistory} from 'vue-router'
import ImagePage from "@/pages/ImagePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'image',
            component: ImagePage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage
        },
    ]
})

export default router
