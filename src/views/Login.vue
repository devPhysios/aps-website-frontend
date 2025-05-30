<template>
    <div v-if="loginComponent" class="pt-5 font-display">
        <StudentLogin />
        <div class="text-center mt-[-185px] pb-48 text-1xl">
            <a @click="resetPassword" class="text-blue-500 hover:underline cursor-pointer">Forgot Password?</a>
        </div>
    </div>
    <div v-if="!loginComponent">
        <ResetPassword />
        <div class="text-center text-1xl mt-[-120px]">
            <a @click="login" class="text-blue-500 hover:underline cursor-pointer">Do you want to login?</a>
        </div>
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