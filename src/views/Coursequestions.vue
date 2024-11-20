<!-- CourseQuestions.vue -->
<template>
  <nav class="bg-gray-200 pb-4 sticky top-0 z-10 font-display">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ol class="flex items-center space-x-4">
        <li>
          <a href="/" class="text-gray-600 hover:text-gray-800 underline"
            >Home</a
          >
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <span class="text-gray-400 hidden sm:inline">/</span>
          <!-- Hide on small devices -->
          <a
            :href="crumb.link"
            class="text-gray-600 hover:text-gray-800 underline"
            >{{ crumb.title }}</a
          >
        </li>
      </ol>
    </div>
  </nav>
  <div class="max-w-4xl mx-auto p-4 font-display">
    <!-- Fetch Course Details -->
    <div v-if="course" class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h1 class="text-2xl font-semibold mb-4">{{ course.coursetitle }}</h1>
      <p><strong>Course Code:</strong> {{ course.coursecode }}</p>
      <p><strong>Level:</strong> {{ course.level }}</p>
      <p><strong>Unit:</strong> {{ course.unit }}</p>
    </div>

    <!-- Download PDF -->
    <div class="flex justify-start">
      <button
        @click="getPDF"
        :disabled="loading"
        class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          ></path>
        </svg>
        <span>{{
          loading ? "Loading..." : `Download ${courseCode} questions in PDF`
        }}</span>
      </button>
    </div>
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        @input="handleInput(`${currentTab}`)"
        type="text"
        :placeholder="searchPlaceholder"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-double focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Create Tabs -->
    <div class="flex mb-4">
      <button
        @click="currentTab = 'MCQ'"
        :disabled="!mcqQuestionsExist"
        :class="{
          'bg-blue-500 text-white': currentTab === 'MCQ' && mcqQuestionsExist,
          'bg-red-500 text-white cursor-not-allowed': !mcqQuestionsExist,
          'bg-green-500 text-gray-600 hover:bg-gray-200': currentTab !== 'MCQ',
        }"
        class="flex-1 px-4 py-2 rounded-l-lg focus:outline-none mx-2"
      >
        MCQ
      </button>
      <button
        @click="currentTab = 'Essay'"
        :disabled="!essayQuestionsExist"
        :class="{
          'bg-blue-500 text-white':
            currentTab === 'Essay' && essayQuestionsExist,
          'bg-red-500 text-white cursor-not-allowed': !essayQuestionsExist,
          'bg-green-500 text-gray-600 hover:bg-gray-200':
            currentTab !== 'Essay',
        }"
        class="flex-1 px-4 py-2 focus:outline-none mx-2"
      >
        Essay
      </button>
      <button
        @click="currentTab = 'Cloze'"
        :disabled="!clozeQuestionsExist"
        :class="{
          'bg-blue-500 text-white':
            currentTab === 'Cloze' && clozeQuestionsExist,
          'bg-red-500 text-white cursor-not-allowed': !clozeQuestionsExist,
          'bg-green-500 text-gray-600 hover:bg-gray-200':
            currentTab !== 'Cloze',
        }"
        class="flex-1 px-4 py-2 rounded-r-lg focus:outline-none mx-2"
      >
        Cloze
      </button>
    </div>

    <!-- Fetch Questions -->
    <div v-if="loading" class="flex justify-center items-center font-display">
      <svg
        class="animate-spin h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.28 0-4.37-.765-6.064-2.049l1.728-1.728z"
        ></path>
      </svg>
      <span>Loading...</span>
    </div>

    <!-- Display Questions -->
    <div
      v-if="!loading && questions.length === 0"
      class="text-center text-3xl font-semibold"
    >
      Coming Soon
    </div>
    <div
      v-if="!loading && questions.length === 0"
      class="flex justify-center items-center w-full h-full my-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="150"
        height="150"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12" y2="16"></line>
        <circle cx="12" cy="12" r="2"></circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </svg>
    </div>
    <!-- Implement Question Types -->
    <div v-if="!loading && filteredQuestions">
      <!-- MCQ Questions -->
      <div v-if="currentTab === 'MCQ'">
        <div
          v-for="(question, index) in paginatedMCQQuestions"
          :key="question._id"
          class="mb-6"
        >
          <div v-if="question.imgURL" class="flex justify-start">
            <img
              :src="question.imgURL"
              class="w-[300px] h-[300px] object-cover object-center"
            />
          </div>
          <h2 class="text-lg font-semibold mb-2">
            {{ (currentPageMCQ - 1) * 20 + index + 1 }}. {{ question.question }}
          </h2>
          <!-- Additional Functions for MCQ -->
          <div v-if="users.user.isAcademicCommittee" class="flex justify-end">
            <button
              @click="openEditModal(question, 'MCQ')"
              class="mr-2 text-blue-500 hover:text-blue-700"
            >
              <!-- Modify Icon SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </button>
            <button
              @click="openDeleteModal(question)"
              class="text-red-500 hover:text-red-700"
            >
              <!-- Delete Icon SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ul class="list-disc ml-6">
            <li
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
            >
              {{ option }}
            </li>
          </ul>
          <button
            @click="revealAnswer(index, 'MCQ')"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Reveal/Hide Answer
          </button>
          <p
            v-if="showAnswerMCQ[index] && question.answer.includes('')"
            class="mt-2 italic text-red-500"
          >
            No answer yet
          </p>
          <p
            v-if="
              showAnswerMCQ[index] && question.answer.includes('No answer yet')
            "
            class="mt-2 italic text-red-500"
          >
            No answer yet
          </p>
          <p
            v-if="
              showAnswerMCQ[index] &&
              !question.answer.includes('No answer yet') &&
              !question.answer.includes('')
            "
            class="mt-2 italic text-green-700"
          >
            Answer: {{ question.options[question.answer] }}
          </p>
          <p class="mt-2 italic">Year: {{ question.year }}</p>
        </div>

        <!-- Pagination for MCQ Questions -->
        <div class="flex justify-center items-center mt-4">
          <button
            @click="
              currentPageMCQ = 1;
              pageIndex = 0;
              scrollToTop();
            "
            :disabled="currentPageMCQ === 1"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{ 'cursor-not-allowed bg-red-500': currentPageMCQ === 1 }"
          >
            First
          </button>
          <button
            @click="previousPage('MCQ')"
            :disabled="currentPageMCQ === 1"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{ 'cursor-not-allowed bg-red-500': currentPageMCQ === 1 }"
          >
            Prev
          </button>
          <div class="mx-1 flex">
            <input
              v-model="currentPageMCQ"
              type="number"
              min="1"
              :max="totalPages('MCQ', filteredQuestions)"
              class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="
                handlePageInput('MCQ', $event.target.value, filteredQuestions)
              "
            />
            <span class="px-2 py-1 bg-gray-200 rounded-md"
              >of {{ totalPages("MCQ", filteredQuestions) }}</span
            >
          </div>
          <button
            @click="nextPage('MCQ')"
            :disabled="currentPageMCQ === totalPages('MCQ', filteredQuestions)"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{
              'cursor-not-allowed bg-red-500':
                currentPageMCQ === totalPages('MCQ', filteredQuestions),
            }"
          >
            Next
          </button>
          <button
            @click="
              currentPageMCQ = totalPages('MCQ', filteredQuestions);
              pageIndex = totalPages('MCQ', filteredQuestions) - 1;
              scrollToTop();
            "
            :disabled="currentPageMCQ === totalPages('MCQ', filteredQuestions)"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{
              'cursor-not-allowed bg-red-500':
                currentPageMCQ === totalPages('MCQ', filteredQuestions),
            }"
          >
            Last
          </button>
        </div>
      </div>

      <!-- Essay Questions -->
      <div v-else-if="currentTab === 'Essay'">
        <div
          v-for="(question, index) in paginatedEssayQuestions"
          :key="question._id"
          class="mb-6"
        >
          <div v-if="question.imgURL" class="flex justify-start">
            <img
              :src="question.imgURL"
              class="w-[300px] h-[300px] object-cover object-center"
            />
          </div>
          <h2 class="text-lg font-semibold mb-2">
            {{ pageIndex * 20 + index + 1 }}. {{ question.question }}
          </h2>
          <div v-if="users.user.isAcademicCommittee" class="flex justify-end">
            <!-- Edit Icon -->
            <button
              @click="openEditModal(question, 'Essay')"
              class="mr-2 text-blue-500 hover:text-blue-700"
            >
              <!-- Modify Icon SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </button>

            <!-- Delete Icon -->
            <button
              @click="openDeleteModal(question)"
              class="text-red-500 hover:text-red-700"
            >
              <!-- Delete Icon SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button
            @click="revealAnswer(index, 'Essay')"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Reveal/Hide Answer
          </button>
          <p
            v-if="
              showAnswerEssay[index] &&
              question.answer !== 'No answer yet' &&
              question.answer !== ''
            "
            class="mt-2 italic text-green-700"
          >
            Answer: {{ question.answer }}
          </p>
          <p
            v-if="showAnswerEssay[index] && question.answer === 'No answer yet'"
            class="mt-2 italic text-red-500"
          >
            No answer yet
          </p>
          <p
            v-if="showAnswerEssay[index] && question.answer === ''"
            class="mt-2 italic text-red-500"
          >
            No answer yet
          </p>
          <p class="mt-2 italic">Year: {{ question.year }}</p>
        </div>
        <!-- Pagination for Essay Questions -->
        <div class="flex justify-center items-center mt-4">
          <button
            @click="
              currentPageEssay = 1;
              pageIndex = 0;
              scrollToTop();
            "
            :disabled="currentPageEssay === 1"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{ 'bg-red-500 cursor-not-allowed': currentPageEssay === 1 }"
          >
            First
          </button>
          <button
            @click="previousPage('Essay')"
            :disabled="currentPageEssay === 1"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{ 'bg-red-500 cursor-not-allowed': currentPageEssay === 1 }"
          >
            Prev
          </button>
          <div class="mx-1 flex">
            <input
              v-model="currentPageEssay"
              type="number"
              min="1"
              :max="totalPages('Essay', filteredQuestions)"
              class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="
                handlePageInput('Essay', $event.target.value, filteredQuestions)
              "
            />
            <span class="px-2 py-1 bg-gray-200 rounded-md"
              >of {{ totalPages("Essay", filteredQuestions) }}</span
            >
          </div>
          <button
            @click="nextPage('Essay')"
            :disabled="
              currentPageEssay === totalPages('Essay', filteredQuestions)
            "
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{
              'cursor-not-allowed bg-red-500':
                currentPageEssay === totalPages('Essay', filteredQuestions),
            }"
          >
            Next
          </button>
          <button
            @click="
              currentPageEssay = totalPages('Essay', filteredQuestions);
              pageIndex = totalPages('Essay', filteredQuestions) - 1;
              scrollToTop();
            "
            :disabled="
              currentPageEssay === totalPages('Essay', filteredQuestions)
            "
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{
              'cursor-not-allowed bg-red-500':
                currentPageEssay === totalPages('Essay', filteredQuestions),
            }"
          >
            Last
          </button>
        </div>
      </div>

      <!-- Cloze Questions -->
      <div v-else-if="currentTab === 'Cloze'">
        <div
          v-for="(question, index) in paginatedClozeQuestions"
          :key="question._id"
          class="mb-6"
        >
          <div v-if="question.imgURL" class="flex justify-start">
            <img
              :src="question.imgURL"
              class="w-[300px] h-[300px] object-cover object-center"
            />
          </div>
          <h2 class="text-lg font-semibold mb-2">
            {{ pageIndex * 20 + index + 1 }}. {{ question.question }}
          </h2>
          <div v-if="users.user.isAcademicCommittee" class="flex justify-end">
            <button
              @click="openEditModal(question, 'Cloze')"
              class="mr-2 text-blue-500 hover:text-blue-700"
            >
              <!-- Modify Icon SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </button>
            <button
              @click="openDeleteModal(question)"
              class="text-red-500 hover:text-red-700"
            >
              <!-- Delete Icon SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button
            @click="revealAnswer(index, 'Cloze')"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Reveal/Hide Answer
          </button>
          <p
            v-if="
              showAnswerCloze[index] &&
              question.answer !== 'No answer yet' &&
              question.answer !== ''
            "
            class="mt-2 italic text-green-700"
          >
            Answer: {{ question.answer }}
          </p>
          <p
            v-if="showAnswerCloze[index] && question.answer === 'No answer yet'"
            class="mt-2 italic text-red-500"
          >
            No answer yet
          </p>
          <p
            v-if="showAnswerCloze[index] && question.answer === ''"
            class="mt-2 italic text-red-500"
          >
            No answer yet
          </p>
          <p class="mt-2 italic">Year: {{ question.year }}</p>
        </div>
        <!-- Pagination for Cloze Questions -->
        <div class="flex justify-center items-center mt-4">
          <button
            @click="
              currentPageCloze = 1;
              pageIndex = 0;
              scrollToTop();
            "
            :disabled="currentPageCloze === 1"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{ 'cursor-not-allowed bg-red-500': currentPageCloze === 1 }"
          >
            First
          </button>
          <button
            @click="previousPage('Cloze')"
            :disabled="currentPageCloze === 1"
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{ 'cursor-not-allowed bg-red-500': currentPageCloze === 1 }"
          >
            Prev
          </button>
          <div class="mx-1 flex">
            <input
              v-model="currentPageCloze"
              type="number"
              min="1"
              :max="totalPages('Cloze', filteredQuestions)"
              class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="
                handlePageInput('Cloze', $event.target.value, filteredQuestions)
              "
            />
            <span class="px-2 py-1 bg-gray-200 rounded-md"
              >of {{ totalPages("Cloze", filteredQuestions) }}</span
            >
          </div>
          <button
            @click="nextPage('Cloze')"
            :disabled="
              currentPageCloze === totalPages('Cloze', filteredQuestions)
            "
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{
              'cursor-not-allowed bg-red-500':
                currentPageCloze === totalPages('Cloze', filteredQuestions),
            }"
          >
            Next
          </button>
          <button
            @click="
              currentPageCloze = totalPages('Cloze', filteredQuestions);
              pageIndex = totalPages('Cloze', filteredQuestions) - 1;
              scrollToTop();
            "
            :disabled="
              currentPageCloze === totalPages('Cloze', filteredQuestions)
            "
            class="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            :class="{
              'cursor-not-allowed bg-red-500':
                currentPageCloze === totalPages('Cloze', filteredQuestions),
            }"
          >
            Last
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      class="fixed z-10 pt-5 mt-10 inset-0 overflow-y-auto transition-all duration-300"
      v-if="showEditModal"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
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
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Edit Question
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-center text-gray-500">
                  Edit the question details below.
                </p>
                <div class="mt-4">
                  <label
                    for="question"
                    class="block text-sm font-medium text-gray-700"
                    >Question</label
                  >
                  <textarea
                    v-model="editedQuestion.question"
                    id="question"
                    rows="3"
                    class="form-textarea border-black border-2 border-solid mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  ></textarea>
                </div>
                <div class="mt-4" v-if="currentTab === 'MCQ'">
                  <label
                    for="options"
                    class="block text-sm font-medium text-gray-700"
                    >Options</label
                  >
                  <div
                    v-for="(option, optionIndex) in editedQuestion.options"
                    :key="optionIndex"
                    class="flex items-center mt-2"
                  >
                    <input
                      v-model="editedQuestion.options[optionIndex]"
                      type="text"
                      class="form-input mt-1 block border-black border-2 border-solid w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 mr-2"
                    />
                    <button
                      type="button"
                      class="text-red-500 hover:text-red-700"
                      @click="removeOption(optionIndex)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                    @click="addOption"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Add Option
                  </button>
                </div>
                <div class="mt-4">
                  <label
                    for="answer"
                    class="block text-sm font-medium text-gray-700"
                    >Answer</label
                  >
                  <div v-if="currentTab === 'MCQ'">
                    <div
                      v-for="(option, optionIndex) in editedQuestion.options"
                      :key="optionIndex"
                      class="flex items-center mt-2"
                    >
                      <input
                        v-model="editedAnswer"
                        :value="optionIndex"
                        type="checkbox"
                        class="form-checkbox border-black border-2 border-solid h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-2"
                      />
                      <span>{{ option }}</span>
                    </div>
                  </div>
                  <textarea
                    v-else
                    v-model="editedQuestion.answer"
                    id="answer"
                    rows="3"
                    class="form-textarea border-black border-2 border-solid mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  ></textarea>
                </div>
                <div class="mt-4">
                  <label
                    for="year"
                    class="block text-sm font-medium text-gray-700"
                    >Year</label
                  >
                  <input
                    v-model="editedQuestion.year"
                    type="text"
                    id="year"
                    class="form-input border-black border-2 border-solid mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div class="mt-4">
                  <label
                    for="tags"
                    class="block text-sm font-medium text-gray-700"
                    >Tags</label
                  >
                  <input
                    v-model="editedQuestion.tags"
                    type="text"
                    id="tags"
                    class="form-input mt-1 border-black border-2 border-solid block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div class="mt-4">
                  <label
                    for="lecturer"
                    class="block text-sm font-medium text-gray-700"
                    >Lecturer</label
                  >
                  <input
                    v-model="editedQuestion.lecturer"
                    type="text"
                    id="lecturer"
                    class="form-input mt-1 block border-black border-2 border-solid w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <!-- <div class="mt-4">
                  <label
                    for="imgURL"
                    class="block text-sm font-medium text-gray-700"
                    >Image URL</label
                  >
                  <input
                    v-model="editedQuestion.imgURL"
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
              @click="updateQuestion"
            >
              Update
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              @click="closeEditModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
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
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Delete Question
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  Are you sure you want to delete this question? This action
                  cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="deleteQuestion"
            >
              Delete
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              @click="showDeleteModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "../config/axios";
import { useUserStore } from "@/stores/UserStore";
import { useToast } from "vue-toastification";
import { storage, questionsCollectionRef } from "../firebase";
import { ref as storeRef, deleteObject } from "firebase/storage";
import { getDocs, query, where, deleteDoc } from "firebase/firestore";
import { generatePDF } from "../utils/useGeneratePDF.js";
import { handlePageInput } from "../utils/useHandlePageInput.js";

