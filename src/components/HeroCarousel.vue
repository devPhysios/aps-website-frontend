<template>
  <div>
    <Carousel
      :wrap-around="true"
      :autoplay="10000"
      :pause-autoplay-on-hover="true"
    >
      <Slide v-for="(data, index) in carouselData" :key="index">
        <div
          class="flex flex-col justify-center items-center w-full min-h-[80vh] text-aps-white gap-2 font-display"
          :style="{
            background: `#555 url(${data.imgBg}) no-repeat center/cover`,
            backgroundBlendMode: 'multiply',
          }"
        >
          <h3 class="text-xl mb-3">{{ data.text.toUpperCase() }}</h3>
          <p class="mb-4">{{ data.subtitle }}</p>
          <router-link :to="data.link">
            <button
              class="bg-aps-green text-aps-white rounded-md hover:bg-aps-orange px-3 py-3"
            >
              {{ data.ctaBtn }}
            </button>
          </router-link>
        </div>
      </Slide>

      <!-- <template #addons>
      <Pagination />
    </template> -->
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { RouterLink } from "vue-router";

import img500 from "@/assets/images/500l.jpg";
import img400 from "@/assets/images/400l.jpg";
import img100 from "@/assets/images/100l.jpg";
import img200 from "@/assets/images/200l.jpg";
import img300 from "@/assets/images/300l.jpg";
import img1 from "@/assets/images/1.jpg";

const carouselData = ref([
  {
    text: `Association of Physiotherapy Students University of Ibadan`,
    subtitle: "Welcome To Our Official Website",
    imgBg: img1,
    ctaBtn: "About Us",
    link: "/about",
  },

  {
    text: "Gallery: Moments Captured",
    subtitle: "Explore Our Vibrant Community",
    imgBg: img100,
    ctaBtn: "Explore Gallery",
    link: "/gallery",
  },

  {
    text: "services made easy",
    subtitle: "Pay Your Fees, Access Materials and Past Questions",
    imgBg: img400,
    ctaBtn: "Student Portal",
    link: "/dashboard",
  },

  {
    text: "PhysioPress",
    subtitle: "Students Association's Press Website",
    imgBg: img300,
    ctaBtn: "PhysioPress",
    link: "/physiopress",
  },

  {
    text: "PhysioRay",
    subtitle:
      "Explore our association's journal repository from insightful student perspectives.",
    imgBg: img200,
    ctaBtn: "PhysioRay",
    link: "/physioray",
  },

  {
    text: "Alumni Spotlight Page",
    subtitle:
      "Capturing Moments, Sharing Messages and Empowering Futures: Alumni Giving Back",
    imgBg: img500,
    ctaBtn: "Alumni",
    link: "/alumni",
  },
]);
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
