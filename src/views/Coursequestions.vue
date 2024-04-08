<!-- CourseQuestions.vue -->
<template>
    <div class="max-w-4xl mx-auto p-4">
        <!-- Fetch Course Details -->
        <div v-if="course" class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 class="text-2xl font-semibold mb-4">{{ course.coursetitle }}</h1>
            <p><strong>Course Code:</strong> {{ course.coursecode }}</p>
            <p><strong>Level:</strong> {{ course.level }}</p>
            <p><strong>Unit:</strong> {{ course.unit }}</p>
        </div>

        <!-- Create Tabs -->
        <div class="flex mb-4">
            <button @click="currentTab = 'MCQ'"
                :class="{ 'bg-blue-500': currentTab === 'MCQ', 'text-white': currentTab === 'MCQ' }"
                class="flex-1 px-4 py-2 rounded-l-lg focus:outline-none">MCQ</button>
            <button @click="currentTab = 'Essay'"
                :class="{ 'bg-blue-500': currentTab === 'Essay', 'text-white': currentTab === 'Essay' }"
                class="flex-1 px-4 py-2 focus:outline-none">Essay</button>
            <button @click="currentTab = 'Cloze'"
                :class="{ 'bg-blue-500': currentTab === 'Cloze', 'text-white': currentTab === 'Cloze' }"
                class="flex-1 px-4 py-2 rounded-r-lg focus:outline-none">Cloze</button>
        </div>

        <!-- Fetch Questions -->
        <div v-if="loading" class="flex justify-center items-center">
            <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.28 0-4.37-.765-6.064-2.049l1.728-1.728z">
                </path>
            </svg>
            <span>Loading...</span>
        </div>

        <!-- Display Questions -->
        <div v-if="!loading && questions.length === 0" class="text-center text-3xl font-semibold">Coming Soon</div>

        <!-- Implement Question Types -->
        <div v-if="!loading && questions.length > 0">
            <!-- MCQ Questions -->
            <div v-if="currentTab === 'MCQ'">
                <div v-for="(question, index) in paginatedMCQQuestions" :key="question._id" class="mb-6">
                    <h2 class="text-lg font-semibold mb-2">{{ question.question }}</h2>
                    <ul class="list-disc ml-6">
                        <li v-for="(option, optionIndex) in question.options" :key="optionIndex">{{ option }}</li>
                    </ul>
                    <button @click="revealAnswer(index, 'MCQ')"
                        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">Reveal/Hide
                        Answer</button>
                    <div v-if="showAnswerMCQ[index]" class="mt-2 italic">
                        <p v-if="question.answer.length = 0 || question.answer.includes('No answer yet')" class="text-red-500">
                            Answer: No answer yet
                        </p>
                        <p v-else class="text-red-500">
                            Answer: {{ question.options[question.answer] }}
                        </p>
                    </div>
                    <p class="mt-2 italic">Year: {{ question.year }}</p>
                </div>
                <!-- Pagination for MCQ Questions -->
                <div class="flex justify-center">
                    <button @click="previousPage('MCQ')" :disabled="currentPageMCQ === 1"
                        class="mx-1 px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        :class="{ 'cursor-not-allowed': currentPageMCQ === 1 }">Previous</button>
                    <span class="mx-1 px-4 py-2 bg-gray-200 rounded-md">{{ currentPageMCQ }}</span>
                    <button @click="nextPage('MCQ')" :disabled="currentPageMCQ === totalPages('MCQ')"
                        class="mx-1 px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        :class="{ 'cursor-not-allowed': currentPageMCQ === totalPages('MCQ') }">Next</button>
                </div>
            </div>

            <!-- Essay Questions -->
            <div v-else-if="currentTab === 'Essay'">
                <div v-for="(question, index) in paginatedEssayQuestions" :key="question._id" class="mb-6">
                    <h2 class="text-lg font-semibold mb-2">{{ question.question }}</h2>
                    <button @click="revealAnswer(index, 'Essay')"
                        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">Reveal/Hide
                        Answer</button>
                    <div v-if="showAnswerMCQ[index]" class="mt-2 italic">
                        <p v-if="question.answer !== 'No answer yet'" class="text-green-700">
                            Answer: {{ question.options[question.answer] }}
                        </p>
                        <p v-else class="text-red-500">
                            Answer: No answer yet
                        </p>
                    </div>
                    <p class="mt-2 italic">Year: {{ question.year }}</p>
                </div>
                <!-- Pagination for Essay Questions -->
                <div class="flex justify-center">
                    <button @click="previousPage('Essay')" :disabled="currentPageEssay === 1"
                        class="mx-1 px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        :class="{ 'cursor-not-allowed': currentPageEssay === 1 }">Previous</button>
                    <span class="mx-1 px-4 py-2 bg-gray-200 rounded-md">{{ currentPageEssay }}</span>
                    <button @click="nextPage('Essay')" :disabled="currentPageEssay === totalPages('Essay')"
                        class="mx-1 px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        :class="{ 'cursor-not-allowed': currentPageEssay === totalPages('Essay') }">Next</button>
                </div>
            </div>

            <!-- Cloze Questions -->
            <div v-else-if="currentTab === 'Cloze'">
                <div v-for="(question, index) in paginatedClozeQuestions" :key="question._id" class="mb-6">
                    <h2 class="text-lg font-semibold mb-2">{{ question.question }}</h2>
                    <button @click="revealAnswer(index, 'Cloze')"
                        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">Reveal/Hide
                        Answer</button>
                    <div v-if="showAnswerMCQ[index]" class="mt-2 italic">
                        <p v-if="question.answer !== 'No answer yet'" class="text-green-700">
                            Answer: {{ question.options[question.answer] }}
                        </p>
                        <p v-else class="text-red-500">
                            Answer: No answer yet
                        </p>
                    </div>
                    <p class="mt-2 italic">Year: {{ question.year }}</p>
                </div>
                <!-- Pagination for Cloze Questions -->
                <div class="flex justify-center">
                    <button @click="previousPage('Cloze')" :disabled="currentPageCloze === 1"
                        class="mx-1 px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        :class="{ 'cursor-not-allowed': currentPageCloze === 1 }">Previous</button>
                    <span class="mx-1 px-4 py-2 bg-gray-200 rounded-md">{{ currentPageCloze }}</span>
                    <button @click="nextPage('Cloze')" :disabled="currentPageCloze === totalPages('Cloze')"
                        class="mx-1 px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        :class="{ 'cursor-not-allowed': currentPageCloze === totalPages('Cloze') }">Next</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const courses = ref([]);
