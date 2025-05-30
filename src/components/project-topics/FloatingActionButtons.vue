<template>
  <div>
    <!-- Back to top button -->
    <button
      v-show="showScrollTop"
      @click="$emit('scroll-to-top')"
      class="fixed bottom-6 right-6 p-2 rounded-full bg-aps-green text-white shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50 z-50"
      aria-label="Scroll to top"
    >
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
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </button>

    <!-- Filter toggle button -->
    <button
      v-show="!isFilterExpanded && !isAtTop"
      @click="$emit('toggle-filters')"
      class="fixed bottom-6 left-6 p-2 rounded-full bg-aps-orange text-white shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-aps-orange focus:ring-opacity-50 z-50"
      aria-label="Toggle filters"
    >
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
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
 defineProps({
  showScrollTop: Boolean,
  isFilterExpanded: Boolean,
  isAtTop: Boolean,
});

defineEmits(['scroll-to-top', 'toggle-filters']);
</script> 