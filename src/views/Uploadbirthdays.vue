<template>
  <!-- Navigation Button to Birthday Manager -->
  <div class="mt-4 flex justify-center md:justify-end mx-4 md:mx-6">
    <RouterLink to="/dashboard/birthday-manager">
      <button class="bg-yellow-500 text-white p-2 rounded w-full md:w-auto">
        Go to Birthday Manager
      </button>
    </RouterLink>
  </div>

  <!-- Container for Main Content -->
  <div class="container mx-auto px-4 md:px-6 mb-36">
    <!-- Month Selection Section -->
    <div class="mt-4 flex flex-col md:flex-row items-start md:items-center">
      <label for="month" class="block mb-2 md:mb-0 md:mr-2"
        >Select Month:</label
      >
      <select
        id="month"
        v-model="selectedMonth"
        class="border p-2 rounded w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <option value="">Select a month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <button
        @click="fetchBirthdaysByMonth"
        class="bg-blue-500 text-white p-2 rounded mt-2 md:mt-0 md:ml-2 w-full md:w-auto"
      >
        Fetch Birthdays
      </button>
    </div>

    <!-- Birthday Students Table Section -->
    <div v-if="birthdayStudents.length > 0" class="mt-4">
      <h2 class="text-xl font-bold">
        Birthday Students in {{ selectedMonth }}
      </h2>
      <p>{{ totalStudents }} students found</p>
      <div class="overflow-x-auto mt-2">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-2 border bg-gray-200">Full Name</th>
              <th class="px-4 py-2 border bg-gray-200">Matric Number</th>
              <th class="px-4 py-2 border bg-gray-200">Month of Birth</th>
              <th class="px-4 py-2 border bg-gray-200">Day of Birth</th>
              <th class="px-4 py-2 border bg-gray-200">Level</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in birthdayStudents"
              :key="student.matricNumber"
              class="bg-white odd:bg-gray-100 even:bg-gray-200"
            >
              <td class="px-4 py-2 border">{{ student.fullName }}</td>
              <td class="px-4 py-2 border">{{ student.matricNumber }}</td>
              <td class="px-4 py-2 border">{{ student.monthOfBirth }}</td>
              <td class="px-4 py-2 border">{{ student.dayOfBirth }}</td>
              <td class="px-4 py-2 border">{{ student.level }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Search Section -->
    <div class="mt-4 flex flex-col md:flex-row items-start md:items-center">
      <input
        v-model="matricNumber"
        type="text"
        placeholder="Enter Matric Number"
        class="border-black border-2 border-solid p-2 rounded w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
      />
      <button
        @click="fetchStudentDetails"
        class="bg-blue-500 text-white p-2 rounded mt-2 md:mt-0 md:ml-2 w-full md:w-auto"
      >
        Search
      </button>
    </div>

    <!-- Student Details Section -->
    <div v-if="studentDetails" class="mt-4 p-4 border rounded">
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
    <div v-if="showForm" class="mt-4 p-4 border rounded">
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
        <div class="mb-4 flex flex-col md:flex-row">
          <label class="block mb-2 md:mb-0 md:mr-2"
            >Date of Birth (DD/MM):</label
          >
          <div class="flex">
            <input
              v-model="birthday.day"
              type="number"
              placeholder="Day"
              min="1"
              max="31"
              class="border p-2 rounded mr-2 w-20"
            />
            <select v-model="birthday.month" class="border p-2 rounded w-32">
              <option value="" disabled>Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
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
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <p>
          You have already created this student's birthday event. Do you want to
          update the student's birthday details?
        </p>
        <div class="mt-4 flex justify-end">
          <button
            @click="cancelUpdateAction"
            class="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            @click="confirmUpdateAction"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Yes, Update
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50"
    >
      <svg
        class="animate-spin h-10 w-10 text-white"
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 4.421 2.906 8.166 6.998 9.494l1.002-4.203z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
// import { compressImage } from "../utils/useCompressImage.js";
import { uploadToFirebase } from "../utils/useFirebase";
import { QuillEditor } from "@vueup/vue-quill";
import "quill/dist/quill.snow.css";
import { useUserStore } from "@/stores/UserStore";
import router from "@/router";
import { RouterLink } from "vue-router";

const users = useUserStore();
const toast = useToast();
const matricNumber = ref("");
const studentDetails = ref(null);
const showForm = ref(false);
const imageUrl = ref(null);
const birthday = ref({ day: "", month: "" });
const compressedImage = ref(null);
const updatingMode = ref(false);
const isLoading = ref(false);
const showConfirmationModal = ref(false);
const quillEditorRef = ref(null);
const placeholder = ref("Input the Happy Birthday message here...");
const selectedMonth = ref("");
const birthdayStudents = ref([]);
const totalStudents = ref(0);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

const fetchStudentDetails = async () => {
  isLoading.value = true;
  try {
    if (!matricNumber.value) {
      isLoading.value = false;
      toast.error("Please enter a matric number.");
      return;
    }
    const token = localStorage.getItem("studentToken");
    const response = await axios.get(
      `https://api.apsui.com/api/v1/birthdays/student/${matricNumber.value}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    studentDetails.value = response.data.student;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
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
      isLoading.value = false;
      toast.error(error.message);
    }
  }
};

const fetchBirthdaysByMonth = async () => {
  isLoading.value = true;
  try {
    if (!selectedMonth.value) {
      isLoading.value = false;
      toast.error("Please select a month.");
      return;
    }
    const response = await axios.get(
      `https://api.apsui.com/api/v1/birthdays/bymonth/${selectedMonth.value.toLowerCase()}`
    );
    birthdayStudents.value = response.data.students;

    // Sort the students by day of birth in ascending order
    birthdayStudents.value.sort((a, b) => a.dayOfBirth - b.dayOfBirth);

    totalStudents.value = response.data.students.length;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    toast.error("An error occurred while fetching birthdays.");
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

const handleUpdateConfirmation = () => {
  showConfirmationModal.value = true;
};

const cancelUpdateAction = () => {
  studentDetails.value = null;
  showForm.value = false;
  imageUrl.value = null;
  showConfirmationModal.value = false;
};

const confirmUpdateAction = async () => {
  updatingMode.value = true;
  showConfirmationModal.value = false;
  await handleSubmit();
};

onMounted(async () => {
  const allowedMatricNumbers = ["213569", "220978"];
  if (!allowedMatricNumbers.includes(users.user.matricNumber)) {
    router.push("/not-allowed");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const showBirthdayForm = () => {
  showForm.value = true;
};

const handleImageUpload = async (event) => {
  isLoading.value = true;
  const file = event.target.files[0];
  if (!file) return;

  if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
    isLoading.value = false;
    toast.error("Invalid file type. Only PNG, JPEG, and JPG are accepted.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    isLoading.value = false;
    toast.error("File size exceeds 5MB.");
    return;
  }

  compressedImage.value = file;

  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result;
    isLoading.value = false;
    toast.success("Image compression completed.", { timeout: 1000 });
  };
  reader.readAsDataURL(compressedImage.value);
};

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const handleSubmit = async () => {
  isLoading.value = true;
  if (!birthday.value.day || !birthday.value.month) {
    toast.error("All fields are required.");
    isLoading.value = false;
    return;
  }

  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const birthdayDate = new Date(
    currentYear,
    birthday.value.month - 1,
    birthday.value.day
  );

  if (birthdayDate < currentDate.setHours(0, 0, 0, 0)) {
    isLoading.value = false;
    toast.error(
      "The birthday date is in the past. Wait till the following year"
    );
    return;
  }

  if (birthdayDate - currentDate > 30 * 24 * 60 * 60 * 1000) {
    isLoading.value = false;
    toast.error("You can only upload events within 30 days of the birthday.");
    return;
  }

  if (
    (birthday.value.month == 2 &&
      birthday.value.day > (isLeapYear(currentYear) ? 29 : 28)) ||
    ([4, 6, 9, 11].includes(birthday.value.month) && birthday.value.day > 30)
  ) {
    isLoading.value = false;
    toast.error("Invalid day for the selected month.");
    return;
  }

  const birthdayWishes = getBirthdayWishes();

  if (!birthdayWishes) {
    isLoading.value = false;
    toast.error("Please input a birthday message.");
    return;
  }

  let studentData = {
    matricNumber: matricNumber.value,
    fullName: studentDetails.value.fullName,
    birthdayMonth: birthday.value.month,
    birthdayDay: birthday.value.day,
    classSet: studentDetails.value.classSet,
    level: studentDetails.value.level,
    birthdayWish: birthdayWishes,
  };

  const storagePath = `birthdays/${matricNumber.value}`;
  const imageHotlink = await uploadToFirebase(
    studentData,
    compressedImage.value,
    storagePath,
    updatingMode.value
  );

  if (!imageHotlink) {
    isLoading.value = false;
    toast.error("Failed to get image URL.");
    return;
  }

  if (imageHotlink === "updateConfirmation") {
    isLoading.value = false;
    handleUpdateConfirmation();
    return;
  }

  toast.info("Uploading data...");
  studentData.imageUrl = imageHotlink;
  const token = localStorage.getItem("studentToken");
  try {
    let response;
    if (updatingMode.value) {
      response = await axios.patch(
        "https://api.apsui.com/api/v1/birthdays/update",
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await axios.post(
        "https://api.apsui.com/api/v1/birthdays/create",
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    if (response.status === 201) {
      isLoading.value = false;
      toast.success("Birthday event added successfully!");
      studentDetails.value = null;
      showForm.value = false;
      imageUrl.value = null;
    } else if (response.status === 200) {
      isLoading.value = false;
      toast.success("Birthday event updated successfully!");
      studentDetails.value = null;
      showForm.value = false;
      imageUrl.value = null;
    } else {
      isLoading.value = false;
      toast.error("Failed to add birthday event.");
    }
  } catch (error) {
    isLoading.value = false;
    toast.error("An error occurred while adding the birthday event.");
  }
};
</script>

<style>
/* Add any additional styles here */
</style>
