import {createRouter, createWebHistory} from 'vue-router'
import ImagePage from "@/pages/ImagePage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import VideoPage from "@/pages/VideoPage.vue";
import AppLayout from "@/layouts/AppLayout.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: {name: 'image'},
            component: AppLayout,
            children: [
                {
                    path: '/image',
                    name: 'image',
                    component: ImagePage
                },
                {
                    path: '/video',
                    name: 'video',
                    component: VideoPage
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: ProfilePage
                },
            ]
        },
    ]
})

export default router
