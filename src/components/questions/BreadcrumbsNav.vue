<template>
  <nav class="bg-gray-200 pb-4 sticky top-0 z-10 font-display">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ol class="flex items-center space-x-4">
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <a 
            :href="crumb.link" 
            class="text-gray-600 hover:text-gray-800 underline"
            :class="{ 'ml-4': index > 0 }" 
          >
            {{ crumb.title }}
          </a>
          <span v-if="index < breadcrumbs.length - 1" class="text-gray-400 hidden sm:inline ml-4">/</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
/* Scoped styles if any specific to breadcrumbs */
</style> 