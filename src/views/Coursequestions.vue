<!-- CourseQuestions.vue -->
<template>
  <nav class="bg-gray-200 pb-4 sticky top-0 z-10 pt-20 font-display">
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

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
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
          <h2 class="text-lg font-semibold mb-2">
            {{ pageIndex * 20 + index + 1 }}. {{ question.question }}
          </h2>
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
              @input="handlePageInput('MCQ', $event.target.value)"
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
          <h2 class="text-lg font-semibold mb-2">
            {{ pageIndex * 20 + index + 1 }}. {{ question.question }}
          </h2>
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
              @input="handlePageInput('Essay', $event.target.value)"
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
          <h2 class="text-lg font-semibold mb-2">
            {{ pageIndex * 20 + index + 1 }}. {{ question.question }}
          </h2>
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
              @input="handlePageInput('Cloze', $event.target.value)"
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const props = defineProps({
  level: String,
  course: String,
});

const route = useRoute();
const router = useRouter();
const courses = ref([]);
const course = computed(() => courseData.value);
const loading = ref(true);
const currentTab = ref("MCQ");
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

const paginatedMCQQuestions = computed(() => {
  if (!filteredQuestions) {
    return [];
  }
  if (filteredQuestions.value.length <= perPage) {
    currentPageMCQ.value = 1;
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
  if (filteredQuestions.value.length <= perPage) {
    currentPageEssay.value = 1;
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
  if (filteredQuestions.value.length <= perPage) {
    currentPageCloze.value = 1;
  }
  const startIndex = (currentPageCloze.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedQuestions = filteredQuestions.value
    .filter((q) => q.type === "Fill in the Gap")
    .slice(startIndex, endIndex);
  return paginatedQuestions;
});

function handlePageInput(tab, value) {
  const parsedValue = parseInt(value, 10);
  switch (tab) {
    case "MCQ":
      if (
        !isNaN(parsedValue) &&
        parsedValue >= 1 &&
        parsedValue <= totalPages("MCQ", filteredQuestions)
      ) {
        currentPageMCQ.value = parsedValue;
      } else {
        currentPageMCQ.value = 1;
      }
      break;
    case "Essay":
      if (
        !isNaN(parsedValue) &&
        parsedValue >= 1 &&
        parsedValue <= totalPages("Essay", filteredQuestions)
      ) {
        currentPageEssay.value = parsedValue;
      } else {
        currentPageEssay.value = 1;
      }
      break;
    case "Cloze":
      if (
        !isNaN(parsedValue) &&
        parsedValue >= 1 &&
        parsedValue <= totalPages("Cloze", filteredQuestions)
      ) {
        currentPageCloze.value = parsedValue;
      } else {
        currentPageCloze.value = 1;
      }
      break;
    default:
      break;
  }
}

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
    // Fetch questions from the API backend
    const { data } = await axios.get(
      `https://aps-website-backend.onrender.com/api/v1/questions/${route.params.course}`
    );
    loading.value = false;
    if (data.success) {
      questions.value = data.data;
    } else {
      console.error("Failed to fetch questions:", data.error);
    }
  } catch (error) {
    // console.error('Error fetching questions:', error);
    router.push({ path: "/500", query: { returnUrl: window.location.href } });
  }
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
