<template>
  <div class="container mx-auto flex flex-col items-center justify-center h-full" v-if="users.user">
    <div class="bg-white p-8 rounded-md shadow-md sm:w-[500px] w-full">
      <h1 class="text-2xl font-bold mb-6">Welcome {{ userDetails.fullName }}</h1>
      <p class="mb-4">This is your first time logging in <i>or you just reset your password</i>, please update your security details.</p>
      <div class="flex justify-end mb-4">
        <button @click="handleLogout"
          class="text-red-500 font-bold hover:text-red-700 px-4 py-2 rounded-lg hover:border-red-500">Log Out</button>
      </div>
      <div class="mb-4">
        <label for="oldPassword" class="block mb-1">Old Password</label>
        <input type="password" id="oldPassword" v-model="oldPassword" class="input-field">
      </div>
      <div class="mb-4">
        <label for="newPassword" class="block mb-1">New Password</label>
        <input type="password" id="newPassword" v-model="newPassword" class="input-field">
        <p v-if="newPassword.length > 0 && newPassword.length < 8" class="text-xs text-red-500">Password must be at least
          8 characters long.</p>
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block mb-1">Confirm New Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="input-field">
        <p v-if="confirmPassword !== newPassword && confirmPassword.length > 0" class="text-xs text-red-500">Passwords do
          not match.</p>
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
      <div v-if="errorMessage" class="text-red-500 text-center mb-4">
        {{ errorMessage }}
      </div>
      <div v-if="updateSuccess" class="success-message">Password Updated Successfully</div>
      <div v-if="loggingIn" class="info-message">Logging in...</div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { loginUser } from '@/utils/useLogin';
import router from '@/router';

onMounted(() => {
  const users = useUserStore();
 if (!users.user || users.user.firstLogin === false) {
    router.push('/dashboard');
  }
});

const users = useUserStore();
const userDetails = ref(users.user);
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const selectedQuestion = ref('');
const securityAnswer = ref('');
const updateSuccess = ref(false);
const loggingIn = ref(false);
const errorMessage = ref(null);

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

const handleLogout = () => {
  users.logout()
  router.push('/auth/login')
}

const updateUser = async () => {
  try {
    if (newPassword.value.length < 8 || confirmPassword.value !== newPassword.value) {
      return;
    }
    const token = localStorage.getItem('studentToken');
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
    if (response.status === 200) {
      updateSuccess.value = true;
      loggingIn.value = true;
      await login();
    }
  } catch (error) {
    if (error.response.status === 400) {
      errorMessage.value = 'Bad Request';
    }
    else if (error.response.status === 401) {
      errorMessage.value = 'Invalid Old Password';
    } else if (error.response.status === 404) {
      errorMessage.value = 'Student not found';
    }

    console.error(error)
  }
}

const login = async () => {
  try {
    const rawData = await loginUser(userDetails.value.matricNumber, newPassword.value);
    if (rawData.success === false) {
      if (rawData.error.response.status === 400) {
        errorMessage.value = 'Invalid Credentials';
      }
      else if (rawData.error.response.status === 404) {
        errorMessage.value = 'Account Not Found';
      } else if (rawData.error.response.status === 401) {
        errorMessage.value = 'Invalid Credentials';
      } else if (rawData.error.response.status === 500) {
        errorMessage.value = 'An error occurred, please try again';
      } else {
        errorMessage.value = 'An error occurred, please try again';
      }
    } else if (rawData.success === true) {
      const response = rawData.jsonData.responseData;
      if (response.student.firstLogin) {
        users.login(response.student);
        localStorage.setItem("studentToken", response.token);
        router.push("/auth/updatesecurity");
      } else if (response.student.firstLogin === false) {
        users.login(response.student);
        localStorage.setItem("studentToken", response.token);
        router.push("/dashboard");
      }
    }
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.input-field {
  @apply block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500;
}

.button-primary {
  @apply bg-indigo-500 text-white px-4 py-2 mt-4 rounded hover:bg-indigo-600 w-full;
}

.success-message {
  @apply text-green-500 mt-4;
}

.info-message {
  @apply text-gray-600 mt-4;
}</style>
