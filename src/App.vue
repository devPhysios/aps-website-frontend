<template>
  <header class="w-full h-full bg-white font-display">
    <NavigationMenu v-if="displayHeader" />
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
const displayHeader = computed(() => store.displayHeader)
</script>



<style scoped>
@import '@/assets/index.css';
</style>