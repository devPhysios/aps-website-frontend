<template> 
  <section class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-blue-100 rounded-md">
    <div class="my-1">
      <p class="text-4xl font-bold pl-4 pt-2">Our Leaders</p>
      <div class="flex items-center pl-4">
        <div class="md:w-1/4 w-3/4 bg-aps-green h-[4px]"></div>
        <div class="rounded-full h-4 w-4 bg-aps-orange"></div>
      </div>      
    </div>

    <Carousel
      v-bind="settings"
      :wrap-around="true"
      :autoplay="8000"
      :pause-autoplay-on-hover="true"
      :breakpoints="breakpoints"
    >
      <Slide
        v-for="(data, index) in carouselData"
        :key="index"
      >
        <div
          class="w-full rounded-lg text-gray-950 text-xl bg-aps-orange "
        >
          <div class="h-[300px] w-full">
            <img class="h-full w-full object-cover" :src= data.imgBg>
          </div>
          <div class="m-1 p-1 md:m-3">
            <h3 class="md:text-lg text-[14px] font-semibold">{{ data.name}}</h3>
            <p class="text-[12px] md:text-sm mb-1">{{ data.title }}</p>
          </div>
        </div>
      </Slide>
  
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </section>


  </template>
  
<script setup>
  import { ref } from 'vue'
  import { Carousel, Slide, Pagination } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  
  const carouselData = ref([
    {
      name: `Elijah Inioluwa`,
      title: "President",
      imgBg: 'src/assets/images/excos/exco1.jpg',
    },
    
    {
      name: `Oyekan Oluwatobi`,
      title: "Vice President",
      imgBg: 'src/assets/images/excos/exco2.png',
    },
  
    {
      name: `Olajide Ayomide`,
      title: "General Secretary",
      imgBg: 'src/assets/images/excos/exco3.jpg',
    },

    {
      name: `Adeniran Happiness`,
      title: "Assistant General Secretary",
      imgBg: 'src/assets/images/excos/exco4.jpg',
    },

    {
      name: `Mustapha Ogo-Oluwa`,
      title: "Public Relations Officer",
      imgBg: 'src/assets/images/excos/exco5.jpg',
    },

    {
      name: `Awopegba Jonadab`,
      title: "Social Secretary",
      imgBg: 'src/assets/images/excos/exco6.jpg',
    },
  
    {
      name: `Akinwola Oluwasegun`,
      title: "Sports Secretary",
      imgBg: 'src/assets/images/excos/exco7.jpg',
    },

    {
      name: `Moshood Babatunde`,
      title: "Financial Secretary",
      imgBg: 'src/assets/images/excos/exco8.jpg',
    },

    {
      name: `Olanrewaju Timileyin`,
      title: "Treasurer",
      imgBg: 'src/assets/images/excos/exco9.jpg',
    },

    {
      name: `Adebayo Samuel`,
      title: "Special Duties Officer",
      imgBg: 'src/assets/images/excos/exco10.jpg',
    },

    {
      name: `Solomon Oluwatodimu`,
      title: "Senate President",
      imgBg: 'src/assets/images/excos/exco11.jpg',
    },

    {
      name: `Goodluck Omotayo`,
      title: "Deputy Senate President",
      imgBg: 'src/assets/images/excos/exco12.jpg',
    },

    {
      name: `Egun Jane`,
      title: "Senate Clerk",
      imgBg: 'src/assets/images/excos/exco13.jpg',
    },
  ])

  const settings = ref({
  itemsToShow: 1.5,
  itemsToScroll: 1,
  snapAlign: 'center',
   });
  const breakpoints = ref({
    768: {
      itemsToShow: 2.5,
      snapAlign: 'center',
    },
  });
  defineProps(['settings', 'breakpoints']);
</script>
  
  <style scoped>
  .carousel__slide {
    padding: 20px;
  }
  
  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
  }
  </style>