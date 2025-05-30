import { ref, computed } from 'vue';

export function useQuestionSearch(questions, currentTab, resetPaginationCallback) {
  const searchQuery = ref('');

  const searchPlaceholder = computed(
    () => `Search ${currentTab.value} questions` // currentTab should be a ref passed from the main component or another composable
  );

  const filteredQuestions = computed(() => {
    if (!searchQuery.value) {
      return questions.value; // questions should be a ref
    }
    const regex = new RegExp(searchQuery.value, 'i');
    return questions.value.filter((q) => regex.test(q.question));
  });

  // This function was called handleInput in the original component.
  // It resets pagination when search query changes.
  const handleSearchInput = () => {
    // The callback will be responsible for resetting the correct currentPage (MCQ, Essay, Cloze)
    if (resetPaginationCallback) {
      resetPaginationCallback(currentTab.value);
    }
  };

  return {
    searchQuery,
    searchPlaceholder,
    filteredQuestions,
    handleSearchInput,
  };
} 