const getPDF = () => {
  if (!questions.value.length)
    return toast.error("No questions to generate PDF");
  if (!course.value) return toast.error("Course not found");
  if (!level.value) return toast.error("Level not found");
  generatePDF(questions.value, courseCode.value, level.value);
};

const props = defineProps({
  level: String,
  course: String,
});

const toast = useToast();
const users = useUserStore();
const route = useRoute();
const router = useRouter();
const courses = ref([]);
const course = computed(() => courseData.value);
const loading = ref(true);
const questions = ref([]);
const level = ref(route.params.level);
const courseCode = ref(route.params.course);
const courseData = ref({});
const currentPageMCQ = ref(1);
const currentPageEssay = ref(1);
const currentPageCloze = ref(1);
const pageIndex = ref(0);
const perPage = 20;
const showAnswerMCQ = ref([]);
const showAnswerEssay = ref([]);
const showAnswerCloze = ref([]);
const mcqQuestionsExist = computed(() =>
  questions.value.some((q) => q.type === "MCQ")
);
const essayQuestionsExist = computed(() =>
  questions.value.some((q) => q.type === "Essay")
);
const clozeQuestionsExist = computed(() =>
  questions.value.some((q) => q.type === "Fill in the Gap")
);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const deletedQuestion = ref(null);
const progress = ref(0);
const progressToastId = ref(null);
const currentTab = ref("MCQ");

