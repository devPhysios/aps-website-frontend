<template>
  <div class="flex mb-4">
    <button
      @click="selectTab('MCQ')"
      :disabled="!mcqEnabled"
      :class="{
        'bg-blue-500 text-white': currentTab === 'MCQ' && mcqEnabled,
        'bg-red-500 text-white cursor-not-allowed': !mcqEnabled,
        'bg-green-500 text-gray-600 hover:bg-gray-200': currentTab !== 'MCQ' && mcqEnabled,
         'bg-gray-300 text-gray-400 cursor-not-allowed': currentTab !== 'MCQ' && !mcqEnabled, // Ensure this state is visually distinct
      }"
      class="flex-1 px-4 py-2 rounded-l-lg focus:outline-none mx-2"
    >
      MCQ
    </button>
    <button
      @click="selectTab('Essay')"
      :disabled="!essayEnabled"
      :class="{
        'bg-blue-500 text-white': currentTab === 'Essay' && essayEnabled,
        'bg-red-500 text-white cursor-not-allowed': !essayEnabled,
        'bg-green-500 text-gray-600 hover:bg-gray-200': currentTab !== 'Essay' && essayEnabled,
        'bg-gray-300 text-gray-400 cursor-not-allowed': currentTab !== 'Essay' && !essayEnabled,
      }"
      class="flex-1 px-4 py-2 focus:outline-none mx-2"
    >
      Essay
    </button>
    <button
      @click="selectTab('Cloze')"
      :disabled="!clozeEnabled"
      :class="{
        'bg-blue-500 text-white': currentTab === 'Cloze' && clozeEnabled,
        'bg-red-500 text-white cursor-not-allowed': !clozeEnabled,
        'bg-green-500 text-gray-600 hover:bg-gray-200': currentTab !== 'Cloze' && clozeEnabled,
        'bg-gray-300 text-gray-400 cursor-not-allowed': currentTab !== 'Cloze' && !clozeEnabled,
      }"
      class="flex-1 px-4 py-2 rounded-r-lg focus:outline-none mx-2"
    >
      Cloze
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentTab: {
    type: String,
    required: true
  },
  mcqEnabled: {
    type: Boolean,
    default: false
  },
  essayEnabled: {
    type: Boolean,
    default: false
  },
  clozeEnabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:currentTab']);

const selectTab = (tabName) => {
  emit('update:currentTab', tabName);
};
</script>

<style scoped>
/* Scoped styles for question tabs */
</style> 