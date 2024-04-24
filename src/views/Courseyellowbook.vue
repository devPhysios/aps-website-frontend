<template>
  <nav class="bg-gray-200 pb-4 sticky font-display top-0 z-10 pt-20">
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
  <div class="font-display max-w-4xl mx-auto px-4 py-8">
    <!-- Course Title and Code -->
    <h1 class="text-3xl font-bold mb-4">
      {{ course.coursetitle }} - {{ course.coursecode }}
    </h1>

    <!-- Course Details -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <!-- Level and Unit -->
      <p><strong>Level:</strong> {{ course.level }}</p>
      <p><strong>Unit:</strong> {{ course.unit }}</p>

      <!-- Topics -->
      <div class="mt-4">
        <h2 class="text-lg font-semibold mb-2">Topics</h2>
        <ul class="list-disc list-inside">
          <li v-for="(topic, index) in course.topics" :key="index" class="mb-2">
            {{ topic }}
          </li>
        </ul>
      </div>

      <!-- Objectives -->
      <div v-if="course.objectives" class="mt-4">
        <h2 class="text-lg font-semibold mb-2">Objectives</h2>
        <ul class="list-disc list-inside">
          <li
            v-for="(objective, index) in course.objectives"
            :key="index"
            class="mb-2"
          >
            {{ objective }}
          </li>
        </ul>
      </div>

      <!-- Prerequisites -->
      <div v-if="course.prerequisites" class="mt-4">
        <h2 class="text-lg font-semibold mb-2">Pre-requisites</h2>
        <ul class="list-disc list-inside">
          <li
            v-for="(prerequisite, index) in course.prerequisites"
            :key="index"
            class="mb-2"
          >
            {{ prerequisite }}
          </li>
        </ul>
      </div>

      <!-- Aim -->
      <div v-if="course.aim" class="mt-4">
        <h2 class="text-lg font-semibold mb-2">Aim</h2>
        <p>{{ course.aim }}</p>
      </div>

      <!-- Link to Past Questions -->
      <router-link
        :to="`/dashboard/questions/${course.level}/${course.coursecode}`"
        class="mt-4 block text-blue-500 underline hover:text-blue-700"
        >Past Questions on {{ course.coursecode }}</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  level: String,
  course: String,
});

const route = useRoute();
const router = useRouter();
const courses = ref([]);
const level = ref(route.params.level);
const courseCode = ref(route.params.course);
const courseData = ref({});
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
const course = ref(courseData);
const breadcrumbs = ref([
  { title: "Dashboard", link: "/dashboard" },
  { title: "Yellow Book", link: "/dashboard/questions" },
  {
    title: `${route.params.level}L`,
    link: `/dashboard/yellowbook/${route.params.level}`,
  },
  {
    title: `${route.params.course}`,
    link: `/dashboard/yellowbook/${route.params.level}/${route.params.course}`,
  },
]);
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
