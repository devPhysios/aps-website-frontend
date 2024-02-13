<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Change Password</h2>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="currentPassword">Current Password:</label>
        <input 
          type="password" 
          id="currentPassword" 
          v-model="currentPassword" 
          class="input-field"
        >
      </div>
      <div>
        <label for="newPassword">New Password:</label>
        <input 
          type="password" 
          id="newPassword" 
          v-model="newPassword" 
          class="input-field"
        >
      </div>
      <div>
        <label for="confirmPassword">Confirm New Password:</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="confirmPassword" 
          class="input-field"
        >
      </div>
    </div>
    <button 
      class="button-primary mt-4"
      @click="changePassword"
      :disabled="!isPasswordFormValid"
    >
      Change Password
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// Import necessary methods or variables

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const isPasswordFormValid = computed(() => {
  return (
    currentPassword.value.length > 0 &&
    newPassword.value.length >= 8 && // Minimum password length rule
    newPassword.value === confirmPassword.value 
  );
});

const changePassword = async () => {
  // Implement the changePassword method
};
</script>
