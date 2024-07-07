<template>
  <div class="min-h-screen bg-gray-900" @click="initializeAudio">
    <!-- APS Logo -->
    <div class="flex justify-center py-4">
      <img :src="apsLogo" alt="APS Logo" class="w-32 h-auto animate-blink z-50" />
    </div>

    <!-- Background Video -->
    <div
      v-if="birthdays.length > 0"
      class="fixed top-0 left-0 w-full h-full overflow-hidden z-0"
    >
      <video
        ref="backgroundVideo"
        class="w-full h-full object-cover animate-fade-in"
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

      <!-- No Birthday Events Message -->
      <div
        v-else-if="birthdays.length === 0"
        class="flex flex-col items-center justify-center h-screen text-white"
      >
        <h1 class="text-3xl font-bold mb-4 animate-fade-in">
          No Birthday Events for Today
        </h1>
        <p class="text-lg animate-fade-in">
          You will be redirected to the home page shortly...
        </p>
      </div>

      <!-- Birthday Cards -->
      <div v-else class="flex flex-wrap justify-center gap-6 md:gap-8">
        <div
          v-for="birthday in birthdays"
          :key="birthday.matricNumber"
          class="backdrop-blur-md bg-opacity-20 bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-slide-up"
        >
          <div class="flex flex-col items-center text-white">
            <div class="relative w-full aspect-[2/3] mb-4">
              <img
                :src="birthday.imageUrl"
                alt="Birthday Image"
                @load="() => imageLoaded(birthday)"
                @error="retryImageLoad($event, birthday)"
                class="rounded-xl object-cover w-full h-full shadow-md"
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
            <p class="text-gray-300 font-poppins">{{ birthday.classSet }}</p>
            <div
              v-html="birthday.birthdayWish"
              class="mt-4 text-gray-300 italic font-poppins"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import apsLogo from "@/assets/images/aps-logo.png";

const toast = useToast();
const birthdays = ref([]);
const loading = ref(true);
const backgroundVideo = ref(null);
const audioPlayer = ref(null);
const audioInitialized = ref(false);
const isPlaying = ref(false);

const videoFiles = [
  "videos/birthday-video-1.mp4",
  "videos/birthday-video-2.mp4",
  "videos/birthday-video-3.mp4",
];
const musicFiles = [
  "music/happy-birthday-1.mp3",
  "music/happy-birthday-2.mp3",
  "music/happy-birthday-3.mp3",
  "music/happy-birthday-4.mp3",
];

const fetchBirthdays = async () => {
  try {
    const response = await axios.get(
      "https://api.apsui.com/api/v1/birthdays/birthdayevents"
    );
    if (response.status === 200 && response.data.birthdays.length > 0) {
      birthdays.value = response.data.birthdays.map((birthday) => ({
        ...birthday,
        retryCount: 0,
        imageLoaded: false,
      }));
    } else {
      setTimeout(() => (window.location.href = "/"), 5000);
    }
  } catch (error) {
    toast.error("Error fetching birthday events. Redirecting to home page...");
    console.error("Error fetching birthdays:", error);
    setTimeout(() => (window.location.href = "/"), 5000);
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
  if (birthday.retryCount < 5) {
    birthday.retryCount++;
    console.log(`Retrying image load attempt ${birthday.retryCount}`);
    event.target.src = "";
    setTimeout(() => (event.target.src = birthday.imageUrl), 1000);
  } else {
    console.error(
      `Image failed to load after 5 attempts: ${birthday.imageUrl}`
    );
  }
};

const selectRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videoFiles.length);
  return videoFiles[randomIndex];
};

const playMusicSequence = () => {
  if (audioInitialized.value || isPlaying.value) return;
  if (!audioPlayer.value) audioPlayer.value = new Audio();

  let currentIndex = 0;

  const playNextMusic = () => {
    if (currentIndex < musicFiles.length) {
      audioPlayer.value.src = musicFiles[currentIndex];
      audioPlayer.value
        .play()
        .catch((error) => console.error("Error playing audio:", error));
      currentIndex++;
    } else {
      currentIndex = 0;
      playNextMusic();
    }
  };

  audioPlayer.value.onended = playNextMusic;
  audioPlayer.value.src = "music/happy-birthday-default.mp3";
  audioPlayer.value
    .play()
    .then(() => {
      audioInitialized.value = true;
      isPlaying.value = true;
    })
    .catch((error) => console.error("Error playing audio:", error));
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const initializeAudio = debounce(() => {
  if (!audioInitialized.value && !isPlaying.value) playMusicSequence();
}, 300);

const handleVisibilityChange = () => {
  if (document.hidden && audioPlayer.value) audioPlayer.value.pause();
  else if (!document.hidden && audioInitialized.value) audioPlayer.value.play();
};

onMounted(async () => {
  await fetchBirthdays();
  loading.value = false;
  const videoSrc = selectRandomVideo();
  backgroundVideo.value.src = videoSrc;
  window.addEventListener("click", initializeAudio);
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  window.removeEventListener("click", initializeAudio);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value = null;
  }
});
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gray-900 {
  background-color: #1a202c;
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.h-screen {
  height: 100vh;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-6 {
  gap: 1.5rem;
}

.md\:gap-8 {
  gap: 2rem;
}

.bg-opacity-20 {
  background-opacity: 0.2;
}

.bg-gray-800 {
  background-color: #2d3748;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-6 {
  padding: 1.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.text-white {
  color: #fff;
}

.aspect-\[2\/3\] {
  aspect-ratio: 2 / 3;
}

.mb-4 {
  margin-bottom: 1rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.object-cover {
  object-fit: cover;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.mt-2 {
  margin-top: 0.5rem;
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.text-indigo-300 {
  color: #9fa6ff;
}

.text-gray-300 {
  color: #e2e8f0;
}

.italic {
  font-style: italic;
}

.absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.right-0 {
  right: 0;
}

.bottom-0 {
  bottom: 0;
}

.m-auto {
  margin: auto;
}

.h-8 {
  height: 2rem;
}

.w-8 {
  width: 2rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-blink {
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>