function handleInput(tab) {
  if (tab === "MCQ") {
    currentPageMCQ.value = 1;
  } else if (tab === "Essay") {
    currentPageEssay.value = 1;
  } else {
    currentPageCloze.value = 1;
  }
}

const searchPlaceholder = computed(
  () => `Search ${currentTab.value} questions`
);

const breadcrumbs = ref([
  { title: "Dashboard", link: "/dashboard" },
  { title: "Past Questions", link: "/dashboard/questions" },
  {
    title: `${route.params.level}L`,
    link: `/dashboard/questions/${route.params.level}`,
  },
  {
    title: `${route.params.course}`,
    link: `/dashboard/questions/${route.params.level}/${route.params.course}`,
  },
]);
const searchQuery = ref("");

const filteredQuestions = computed(() => {
  const regex = new RegExp(searchQuery.value, "i");
  const filtered = questions.value.filter((q) => regex.test(q.question));
  return filtered;
});

// Fetch Course Details
onMounted(async () => {
  import(`../courses/${level.value}L.json`)
    .then((module) => {
      courses.value = module.default;
      const course = courses.value.find(
        (course) => course.coursecode === courseCode.value
      );
      if (course) {
        courseData.value = course;
      } else {
        // Handle course not found
        console.error(
          `Course with code ${courseCode.value} not found in level ${level.value}`
        );
        router.push("/not-found");
      }
    })
    .catch((error) => {
      // Handle fetch error
      console.error("Error fetching course details:", error);
    });
});

