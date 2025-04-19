<template>
  <div class="section-header">
    <h2 class="section-title">
      <span class="relative inline-block">
        <span
          class="h-1 absolute bottom-0 left-0 right-0"
          :class="`bg-gradient-to-r ${gradient}`"
        ></span>
        {{ title }}
      </span>
    </h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  gradient: {
    type: String,
    default: "from-aps-green to-aps-orange",
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<style>
.section-header {
  @apply flex flex-col items-center justify-center text-center mb-8 font-poppins;
}

.section-title {
  @apply text-2xl md:text-3xl font-bold mb-2;
  @apply text-gray-800 dark:text-gray-100;
  @apply relative;
}

.section-title::after {
  content: "";
  @apply absolute -bottom-2 left-1/2 transform -translate-x-1/2;
  @apply h-1 w-16 rounded-full;
  @apply bg-aps-green;
}

.section-subtitle {
  @apply text-sm md:text-base mt-4;
  @apply text-gray-600 dark:text-gray-400;
  @apply max-w-2xl mx-auto;
}
</style>
