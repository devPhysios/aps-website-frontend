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
        <router-view/>
    </nav>
    </template>