const course = computed(() => courseData.value);
const loading = ref(true);
const currentTab = ref('MCQ');
const questions = ref([]);
const level = ref(route.params.level);
const courseCode = ref(route.params.course);
const courseData = ref({});
const currentPageMCQ = ref(1);
const currentPageEssay = ref(1);
const currentPageCloze = ref(1);
const perPage = 20;
const showAnswerMCQ = ref([]);
const showAnswerEssay = ref([]);
const showAnswerCloze = ref([]);

// Fetch Course Details
onMounted(async () => {
    import(`../courses/${level.value}L.json`)
        .then(module => {
            courses.value = module.default;
            const course = courses.value.find(course => course.coursecode === courseCode.value);
            if (course) {
                courseData.value = course;
            } else {
                // Handle course not found
                console.error(`Course with code ${courseCode.value} not found in level ${level.value}`);
                router.push('/not-found');
            }
        })
        .catch(error => {
            // Handle fetch error
            console.error('Error fetching course details:', error);
        });
});

const paginatedMCQQuestions = computed(() => {
    const startIndex = (currentPageMCQ.value - 1) * perPage;
    const endIndex = startIndex + perPage;
    return questions.value.filter(q => q.type === 'MCQ').slice(startIndex, endIndex);
});

const paginatedEssayQuestions = computed(() => {
    const startIndex = (currentPageEssay.value - 1) * perPage;
    const endIndex = startIndex + perPage;
    return questions.value.filter(q => q.type === 'Essay').slice(startIndex, endIndex);
});

const paginatedClozeQuestions = computed(() => {
    const startIndex = (currentPageCloze.value - 1) * perPage;
    const endIndex = startIndex + perPage;
    return questions.value.filter(q => q.type === 'Fill in the Gap').slice(startIndex, endIndex);
});

function previousPage(tab) {
    switch (tab) {
        case 'MCQ':
            currentPageMCQ.value -= 1;
            break;
        case 'Essay':
            currentPageEssay.value -= 1;
            break;
        case 'Cloze':
            currentPageCloze.value -= 1;
            break;
        default:
            break;
    }
}

function nextPage(tab) {
    switch (tab) {
        case 'MCQ':
            currentPageMCQ.value += 1;
            break;
        case 'Essay':
            currentPageEssay.value += 1;
            break;
        case 'Cloze':
            currentPageCloze.value += 1;
            break;
        default:
            break;
    }
}

function totalPages(tab) {
    switch (tab) {
        case 'MCQ':
            return Math.ceil(questions.value.filter(q => q.type === 'MCQ').length / perPage);
        case 'Essay':
            return Math.ceil(questions.value.filter(q => q.type === 'Essay').length / perPage);
        case 'Cloze':
            return Math.ceil(questions.value.filter(q => q.type === 'Cloze').length / perPage);
        default:
            return 0;
    }
}

function revealAnswer(index, questionType) {
    switch (questionType) {
        case 'MCQ':
            showAnswerMCQ.value[index] = !showAnswerMCQ.value[index];
            break;
        case 'Essay':
            showAnswerEssay.value[index] = !showAnswerEssay.value[index];
            break;
        case 'Cloze':
            showAnswerCloze.value[index] = !showAnswerCloze.value[index];
            break;
        default:
            break;
    }
}

// Fetch Questions
onMounted(async () => {
    try {
        // Fetch questions from the API backend
        const { data } = await axios.get(`http://localhost:8800/api/v1/questions/${route.params.course}`);
        console.log(data);
        loading.value = false;
        if (data.success) {
            questions.value = data.data;
        } else {
            console.error('Failed to fetch questions:', data.error);
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
