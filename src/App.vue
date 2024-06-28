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
import axios from 'axios';

import { computed, onMounted } from "vue";

const store = useUserStore()
const displayFooter = computed(() => store.displayFooter)
const displayHeader = computed(() => store.displayHeader)
// Token validation function
const validateToken = async () => {
  const token = localStorage.getItem("studentToken");
  if (!token) {
    store.logout();
    return;
  }
  try {
    const response = await axios.post(
      "https://aps-website-backend.onrender.com/api/v1/auth/checkToken",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      store.logout();
      console.log('Unauthorized')
    }
  } catch (error) {
    console.error("Token validation error:", error);
    store.logout();
  }
};

// Validate token when the component is mounted
onMounted(() => {
  validateToken();
});
</script>



<style scoped>
@import '@/assets/index.css';
</style>