<template>
  <header class="w-full h-full bg-white font-display mb-1">
    <NavigationMenu />
  </header>
  <router-view />
  <FooterMenu />
</template>

<script setup>
import FooterMenu from "./components/Footer.vue";
import NavigationMenu from "./components/Navigation.vue"
</script>



<style scoped>
@import '/src/assets/index.css';
</style>