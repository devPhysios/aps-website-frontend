import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'

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
        path: "/contact",
        name: "ContactPage",
        component: Contact
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router