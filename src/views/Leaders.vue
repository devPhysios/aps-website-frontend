<template>
    <div class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-bold mb-6">Meet Our Executives</h1>
      <div class="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-center">
          <div class="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
            <img class="w-32 h-32 rounded-full mb-4" src="president.jpg" alt="President">
            <h2 class="text-xl font-semibold">President Name</h2>
            <p class="text-gray-600">President</p>
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-4 w-full">
          <div v-for="(executive, index) in executives" :key="index" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <img class="w-24 h-24 rounded-full mb-4" :src="executive.image" :alt="executive.name">
              <h2 class="text-lg font-semibold">{{ executive.name }}</h2>
              <p class="text-gray-600">{{ executive.post }}</p>
              <!-- Example SVG icon -->
              <svg class="w-6 h-6 text-gray-600 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const executives = [
    { name: 'Vice President Name', post: 'Vice President', image: 'vice-president.jpg' },
    { name: 'General Secretary Name', post: 'General Secretary', image: 'general-secretary.jpg' },
    { name: 'Assistant General Secretary Name', post: 'Assistant General Secretary', image: 'assistant-general-secretary.jpg' },
    { name: 'Treasurer Name', post: 'Treasurer', image: 'treasurer.jpg' },
    { name: 'Financial Secretary Name', post: 'Financial Secretary', image: 'financial-secretary.jpg' },
    { name: 'Sports Secretary Name', post: 'Sports Secretary', image: 'sports-secretary.jpg' },
    { name: 'Public Relations Officer Name', post: 'Public Relations Officer', image: 'public-relations-officer.jpg' },
    { name: 'Social Director Name', post: 'Social Director', image: 'social-director.jpg' },
    { name: 'Special Duties Officer Name', post: 'Special Duties Officer', image: 'special-duties-officer.jpg' },
  ];
  </script>
  
  <style>
  /* You can add custom styles here if needed */
  </style>
  