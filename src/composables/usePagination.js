import { ref, computed } from 'vue';
import { handlePageInput as importedHandlePageInput } from '../utils/useHandlePageInput.js'; // Assuming this utility exists and is correctly imported

const PER_PAGE = 20;

export function usePagination(filteredQuestionsRef, currentTabRef) {
  const currentPageMCQ = ref(1);
  const currentPageEssay = ref(1);
  const currentPageCloze = ref(1);
  const pageIndex = ref(0); // This seems to be a general page index, might need to be tab-specific if its usage implies that

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = (tab) => {
    if (!filteredQuestionsRef || !filteredQuestionsRef.value) {
      return 0;
    }
    const relevantQuestions = filteredQuestionsRef.value.filter(q => {
      if (tab === 'MCQ') return q.type === 'MCQ';
      if (tab === 'Essay') return q.type === 'Essay';
      if (tab === 'Cloze') return q.type === 'Fill in the Gap';
      return false;
    });
    return Math.ceil(relevantQuestions.length / PER_PAGE);
  };

  const paginatedMCQQuestions = computed(() => {
    if (!filteredQuestionsRef || !filteredQuestionsRef.value) return [];
    const startIndex = (currentPageMCQ.value - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return filteredQuestionsRef.value
      .filter((q) => q.type === 'MCQ')
      .slice(startIndex, endIndex);
  });

  const paginatedEssayQuestions = computed(() => {
    if (!filteredQuestionsRef || !filteredQuestionsRef.value) return [];
    const startIndex = (currentPageEssay.value - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return filteredQuestionsRef.value
      .filter((q) => q.type === 'Essay')
      .slice(startIndex, endIndex);
  });

  const paginatedClozeQuestions = computed(() => {
    if (!filteredQuestionsRef || !filteredQuestionsRef.value) return [];
    const startIndex = (currentPageCloze.value - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return filteredQuestionsRef.value
      .filter((q) => q.type === 'Fill in the Gap')
      .slice(startIndex, endIndex);
  });

  const previousPage = (tab) => {
    scrollToTop();
    switch (tab) {
      case 'MCQ':
        if (currentPageMCQ.value > 1) currentPageMCQ.value -= 1;
        break;
      case 'Essay':
        if (currentPageEssay.value > 1) currentPageEssay.value -= 1;
        break;
      case 'Cloze':
        if (currentPageCloze.value > 1) currentPageCloze.value -= 1;
        break;
    }
    // Assuming pageIndex should correspond to the current page of the active tab
    if (currentTabRef.value === 'MCQ') pageIndex.value = currentPageMCQ.value -1;
    else if (currentTabRef.value === 'Essay') pageIndex.value = currentPageEssay.value -1;
    else if (currentTabRef.value === 'Cloze') pageIndex.value = currentPageCloze.value -1;
  };

  const nextPage = (tab) => {
    scrollToTop();
    const maxPages = totalPages(tab);
    switch (tab) {
      case 'MCQ':
        if (currentPageMCQ.value < maxPages) currentPageMCQ.value += 1;
        break;
      case 'Essay':
        if (currentPageEssay.value < maxPages) currentPageEssay.value += 1;
        break;
      case 'Cloze':
        if (currentPageCloze.value < maxPages) currentPageCloze.value += 1;
        break;
    }
    if (currentTabRef.value === 'MCQ') pageIndex.value = currentPageMCQ.value -1;
    else if (currentTabRef.value === 'Essay') pageIndex.value = currentPageEssay.value -1;
    else if (currentTabRef.value === 'Cloze') pageIndex.value = currentPageCloze.value -1;
  };
  
  const goToFirstPage = (tab) => {
    scrollToTop();
    pageIndex.value = 0;
    if (tab === 'MCQ') currentPageMCQ.value = 1;
    else if (tab === 'Essay') currentPageEssay.value = 1;
    else if (tab === 'Cloze') currentPageCloze.value = 1;
  };

  const goToLastPage = (tab) => {
    scrollToTop();
    const maxPages = totalPages(tab);
    pageIndex.value = maxPages - 1;
    if (tab === 'MCQ') currentPageMCQ.value = maxPages;
    else if (tab === 'Essay') currentPageEssay.value = maxPages;
    else if (tab === 'Cloze') currentPageCloze.value = maxPages;
  };

  // Wrapper for the imported handlePageInput utility
  const handlePageInput = (tab, value) => {
    let currentPageRef;
    if (tab === 'MCQ') currentPageRef = currentPageMCQ;
    else if (tab === 'Essay') currentPageRef = currentPageEssay;
    else if (tab === 'Cloze') currentPageRef = currentPageCloze;
    else return;

    const newPage = importedHandlePageInput(
        value, 
        totalPages(tab),
        currentPageRef // Pass the ref itself
    ); 
    // The utility should directly update the ref, but if it returns the value:
    // currentPageRef.value = newPage;
    // Update pageIndex accordingly
    pageIndex.value = currentPageRef.value - 1;
    scrollToTop();
  };


  // The original component reset pageIndex to 0 on some operations.
  // We need to ensure current page and pageIndex are consistent.
  // The handleInput function in the original component reset the current page of a tab to 1 when search query changed.
  // This can be handled by watching searchQuery in the main component and calling a reset function here.
  const resetPageForTab = (tab) => {
    if (tab === 'MCQ') currentPageMCQ.value = 1;
    else if (tab === 'Essay') currentPageEssay.value = 1;
    else if (tab === 'Cloze') currentPageCloze.value = 1;
    // If currentTab is the one being reset, also reset the shared pageIndex if it was tied to it.
    // Or, better, make pageIndex a computed property based on currentTab and its respective currentPage.
  };

  // Computed property for the active page index (0-based) for the current tab
  const activePageIndex = computed(() => {
    if (currentTabRef.value === 'MCQ') return currentPageMCQ.value - 1;
    if (currentTabRef.value === 'Essay') return currentPageEssay.value - 1;
    if (currentTabRef.value === 'Cloze') return currentPageCloze.value - 1;
    return 0;
  });

  return {
    currentPageMCQ,
    currentPageEssay,
    currentPageCloze,
    pageIndex: activePageIndex, // Use the computed activePageIndex
    perPage: PER_PAGE, // Export PER_PAGE if needed by components
    totalPages,
    paginatedMCQQuestions,
    paginatedEssayQuestions,
    paginatedClozeQuestions,
    previousPage,
    nextPage,
    goToFirstPage,
    goToLastPage,
    handlePageInput,
    scrollToTop, // Export scrollToTop if it's used by pagination buttons directly
    resetPageForTab, // Export function to reset pagination for a tab
  };
} 