<template>
  <Carousel
    :wrap-around="true"
    :autoplay="5000"
  >
    <Slide
      v-for="slide in 5"
      :key="slide"
    >
      <div class=" flex justify-center items-center w-full min-h-[400px] bg-aps-green rounded-lg text-aps-white text-xl">
        {{ slide }}
      </div>
    </Slide>

    <template #addons>
      <!-- <Navigation /> -->
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
</script>

<style scoped>
.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>