//

const paginatedMCQQuestions = computed(() => {
  if (!filteredQuestions) {
    return [];
  }

  const startIndex = (currentPageMCQ.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedQuestions = filteredQuestions.value
    .filter((q) => q.type === "MCQ")
    .slice(startIndex, endIndex);
  return paginatedQuestions;
});

const paginatedEssayQuestions = computed(() => {
  if (!filteredQuestions) {
    return [];
  }
  const startIndex = (currentPageEssay.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedQuestions = filteredQuestions.value
    .filter((q) => q.type === "Essay")
    .slice(startIndex, endIndex);
  return paginatedQuestions;
});

const paginatedClozeQuestions = computed(() => {
  if (!filteredQuestions) {
    return [];
  }
  const startIndex = (currentPageCloze.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedQuestions = filteredQuestions.value
    .filter((q) => q.type === "Fill in the Gap")
    .slice(startIndex, endIndex);
  return paginatedQuestions;
});

function previousPage(tab) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  switch (tab) {
    case "MCQ":
      currentPageMCQ.value -= 1;
      pageIndex.value -= 1;
      break;
    case "Essay":
      currentPageEssay.value -= 1;
      pageIndex.value -= 1;
      break;
    case "Cloze":
      currentPageCloze.value -= 1;
      pageIndex.value -= 1;
      break;
    default:
      break;
  }
}

function nextPage(tab) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  switch (tab) {
    case "MCQ":
      currentPageMCQ.value += 1;
      pageIndex.value += 1;
      break;
    case "Essay":
      currentPageEssay.value += 1;
      pageIndex.value += 1;
      break;
    case "Cloze":
      currentPageCloze.value += 1;
      pageIndex.value += 1;
      break;
    default:
      break;
  }
}

function totalPages(tab, questions) {
  if (!questions) {
    return 0;
  }
  switch (tab) {
    case "MCQ":
      return Math.ceil(
        questions.filter((q) => q.type === "MCQ").length / perPage
      );
    case "Essay":
      return Math.ceil(
        questions.filter((q) => q.type === "Essay").length / perPage
      );
    case "Cloze":
      return Math.ceil(
        questions.filter((q) => q.type === "Fill in the Gap").length / perPage
      );
    default:
      return 0;
  }
}

function revealAnswer(index, questionType) {
  switch (questionType) {
    case "MCQ":
      showAnswerMCQ.value[index] = !showAnswerMCQ.value[index];
      break;
    case "Essay":
      showAnswerEssay.value[index] = !showAnswerEssay.value[index];
      break;
    case "Cloze":
      showAnswerCloze.value[index] = !showAnswerCloze.value[index];
      break;
    default:
      break;
  }
}

// Fetch Questions
onMounted(async () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  try {
    const { data } = await apiClient.get(
      `/questions/${route.params.course}`
    );
    loading.value = false;
    if (data.success) {
      questions.value = data.data;
      const questionTypes = new Set(
        questions.value.map((question) => {
          return question.type === "Fill in the Gap" ? "Cloze" : question.type;
        })
      );
      if (questionTypes.size === 0) {
        currentTab.value = "MCQ";
      } else if (questionTypes.size === 1) {
        currentTab.value = questionTypes.values().next().value;
      } else {
        currentTab.value = questionTypes.has("MCQ")
          ? "MCQ"
          : questionTypes.values().next().value;
      }
    } else {
      console.error("Failed to fetch questions:", data.error);
    }
  } catch (error) {
    router.push({ path: "/500", query: { returnUrl: window.location.href } });
  }
});

