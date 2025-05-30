<template>
  <div>
    <div class="text-center mb-10 animate__animated animate__fadeIn animate__slow">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
        My Project Topic
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Manage your research project topic
      </p>
      <div class="mt-4 w-24 h-1 bg-green-500 mx-auto rounded-full animate__animated animate__fadeIn animate__delay-1s"></div>
    </div>

    <div class="mt-4 flex flex-col md:flex-row gap-2 md:gap-4 mb-6">
      <RouterLink
        to="/dashboard"
        class="inline-flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm transition duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </RouterLink>

      <RouterLink
        to="/project-topics"
        class="inline-flex items-center justify-center py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md shadow-sm transition duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Browse All Project Topics
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.animate__animated {
  animation-duration: 1s;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

.animate__delay-1s {
  animation-delay: 1s;
}

.animate__slow {
  animation-duration: 2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
