<template>
  <div
    class="container mx-auto flex flex-col items-center justify-center pb-48"
  >
    <div class="bg-white p-8 rounded-lg shadow-md sm:w-[700px]">
      <div class="h-[150px] md:pb-0 pb-4">
        <img class="h-3/4 object-cover mx-auto" :src="apsLogo" />
      </div>
      <h1 class="text-2xl font-bold mb-6 text-center">Student Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="matricNumber" class="block text-gray-700 mb-2"
            >Matric Number</label
          >
          <input
            v-model="matricNumber"
            type="text"
            id="matricNumber"
            class="input-field"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="input-field"
            required
            minlength="2"
          />
        </div>
        <div v-if="isLoading" class="text-center py-2">
          <svg class="animate-spin h-5 w-5 text-blue-500"></svg>
        </div>
        <button type="submit" class="btn-primary" :disabled="isLoading">
          Login
        </button>
      </form>
      <div
        v-if="isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
        <div class="bg-white rounded-lg p-6 shadow-xl flex justify-center">
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
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import apsLogo from "@/assets/images/aps-logo.png";
import { ref } from "vue";
import { loginUser } from "@/utils/useLogin";
import { useUserStore } from "@/stores/UserStore";
import router from "@/router";

const toast = useToast();
const matricNumber = ref("");
const password = ref("");
const isLoading = ref(false);
const users = useUserStore();
const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const handleLogin = async () => {
  isLoading.value = true;
  try {
    const rawData = await loginUser(matricNumber.value, password.value);
    if (rawData.success === false) {
      if (rawData.error.response.status === 400) {
        toast.error("Matric Number and password are required");
      } else if (rawData.error.response.status === 404) {
        toast.error("Student not found");
      } else if (rawData.error.response.status === 401) {
        toast.error("Invalid credentials");
      } else if (rawData.error.response.status === 500) {
        console.log(error.response.data);
        toast.error("An error occurred, please try again");
      } else {
        console.log(error.response.data);
        toast.error("An error occurred, please try again");
      }
    } else if (rawData.success === true) {
      const response = rawData.jsonData.responseData;
      if (response.student.firstLogin) {
        users.login(response.student);
        localStorage.setItem("studentToken", response.token);
        toast.success(
          `Welcome ${response.student.fullName}. Come, let's update your security details`
        );
        setTimeout(() => {
          router.push("/auth/updatesecurity");
        }, 3000);
      } else if (response.student.firstLogin === false) {
        users.login(response.student);
        toast.success(
          `Welcome back, ${capitalize(response.student.firstName)}`
        );
        localStorage.setItem("studentToken", response.token);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    }
  } catch (error) {
    console.log(error)
    toast.error("An error occurred, please try again");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Tailwind CSS Styles */

.input-field {
  @apply w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500;
}

.btn-primary {
  @apply w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md;
}

/* Additional Styles to Customize */
</style>
