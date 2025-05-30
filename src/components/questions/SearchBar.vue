<template>
  <div class="mb-4">
    <input
      :value="modelValue" 
      @input="onInput"
      type="text"
      :placeholder="placeholder"
      class="px-4 py-2 border border-gray-300 rounded-md focus:outline-double focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { // for v-model support
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search...'
  }
});

const emit = defineEmits(['update:modelValue', 'inputChange']);

const onInput = (event) => {
  emit('update:modelValue', event.target.value);
  emit('inputChange'); // To notify parent about the input event for additional logic like resetting pagination
};
</script>

<style scoped>
/* Scoped styles for search bar */
</style> 