<template>
  <header class="w-full h-full bg-white font-display">
    <NavigationMenu v-if="displayHeader" />
  </header>
  <router-view />
  <FooterMenu v-if="displayFooter" />
</template>

<script setup>
import { onMounted } from "vue";
import FooterMenu from "./components/Footer.vue";
import NavigationMenu from "./components/Navigation.vue";
import { useUserStore } from "./stores/UserStore";
import { computed } from "vue";
import apiClient from "./config/axios";

const store = useUserStore();
const displayFooter = computed(() => store.displayFooter);
const displayHeader = computed(() => store.displayHeader);

onMounted(async () => {
  const token = localStorage.getItem("studentToken");

  if (!token) {
    return;
  }

  try {
    const response = await apiClient.get(
      "/auth/access",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const { forceLogout } = response.data;
      if (forceLogout) {
        console.log("Student is being forced to log out from the App");
        store.logout();
      } else {
        console.log("Student is not being forced to log out");
      }
    }
  } catch (error) {
    console.error("Error checking force log out:", error);
    if (error.response && error.response.status !== 200) {
      store.logout();
    }
  }
});
</script>

<style scoped>
@import "@/assets/index.css";
</style>
