<template>
    <nav>
        <ul class="nav__list"
            v-for="navItem in navItems"
            :key="navItem.title"
        >
            <li class="nav__item">
                <RouterLink :to="navItem.path">
                    {{ navItem.title }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    const navItems = [
        { title: "Home", path: "/" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
    ]
</script>