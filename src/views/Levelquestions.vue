<template>
    <nav class="bg-gray-200 py-4 sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol class="flex items-center space-x-4">
                <li>
                    <a href="/" class="text-gray-600 hover:text-gray-800 underline">Home</a>
                </li>
                <li v-for="(crumb, index) in breadcrumbs" :key="index">
                    <span class="text-gray-400 hidden sm:inline">/</span> <!-- Hide on small devices -->
                    <a :href="crumb.link" class="text-gray-600 hover:text-gray-800 underline">{{ crumb.title }}</a>
                </li>
            </ol>
        </div>
    </nav>
    <div class="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-6 m-5">
        <div v-for="course in courses" :key="course.coursecode"
            class="p-6 bg-yellow-200 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer hover:bg-green-500">
            <router-link :to="`/dashboard/questions/${level}/${course.coursecode}`">
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
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const level = route.params.level;
const courses = ref([]);

const props = defineProps({
    level: String
});

// Check if the level parameter is valid
const allowedLevels = ['100', '200', '300', '400', '500'];
if (!allowedLevels.includes(level)) {
    router.replace('/not-found');
} else {
    import(`../courses/${level}L.json`)
        .then(module => {
            courses.value = module.default;
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

const breadcrumbs = ref([
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Past Questions', link: '/dashboard/questions' },
    { title: `${route.params.level}L`, link: `/dashboard/questions/${route.params.level}` },
]);
</script>

<style scoped>
/* Add custom styles here if needed */
</style>