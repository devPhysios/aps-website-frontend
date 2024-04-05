<template>
    <div class="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-6 m-5">
        <div v-for="course in courses" :key="course.coursecode"
            class="p-6 bg-yellow-200 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer hover:bg-green-500">
            <router-link :to="`/level/${course.level}/course/${course.coursecode}`">
                <div class="text-center">
                    <h2 class="text-xl font-semibold mb-2 text-gray-800">{{ course.coursecode }}</h2>
                    <p class="text-gray-600">{{ course.coursetitle }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import coursesData from '../courses/200L.json';

const courses = ref(coursesData);
</script>

<style scoped>
/* Add custom styles here if needed */
</style>