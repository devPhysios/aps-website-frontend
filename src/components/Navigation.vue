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
      class="md:flex md:items-center justify-between md:static absolute md:w-3/4 w-full z-40 bg-aps-orange top-22 duration-700 ease-in right-6 md:py-0 py-6"
      :class="[open ? 'left-0' : 'left-[-100%]']">
      <div class="md:flex md:items-center">
        <li class="font-bold md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white"
          v-for="navItem in navItems" :key="navItem.title">
          <RouterLink :to="navItem.path" @click="MenuOpen()">
            {{ navItem.title }}
          </RouterLink>
        </li>
        <li class="font-bold md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white">
          <a href="https://physiopressui.wordpress.com/home/" target="_blank">PhysioPress</a>
        </li>
      </div>
      <button @click="toggleModal = !toggleModal; open = false">
        <span class="text-white cursor pointer md:text-4xl text-xl hover:text-yellow-900 md:px-0 px-10">
          <i class="bi bi-person-circle"></i>
        </span></button>
    </ul>
  </nav>
  <div class="fixed inset-0 overflow-x-hidden overflow-y-auto flex justify-center items-center z-50" v-if="toggleModal"
    @click.self="toggleModal = false" @keydown.escape="toggleModal = false">

    <div class="relative mx-auto w-auto max-w-2xl">
      <div class="bg-white w-full">
        <button class="rounded-full bg-green-800 text-white m-2 p-1" @click="toggleModal = false">Go back</button>
        <div class="px-10">
          <div class="flex flex-col items-center mt-16">
            <h1 class="text-4xl font-bold text-black mb-4">Student Login</h1>
            <p class="text-left mb-4">Login to your Dashboard</p>

            <div class="flex flex-col mb-4">
              <div class="mb-2">
                <label for="matricNo" class="mr-2">Matric No.</label>
                <input type="text" id="matricNo"
                  class="p-2 rounded-full border border-gray-300 hover:border-2 hover:border-orange-500" />
              </div>

              <div class="mb-2">
                <label for="password" class="mr-2">Password</label>
                <input type="password" id="password"
                  class="p-2 ml-2 rounded-full border border-gray-300 hover:border-2 hover:border-orange-500" />
              </div>
            </div>

            <button class="bg-green-500 text-white p-2 mb-4 hover:bg-orange-500">Login</button>

            <p class="text-green-500 cursor-pointer hover:text-orange-500">Forgot password</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="toggleModal" class="absolute z-40 inset-0 opacity-75 bg-gray-600">
  </div>
</template>

<script setup>
import logo from '@/assets/images/aps-logo.png';
import { ref } from 'vue';
const open = ref(false)
const toggleModal = ref(false);
const navItems = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Gallery", path: "/gallery" },
  { title: "Alumni", path: "/alumni" },
]
function MenuOpen() {
  open.value = !open.value
}

</script>

<style scoped>
@import '/src/assets/index.css';
</style>