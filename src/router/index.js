import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Gallery from '../views/Gallery.vue'
import Alumni from '../views/Alumni.vue'


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
        path: "/services",
        name: "ServicesPage",
        component: Services
    },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router