<template>
  <div class="text-center font-display">
    <p class="text-3xl font-semibold">Coming Soon</p>
    <div class="flex justify-center items-center w-full h-full my-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="150"
        height="150"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12" y2="16"></line>
        <circle cx="12" cy="12" r="2"></circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple component
</script>

<style scoped>
/* Scoped styles for no questions message */
</style> 