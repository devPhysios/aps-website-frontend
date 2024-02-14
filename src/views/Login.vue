<template>
    <div class="container mx-auto flex flex-col items-center justify-center h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md sm:w-[700px]">
            <h1 class="text-2xl font-bold mb-6 text-center">Student Login</h1>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="matricNumber" class="block text-gray-700 mb-2">Matric Number</label>
                    <input v-model="matricNumber" type="text" id="matricNumber" class="input-field" required />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-700 mb-2">Password</label>
                    <input v-model="password" type="password" id="password" class="input-field" required minlength="2" />
                </div>

                <div v-if="isLoading" class="text-center py-2">
                    <svg class="animate-spin h-5 w-5 text-blue-500"> </svg>
                </div>

                <div v-if="errorMessage" class="text-red-500 text-center mb-4">
                    {{ errorMessage }}
                </div>

                <button type="submit" class="btn-primary" :disabled="isLoading">
                    Login
                </button>
            </form>

            <p class="text-center mt-4">
                <a href="#" class="text-blue-500 hover:underline">Forgot Password?</a>
            </p>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { loginUser } from '@/utils/useLogin'
import { useUserStore } from '@/stores/UserStore'
import router from '@/router';

const matricNumber = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref(null);
const users = useUserStore()

const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = null;
    try {
        const rawData = await loginUser(matricNumber.value, password.value);
        if (rawData.success === false) {
            if (rawData.error.response.status === 400){
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
                // toggleModal.value = false;
            } else if (response.student.firstLogin === false) {
                // toggleModal.value = false;
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
/* Tailwind CSS Styles */
/* .container { */
    /* Background Image? Gradient? */
/* } */

.input-field {
    @apply w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500;
}

.btn-primary {
    @apply w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md;
}

/* Additional Styles to Customize */
</style>
  