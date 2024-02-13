<template>
  <div class="container mx-auto flex flex-col items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-md shadow-md sm:w-[500px] w-full">
      <h1 class="text-2xl font-bold mb-6">Welcome {{ userDetails.fullName }}</h1>

      <div class="mb-4">
        <label for="oldPassword" class="block mb-1">Old Password</label>
        <input type="password" id="oldPassword" v-model="oldPassword" class="input-field">
      </div>
      <div class="mb-4">
        <label for="newPassword" class="block mb-1">New Password</label>
        <input type="password" id="newPassword" v-model="newPassword" class="input-field">
        <p v-if="newPassword.length > 0 && newPassword.length < 8" class="text-xs text-red-500">Password must be at least 8 characters long.</p>
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block mb-1">Confirm New Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="input-field">
        <p v-if="confirmPassword !== newPassword && confirmPassword.length > 0" class="text-xs text-red-500">Passwords do not match.</p>
      </div>

      <div class="mb-4">
        <label for="securityQuestion" class="block mb-1">Security Question</label>
        <select id="securityQuestion" v-model="selectedQuestion" class="input-field">
          <option v-for="question in securityQuestions" :key="question">{{ question }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="securityAnswer" class="block mb-1">Answer</label>
        <input type="text" id="securityAnswer" v-model="securityAnswer" class="input-field">
      </div>

      <button @click="updateUser" class="button-primary">Update</button>

      <div v-if="updateSuccess" class="success-message">Password Updated Successfully</div>
      <div v-if="loggingIn" class="info-message">Logging in...</div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';

const users = useUserStore();
const userDetails = ref(users.user);
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const selectedQuestion = ref('');
const securityAnswer = ref('');
const updateSuccess = ref(false);
const loggingIn = ref(false);

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
  "What is your favorite food?"
];

const updateUser = async () => {
  try {
    if (newPassword.value.length < 8 || confirmPassword.value !== newPassword.value) {
      return;
    }

    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:8800/api/v1/auth/cpasq', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      securityQuestion: selectedQuestion.value,
      securityAnswer: securityAnswer.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    updateSuccess.value = true;
    loggingIn.value = true;
    await login();
  } catch (error) {
    console.error(error);
  }
}

const login = async () => {
  // Your login logic here
}
</script>

<style scoped>
.input-field {
  @apply block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500;
}

.button-primary {
  @apply bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600;
}

.success-message {
  @apply text-green-500 mt-4;
}

.info-message {
  @apply text-gray-600 mt-4;
}
</style>
