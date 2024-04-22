<template>
  <Carousel :wrap-around="true" :autoplay="2000" :pause-autoplay-on-hover="true">
    <Slide v-for="(data, index) in carouselData" :key="index">

      <div class="flex flex-col justify-center items-center w-full min-h-[80vh] text-aps-white text-xl gap-2 font-display"
        :style="{ background: `#555 url(${data.imgBg}) no-repeat center/cover`, backgroundBlendMode: 'multiply' }">
        <h3 class="text-lg mb-3">{{ data.text.toUpperCase() }}</h3>
        <p class="mb-4">{{ data.subtitle }}</p>
        <router-link :to='data.link'>
          <button class="bg-aps-green text-aps-white px-2 py-1 rounded-md hover:bg-aps-orange">
            {{ data.ctaBtn }}
          </button>
        </router-link>
      </div>

    </Slide>

    <!-- <template #addons>
      <Pagination />
    </template> -->
  </Carousel>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { RouterLink } from 'vue-router';

const carouselData = ref([
  {
    text: `Association of physiotherapy students university of Ibadan`,
    subtitle: "Welcome To Our Official Website",
    imgBg: '@/assets/images/IMG_0849.jpg',
    ctaBtn: "About Us",
    link: "/about"
  },

  {
    text: "get to meet us",
    subtitle: "Meet Our Founders, Lecturers, Excos And Students",
    imgBg: '@/assets/images/IMG_0848.jpg',
    ctaBtn: "Explore Gallery",
    link: "/gallery"
  },

  {
    text: "services made easy",
    subtitle: "Pay Your Fees, Access Materials and Past Questions",
    imgBg: '@/assets/images/IMG_0846.jpg',
    ctaBtn: "Explore Services",
    link: "/"
  },
])
</script>

<style scoped>
.carousel__slide {
  padding-bottom: 50px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>