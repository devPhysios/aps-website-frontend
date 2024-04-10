<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div
      class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
    >
      <div class="text-red-500 text-6xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24 md:h-32 md:w-32 animate-bounce"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1h-2a1 1 0 01-1-1V9zm0-2a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1h-2a1 1 0 01-1-1V7z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="text-gray-700 text-3xl">Internal Server Error</div>
    </div>
    <div class="mt-4 text-gray-500">
      Redirecting in {{ countdown }} seconds...
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const countdown = ref(6);

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value === 0) {
      clearInterval(interval);
      redirectToParent();
    }
  }, 1000);
});
console.log(router.currentRoute.value.path)
function redirectToParent() {
  const currentPathSegments = router.currentRoute.value.path.split("/");
  currentPathSegments.pop(); // Remove the last segment (the current route)
  const parentRoutePath = currentPathSegments.join("/");
  console.log(parentRoutePath)
  router.push(parentRoutePath);
}
</script>

<style scoped>
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
