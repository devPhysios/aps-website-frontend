<template>
  <div class="font-display md:pt-[75px] pt-[70px] px-4 md:px-6">
    <nav class="bg-gray-100 pb-4 sticky top-0 z-10">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <ol class="flex items-center space-x-4">
          <li>
            <a href="/" class="text-gray-600 hover:text-gray-800 underline"
              >Home</a
            >
          </li>
          <li>
            <RouterLink to="/dashboard">
              <h3 class="text-gray-600 hover:text-gray-800 underline">
                Dashboard
              </h3>
            </RouterLink>
          </li>
        </ol>
      </div>
    </nav>

    <h1 class="text-center md:text-4xl text-2xl font-bold">CGPA Calculator</h1>

    <div class="pb-6">
      <label for="level-select" class="font-bold text-xl pr-2"
        >Select Level:</label
      >
      <br />
      <select
        class="w-full bg-aps-green rounded-md p-2 text-white"
        id="level-select"
        v-model="selectedLevel"
        @change="filterCourses"
      >
        <option value="100l">100L</option>
        <option value="200l">200L</option>
        <option value="300l">300L</option>
        <option value="400l">400L</option>
        <option value="500l">500L</option>
      </select>
    </div>

    <div class="pb-6">
      <label for="course-select" class="font-bold text-xl pr-2"
        >Select Course:</label
      >
      <br />
      <select
        id="course-select"
        class="w-full bg-aps-green rounded-md p-2 text-white"
        v-model="selectedCourseCode"
      >
        <option
          v-for="course in filteredCourses"
          :key="course.code"
          :value="course.code"
        >
          {{ course.code }} - {{ course.title }} ({{ course.units }} units)
        </option>
      </select>
    </div>

    <div class="pb-6">
      <label for="scores" class="font-bold text-xl pr-2">Input Score:</label>
      <input
        id="scores"
        type="number"
        class="w-full bg-[#bdffbf] rounded-md p-2"
        v-model="scores"
      />
    </div>

    <div class="pb-6 w-full text-center">
      <button
        @click="editMode ? saveEdit() : addCourse()"
        class="text-center text-xl md:text-left rounded-md bg-aps-orange hover:bg-aps-green text-white p-2 font-bold"
      >
        {{ editMode ? "Save Changes" : "Add Course" }}
      </button>
    </div>

    <h2 class="font-bold text-xl text-center py-4">Selected Courses</h2>
    <ul class="grid grid-cols-3 lg:grid-cols-6 gap-4">
      <li
        class="p-4 rounded-md bg-aps-orange text-center text-white"
        v-for="course in selectedCourses"
        :key="course.code"
      >
        <button
          class="text-center w-1/2 p-2 rounded-md bg-orange-900 hover:bg-orange-500"
          @click="startEdit(course)"
        >
          <i class="text-center bi bi-pencil-square"></i>
        </button>
        <div>
          <div>
            {{ course.level }}
          </div>
          <div class="font-bold">
            {{ course.coursecode }}
          </div>
          <div>{{ course.units }} units</div>
          <div class="font-bold text-xl">
            {{ course.scores }} - {{ course.grade }}
          </div>
        </div>
      </li>
    </ul>
    <br />

    <div class="flex items-center gap-8 justify-between m-auto w-3/4">
      <div class="pb-6">
        <button
          @click="calculateCGPA"
          class="rounded-md bg-aps-orange hover:bg-aps-green text-white p-2 font-bold"
        >
          CALCULATE CGPA
        </button>
      </div>

      <div class="pb-6">
        <button
          @click="clear"
          class="rounded-md bg-aps-orange hover:bg-aps-green text-white p-2 font-bold"
        >
          CLEAR
        </button>
      </div>
    </div>

    <div
      v-if="cgpa"
      class="m-auto text-center p-4 bg-aps-white rounded-md border-2 mb-4"
    >
      <p class="m-auto font-semibold text-xl">Your CGPA:</p>
      <div class="font-black text-8xl">{{ cgpa }}</div>
    </div>

    <div class="my-8 px-2 ">
      <h2 class="text-xl font-semibold mb-2 text-center">CGPA Analysis</h2>
      <table class="bg-white border w-full">
        <thead>
          <tr>
            <th class="py-2 px-4 border">Grade</th>
            <th class="py-2 px-4 border">Course Codes</th>
            <th class="py-2 px-4 border">Number of Courses</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(analysis, grade) in gradeAnalysis" :key="grade">
            <td class="py-2 px-4 border">{{grade}}</td>
            <td class="py-2 px-4 border">
              {{ analysis.courseCodes.join(", ") }}
            </td>
            <td class="py-2 px-4 border">{{ analysis.courseCodes.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, reactive } from "vue";
import l100 from "@/courses/100L.json";
import l200 from "@//courses/200L.json";
import l300 from "@//courses/300L.json";
import l400 from "@//courses/400L.json";
import l500 from "@//courses/500L.json";

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  loadSelectedCourses();
});

