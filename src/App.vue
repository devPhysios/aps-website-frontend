<template>
  <header>
    <NavigationMenu />
  </header>
  <router-view/>
</template>

<script setup>
  import NavigationMenu from "./components/Navigation.vue"
</script>