<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-800">PDF Export Options</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="mb-5">
        <p class="text-gray-600 mb-4">
          Customize your PDF export with the following options:
        </p>

        <div class="space-y-4">
          <!-- Column Selection -->
          <div>
            <h4 class="font-medium text-gray-700 mb-2">
              Columns to Include:
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <label
                class="flex items-center space-x-2 opacity-50 cursor-not-allowed"
              >
                <input
                  type="checkbox"
                  checked
                  disabled
                  class="rounded text-gray-400 focus:ring-gray-400"
                />
                <span class="text-sm text-gray-700">Topic (Required)</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :checked="modelValue.columns.year"
                  @change="updateOption('columns.year', $event.target.checked)"
                  class="rounded text-aps-green focus:ring-aps-green"
                />
                <span class="text-sm text-gray-700">Year</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :checked="modelValue.columns.supervisor"
                  @change="updateOption('columns.supervisor', $event.target.checked)"
                  class="rounded text-aps-green focus:ring-aps-green"
                />
                <span class="text-sm text-gray-700">Supervisor</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :checked="modelValue.columns.author"
                  @change="updateOption('columns.author', $event.target.checked)"
                  class="rounded text-aps-green focus:ring-aps-green"
                />
                <span class="text-sm text-gray-700">Author</span>
              </label>
            </div>
          </div>

          <!-- Layout Options -->
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Layout Options:</h4>
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :checked="modelValue.includeHeader"
                  @change="updateOption('includeHeader', $event.target.checked)"
                  class="rounded text-aps-green focus:ring-aps-green"
                />
                <span class="text-sm text-gray-700">Include Header</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :checked="modelValue.includeFooter"
                  @change="updateOption('includeFooter', $event.target.checked)"
                  class="rounded text-aps-green focus:ring-aps-green"
                />
                <span class="text-sm text-gray-700">Include Footer</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :checked="modelValue.includePageNumbers"
                  @change="updateOption('includePageNumbers', $event.target.checked)"
                  class="rounded text-aps-green focus:ring-aps-green"
                />
                <span class="text-sm text-gray-700"
                  >Include Page Numbers</span
                >
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex space-x-3">
        <button
          @click="$emit('generate-pdf')"
          class="flex-1 bg-aps-green hover:bg-aps-green-dark text-white py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Generate PDF
        </button>
        <button
          @click="$emit('close')"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'generate-pdf', 'update:modelValue']);

const updateOption = (path, value) => {
  const keys = path.split('.');
  const newOptions = JSON.parse(JSON.stringify(props.modelValue)); // Deep clone
  let current = newOptions;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current = current[key];
    }
  });
  emit('update:modelValue', newOptions);
};
</script> 