<template>
  <div class="container mx-auto py-8">
    <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Upload Multiple Choice Question</h2>
      <div class="mb-4">
        <label for="level" class="block text-sm font-medium text-gray-700">Select Level:</label>
        <select v-model="selectedLevel" id="level" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
        <select v-model="selectedCourse" id="coursecode" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option v-for="course in courses" :value="course.coursecode">{{ course.coursecode }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="question" class="block text-sm font-medium text-gray-700">Enter Question:</label>
        <textarea v-model="question" id="question" rows="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
      </div>
      <!-- Add fields for adding options -->
      <!-- Add feature for selecting correct option(s) -->
      <!-- Add button for adding image -->
      <!-- Add fields for year, lecturer, and tags -->
      <div class="mb-4">
        <button @click.prevent="addImage" class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Add Image</button>
      </div>
      <div v-if="showImageInput" class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">Upload Image:</label>
        <input type="file" @change="handleImageUpload" id="image" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <img :src="imageURL" class="w-64" />
        <p class="text-sm text-gray-600" m-2>{{ imageURL }}</p>
      </div>
      <div class="mb-4">
        <label for="year" class="block text-sm font-medium text-gray-700">Year:</label>
        <input v-model="year" id="year" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="mb-4">
        <label for="lecturer" class="block text-sm font-medium text-gray-700">Lecturer:</label>
        <input v-model="lecturer" id="lecturer" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="mb-4">
        <label for="tags" class="block text-sm font-medium text-gray-700">Tags:</label>
        <input v-model="tags" id="tags" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <p class="text-xs text-gray-500">Separate tags by comma (,)</p>
      </div>
      <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Course100L from '../courses/100L.json';
import Course200L from '../courses/200L.json';
import Course300L from '../courses/300L.json';

const selectedLevel = ref('100L');
const imgURL = ref(null);
const selectedCourse = ref('');
const question = ref('');
const year = ref('');
const lecturer = ref('');
const tags = ref([]);
let courses = [];


const loadCourses = () => {
  try {
    if(selectedLevel.value === '100L') {
      courses = Course100L;
    } else if(selectedLevel.value === '200L') {
      courses = Course200L;
    } else if(selectedLevel.value === '300L') {
      courses = Course300L;
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
    } catch (error) {
        console.error('Cloudinary upload error:', error);
    }
};

const handleImageUpload = (event) => {
    imageFile.value = event.target.files[0];
    uploadToCloudinary();
}

const handleSubmit = async () => {
  try {
    // Use axios to post data to API endpoint
    // Display success message
    console.log('Question successfully uploaded');
    // Reset form fields
    selectedCourse.value = '100L';
    question.value = '';
    // Reset other fields
  } catch (error) {
    console.error('Error uploading question:', error);
    // Display error message
  }
};

const showImageInput = ref(false);
const imageFile = ref(null);

const addImage = () => {
  showImageInput.value = true;
};
</script>

<style>
/* No need to add additional styles, Tailwind CSS classes used inline */
</style>