const editedQuestion = ref({
  question: "",
  options: [],
  answer: "",
  year: "",
  tags: "",
  lecturer: "",
  imgURL: "",
  type: "",
  _id: "",
});
const editedAnswer = ref([]); // For MCQ questions
const editingQuestion = ref(null);

const openEditModal = (question, type) => {
  showEditModal.value = true;
  editingQuestion.value = question;

  // Handle answer for MCQ questions
  if (type === "MCQ") {
    editedAnswer.value = question.answer.map((index) => parseInt(index));
  } else {
    editedQuestion.value.answer = question.answer;
  }

  // Populate the editedQuestion with the question data
  editedQuestion.value.question = question.question;
  if (question.type === "MCQ") {
    editedQuestion.value.options = [...question.options];
  }
  editedQuestion.value.year = question.year;
  editedQuestion.value.tags = question.tags;
  editedQuestion.value.lecturer = question.lecturer;
  editedQuestion.value.imgURL = question.imgURL;
  editedQuestion.value.type = type;
  editedQuestion.value._id = question._id;
};

const closeEditModal = () => {
  showEditModal.value = false;
  resetEditedQuestion();
};

const resetEditedQuestion = () => {
  editedQuestion.value = {
    question: "",
    options: [],
    answer: "",
    year: "",
    tags: "",
    lecturer: "",
    imgURL: "",
  };
  editedAnswer.value = [];
};

