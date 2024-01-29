<template>
  <nav class="bg-aps-orange text-gray-900 py-3.5 px-6 shadow md:flex items-center justify-between w-full">
    <div class="flex items-center md:px-10 md:pb-0">
      <span class="mr-1 cursor pointer w-12 h-full">
        <img class="h-full w-full" :src="logo" alt="Logo" />
      </span>
    </div>
    <span @click="MenuOpen()"
      class="absolute md:hidden right-6 top-6 cursor pointer text-4xl text-white hover:text-yellow-600">
      <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>
    <ul
      class="md:flex md:items-center justify-between md:static absolute md:w-3/4 w-full z-50 bg-aps-orange top-22 duration-700 ease-in right-6 md:py-0 py-6"
      :class="[open ? 'left-0' : 'left-[-100%]']">
      <div class="md:flex md:items-center">
        <li class="md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white" v-for="navItem in navItems" :key="navItem.title">
          <RouterLink :to="navItem.path" @click="MenuOpen()">
            {{ navItem.title }}
          </RouterLink>
        </li>
      </div>
      <span class="text-white cursor pointer md:text-4xl text-xl hover:text-yellow-900 md:px-0 px-10">
        <i class="bi bi-person-circle"></i>
      </span>
    </ul>
  </nav>
</template>

<script>
import logo from '@/assets/images/aps-logo.png';
import { ref } from 'vue'
export default {
  setup() {
    const open = ref(false)
    const navItems = [
      { title: "Home", path: "/" },
      { title: "About Us", path: "/about" },
      { title: "Gallery", path: "/gallery" },
      { title: "PhysioPress", path: "#" },
      { title: "Alumni", path: "/alumni" },
    ]
    function MenuOpen() {
      open.value = !open.value
    }
    return {
      open, navItems, logo, MenuOpen
    }
  }
}


</script>

<style scoped>@import '/src/assets/index.css'</style>