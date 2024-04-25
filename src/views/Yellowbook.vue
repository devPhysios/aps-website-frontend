<template>
  <nav class="font-display bg-gray-100 pb-4 sticky top-0 z-10 pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ol class="flex items-center space-x-4">
        <li>
          <a href="/" class="text-gray-600 hover:text-gray-800 underline"
            >Home</a
          >
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <span class="text-gray-400 hidden sm:inline">/</span>
          <!-- Hide on small devices -->
          <a
            :href="crumb.link"
            class="text-gray-600 hover:text-gray-800 underline"
            >{{ crumb.title }}</a
          >
        </li>
      </ol>
    </div>
  </nav>

  <div
    class="font-display py-5 bg-gradient-to-r from-gray-100 via-gray-200 to-amber-100 flex justify-center items-center"
  >
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="level in levels"
        :key="level.id"
        class="p-6 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
        :class="`bg-amber-600 hover:bg-green-500`"
      >
        <router-link :to="`/dashboard/yellowbook/${level.id}`">
          <div class="text-center">
            <h2 class="text-2xl font-semibold mb-2 text-black">
              {{ level.name }}
            </h2>
            <p class="text-gray-200">{{ level.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const levels = ref([
  { id: 100, name: "100 Level", description: "First year students" },
  { id: 200, name: "200 Level", description: "Second year students" },
  { id: 300, name: "300 Level", description: "Third year students" },
  { id: 400, name: "400 Level", description: "Fourth year students" },
  { id: 500, name: "500 Level", description: "Fifth year students" },
]);

const breadcrumbs = ref([
  { title: "Dashboard", link: "/dashboard" },
  { title: "Yellow Book", link: "/dashboard/yellowbook" },
]);
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
