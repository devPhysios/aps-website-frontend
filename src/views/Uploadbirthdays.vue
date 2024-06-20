<template>
  <div class="container mx-auto md:pt-[100px] pt-[100px] px-4 md:px-6">
    <!-- Search Section -->
    <div class="mb-4">
      <input
        v-model="matricNumber"
        type="text"
        placeholder="Enter Matric Number"
        class="border-black border-2 border-solid p-2 rounded w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]"
      />
      <button
        @click="fetchStudentDetails"
        class="bg-blue-500 text-white p-2 rounded mt-2 ml-1"
      >
        Search
      </button>
    </div>

    <!-- Student Details Section -->
    <div v-if="studentDetails" class="mb-4 p-4 border rounded">
      <h2 class="text-xl font-bold">Student Details</h2>
      <p><strong>Name:</strong> {{ studentDetails.fullName }}</p>
      <p><strong>Set:</strong> {{ studentDetails.classSet }}</p>
      <p><strong>Level:</strong> {{ studentDetails.level }}</p>
      <button
        @click="showBirthdayForm"
        class="bg-green-500 text-white p-2 rounded mt-2 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-4 h-4 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Birthday Event
      </button>
    </div>

    <!-- Birthday Form Section -->
    <div v-if="showForm" class="p-4 border rounded">
      <h2 class="text-xl font-bold mb-2">Add Birthday Event</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Image Input -->
        <div class="mb-4">
          <label class="block mb-2">Upload Image:</label>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/png, image/jpeg, image/jpg"
            class="block w-full"
          />
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="Selected Image"
            class="mt-2 w-32 h-32 object-cover"
          />
        </div>

        <!-- Date of Birth Input -->
        <div class="mb-4">
          <label class="block mb-2">Date of Birth (DD/MM):</label>
          <input
            v-model="birthday.day"
            type="number"
            placeholder="Day"
            min="1"
            max="31"
            class="border p-2 rounded mr-2 w-20"
          />
          <input
            v-model="birthday.month"
            type="number"
            placeholder="Month"
            min="1"
            max="12"
            class="border p-2 rounded w-20"
          />
        </div>

        <!-- Birthday Wishes Input -->
        <div class="mb-4">
          <label class="block mb-2">Birthday Wishes:</label>
          <QuillEditor
            v-model:content="placeholder"
            :options="quillOptions"
            class="h-72"
            @ready="onEditorReady"
            ref="quillEditorRef"
          />
        </div>
        <!-- Submit Button -->
        <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>

    <!-- Modal for Confirmation -->
    <div
      v-if="showConfirmationModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div class="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 class="text-lg font-bold mb-4">Confirm Update</h2>
        <p>Do you want to update the student's birthday details?</p>
        <div class="mt-4 flex justify-end">
          <button
            @click="confirmUpdate(false)"
            class="bg-red-500 text-white p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            @click="confirmUpdate(true)"
            class="bg-green-500 text-white p-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import { compressImage } from "../utils/useCompressImage.js";
import { uploadToFirebase } from "../utils/useFirebase";
import { QuillEditor } from "@vueup/vue-quill";
import "quill/dist/quill.snow.css";

const toast = useToast();
const matricNumber = ref("");
const studentDetails = ref(null);
const showForm = ref(false);
const imageUrl = ref(null);
const birthday = ref({ day: "", month: "" });
const compressedImage = ref(null);
const updatingMode = ref(false);
const showConfirmationModal = ref(false);
const quillEditorRef = ref(null);
const placeholder = ref("Input the Happy Birthday message here...");

const onEditorReady = () => {
  console.log("Editor is ready");
};

const quillOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  },
};

const confirmUpdate = (confirm) => {
  showConfirmationModal.value = false;
  if (confirm) {
    updatingMode.value = true;
    handleSubmit();
  }
};

