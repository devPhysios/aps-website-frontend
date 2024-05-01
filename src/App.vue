<template>
  <header class="w-full h-full bg-white font-display">
    <NavigationMenu />
  </header>
  <router-view />
  <FooterMenu v-if="displayFooter" />
</template>

<script setup>
import FooterMenu from "./components/Footer.vue";
import NavigationMenu from "./components/Navigation.vue"
import { useUserStore } from "./stores/UserStore";

import { computed } from "vue";

const store = useUserStore()
const displayFooter = computed(() => store.displayFooter)
</script>



<style scoped>
@import '@/assets/index.css';
</style>