const addOption = () => {
  editedQuestion.value.options.push("");
};

const removeOption = (index) => {
  editedQuestion.value.options.splice(index, 1);
};

const updateQuestion = () => {
  // Prepare the data to be sent to the server
  const data = {
    question: editedQuestion.value.question,
    options: editedQuestion.value.options,
    answer:
      currentTab.value === "MCQ"
        ? editedAnswer.value
        : editedQuestion.value.answer,
    year: editedQuestion.value.year,
    tags: editedQuestion.value.tags,
    lecturer: editedQuestion.value.lecturer,
    imgURL: editedQuestion.value.imgURL,
  };

  let endpoint;
  if (editedQuestion.value.type === "MCQ") {
    endpoint = `/mcq/editmcqs/${editedQuestion.value._id}`;
  } else if (editedQuestion.value.type === "Essay") {
    endpoint = `/essayqs/editessayqs/${editedQuestion.value._id}`;
  } else {
    endpoint = `/fitg/editfitg/${editedQuestion.value._id}`;
  }

  progress.value = 0; // Reset the progress percentage

  // Create a toast instance
  progressToastId.value = toast.info("0%", {
    keepAlive: true, // Keep the toast alive until manually dismissed
    closeOnClick: false, // Prevent closing the toast on click
    timeout: false, // Prevent automatic timeout
  });

  // Send the data to the server
  const token = localStorage.getItem("studentToken");
  apiClient
    .patch(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const totalBytes = progressEvent.total;
        const loadedBytes = progressEvent.loaded;
        const calculatedPercentage = Math.floor(
          (loadedBytes / totalBytes) * 100
        );
        progress.value = calculatedPercentage;
        toast.update(progressToastId.value, { content: `${progress.value}%` }); // Update the toast content using the toast ID
      },
    })
    .then((response) => {
      toast.dismiss(progressToastId.value); // Dismiss the progress toast
      toast.success(response.data.message);
      closeEditModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.error("Error updating question:", error);
      toast.dismiss(progressToastId.value); // Dismiss the progress toast
      toast.error(error.message);
    });
};
const openDeleteModal = (question) => {
  showDeleteModal.value = true;
  deletedQuestion.value = question;
};

