<template>
  <div class="min-h-screen bg-gray-900" @click="initializeAudio">
    <!-- Background Video -->
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
      <video
        ref="backgroundVideo"
        class="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
        autoplay
        loop
        muted
      ></video>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Loading Spinner -->
      <div v-if="loading" class="flex justify-center items-center h-screen">
        <svg
          class="animate-spin h-12 w-12 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V4a8 8 0 01-8 8h8v8H4a8 8 0 01-8-8 8 8 0 014-6.93z"
          ></path>
        </svg>
      </div>

      <div
        v-else-if="birthdays.length === 0"
        class="flex flex-col items-center justify-center h-screen text-white"
      >
        <h1 class="text-3xl font-bold mb-4">No Birthday Events for Today</h1>
        <p class="text-lg">
          You will be redirected to the home page shortly...
        </p>
      </div>

      <div v-else class="relative z-10 container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="birthday in birthdays"
            :key="birthday.matricNumber"
            class="backdrop-blur-md bg-opacity-20 bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <div class="flex flex-col items-center text-white">
              <div class="relative w-40 h-40 mb-4">
                <img
                  :src="birthday.imageUrl"
                  @load="() => imageLoaded(birthday)"
                  @error="retryImageLoad($event, birthday)"
                  class="rounded-full object-cover w-full h-full shadow-md"
                  :class="{ hidden: !birthday.imageLoaded }"
                />
                <svg
                  v-if="!birthday.imageLoaded"
                  class="absolute top-0 left-0 right-0 bottom-0 m-auto h-8 w-8 animate-spin text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V4a8 8 0 01-8 8h8v8H4a8 8 0 01-8-8 8 8 0 014-6.93z"
                  ></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold mt-2 font-poppins text-indigo-300">
                {{ birthday.fullName }}
              </h2>
              <p class="text-gray-300 font-poppins">
                {{ getMonthName(birthday.birthdayMonth) }}
                {{ birthday.birthdayDay }}
              </p>
              <p class="text-gray-300 font-poppins">
                Class Set: {{ birthday.classSet }}
              </p>
              <p class="text-gray-300 font-poppins">
                Level: {{ birthday.level }}
              </p>
              <div
                v-html="birthday.birthdayWish"
                class="mt-4 text-gray-300 italic font-poppins"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const birthdays = ref([]);
const loading = ref(true);
const backgroundVideo = ref(null);
const musicPlayer = ref(null);
const audioInitialized = ref(false);
const MAX_RETRIES = 5;

const videoFiles = [
  'videos/birthday-video-1.mp4',
  'videos/birthday-video-2.mp4',
  'videos/birthday-video-3.mp4'
  // Add paths to other videos here
];

const musicFiles = [
  "music/happy-birthday-1.mp3",
  "music/happy-birthday-2.mp3",
  "music/happy-birthday-3.mp3",
  "music/happy-birthday-4.mp3",  
  // Add paths to other music files here
];

const fetchBirthdays = async () => {
  try {
    const response = await axios.get(
      "https://aps-website-backend.onrender.com/api/v1/birthdays/birthdayevents"
    );
    if (response.status === 200 && response.data.birthdays.length > 0) {
      birthdays.value = response.data.birthdays.map((birthday) => ({
        ...birthday,
        retryCount: 0,
        imageLoaded: false,
      }));
    } else {
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }
  } catch (error) {
    toast.error("Error fetching birthday events. Redirecting to home page...");
    console.error("Error fetching birthdays:", error);
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  } finally {
    loading.value = false;
  }
};

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("default", { month: "long" });
};

const imageLoaded = (birthday) => {
  birthday.imageLoaded = true;
};

const retryImageLoad = (event, birthday) => {
  if (birthday.retryCount < MAX_RETRIES) {
    birthday.retryCount++;
    console.log(`Retrying image load attempt ${birthday.retryCount}`);
    event.target.src = "";
    setTimeout(() => {
      event.target.src = birthday.imageUrl;
    }, 1000);
  } else {
    console.error(
      `Image failed to load after ${MAX_RETRIES} attempts: ${birthday.imageUrl}`
    );
  }
};

const selectRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videoFiles.length);
  return videoFiles[randomIndex];
};

const selectRandomMusic = () => {
  const randomIndex = Math.floor(Math.random() * musicFiles.length);
  return musicFiles[randomIndex];
};

const playBackgroundMusic = () => {
  const audio = new Audio("music/happy-birthday-default.mp3");
  audio.play();

  audio.onended = () => {
    audio.src = selectRandomMusic();
    audio.loop = true;
    audio.play();
  };

  musicPlayer.value = audio;
};

const initializeAudio = () => {
  if (!audioInitialized.value) {
    playBackgroundMusic();
    audioInitialized.value = true;
  }
};

onMounted(() => {
  fetchBirthdays();
  if (backgroundVideo.value) {
    backgroundVideo.value.src = selectRandomVideo();
  }
});
</script>
