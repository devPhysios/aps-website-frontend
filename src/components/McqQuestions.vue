<template>
  <div class="container mx-auto py-8">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Upload Multiple Choice Question</h2>
      <div class="mb-4">
        <label for="level" class="block text-sm font-medium text-gray-700">Select Level:</label>
        <select v-model="selectedLevel" id="level"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="100L">100L</option>
          <option value="200L">200L</option>
          <option value="300L">300L</option>
          <option value="400L">400L</option>
          <option value="500L">500L</option>
          <!-- Add options for other levels -->
        </select>
      </div>
      <div class="mb-4">
        <label for="coursecode" class="block text-sm font-medium text-gray-700">Select Course:</label>
        <select v-model="selectedCourse" id="coursecode"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option v-for="course in courses" :value="course.coursecode">{{ course.coursecode }}: {{ course.coursetitle }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="question" class="block text-sm font-medium text-gray-700">Enter Question:</label>
        <textarea v-model="question" id="question" rows="4" :class="{ 'border-red-500': errors.question }"
          @input="validateQuestion"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        <p v-if="errors.question" class="text-red-500 text-xs mt-1">Question is required</p>
      </div>
      <div v-for="(option, index) in options" :key="index" class="mb-4">
        <label :for="'option' + index" class="block text-sm font-medium text-gray-700">Option {{ index + 1 }}:</label>
        <input v-model="options[index]" :id="'option' + index" type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <button v-if="index > 1" @click.prevent="removeOption(index)" type="button"
          class="text-red-500 text-sm mt-1">Remove Option</button>
      </div>
      <button @click.prevent="addOption" type="button"
        class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Add Option</button>
      <!-- Correct options -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Select Correct Option(s):</label>
        <div v-for="(option, index) in options" :key="index" class="flex items-center">
          <input v-model="correctOptions" :value="index" :id="'correctOption' + index" type="checkbox" class="mr-2">
          <label :for="'correctOption' + index" class="text-sm text-gray-700">{{ option }}</label>
          <p v-if="!hasCorrectOption" class="text-red-500 text-xs mt-1">At least one correct option must be selected</p>
        </div>
      </div>
      <div class="mb-4">
        <button @click.prevent="addImage" class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Add
          Image</button>
      </div>
      <div v-if="showImageInput" class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">Upload Image:</label>
        <input type="file" @change="handleImageUpload" id="image"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <img :src="imgURL" class="w-64" />
        <p class="text-sm text-gray-600" m-2>{{ imgURL }}</p>
        <p v-if="successCloudinaryMessage" class="text-green-500 text-xs mt-1">{{ successCloudinaryMessage }}</p>
        <p v-if="errorMessageCloudinary" class="text-red-500 text-xs mt-1">{{ errorMessageCloudinary }}</p>
      </div>
      <div class="mb-4">
        <label for="year" class="block text-sm font-medium text-gray-700">Year:</label>
        <input v-model="year" id="year" type="text" :class="{ 'border-red-500': errors.year }" @input="validateYear"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <p v-if="errors.year" class="text-red-500 text-xs mt-1">Year is required</p>
      </div>
      <div class="mb-4">
        <label for="lecturer" class="block text-sm font-medium text-gray-700">Lecturer:</label>
        <input v-model="lecturer" id="lecturer" type="text" :class="{ 'border-red-500': errors.lecturer }"
          @input="validateLecturer"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <p v-if="errors.lecturer" class="text-red-500 text-xs mt-1">Lecturer is required</p>
      </div>
      <div class="mb-4">
        <label for="tags" class="block text-sm font-medium text-gray-700">Tags:</label>
        <input v-model="tags" id="tags" type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <p class="text-xs text-gray-500">Separate tags by comma (,)</p>
      </div>
      <button type="submit" @click.prevent="handleSubmit"
        class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
      <p v-if="successMessage" class="text-green-500 text-2xl mt-1">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-500 text-2xl mt-1">{{ errorMessage }}</p>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive, computed } from 'vue';
import axios from 'axios';
import Course100L from '../courses/100L.json';
import Course200L from '../courses/200L.json';
import Course300L from '../courses/300L.json';
import Course400L from '../courses/400L.json';
import Course500L from '../courses/500L.json';


const selectedLevel = ref('100L');
const imgURL = ref(null);
const selectedCourse = ref('');
const question = ref(null);
const year = ref(null);
const lecturer = ref('');
const tags = ref('');
let courses = [];
const options = ref(['', '']); // Initial options
const correctOptions = ref([]);
const successMessage = ref(null);
const errorMessage = ref(null);
const successCloudinaryMessage = ref(null);
const errorMessageCloudinary = ref(null);

const errors = reactive({
  question: true,
  year: true,
  lecturer: true,
  options: [],
});


const validateQuestion = () => {
  errors.question = !question.value.trim();

};

const validateYear = () => {
  errors.year = !year.value.trim();
};

const validateLecturer = () => {
  errors.lecturer = !lecturer.value.trim();
};

const validateOption = (index) => {
  errors.options[index] = !options.value[index].trim();
  console.log(errors.options[index]);
};

// Function to add more options
const addOption = () => {
  options.value.push('');
  errors.options.push(false);
};

// Function to remove an option
const removeOption = (index) => {
  options.value.splice(index, 1);
  // Remove from correctOptions if the option is selected as correct
  correctOptions.value = correctOptions.value.filter(option => option !== index);
  errors.options.splice(index, 1);
};

const hasErrors = computed(() => {
  return Object.values(errors).some(error => error) || errors.options.some(optionError => optionError);
});


const hasCorrectOption = computed(() => {
  return correctOptions.value.length > 0;
});

const loadCourses = () => {
  try {
    if (selectedLevel.value === '100L') {
      courses = Course100L;
    } else if (selectedLevel.value === '200L') {
      courses = Course200L;
    } else if (selectedLevel.value === '300L') {
      courses = Course300L;
    } else if (selectedLevel.value === '400L') {
      courses = Course400L;
    } else if (selectedLevel.value === '500L') {
      courses = Course500L;
    }
    // Add other levels
  } catch (error) {
    console.error('Error loading courses:', error);
  }
};
// Watch for change in level to reload courses
watch(selectedLevel, loadCourses);

loadCourses();

const uploadToCloudinary = async () => {
  const formData = new FormData();
  formData.append('file', imageFile.value);
  formData.append('upload_preset', 'jkg6h2bu'); // Create an upload preset in Cloudinary
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dp4sbuifi/image/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        transformations: 'w_400,h_400,c_fill'
      }
    );
    imgURL.value = response.data.secure_url;
    successCloudinaryMessage.value = 'Image uploaded successfully';
  } catch (error) {
    errorMessageCloudinary.value = error.response.data.message;
    console.error('Cloudinary upload error:', error);
  }
};

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
  console.log(imageFile.value);
  uploadToCloudinary();
}

