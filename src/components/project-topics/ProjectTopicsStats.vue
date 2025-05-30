<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div class="text-sm text-gray-600 mb-3 md:mb-0 flex items-center">
      <span class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-aps-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </span>
      <span
        >Showing
        <span class="font-medium text-aps-green">{{ displayedCount }}</span>
        of
        <span class="font-medium text-aps-green">{{ totalItems }}</span>
        topics</span
      >
    </div>
    <div class="flex items-center space-x-4">
      <button
        @click="$emit('generate-pdf')"
        :disabled="filteredTopicsCount === 0 || isGeneratingPDF"
        class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-md shadow-sm transition duration-200"
      >
        <svg
          v-if="!isGeneratingPDF"
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
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
        <svg
          v-else
          class="animate-spin h-5 w-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {{ isGeneratingPDF ? "Generating PDF..." : "Download as PDF" }}
      </button>

      <div class="flex items-center">
        <span class="font-medium text-gray-700 mr-2">Items per page:</span>
        <div class="relative">
          <select
            :value="itemsPerPage"
            @change="$emit('update:itemsPerPage', parseInt($event.target.value))"
            class="appearance-none border-gray-300 rounded-md shadow-sm focus:border-aps-green focus:ring-aps-green transition-all duration-200 pl-3 pr-8 py-1"
          >
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
          >
            <svg
              class="h-4 w-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  displayedCount: Number,
  totalItems: Number,
  filteredTopicsCount: Number,
  isGeneratingPDF: Boolean,
  itemsPerPage: Number,
});

defineEmits(['generate-pdf', 'update:itemsPerPage']);
</script> 