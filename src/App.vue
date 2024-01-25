<template>
  <header class="w-full bg-white h-screen font-display">
    <NavigationMenu />
  </header>
  <router-view/>
</template>

<script setup>
  import NavigationMenu from "./components/Navigation.vue"
</script>

<style scoped>
  @import '/src/assets/index.css';
</style>