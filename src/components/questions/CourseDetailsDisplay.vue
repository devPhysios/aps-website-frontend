<template>
  <div v-if="course && course.coursetitle" class="bg-white shadow-md rounded-lg p-6 mb-6 font-display">
    <h1 class="text-2xl font-semibold mb-4">{{ course.coursetitle }}</h1>
    <p><strong>Course Code:</strong> {{ course.coursecode }}</p>
    <p><strong>Level:</strong> {{ course.level }}</p>
    <p><strong>Unit:</strong> {{ course.unit }}</p>
  </div>
  <div v-else class="bg-white shadow-md rounded-lg p-6 mb-6">
    <p>Loading course details...</p> 
    <!-- You can add a more sophisticated loader here if needed -->
  </div>
</template>

<script setup>
defineProps({
  course: {
    type: Object,
    required: true,
    default: () => ({})
  }
});
</script>

<style scoped>
/* Scoped styles for course details */
</style> 