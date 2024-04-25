<template>
  <HeroCarousel />
  <AboutHome />
  <GalleryCarousel />
  <ExcoCarousel />
</template>

<script setup>
import { onMounted } from "vue";
import HeroCarousel from "@/components/HeroCarousel.vue";
import AboutHome from "@/components/AboutHome.vue";
import ExcoCarousel from "@/components/ExcoCarousel.vue";
import GalleryCarousel from "@/components/GalleryCarousel.vue";

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>
