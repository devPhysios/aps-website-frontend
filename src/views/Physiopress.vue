<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-orange-500 px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div class="flex flex-col items-center mb-8">
        <img :src="apsLogo" alt="Logo" class="w-24 h-24 rounded-full mb-4 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48" />
        <h1 class="text-2xl font-bold text-white mb-2 sm:text-3xl md:text-4xl lg:text-5xl">PhysioPress</h1>
        <p class="text-base text-gray-200 sm:text-lg md:text-xl lg:text-2xl">Directing you to our Press Organization...</p>
      </div>
      <div class="flex items-center justify-center">
        <svg class="animate-spin h-8 w-8 mr-4 text-white sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div class="flex flex-col items-center">
          <p class="text-base text-white mb-2 sm:text-lg md:text-xl lg:text-2xl">Loading...</p>
          <div class="flex items-center">
            <div class="h-2 w-2 rounded-full bg-white mr-1 animate-pulse sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5"></div>
            <div class="h-2 w-2 rounded-full bg-white mr-1 animate-pulse delay-75 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5"></div>
            <div class="h-2 w-2 rounded-full bg-white animate-pulse delay-150 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import apsLogo from "@/assets/images/aps-logo.png";
  import { useToast } from "vue-toastification";
  
  const toast = useToast();
  
  onMounted(() => {
    const newWindow = window.open("https://physiopressui.wordpress.com", "_blank");
  
    if (newWindow === null || typeof newWindow === "undefined") {
      toast.error("Popup was blocked. Please allow popups for this site.", {
        timeout: 5000, // Keep the toast open until dismissed
      })
      // Redirect the current page to the home page after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 5000); // 5-second delay
      ;
    } else {
      // Redirect the current page to the home page after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 3000); // 3-second delay
    }
  
    // Open the link in a new tab after a short delay
    setTimeout(() => {
      window.open("https://christnestteens.com/physioray", "_blank");
    }, 2000); // 2-second delay
  });
  </script>
  
  <style>
  .animate-pulse {
    animation: pulse 1.5s infinite;
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>