const fetchStudentDetails = async () => {
  try {
    if (!matricNumber.value) {
      toast.error("Please enter a matric number.");
      return;
    }
    const token = localStorage.getItem("studentToken");
    const response = await axios.get(
      `http://localhost:8800/api/v1/birthdays/student/${matricNumber.value}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    studentDetails.value = response.data.student;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          toast.error(
            "Invalid matric number. Please enter a valid matric number."
          );
          break;
        case 401:
          toast.error("You're not authorized to perform this action.");
          break;
        case 404:
          toast.error("Student not found.");
          break;
        default:
          toast.error("An error occurred while fetching student details.");
      }
    } else {
      toast.error(error.message);
    }
  }
};

const getBirthdayWishes = () => {
  const editorInstance = quillEditorRef.value?.editor;
  if (editorInstance) {
    const qlEditorElement = editorInstance.querySelector(".ql-editor");
    if (qlEditorElement) {
      return qlEditorElement.innerHTML;
    } else {
      console.error(".ql-editor element not found");
      return null;
    }
  } else {
    console.error("Editor instance not found");
    return null;
  }
};

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const showBirthdayForm = () => {
  showForm.value = true;
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
    toast.error("Invalid file type. Only PNG, JPEG, and JPG are accepted.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("File size exceeds 5MB.");
    return;
  }

  compressedImage.value = await compressImage(file);

  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result;
    toast.success("Image compression completed.");
  };
  reader.readAsDataURL(compressedImage.value);
};

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const handleSubmit = async () => {
  if (!birthday.value.day || !birthday.value.month) {
    toast.error("All fields are required.");
    return;
  }

  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const birthdayDate = new Date(
    currentYear,
    birthday.value.month - 1,
    birthday.value.day
  );

  if (birthdayDate < currentDate) {
    toast.error("The birthday date is in the past. Wait till the following year");
    return;
  }

  if (birthdayDate - currentDate > 30 * 24 * 60 * 60 * 1000) {
    toast.error("You can only upload events within 30 days of the birthday.");
    return;
  }

  if (
    (birthday.value.month == 2 &&
      birthday.value.day > (isLeapYear(currentYear) ? 29 : 28)) ||
    ([4, 6, 9, 11].includes(birthday.value.month) && birthday.value.day > 30)
  ) {
    toast.error("Invalid day for the selected month.");
    return;
  }

  const birthdayWishes = getBirthdayWishes();
  let studentData = {
    matricNumber: matricNumber.value,
    fullName: studentDetails.value.fullName,
    birthdayMonth: birthday.value.month,
    birthdayDay: birthday.value.day,
    classSet: studentDetails.value.classSet,
    level: studentDetails.value.level,
    birthdayWish: birthdayWishes || null,
  };
  console.log(studentData);

  const storagePath = `birthdays/${matricNumber.value}`;
  const imageHotlink = await uploadToFirebase(
    studentData,
    compressedImage.value,
    storagePath,
    updatingMode.value
  );

  if (!imageHotlink) {
    toast.error("Failed to get image URL.");
    return;
  }

  if (imageHotlink === "updateConfirmation") {
    confirmUpdate.value = true;
    return;
  }

  toast.info("Uploading data...");
  studentData.imageUrl = imageHotlink;
  try {
    let response;
    if (updatingMode.value) {
      response = await axios.patch(
        "http://localhost:8800/api/v1/birthdays/create",
        studentData
      );
    } else {
      response = await axios.post(
        "http://localhost:8800/api/v1/birthdays/create",
        {
          matricNumber: matricNumber.value,
          name: studentDetails.value.fullName,
          birthday: `${birthday.value.day}/${birthday.value.month}`,
          wishes: birthdayWishes.value,
          imageUrl: imageHotlink,
        }
      );
    }

    if (response.status === 200) {
      toast.success("Birthday event added successfully!");
      studentDetails.value = null;
      showForm.value = false;
      imageUrl.value = null;
    } else {
      toast.error("Failed to add birthday event.");
    }
  } catch (error) {
    toast.error("An error occurred while adding the birthday event.");
  }
};
</script>

<style>
/* Add any additional styles here */
</style>