const getExistingDocument = async (url) => {
  const q = query(questionsCollectionRef, where("url", "==", url));
  const querySnapshot = await getDocs(q);

  // If a document exists, return it
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0];
  }

  // If no document exists, return null
  return null;
};

const deleteFromFirebase = async (imageUrl) => {
  try {
    const existingDocument = await getExistingDocument(imageUrl);
    if (!existingDocument) {
      toast.error("No document found for the given image URL.");
      return;
    }
    // Delete the image from Firebase Storage
    await deleteDoc(existingDocument.ref);
    const existingQuestionRef = storeRef(storage, existingDocument.data().url);
    await deleteObject(existingQuestionRef);
    toast.success("Image deleted successfully.");
  } catch (error) {
    console.error("Error deleting image:", error);
    toast.error("Error deleting image. Please try again.");
  }
};

const deleteQuestion = () => {
  // Prepare the data to be sent to the server
  if (deletedQuestion.value.imgURL) {
    deleteFromFirebase(deletedQuestion.value.imgURL);
  }

  let endpoint;
  if (deletedQuestion.value.type === "MCQ") {
    endpoint = `/mcq/deletemcqs/${deletedQuestion.value._id}`;
  } else if (deletedQuestion.value.type === "Essay") {
    endpoint = `/essayqs/deleteessayqs/${deletedQuestion.value._id}`;
  } else {
    endpoint = `/fitg/deletefitg/${deletedQuestion.value._id}`;
  }

  progress.value = 0; // Reset the progress percentage

  // Create a toast instance
  progressToastId.value = toast.info("0%", {
    keepAlive: true,
    closeOnClick: false,
    timeout: false,
  });

  // Send the data to the server
  const token = localStorage.getItem("studentToken");
  apiClient
    .delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const totalBytes = progressEvent.total;
        const loadedBytes = progressEvent.loaded;
        const calculatedPercentage = Math.floor(
          (loadedBytes / totalBytes) * 100
        );
        progress.value = calculatedPercentage;
        toast.update(progressToastId.value, { content: `${progress.value}%` });
      },
    })
    .then((response) => {
      toast.dismiss(progressToastId.value);
      toast.success(response.data.message);
      showDeleteModal.value = false;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.error("Error updating question:", error);
      toast.dismiss(progressToastId.value);
      toast.error(error.message);
    });
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