const resetForm = () => {
  selectedLevel.value = '100L';
  selectedCourse.value = '';
  question.value = '';
  correctOptions.value = '';
  options.value = ['', ''];
  year.value = '';
  lecturer.value = '';
  tags.value = '';
  imgURL.value = null;
  showImageInput.value = false;
  imageFile.value = null;
  successCloudinaryMessage.value = null;
  errorMessageCloudinary.value = null;
  errors.question = false;
  errors.answer = false;
  errors.year = false;
  errors.lecturer = false;
};

const handleSubmit = async () => {
  try {
    // Validate form fields
    // validateQuestion();
    // validateYear();
    // validateLecturer();
    // Validate options
    // options.value.forEach((option, index) => validateOption(index));
    // if (hasErrors.value || !hasCorrectOption.value) {
    //   return;
    // }
    // Use axios to post data to API endpoint
    const token = localStorage.getItem('studentToken');
    await axios.post('http://localhost:8800/api/v1/mcq/createmcqs', {
      level: selectedLevel.value,
      courseCode: selectedCourse.value,
      question: question.value,
      year: year.value,
      lecturer: lecturer.value,
      options: options.value.join(',').split(',').map((option) => option.trim()),
      answer: correctOptions.value.join(',').split(',').map((answer) => answer.trim()),
      imgURL: imgURL.value,
      tags: tags.value ? tags.value.split(',') : [],
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    // Display success message
    successMessage.value = response.data.message || 'Question uploaded successfully';
    resetForm();
    setTimeout(() => {
      successMessage.value = null;
    }, 5000);

  } catch (error) {
    console.log(error)
    errorMessage.value = error.response.data.message || 'An error occurred';
    resetForm();
    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
};

const showImageInput = ref(false);
const imageFile = ref(null);

const addImage = () => {
  showImageInput.value = true;
};
</script>

<style>/* No need to add additional styles, Tailwind CSS classes used inline */</style>
