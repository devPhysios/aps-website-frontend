<template>
    <div>
      <h2 class="text-xl font-semibold mb-4">Security Question</h2>
      <div>
        <label for="securityQuestion">Question:</label>
        <select 
          id="securityQuestion" 
          v-model="selectedQuestion" 
          class="input-field"
        >
          <option value="" disabled>Select a question</option>
          <option v-for="question in securityQuestions" :key="question.id">
            {{ question.text }}
          </option>
        </select>
      </div>
      <div>
        <label for="securityAnswer">Answer:</label>
        <input 
          type="text" 
          id="securityAnswer" 
          v-model="securityAnswer" 
          class="input-field"
        >
      </div>
      <button 
        class="button-primary mt-4"
        @click="saveSecuritySettings"
        :disabled="!isSecurityFormValid"
      >
        Save Settings
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  // Import necessary methods or variables
  
  const selectedQuestion = ref('');
  const securityAnswer = ref('');
  
  const securityQuestions = [
    { id: 1, text: "What is your mother's maiden name?" },
    { id: 2, text: "What was the name of your first pet?" },
    { id: 3, text: "What is the name of the city where you were born?" },
    { id: 4, text: "What is the name of your favorite teacher in high school?" },
    { id: 5, text: "What is the make and model of your first car?" },
    { id: 6, text: "What is the name of your favorite book?" },
    { id: 7, text: "What is your favorite movie?" },
    { id: 8, text: "What is the name of your childhood best friend?" },
    { id: 9, text: "What is the name of the street you grew up on?" },
    { id: 10, text: "What is your favorite food?" }
  ];
  
  const isSecurityFormValid = computed(() => {
    return selectedQuestion.value && securityAnswer.value.length > 0;
  });
  
  const saveSecuritySettings = async () => {
    // Implement the saveSecuritySettings method
  };
  </script>
  