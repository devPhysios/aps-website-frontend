<template>
  <div class="flex justify-start mb-6">
    <button
      @click="onDownload"
      :disabled="disabled || loading"
      class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        class="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        ></path>
      </svg>
      <span>{{ buttonText }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  courseCode: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['download']);

const buttonText = computed(() => {
  if (props.loading) return "Loading...";
  return `Download ${props.courseCode} questions in PDF`;
});

const onDownload = () => {
  emit('download');
};
</script>

<style scoped>
/* Scoped styles for PDF download button */
</style> 