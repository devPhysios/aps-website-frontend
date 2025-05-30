<template>
  <div
    class="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div class="flex items-center mb-4 md:mb-0">
      <button
        @click="$emit('previous-page')"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 mr-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50"
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        class="flex items-center space-x-1 overflow-x-auto hide-scrollbar"
      >
        <template v-for="page in paginationRange" :key="page">
          <button
            v-if="page !== '...'"
            @click="$emit('go-to-page', page)"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50',
              currentPage === page
                ? 'bg-aps-green text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
            ]"
            :aria-label="`Go to page ${page}`"
            :aria-current="currentPage === page ? 'page' : undefined"
          >
            {{ page }}
          </button>
          <span v-else class="px-2 text-gray-500">...</span>
        </template>
      </div>
      <button
        @click="$emit('next-page')"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 ml-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50"
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="text-sm text-gray-600 flex items-center">
      <span
        class="px-3 py-1 rounded-full bg-aps-green bg-opacity-10 text-aps-green font-medium"
      >
        Page {{ currentPage }} of {{ totalPages }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { usePaginationRange } from '@/utils/project-topics/paginationUtils';
import { toRefs } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const { currentPage, totalPages } = toRefs(props);
const paginationRange = usePaginationRange(currentPage, totalPages);

defineEmits(['previous-page', 'next-page', 'go-to-page']);
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .space-x-1 > * + * {
    margin-left: 0.15rem;
  }

  .w-10.h-10 {
    width: 2rem;
    height: 2rem;
    font-size: 0.85rem;
  }
}
</style> 