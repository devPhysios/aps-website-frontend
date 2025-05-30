<!-- CourseQuestions.vue -->
<template>
  <BreadcrumbsNav :breadcrumbs="breadcrumbs" />

  <div class="max-w-4xl mx-auto p-4 font-display">
    <CourseDetailsDisplay :course="courseData" />

    <PdfDownloadButton 
      :loading="pdfLoading" 
      :disabled="!filteredQuestions || filteredQuestions.length === 0"
      :courseCode="courseCode" 
      @download="getPDF" 
    />

    <SearchBar 
      v-model="searchQuery"
      :placeholder="searchPlaceholder"
      @inputChange="handleSearchInput" 
    />

    <QuestionTabs 
      :currentTab="currentTab" 
      @update:currentTab="newTab => currentTab = newTab"
      :mcqEnabled="mcqQuestionsExist"
      :essayEnabled="essayQuestionsExist"
      :clozeEnabled="clozeQuestionsExist"
    />

    <LoadingIndicator v-if="loading" />

    <NoQuestionsMessage v-if="!loading && (!filteredQuestions || filteredQuestions.length === 0)" />
    
    <div v-if="!loading && filteredQuestions && filteredQuestions.length > 0">
      <!-- MCQ Questions -->
      <div v-if="currentTab === 'MCQ'">
        <QuestionItem 
          v-for="(question, index) in paginatedMCQQuestions"
          :key="question._id"
          :question="question"
          :displayNumber="(currentPageMCQ - 1) * perPage + index + 1"
          :showAnswer="showAnswerMCQ[index]"
          questionType="MCQ"
          @edit="(q) => openEditModal(q, 'MCQ')"
          @delete="openDeleteModal"
          @reveal-answer="revealAnswer(index, 'MCQ')"
        />
        <PaginationControls
          v-if="totalPages('MCQ') > 1" 
          :currentPage="currentPageMCQ"
          :totalPages="totalPages('MCQ')" 
          @first="() => goToFirstPage('MCQ')"
          @prev="() => previousPage('MCQ')"
          @next="() => nextPage('MCQ')"
          @last="() => goToLastPage('MCQ')"
          @page-input="(val) => handlePageInput('MCQ', val)" 
        />
      </div>

      <!-- Essay Questions -->
      <div v-else-if="currentTab === 'Essay'">
        <QuestionItem 
          v-for="(question, index) in paginatedEssayQuestions"
          :key="question._id"
          :question="question"
          :displayNumber="(currentPageEssay - 1) * perPage + index + 1"
          :showAnswer="showAnswerEssay[index]"
          questionType="Essay"
          @edit="(q) => openEditModal(q, 'Essay')"
          @delete="openDeleteModal"
          @reveal-answer="revealAnswer(index, 'Essay')"
        />
        <PaginationControls
          v-if="totalPages('Essay') > 1"
          :currentPage="currentPageEssay"
          :totalPages="totalPages('Essay')"
          @first="() => goToFirstPage('Essay')"
          @prev="() => previousPage('Essay')"
          @next="() => nextPage('Essay')"
          @last="() => goToLastPage('Essay')"
          @page-input="(val) => handlePageInput('Essay', val)"
        />
      </div>

      <!-- Cloze Questions -->
      <div v-else-if="currentTab === 'Cloze'">
        <QuestionItem 
          v-for="(question, index) in paginatedClozeQuestions"
          :key="question._id"
          :question="question"
          :displayNumber="(currentPageCloze - 1) * perPage + index + 1"
          :showAnswer="showAnswerCloze[index]"
          questionType="Cloze" 
          @edit="(q) => openEditModal(q, 'Cloze')"
          @delete="openDeleteModal"
          @reveal-answer="revealAnswer(index, 'Cloze')"
        />
        <PaginationControls
          v-if="totalPages('Cloze') > 1"
          :currentPage="currentPageCloze"
          :totalPages="totalPages('Cloze')"
          @first="() => goToFirstPage('Cloze')"
          @prev="() => previousPage('Cloze')"
          @next="() => nextPage('Cloze')"
          @last="() => goToLastPage('Cloze')"
          @page-input="(val) => handlePageInput('Cloze', val)"
        />
      </div>
    </div>

    <QuestionEditModal 
      :show="showEditModal"
      :questionData="editedQuestion" 
      :mcqAnswer="editedAnswer" 
      :questionType="editedQuestion.type || currentTab" 
      @close="closeEditModal"
      @update="updateQuestion" 
      @add-option="addOption" 
      @remove-option="removeOption"
      @update:mcqAnswer="newVal => editedAnswer = newVal"
    />

    <QuestionDeleteModal 
      :show="showDeleteModal"
      :questionToDelete="deletedQuestion" 
      @close="closeDeleteModal"
      @delete="deleteQuestion"
    />

  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
