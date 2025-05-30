<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg w-full max-w-md p-6">
      <div class="text-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-red-500 mx-auto"
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
        <h2 class="text-2xl font-bold text-gray-800 mt-2">
          Delete Project Topic
        </h2>
        <p class="text-gray-600 mt-1">
          Are you sure you want to delete your project topic? This action
          cannot be undone.
        </p>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          @click="emit('close')"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="emit('confirm-delete')"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="flex items-center">
            <span
              class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
            ></span>
            Deleting...
          </span>
          <span v-else>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  show: Boolean,
  isSubmitting: Boolean,
});

const emit = defineEmits(["close", "confirm-delete"]);
</script> 