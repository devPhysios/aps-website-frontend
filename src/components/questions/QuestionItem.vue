<template>
  <div class="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <div v-if="question.imgURL" class="flex justify-start mb-3">
      <img :src="question.imgURL" class="max-w-xs max-h-[300px] object-cover object-center rounded" />
    </div>
    <h2 class="text-lg font-semibold mb-2">
      {{ displayNumber }}. {{ question.question }}
    </h2>

    <div v-if="user && user.isAcademicCommittee" class="flex justify-end mb-2">
      <button @click="emit('edit', question)" class="mr-2 text-blue-500 hover:text-blue-700" title="Edit Question">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <button @click="emit('delete', question)" class="text-red-500 hover:text-red-700" title="Delete Question">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- MCQ Options -->
    <ul v-if="question.type === 'MCQ' && question.options" class="list-disc ml-6 mb-2">
      <li v-for="(option, optionIndex) in question.options" :key="optionIndex">
        {{ option }}
      </li>
    </ul>

    <button @click="emit('reveal-answer')" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none text-sm">
      {{ showAnswer ? 'Hide' : 'Reveal' }} Answer
    </button>

    <div v-if="showAnswer" class="mt-2 p-3 bg-gray-50 rounded">
      <p v-if="isAnswerEmpty" class="italic text-red-500">
        No answer yet
      </p>
      <p v-else-if="question.type === 'MCQ'" class="italic text-green-700">
        Answer: {{ mcqCorrectAnswerText }}
      </p>
      <p v-else class="italic text-green-700">
        Answer: {{ question.answer }}
      </p>
    </div>

    <p class="mt-2 italic text-sm text-gray-600">Year: {{ question.year }}</p>
    <p v-if="question.lecturer" class="mt-1 italic text-sm text-gray-500">Lecturer: {{ question.lecturer }}</p>
    <p v-if="question.tags" class="mt-1 italic text-sm text-gray-500">Tags: {{ question.tags }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/UserStore'; // Assuming path to UserStore

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  displayNumber: {
    type: Number,
    required: true
  },
  showAnswer: {
    type: Boolean,
    default: false
  },
  questionType: { // To help differentiate if needed, though question.type is primary
    type: String,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete', 'reveal-answer']);

const users = useUserStore();
const user = computed(() => users.user); // Get reactive user data

const isAnswerEmpty = computed(() => {
  if (props.question.type === 'MCQ') {
    // For MCQ, answer is an array of indices. Empty if array is empty or contains only empty strings (though indices shouldn't be strings).
    return !props.question.answer || props.question.answer.length === 0 || props.question.answer.every(a => a === '');
  }
  // For Essay/Cloze, answer is a string.
  return !props.question.answer || props.question.answer.trim() === '' || props.question.answer === 'No answer yet';
});

const mcqCorrectAnswerText = computed(() => {
  if (props.question.type !== 'MCQ' || !props.question.options || !props.question.answer) return 'Not applicable';
  if (isAnswerEmpty.value) return 'No answer yet';

  // Assuming question.answer for MCQ is an array of correct option indices (numbers)
  return props.question.answer
    .map(index => {
        const numericIndex = parseInt(index, 10);
        if (numericIndex >= 0 && numericIndex < props.question.options.length) {
            return props.question.options[numericIndex];
        }
        return 'Invalid answer index'; 
    })
    .join(', ');
});

</script>

<style scoped>
/* Add any specific styles for QuestionItem */
</style> 