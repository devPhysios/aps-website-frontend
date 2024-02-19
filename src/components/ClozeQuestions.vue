<template>
    <div class="container mx-auto py-8">
        <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-4">Upload Fill-in-the-Gap Question</h2>
            <div class="mb-4">
                <label for="level" class="block text-sm font-medium text-gray-700">Select Level:</label>
                <select v-model="selectedLevel" id="level"
                    class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="100L">100L</option>
                    <option value="200L">200L</option>
                    <option value="300L">300L</option>
                    <option value="400L">400L</option>
                    <option value="500L">500L</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="coursecode" class="block text-sm font-medium text-gray-700">Select Course:</label>
                <select v-model="selectedCourse" id="coursecode"
                    class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option v-for="course in courses" :value="course.coursecode">{{ course.coursecode }}: {{
                        course.coursetitle }}</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="question" class="block text-sm font-medium text-gray-700">Enter Question:</label>
                <textarea v-model="question" id="question" rows="4" required
                    class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
            </div>
            <div class="mb-4">
                <label for="answer" class="block text-sm font-medium text-gray-700">Enter Answer:</label>
                <input v-model="answer" id="answer" type="text"
                    class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <!-- Add button for adding image -->
            <div class="mb-4">
                <button @click="addImage" class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Add
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
                <input v-model="year" id="year" type="text" required
                    class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div class="mb-4">
                <label for="lecturer" class="block text-sm font-medium text-gray-700">Lecturer:</label>
                <input v-model="lecturer" id="lecturer" type="text" required
                    class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div class="mb-4">
                <label for="tags" class="block text-sm font-medium text-gray-700">Tags:</label>
                <input v-model="tags" id="tags" type="text"
                    class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <p class="text-xs text-gray-500">Separate tags by comma (,)</p>
            </div>
            <button type="submit" @click.prevent="handleSubmit"
                class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
            <div>
                <p v-if="successMessage" class="text-green-500 text-2xl mt-1">{{ successMessage }}</p>
                <p v-if="errorMessage" class="text-red-500 text-2xl mt-1">{{ errorMessage }}</p>
            </div>
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
import { image } from '@cloudinary/url-gen/qualifiers/source';

const selectedLevel = ref('100L');
const imgURL = ref(null);
const selectedCourse = ref('');
const question = ref('');
const answer = ref('');
const year = ref('');
const lecturer = ref('');
const tags = ref('');
const successMessage = ref(null);
const errorMessage = ref(null);
const successCloudinaryMessage = ref(null);
const errorMessageCloudinary = ref(null);
let courses = [];
const showImageInput = ref(false);
const imageFile = ref(null);

const addImage = () => {
    showImageInput.value = true;
};


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
        errorMessage.value = error.message || 'An error occurred';
        setTimeout(() => {
            errorMessage.value = null;
        }, 5000);
    }
};

loadCourses();
// Watch for change in level to reload courses
watch(selectedLevel, loadCourses);

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
    }
};

const resetForm = () => {
    selectedLevel.value = '100L';
    selectedCourse.value = '';
    question.value = '';
    answer.value = '';
    year.value = '';
    lecturer.value = '';
    tags.value = '';
    imgURL.value = null;
    showImageInput.value = false;
    imageFile.value = null;
    successCloudinaryMessage.value = null;
    errorMessageCloudinary.value = null;
};

const handleImageUpload = (event) => {
    imageFile.value = event.target.files[0];
    let imageSize = imageFile.value.size / 1024;
    let imageType = imageFile.value.type;
    if (imageSize > 500) {
        errorMessageCloudinary.value = 'Image size must not exceed 500kb';
        imageFile.value = null;
        setTimeout(() => {
            errorMessageCloudinary.value = null;
        }, 5000);
        return;
    } else if (imageType !== 'image/jpeg' && imageType !== 'image/png' && imageType !== 'image/jpg' && imageType !== 'image/gif' && imageType !== 'image/svg' && imageType !== 'image/webp' && imageType !== 'image/tiff' && imageType !== 'image/bmp' && imageType !== 'image/ico' && imageType !== 'image/raw' && imageType !== 'image/psd' && imageType !== 'image/heif' && imageType !== 'image/heic' && imageType !== 'image/avif' && imageType !== 'image/jfif' && imageType !== 'image/jp2' && imageType !== 'image/jpx' && imageType !== 'image/jpm' && imageType !== 'image/jxr' && imageType !== 'image/jxl' && imageType !== 'image/bpg' && imageType !== 'image/cgm' && imageType !== 'image/iep' && imageType !== 'image/iepm' && imageType !== 'image/iepb' && imageType !== 'image/ico') {
        errorMessageCloudinary.value = 'File must be an image';
        imageFile.value = null;
        setTimeout(() => {
            errorMessageCloudinary.value = null;
        }, 5000);
        return;
    } else {
        uploadToCloudinary();
    }
}

const handleSubmit = async () => {
    try {
        // Use axios to post data to API endpoint
        const token = localStorage.getItem('studentToken');
        const response = await axios.post('http://localhost:8800/api/v1/fitg/createfitg', {
            question: question.value,
            imgURL: imgURL.value || null,
            answer: answer.value,
            courseCode: selectedCourse.value,
            level: selectedLevel.value,
            year: year.value,
            lecturer: lecturer.value,
            tags: tags.value ? tags.value.split(',') : [],
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // Display success message
        successMessage.value = response.data.message || 'Question uploaded successfully';
        resetForm();
        setTimeout(() => {
            successMessage.value = null;
        }, 5000);
    } catch (error) {
        errorMessage.value = error.response.data.message || 'An error occurred';
        setTimeout(() => {
            errorMessage.value = null;
        }, 5000);
    }
};
</script>
  
<style>
/* No need to add additional styles, Tailwind CSS classes used inline */
</style>
  