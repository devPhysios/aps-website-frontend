<template>
    <nav>
        <ul class="nav__list">
            <li class="nav__item">
                <RouterLink to="/">
                    Home
                </RouterLink>
            </li>

            <li class="nav__item">
                <RouterLink to="/about">
                    About
                </RouterLink>
            </li>

            <li class="nav__item">
                <RouterLink to="/contact">
                    Contact
                </RouterLink>
            </li>
        </ul>
        <router-view/>
    </nav>
</template>

<script setup>
    // import { RouterLink } from "vue-router"
</script>