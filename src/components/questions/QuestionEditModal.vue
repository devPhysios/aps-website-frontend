<template>
  <div v-if="show" class="fixed z-20 pt-5 mt-10 inset-0 overflow-y-auto transition-all duration-300 font-display">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" @click="closeModal">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Edit Question ({{ questionType }})
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-center text-gray-500">
                Edit the question details below.
              </p>
              <!-- Question Text -->
              <div class="mt-4">
                <label for="question-text" class="block text-sm font-medium text-gray-700">Question</label>
                <textarea
                  v-model="editableQuestionData.question"
                  id="question-text"
                  rows="3"
                  class="form-textarea border-black border-2 border-solid mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                ></textarea>
              </div>

              <!-- MCQ Options -->
              <div class="mt-4" v-if="questionType === 'MCQ'">
                <label class="block text-sm font-medium text-gray-700">Options</label>
                <div
                  v-for="(option, optionIndex) in editableQuestionData.options"
                  :key="optionIndex"
                  class="flex items-center mt-2"
                >
                  <input
                    v-model="editableQuestionData.options[optionIndex]"
                    type="text"
                    class="form-input mt-1 block border-black border-2 border-solid w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 mr-2"
                  />
                  <button
                    type="button"
                    class="text-red-500 hover:text-red-700"
                    @click="emit('remove-option', optionIndex)"
                    title="Remove Option"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  @click="emit('add-option')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Add Option
                </button>
              </div>

              <!-- Answer -->
              <div class="mt-4">
                <label for="answer" class="block text-sm font-medium text-gray-700">Answer</label>
                <div v-if="questionType === 'MCQ'">
                    <p class="text-xs text-gray-500 mb-1">Select the correct answer(s):</p>
                    <div
                        v-for="(option, optionIndex) in editableQuestionData.options"
                        :key="optionIndex"
                        class="flex items-center mt-2"
                    >
                        <input
                        :id="`mcq-ans-${optionIndex}`"
                        type="checkbox"
                        :value="optionIndex" 
                        v-model="editableMcqAnswer"
                        class="form-checkbox border-black border-2 border-solid h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-2"
                        />
                        <label :for="`mcq-ans-${optionIndex}`" class="text-sm">{{ option || 'Option ' + (optionIndex + 1) }}</label>
                    </div>
                </div>
                <textarea
                  v-else
                  v-model="editableQuestionData.answer"
                  id="answer-text"
                  rows="3"
                  class="form-textarea border-black border-2 border-solid mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                ></textarea>
              </div>

              <!-- Year -->
              <div class="mt-4">
                <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
                <input
                  v-model="editableQuestionData.year"
                  type="text"
                  id="year"
                  class="form-input border-black border-2 border-solid mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <!-- Tags -->
              <div class="mt-4">
                <label for="tags" class="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input
                  v-model="editableQuestionData.tags"
                  type="text"
                  id="tags"
                  class="form-input mt-1 border-black border-2 border-solid block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <!-- Lecturer -->
              <div class="mt-4">
                <label for="lecturer" class="block text-sm font-medium text-gray-700">Lecturer</label>
                <input
                  v-model="editableQuestionData.lecturer"
                  type="text"
                  id="lecturer"
                  class="form-input mt-1 block border-black border-2 border-solid w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <!-- Image URL (Optional based on original component logic) -->
              <!-- <div class="mt-4">
                <label for="imgURL" class="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  v-model="editableQuestionData.imgURL"
                  type="text"
                  id="imgURL"
                  class="form-input mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div> -->
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="submitUpdate"
          >
            Update
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  questionData: { // This is the 'editedQuestion' from the composable
    type: Object,
    required: true
  },
  mcqAnswer: { // This is the 'editedAnswer' (array of indices) from the composable for MCQ
    type: Array,
    default: () => []
  },
  questionType: { // MCQ, Essay, Cloze - passed to determine modal structure
    type: String,
    required: true
  }
});

const emit = defineEmits(['close', 'update', 'add-option', 'remove-option', 'update:mcqAnswer']);

// Internal state for the form, initialized from props and watched for changes
// This prevents direct mutation of props and allows for local form management
const editableQuestionData = ref(JSON.parse(JSON.stringify(props.questionData)));

// Specific model for MCQ answer checkboxes
const editableMcqAnswer = computed({
    get: () => props.mcqAnswer, // Read from the prop passed by the composable
    set: (value) => emit('update:mcqAnswer', value) // Emit an event to update the composable's state
});

watch(() => props.questionData, (newData) => {
  editableQuestionData.value = JSON.parse(JSON.stringify(newData));
}, { deep: true });

watch(() => props.show, (newVal) => {
  if (newVal) {
    // When modal is shown, re-sync with the latest prop data
    editableQuestionData.value = JSON.parse(JSON.stringify(props.questionData));
  }
});

const closeModal = () => {
  emit('close');
};

const submitUpdate = () => {
  // Emit the locally edited data. The composable will handle the actual API call.
  emit('update', JSON.parse(JSON.stringify(editableQuestionData.value)));
  // MCQ answers are handled via `editableMcqAnswer` computed property and its emit
};

</script>

<style scoped>
/* Scoped styles for edit modal */
</style> 