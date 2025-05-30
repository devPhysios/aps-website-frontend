<template>
  <div class="flex justify-center items-center mt-4 space-x-1 sm:space-x-2">
    <button
      @click="emit('first')"
      :disabled="currentPage === 1 || totalPages === 0"
      class="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md focus:outline-none text-sm"
      :class="{ 'cursor-not-allowed bg-red-500': currentPage === 1 || totalPages === 0 }"
    >
      First
    </button>
    <button
      @click="emit('prev')"
      :disabled="currentPage === 1 || totalPages === 0"
      class="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md focus:outline-none text-sm"
      :class="{ 'cursor-not-allowed bg-red-500': currentPage === 1 || totalPages === 0 }"
    >
      Prev
    </button>
    <div class="flex items-center">
      <input
        :value="currentPage" 
        @input="onPageInput"
        type="number"
        min="1"
        :max="totalPages || 1" 
        class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-16 text-center text-sm"
        :disabled="totalPages === 0"
      />
      <span class="px-2 py-1 bg-gray-200 rounded-md text-sm ml-1 sm:ml-2">of {{ totalPages || 0 }}</span>
    </div>
    <button
      @click="emit('next')"
      :disabled="currentPage === totalPages || totalPages === 0"
      class="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md focus:outline-none text-sm"
      :class="{ 'cursor-not-allowed bg-red-500': currentPage === totalPages || totalPages === 0 }"
    >
      Next
    </button>
    <button
      @click="emit('last')"
      :disabled="currentPage === totalPages || totalPages === 0"
      class="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md focus:outline-none text-sm"
      :class="{ 'cursor-not-allowed bg-red-500': currentPage === totalPages || totalPages === 0 }"
    >
      Last
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['first', 'prev', 'next', 'last', 'page-input']);

const onPageInput = (event) => {
  emit('page-input', event.target.value);
};
</script>

<style scoped>

</style> 