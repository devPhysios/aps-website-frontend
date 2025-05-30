<template>
  <div
    class="bg-white rounded-lg p-8 shadow-md border-l-4 border-yellow-500"
  >
    <div class="text-center mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 text-yellow-500 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h2 class="text-2xl font-bold text-gray-800">No Project Topic Found</h2>
      <p class="text-gray-600 mt-2">
        You haven't registered a project topic yet. Add your research project
        topic now.
      </p>
    </div>

    <button
      @click="emit('add-topic')"
      class="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition duration-200 flex items-center justify-center font-semibold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      Add Project Topic
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["add-topic"]);
</script> 