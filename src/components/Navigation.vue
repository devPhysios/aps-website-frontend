<template>
  <nav
    class="bg-aps-orange text-gray-900 py-3.5 px-6 shadow md:flex items-center justify-between w-full z-[50]"
  >
    <div class="flex items-center md:pb-0">
      <span class="mr-1 cursor pointer w-12 h-full">
        <a href="/">
          <img class="h-full w-full" :src="logo" alt="Logo" />
        </a>
      </span>
    </div>
    <span
      @click="menuOpen"
      class="absolute md:hidden right-6 top-6 cursor-pointer text-4xl text-white hover:text-yellow-600"
    >
      <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>
    <ul
      class="md:flex md:items-center justify-between md:static absolute z-40 bg-aps-orange top-22 duration-700 ease-in w-full md:w-auto md:py-0 py-6"
      :class="[open ? 'left-0' : 'left-[-100%]']"
    >
      <div class="md:flex md:items-center">
        <li
          class="font-bold md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white"
          v-for="navItem in navItems"
          :key="navItem.title"
        >
          <RouterLink :to="navItem.path" @click="menuOpen">{{
            navItem.title
          }}</RouterLink>
        </li>
        <li
          class="font-bold md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white"
        >
          <a href="https://physiopressui.wordpress.com/home/" target="_blank"
            >PhysioPress</a
          >
        </li>
        <li
          class="font-bold md:mx-4 md:my-1 md:px-0 px-10 md:pb-0 pb-6 hover:text-blue-200 active:text-aps-white"
        >
          <a href="https://christnestteens.com/physioray/" target="_blank"
            >PhysioRay</a
          >
        </li>
      </div>
    </ul>
    <button
      @click="directToDashboard"
      class="md:static absolute z-40 bg-aps-orange top-[366px] duration-700 ease-in w-full text-left md:w-auto md:pb-0 pb-6 md:py"
      :class="[open ? 'left-0' : 'left-[-100%]']"
    >
      <span
        class="text-white cursor-pointer md:text-4xl text-xl hover:text-yellow-900 md:px-0 px-10"
        @click="menuOpen"
      >
        <button
          v-if="!currentUser"
          class="bg-aps-green hover:bg-aps-orange text-white rounded-md font-bold py-2 px-4 sm:py-3 sm:px-6 sm:text-lg md:text-xl"
        >
          Log in
        </button>
        <i
          v-if="currentUser && !userProfilePicture"
          class="bi bi-person-circle"
        ></i>
        <img
          v-if="currentUser && userProfilePicture"
          :src="userProfilePicture"
          class="w-10 h-10 rounded-full md:ml-0 ml-10"
          alt="Profile Picture"
        />
      </span>
    </button>
  </nav>
  <div
    @click="menuOpen"
    class="w-full bg-orange-500/60 fixed z-[39] backdrop-blur-md md:hidden duration-700 ease-in"
    :class="[open ? 'h-screen' : 'h-[0]']"
  ></div>
</template>

<script setup>
import logo from "@/assets/images/aps-logo.png";
import { ref, computed, watch } from "vue";
import { useUserStore } from "@/stores/UserStore";
import router from "@/router";

const store = useUserStore();
const currentUser = ref(store.user);

watch(
  () => store.user,
  (newUser) => {
    currentUser.value = newUser;
  },
  { deep: true }
);

const userProfilePicture = computed(
  () => currentUser.value?.profilePicture || null
);

const open = ref(false);
const navItems = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Gallery", path: "/gallery" },
  { title: "Alumni", path: "/alumni" },
];

const menuOpen = () => {
  open.value = !open.value;
};

const directToDashboard = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
@import "@/assets/index.css";
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.modal-enter,
.modal-leave-to /* .modal-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(200px);
}
</style>
