<template>
    <div class="h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-amber-100 flex justify-center items-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="level in levels" :key="level.id" class="p-6 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer" :class="`bg-${level.color}-400 hover:bg-green-500`">
          <router-link :to="`/${level.id}`">
            <div class="text-center">
              <h2 class="text-2xl font-semibold mb-2 text-black">{{ level.name }}</h2>
              <p class="text-gray-200">{{ level.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const levels = ref([
    { id: 100, name: '100 Level', description: 'First year students', color: 'yellow' },
    { id: 200, name: '200 Level', description: 'Second year students', color: 'yellow' },
    { id: 300, name: '300 Level', description: 'Third year students', color: 'yellow' },
    { id: 400, name: '400 Level', description: 'Fourth year students', color: 'yellow' },
    { id: 500, name: '500 Level', description: 'Fifth year students', color: 'yellow' }
  ]);
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  