// import { useUserStore } from "@/stores/UserStore"; // Removed as per user change, ensure QuestionItem does not directly use it or has it provided/injected

// Composables
import { useCourseMeta } from '../composables/useCourseMeta';
import { useQuestions } from '../composables/useQuestions';
import { usePagination } from '../composables/usePagination';
import { useQuestionSearch } from '../composables/useQuestionSearch';
import { useQuestionActions } from '../composables/useQuestionActions';
import { usePdfExport } from '../composables/usePdfExport';

// Components
import BreadcrumbsNav from '../components/questions/BreadcrumbsNav.vue';
import CourseDetailsDisplay from '../components/questions/CourseDetailsDisplay.vue';
import PdfDownloadButton from '../components/questions/PdfDownloadButton.vue';
import SearchBar from '../components/questions/SearchBar.vue';
import QuestionTabs from '../components/questions/QuestionTabs.vue';
import LoadingIndicator from '../components/questions/LoadingIndicator.vue';
import NoQuestionsMessage from '../components/questions/NoQuestionsMessage.vue';
import QuestionItem from '../components/questions/QuestionItem.vue';
import PaginationControls from '../components/questions/PaginationControls.vue';
import QuestionEditModal from '../components/questions/QuestionEditModal.vue';
import QuestionDeleteModal from '../components/questions/QuestionDeleteModal.vue';


// Course Meta
const { level, courseCode, courseData, breadcrumbs, fetchCourseDetails } = useCourseMeta();

// Questions Logic
const {
  loading, 
  questions, 
  currentTab, 
  mcqQuestionsExist, 
  essayQuestionsExist, 
  clozeQuestionsExist, 
  fetchQuestions, 
  revealAnswer,
  showAnswerMCQ,
  showAnswerEssay,
  showAnswerCloze
} = useQuestions(courseCode);

// Search Logic
const { 
  searchQuery, 
  searchPlaceholder, 
  filteredQuestions, 
  handleSearchInput 
} = useQuestionSearch(questions, currentTab, (tab) => {
  if (tab === 'MCQ') pagination.currentPageMCQ.value = 1;
  else if (tab === 'Essay') pagination.currentPageEssay.value = 1;
  else if (tab === 'Cloze') pagination.currentPageCloze.value = 1;
});

// Pagination Logic
const pagination = usePagination(filteredQuestions, currentTab);
const {
  currentPageMCQ,
  currentPageEssay,
  currentPageCloze,
  // pageIndex, // Removed as per user change; activePageIndex is used internally in usePagination
  perPage,
  totalPages, // This is now the function from the composable
  paginatedMCQQuestions,
  paginatedEssayQuestions,
  paginatedClozeQuestions,
  previousPage,
  nextPage,
  goToFirstPage,
  goToLastPage,
  handlePageInput, // This is now the function from the composable
  resetPageForTab
} = pagination;

// Question Actions (Edit/Delete)
const {
  showEditModal, 
  showDeleteModal, 
  editedQuestion, 
  editedAnswer, 
  deletedQuestion, 
  openEditModal, 
  closeEditModal, 
  addOption, 
  removeOption, 
  updateQuestion, 
  openDeleteModal,
  closeDeleteModal,
  deleteQuestion
} = useQuestionActions(currentTab, questions);

// PDF Export
const { getPDF, pdfLoading } = usePdfExport(filteredQuestions, courseCode, level, courseData);

// Initial data fetching
onMounted(async () => {
  await fetchCourseDetails();
  await fetchQuestions();
});

watch(currentTab, (newTab) => {
  resetPageForTab(newTab);
  pagination.scrollToTop();
});

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

</script>

<style scoped>
/* Add custom styles here if needed */
</style>
