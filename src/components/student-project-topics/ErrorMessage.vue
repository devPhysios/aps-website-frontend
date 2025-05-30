<template>
  <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 shadow-sm">
    <div class="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-red-500 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 class="text-xl font-semibold text-red-700">
        Error fetching your project topic
      </h2>
    </div>
    <p class="mt-2 text-gray-700">{{ message }}</p>
    <button
      @click="emit('retry')"
      class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition duration-200 transform hover:scale-105"
    >
      Try Again
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["retry"]);
</script> 