import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Gallery from '../views/Gallery.vue'
import Alumni from '../views/Alumni.vue'
import Upload from '../views/Upload.vue'
import Dashboard from '@/views/Dashboard.vue'


const routes = [
    {
        path: "/",
        name: "HomePage",
        component: Home
    },

    {
        path: "/about",
        name: "AboutPage",
        component: About
    },

    {
        path: "/gallery",
        name: "GalleryPage",
        component: Gallery
    },
    
    {
        path: "/alumni",
        name: "AlumniPage",
        component: Alumni
    },

    {
        path: "/upload",
        name: "IploadPage",
        component: Upload
    },

    {
        path: "/dashboard",
        name: "UserDashboardPage",
        component: Dashboard
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router