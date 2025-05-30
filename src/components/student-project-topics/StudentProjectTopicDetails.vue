<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="bg-green-500 p-4 text-white text-center">
      <h2 class="text-xl md:text-2xl font-bold">Your Project Topic</h2>
    </div>

    <div class="p-6">
      <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-1">
          {{ projectTopic.topic }}
        </h3>
        <div class="flex flex-wrap gap-3 mt-2">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {{ projectTopic.year }}
          </span>
          <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ projectTopic.author.name }}
          </span>
          <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
            {{ projectTopic.author.matricNumber }}
          </span>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-md font-semibold text-gray-700 mb-2">
          Supervisor Information
        </h3>
        <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <p class="font-medium text-gray-800">
                {{ projectTopic.supervisor.title }} {{ projectTopic.supervisor.name }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          @click="emit('edit-topic')"
          class="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Topic
        </button>
        <button
          @click="emit('delete-topic')"
          class="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Topic
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  projectTopic: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit-topic', 'delete-topic']);
</script> 