const courses = {
  "100l": l100,
  "200l": l200,
  "300l": l300,
  "400l": l400,
  "500l": l500,
};

const selectedLevel = ref("");
const filteredCourses = ref([]);
const scores = ref();
const selectedCourses = ref([]);
const editMode = ref(false);
const courseBeingEdited = ref(null);
const selectedCourseCode = ref("");

const filterCourses = () => {
  filteredCourses.value = courses[selectedLevel.value].map((course) => ({
    code: course.coursecode,
    title: course.coursetitle,
    units: course.unit,
  }));
};

const selectedCourse = computed(() => {
  return (
    filteredCourses.value.find(
      (course) => course.code === selectedCourseCode.value
    ) || {}
  );
});

const getGrade = (score) => {
  if (score > 69) return "A";
  if (score > 59) return "B";
  if (score > 49) return "C";
  if (score > 44) return "D";
  return "F";
};

const getGradeUnit = (score) => {
  if (score > 69) return 4;
  if (score > 59) return 3;
  if (score > 49) return 2;
  if (score > 44) return 1;
  return 0;
};

    const gradeAnalysis = reactive ({
        A: { courseCodes:[] },
        B: { courseCodes:[] },
        C: { courseCodes:[] },
        D: { courseCodes:[] },
        F: { courseCodes:[] }
    });

    const saveSelectedCourses = () => {
      localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses.value));
      console.log(selectedCourses)
    };

    const loadSelectedCourses = () => {
      const storedCourses = JSON.parse(localStorage.getItem("selectedCourses"));
      if (storedCourses) {
        selectedCourses.value = storedCourses;
        analyseGrade();
      }
      console.log(selectedCourses)
    };

const addCourse = () => {
  if (selectedCourse.value.code && scores.value) {
    const newItem = {
      id: selectedCourses.value.length + 1,
      level: selectedLevel.value,
      coursecode: selectedCourse.value.code,
      units: selectedCourse.value.units,
      scores: scores.value,
      grade: getGrade(scores.value),
      gradeUnit: getGradeUnit(scores.value),
    };
    selectedCourses.value.push(newItem);
    console.log(newItem);
    console.log(gradeAnalysis);

    for (const grade in gradeAnalysis) {
    gradeAnalysis[grade].courseCodes = [];
  }
    analyseGrade();
    saveSelectedCourses();


    selectedCourseCode.value = "";
    scores.value = "";
  }
};


const analyseGrade = () =>  {
    selectedCourses.value.forEach(obj => {
        if (gradeAnalysis.hasOwnProperty(obj.grade)) {
            gradeAnalysis[obj.grade].courseCodes.push(obj.coursecode)
        }
        
    })
}
analyseGrade();

const startEdit = (course) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  selectedLevel.value = course.level;
  selectedCourseCode.value = course.coursecode;
  scores.value = course.scores;
  courseBeingEdited.value = course;
  editMode.value = true;
  removeItem(course.id);
  calculateCGPA();
};

const saveEdit = () => {
  if (courseBeingEdited.value) {
    courseBeingEdited.value.level = selectedLevel.value;
    courseBeingEdited.value.coursecode = selectedCourseCode.value;
    courseBeingEdited.value.units = selectedCourse.value.units;
    courseBeingEdited.value.scores = scores.value;
    courseBeingEdited.value.grade = getGrade(scores.value);
    addCourse();
    calculateCGPA();

    selectedCourseCode.value = "";
    scores.value = "";
    courseBeingEdited.value = null;
    editMode.value = false;
    saveSelectedCourses();
  }
};



function removeItem(id) {
  const index = selectedCourses.value.findIndex((item) => item.id === id);

  if (index !== -1) {
    selectedCourses.value.splice(index, 1);
  }
  for (let i = index; i < selectedCourses.value.length; i++) {
    selectedCourses.value[id].id = i + 1;
  }
  saveSelectedCourses();
}

watch(selectedLevel, filterCourses);

const cgpa = ref(null);

const calculateCGPA = () => {
  let totalCreditUnitAttainable = 0;
  let totalCreditUnitObtained = 0;

  for (let course of selectedCourses.value) {
    totalCreditUnitAttainable += course.units * 4;
    totalCreditUnitObtained += course.gradeUnit * course.units;
  }

  cgpa.value = (
    (totalCreditUnitObtained / totalCreditUnitAttainable) *
    4
  ).toFixed(2);
};

const clear = () => {
  selectedCourses.value.length = 0;
  calculateCGPA();
  for (const grade in gradeAnalysis) {
    gradeAnalysis[grade].courseCodes = [];
  };
  analyseGrade();
  cgpa.value = "-.--";
  localStorage.removeItem("selectedCourses");
};
</script>
