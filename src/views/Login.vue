<template>
    <div v-if="loginComponent" class="pt-5 font-display">
        <StudentLogin />
        <p class="text-center mt-[-185px] pb-48 text-1xl">
            <p @click="resetPassword" class="text-blue-500 hover:underline">Forgot Password?</p>
        </p>
    </div>
    <div v-if="!loginComponent">
        <ResetPassword />
        <p class="text-center text-1xl mt-[-120px]" >
            <p @click="login" class="text-blue-500 hover:underline">Do you want to login?</p>
        </p>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import StudentLogin from '@/components/StudentLogin.vue';
import ResetPassword from '@/components/ResetPassword.vue';

const loginComponent = ref(true);

const resetPassword = () => {
    loginComponent.value = false;
}
const login = () => {
    loginComponent.value = true;
}
</script>