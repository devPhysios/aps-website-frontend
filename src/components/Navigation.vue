<template>
  <nav class="bg-aps-orange text-gray-900 py-3.5 px-6 shadow md:flex items-center justify-between w-full">
    <div class="flex items-center md:pb-0">
      <span class="mr-1 cursor pointer w-12 h-full">
        <img class="h-full w-full" :src="logo" alt="Logo" />
      </span>
    </div>
    <span @click="MenuOpen"
      class="absolute md:hidden right-6 top-6 cursor pointer text-4xl text-white hover:text-yellow-600">
      <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>
    <ul
      class="md:flex md:items-center justify-between md:static absolute z-40 bg-aps-orange top-22 duration-700 ease-in w-full md:w-auto md:py-0 py-6"
      :class="[open ? 'left-0' : 'left-[-100%]']">
      <div class="md:flex md:items-center">
        <li class="font-bold md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white"
          v-for="navItem in navItems" :key="navItem.title">
          <RouterLink :to="navItem.path" @click="MenuOpen">
            {{ navItem.title }}
          </RouterLink>
        </li>
        <li class="font-bold md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white">
          <a href="https://physiopressui.wordpress.com/home/" target="_blank">PhysioPress</a>
        </li>
      </div>
    </ul>
    <button @click="directToDashboard"
      class="md:static absolute z-40 bg-aps-orange top-80 duration-700 ease-in w-full text-left md:w-auto md:pb-0 pb-6"
      :class="[open ? 'left-0' : 'left-[-100%]']">
      <span class="text-white cursor pointer md:text-4xl text-xl hover:text-yellow-900 md:px-0 px-10">
        <i class="bi bi-person-circle"></i>
      </span></button>
  </nav>
</template>

<script setup>
import logo from '@/assets/images/aps-logo.png';
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore'
import router from '@/router';

const users = useUserStore()
const open = ref(false)
const navItems = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Gallery", path: "/gallery" },
  { title: "Alumni", path: "/alumni" },
  { title: "Dashboard", path: "/dashboard" },
]
function MenuOpen() {
  open.value = !open.value
}

const directToDashboard = () => {
  if (users.user) {
    router.push('/dashboard')
  } else {
    router.push('/auth/login')
  }
}

</script>

<style scoped>
@import '/src/assets/index.css';

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.modal-enter,
.modal-leave-to

/* .modal-leave-active in <2.1.8 */
  {
  opacity: 0;
  transform: translateX(200px);
}
</style>