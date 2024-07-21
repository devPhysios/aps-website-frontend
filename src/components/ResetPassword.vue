<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Reset Password</h2>

      <form @submit.prevent="resetPassword" class="space-y-6">
        <div>
          <label
            for="matricNumber"
            class="block text-sm font-medium text-gray-700"
            >Matric Number</label
          >
          <input
            v-model="matricNumber"
            id="matricNumber"
            type="text"
            placeholder="Matric Number"
            class="input"
            required
          />
        </div>

        <div>
          <label
            for="securityQuestion"
            class="block text-sm font-medium text-gray-700"
            >Security Question</label
          >
          <select
            v-model="securityQuestion"
            id="securityQuestion"
            class="input"
            required
          >
            <option value="" disabled selected>Select Security Question</option>
            <option
              v-for="question in securityQuestions"
              :key="question"
              :value="question"
            >
              {{ question }}
            </option>
          </select>
        </div>

        <div>
          <label
            for="securityAnswer"
            class="block text-sm font-medium text-gray-700"
            >Security Answer</label
          >
          <input
            v-model="securityAnswer"
            id="securityAnswer"
            type="text"
            placeholder="Security Answer"
            class="input"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-full">
          Reset Password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

const toast = useToast();
const matricNumber = ref("");
const securityQuestion = ref("");
const securityAnswer = ref("");
const securityQuestions = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is the name of your favorite teacher in high school?",
  "What is the make and model of your first car?",
  "What is the name of your favorite book?",
  "What is your favorite movie?",
  "What is the name of your childhood best friend?",
  "What is the name of the street you grew up on?",
  "What is your favorite food?",
];

const resetForm = () => {
  matricNumber.value = "";
  securityQuestion.value = "";
  securityAnswer.value = "";
};

const resetPassword = async () => {
  if (!matricNumber.value || !securityQuestion.value || !securityAnswer.value) {
    toast.warning("Please fill in all the fields");
    return;
  }
  try {
    const response = await axios.post(
      "https://api.apsui.com/api/v1/auth/resetpw",
      {
        matricNumber: matricNumber.value,
        securityQuestion: securityQuestion.value,
        securityAnswer: securityAnswer.value,
      }
    );
    toast.success("Password reset successful");
    resetForm();
    setTimeout(() => {
      toast.success("Come, let's update your security details");
      setTimeout(async () => {
        location.reload();
      }, 2500);
    }, 2500);
  } catch (error) {
    toast.error(error.response.data.error);
    resetForm();
  }
};
</script>

<style scoped>
.input {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50;
}

.btn {
  @apply w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400;
}

.input-error-msg {
  @apply absolute right-0 top-0 mt-1 mr-2 text-red-500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
