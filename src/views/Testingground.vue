<template>
  <div class="container mx-auto p-36">
    <h1 class="text-2xl font-bold mb-4">CGPA Calculator</h1>
    <div v-for="(courses, level) in coursesByLevel" :key="level" class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Level {{ level }}</h2>
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Course Code</th>
            <th class="py-2 px-4 border">Course Title</th>
            <th class="py-2 px-4 border">Units</th>
            <th class="py-2 px-4 border">Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.coursecode">
            <td class="py-2 px-4 border">{{ course.coursecode }}</td>
            <td class="py-2 px-4 border">{{ course.coursetitle }}</td>
            <td class="py-2 px-4 border">{{ course.unit }}</td>
            <td class="py-2 px-4 border">
              <select
                v-model="course.grade"
                @change="updateCGPA"
                class="border p-1"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">Fail</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">CGPA Analysis</h2>
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Grade</th>
            <th class="py-2 px-4 border">Course Codes</th>
            <th class="py-2 px-4 border">Total Units</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(analysis, grade) in gradeAnalysis" :key="grade">
            <td class="py-2 px-4 border">{{ grade }}</td>
            <td class="py-2 px-4 border">
              {{ analysis.courseCodes.join(", ") }}
            </td>
            <td class="py-2 px-4 border">{{ analysis.totalUnits }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">
        Current CGPA: {{ cgpa.toFixed(2) }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";

const levels = [100, 200, 300, 400, 500];
const coursesByLevel = reactive({});
const gradePoints = { A: 4, B: 3, C: 2, D: 1, E: 0 };

const cgpa = ref(0);
const gradeAnalysis = reactive({
  A: { courseCodes: [], totalUnits: 0 },
  B: { courseCodes: [], totalUnits: 0 },
  C: { courseCodes: [], totalUnits: 0 },
  D: { courseCodes: [], totalUnits: 0 },
  E: { courseCodes: [], totalUnits: 0 },
});

const updateCGPA = () => {
  // Reset grade analysis
  for (const grade in gradeAnalysis) {
    gradeAnalysis[grade].courseCodes = [];
    gradeAnalysis[grade].totalUnits = 0;
  }

  let totalPoints = 0;
  let totalUnits = 0;
  for (const level in coursesByLevel) {
    coursesByLevel[level].forEach((course) => {
      if (course.grade) {
        const gradePoint = gradePoints[course.grade];
        totalPoints += gradePoint * course.unit;
        totalUnits += course.unit;

        gradeAnalysis[course.grade].courseCodes.push(course.coursecode);
        gradeAnalysis[course.grade].totalUnits += course.unit;
      }
    });
  }
  cgpa.value = totalUnits > 0 ? totalPoints / totalUnits : 0;
};

const fetchCourses = async () => {
  for (const level of levels) {
    try {
      const module = await import(`../courses/${level}L.json`);
      coursesByLevel[level] = module.default;
    } catch (error) {
      console.error(`Error fetching courses for level ${level}:`, error);
    }
  }
  updateCGPA();
};

onMounted(() => {
  fetchCourses();
});

watch(coursesByLevel, updateCGPA, { deep: true });
</script>

<style>
/* Add any additional styling here */
</style>
