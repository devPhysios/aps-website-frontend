<template>
  <Carousel
    :wrap-around="true"
    :autoplay="5000"
    :pause-autoplay-on-hover="true"
  >
    <Slide
      v-for="(data, index) in carouselData"
      :key="index"
    >
      <div
        class="flex flex-col justify-center items-center w-full min-h-[400px] rounded-lg text-aps-white text-xl gap-2 font-display"
        :style="{ background: `#555 url(${ data.imgBg }) no-repeat center/cover`, backgroundBlendMode: 'multiply'}"
      >
        <h3 class="text-lg mb-3">{{ data.text.toUpperCase() }}</h3>
        <p class="mb-4">{{ data.subtitle }}</p>

        <button class="bg-aps-green text-aps-white px-2 py-1 rounded-md hover:bg-aps-orange">
          {{ data.ctaBtn }}
        </button>
      </div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import { ref } from 'vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const carouselData = ref([
  {
    text: `Association of physiotherapy students university of Ibadan`,
    subtitle: "Welcome To Our Official Website",
    imgBg: 'src/assets/images/IMG_0849.jpg',
    ctaBtn: "About Us"
  },
  
  {
    text: "get to meet us",
    subtitle: "Meet Our Founders, Lecturers, Excos And Students",
    imgBg: 'src/assets/images/IMG_0848.jpg',
    ctaBtn: "Explore Gallery"
  },

  {
    text: "services made easy",
    subtitle: "Pay Your Fees, Access Materials and Past Questions",
    imgBg: 'src/assets/images/IMG_0846.jpg',
    ctaBtn: "Explore Services"
  },
])
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