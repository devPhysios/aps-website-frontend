<template>
  <form @submit.prevent="handleSubmit" class="container mx-auto py-2">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Upload Essay Question</h2>
      <div class="mb-4">
        <label for="level" class="block text-sm font-medium text-gray-700"
          >Select Level:</label
        >
        <select
          v-model="selectedLevel"
          id="level"
          class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="100L">100L</option>
          <option value="200L">200L</option>
          <option value="300L">300L</option>
          <option value="400L">400L</option>
          <option value="500L">500L</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="coursecode" class="block text-sm font-medium text-gray-700"
          >Select Course:</label
        >
        <select
          v-model="selectedCourse"
          id="coursecode"
          class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option v-for="course in courses" :value="course.coursecode">
            {{ course.coursecode }}: {{ course.coursetitle }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="question" class="block text-sm font-medium text-gray-700"
          >Enter Question:</label
        >
        <textarea
          v-model="question"
          id="question"
          rows="4"
          required
          class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="answer" class="block text-sm font-medium text-gray-700"
          >Enter Answer:</label
        >
        <textarea
          v-model="answer"
          id="answer"
          rows="2"
          class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div class="mb-4">
        <button
          @click.prevent="addImage"
          class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Add Image
        </button>
      </div>
      <div v-if="showImageInput" class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700"
          >Upload Image:</label
        >
        <input
          type="file"
          @change="handleImageUpload"
          id="image"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <img :src="imgURL" class="w-64" />
        <p class="text-sm text-gray-600" m-2>{{ imgURL }}</p>
      </div>
      <div class="mb-4">
        <label for="year" class="block text-sm font-medium text-gray-700"
          >Year:</label
        >
        <input
          v-model="year"
          id="year"
          type="text"
          required
          class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div class="mb-4">
        <label for="lecturer" class="block text-sm font-medium text-gray-700"
          >Lecturer:</label
        >
        <input
          v-model="lecturer"
          id="lecturer"
          type="text"
          required
          class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div class="mb-4">
        <label for="tags" class="block text-sm font-medium text-gray-700"
          >Tags:</label
        >
        <input
          v-model="tags"
          id="tags"
          type="text"
          class="mt-1 block w-full border-gray-300 border-2 border-solid rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <p class="text-xs text-gray-500">Separate tags by comma (,)</p>
      </div>
      <button
        type="submit"
        class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Submit
      </button>
      <div
        v-if="isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
        <div
          class="bg-white rounded-lg p-6 shadow-xl flex items-center justify-center"
        >
          <svg
            class="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="text-center mt-3">Please wait...</p>
        </div>
      </div>
      <div></div>
    </div>
  </form>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import Course100L from "../courses/100L.json";
import Course200L from "../courses/200L.json";
import Course300L from "../courses/300L.json";
import Course400L from "../courses/400L.json";
import Course500L from "../courses/500L.json";
import { storage, questionsCollectionRef } from "../firebase";
import {
  ref as storeRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";

const store = useUserStore();
const user = store.user;
const toast = useToast();
const isLoading = ref(false);
const selectedLevel = ref("100L");
const imgURL = ref("");
const selectedCourse = ref("");
const question = ref("");
const answer = ref("");
const year = ref("");
const lecturer = ref("");
const tags = ref("");
let courses = [];
const showImageInput = ref(false);
const imageFile = ref(null);
const uploadProgress = ref(null);
const progressToastId = ref(null);

const addImage = () => {
  showImageInput.value = true;
};

const loadCourses = () => {
  try {
    if (selectedLevel.value === "100L") {
      courses = Course100L;
    } else if (selectedLevel.value === "200L") {
      courses = Course200L;
    } else if (selectedLevel.value === "300L") {
      courses = Course300L;
    } else if (selectedLevel.value === "400L") {
      courses = Course400L;
    } else if (selectedLevel.value === "500L") {
      courses = Course500L;
    }
    // Add other levels
  } catch (error) {
    console.error(error.message);
    toast.error("Error loading the courses. Please refresh or try again later");
  }
};

loadCourses();
// Watch for change in level to reload courses
watch(selectedLevel, loadCourses);

const createQuestion = async (data) => {
  try {
    await addDoc(questionsCollectionRef, data);
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Error updating image", { timeout: 3000 });
  }
};

const uploadToFirebase = () => {
  if (!imageFile.value) {
    toast.error("No file selected", { timeout: 3000 });
    return;
  }
  const { name, type } = imageFile.value;
  const storageRef = storeRef(storage, `questions/${name}`);
  // Upload the new image
  const uploadTask = uploadBytesResumable(storageRef, imageFile.value, {
    contentType: type,
  });
  uploadProgress.value = 0;

  // Create a toast instance
  progressToastId.value = toast.info("0%", {
    keepAlive: true, // Keep the toast alive until manually dismissed
    closeOnClick: false, // Prevent closing the toast on click
    timeout: false, // Prevent automatic timeout
  });

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      uploadProgress.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      toast.update(progressToastId.value, {
        content: `${uploadProgress.value}%`,
      });
    },
    (error) => {
      toast.error(error.message, { timeout: 3000 });
      toast.dismiss(progressToastId.value);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        imgURL.value = downloadURL;
        const data = {
          matricNumber: user.matricNumber,
          fullName: `${user.firstName} ${user.lastName}`,
          question: question.value || "No question",
          url: downloadURL,
          type: "Essay",
        };
        createQuestion(data);
        toast.dismiss(progressToastId.value);
        uploadProgress.value = null;
        toast.success("Image uploaded successfully", { timeout: 3000 });
      });
    }
  );
};

const resetForm = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  isLoading.value = false;
  // selectedLevel.value = "100L";
  // selectedCourse.value = "";
  question.value = "";
  answer.value = "";
  // year.value = "";
  // lecturer.value = "";
  tags.value = "";
  imgURL.value = null;
  showImageInput.value = false;
  imageFile.value = null;
};

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
  let imageSize = imageFile.value.size / 1024;
  let imageType = imageFile.value.type;
  if (imageSize > 500) {
    toast.error("Image size must not exceed 500kb");
    imageFile.value = null;
    return;
  } else if (
    imageType !== "image/jpeg" &&
    imageType !== "image/png" &&
    imageType !== "image/jpg"
  ) {
    toast.error("File must be an image (JPEG, PNG, or JPG)");
    imageFile.value = null;
    return;
  } else {
    uploadToFirebase();
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // Use axios to post data to API endpoint
    const token = localStorage.getItem("studentToken");
    if (answer.value === "") {
      answer.value = "No answer yet";
    }
    const response = await axios.post(
      "https://api.apsui.com/api/v1/essayqs/createessayqs",
      {
        question: question.value,
        imgURL: imgURL.value,
        answer: answer.value,
        courseCode: selectedCourse.value,
        level: selectedLevel.value,
        year: year.value,
        lecturer: lecturer.value,
        tags: tags.value ? tags.value.split(",") : [],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    isLoading.value = false;
    toast.success("Question uploaded successfully");
    resetForm();
  } catch (error) {
    toast.error("An error occurred. Please try again");
    isLoading.value = false;
  }
};
</script>

<style>
/* No need to add additional styles, Tailwind CSS classes used inline */
</style>
