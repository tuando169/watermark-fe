import {createRouter, createWebHistory} from 'vue-router'
import ImagePage from "@/pages/ImagePage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import VideoPage from "@/pages/VideoPage.vue";
import PdfPage from "@/pages/PdfPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
            path: '/pdf',
            name: 'pdf',
            component: PdfPage
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage
        },
    ]
})

export default router
