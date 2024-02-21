<template>
    <div class="overflow-x-auto">
        <table class="table-auto w-full">
            <thead>
                <tr class="bg-gray-800 text-white">
                    <th v-for="header in headers" :key="header.key" @click="sortBy(header.key)">
                        {{ header.label }}
                        <span v-if="sortKey === header.key">
                            {{ sortOrder === 'asc' ? '▲' : '▼' }}
                        </span>
                    </th>
                    <th>Modify</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="question in paginatedQuestions" :key="question.id">
                    <td>{{ question.serialNumber }}</td>
                    <td>{{ truncate(question.question, 50) }}</td>
                    <td>{{ question.type }}</td>
                    <td>{{ question.year }}</td>
                    <td>{{ question.level }}</td>
                    <td>{{ question.createdBy }}</td>
                    <td>{{ question.lecturer }}</td>
                    <td>{{ question.tags }}</td>
                    <td>
                        <button @click="editQuestion(question)" class="text-blue-600 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M9 2a1 1 0 0 1 1 1v2h2V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1v10h-2V7H9v10H7V7H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button @click="deleteQuestion(question.id)" class="text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 2a1 1 0 0 1 1 1v11a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm-2 13a1 1 0 1 1-2 0V5a1 1 0 0 1 2 0v10zm6-1a1 1 0 0 1-2 0V5a1 1 0 0 1 2 0v9z" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-4">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="mr-2 px-4 py-2 bg-gray-800 text-white">Prev</button>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-gray-800 text-white">Next</button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';

const questions = ref([]);
const sortKey = ref('');
const sortOrder = ref('');
const currentPage = ref(1);
const pageSize = 30;

const headers = [
    { key: 'serialNumber', label: 'S/N' },
    { key: 'question', label: 'Question' },
    { key: 'type', label: 'Type' },
    { key: 'year', label: 'Year' },
    { key: 'level', label: 'Level' },
    { key: 'createdBy', label: 'Created By' },
    { key: 'lecturer', label: 'Lecturer' },
    { key: 'tags', label: 'Tags' }
];

const sortedQuestions = computed(() => {
    if (!sortKey.value) return questions.value;

    return questions.value.slice().sort((a, b) => {
        const modifier = sortOrder.value === 'desc' ? -1 : 1;
        return modifier * (a[sortKey.value] > b[sortKey.value] ? 1 : -1);
    });
});

const paginatedQuestions = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return sortedQuestions.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(sortedQuestions.value.length / pageSize));

function sortBy(key) {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
}

function truncate(str, max) {
    return str.length > max ? str.slice(0, max) + '...' : str;
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function editQuestion(question) {
    // Implement edit functionality
}

function deleteQuestion(id) {
    // Implement delete functionality
}

// Fetch questions from API and populate the table (you need to implement this)

</script>
  
<style>/* Add Tailwind CSS classes here for styling */</style>
  