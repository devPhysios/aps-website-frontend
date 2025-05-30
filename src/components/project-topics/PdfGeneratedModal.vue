<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-800">
          PDF Generated Successfully
        </h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="mb-5">
        <p class="text-gray-600 mb-3">
          Your PDF has been successfully generated with the following details:
        </p>

        <div class="bg-gray-50 p-3 rounded-lg mb-3">
          <p class="text-sm text-gray-700">
            <span class="font-medium">Project Topics:</span>
            {{ filteredTopicsCount }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-medium">Pages:</span> {{ pdfPageCount }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-medium">Includes:</span>
            <span v-if="pdfOptions.includeHeader">Header, </span>
            <span v-if="pdfOptions.includeFooter">footer, </span>
            <span v-if="pdfOptions.includePageNumbers">page numbers, </span>
            columns ( Topic,
            <span v-if="pdfOptions.columns.year">Year, </span>
            <span v-if="pdfOptions.columns.supervisor">Supervisor, </span>
            <span v-if="pdfOptions.columns.author">Author</span>
            )
          </p>

          <div v-if="hasActiveFilters" class="mt-2">
            <p class="text-sm font-medium text-gray-700">Applied Filters:</p>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li v-if="activeFilters.year">Year: {{ activeFilters.year }}</li>
              <li v-if="activeFilters.supervisor">
                Supervisor: {{ activeFilters.supervisor }}
              </li>
              <li v-if="activeFilters.author">Author: {{ activeFilters.author }}</li>
              <li v-if="activeFilters.search">Search: {{ activeFilters.search }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="$emit('download-pdf')"
          class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </button>
        <button
          @click="$emit('preview-pdf')"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center"
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Preview PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: Boolean,
  filteredTopicsCount: Number,
  pdfPageCount: Number,
  pdfOptions: Object,
  activeFilters: Object,
});

defineEmits(['close', 'download-pdf', 'preview-pdf']);

const hasActiveFilters = computed(() => {
  return (
    props.activeFilters &&
    Object.values(props.activeFilters).some((value) => !!value)
  );
});
</script> 