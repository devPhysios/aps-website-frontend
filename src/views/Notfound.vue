<template>
  <div class="h-screen w-screen flex items-center justify-center font-display">
    <video class="object-cover h-full w-full" autoplay muted @ended="redirectToDashboard">
      <source src="../assets/videos/404-Not-Found-APS.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function redirectToDashboard() {
  router.push('/dashboard');
}
</script>
