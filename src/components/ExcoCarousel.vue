<template> 
  <section class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-blue-100 rounded-md">
    <div class="my-1">
      <p class="text-2xl md:text-4xl font-bold pl-4 pt-2">Our Leaders</p>
      <div class="flex items-center pl-4">
          <div class="w-[30%] bg-aps-green h-[4px] md:w-1/4"></div>
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
            <img class="h-full w-full object-cover rounded-lg" :src= data.imgBg>
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

  import president from '@/assets/images/excos/exco1b.jpg'
  import vpresident from '@/assets/images/excos/exco2b.jpg'
  import gensec from '@/assets/images/excos/exco3b.jpg'
  import ags from '@/assets/images/excos/exco4b.jpg'
  import pro from '@/assets/images/excos/exco5b.jpg'
  import socialsec from '@/assets/images/excos/exco6b.jpg'
  import sportssec from '@/assets/images/excos/exco7b.jpg'
  import finsec from '@/assets/images/excos/exco8b.jpg'
  import treasurer from '@/assets/images/excos/exco9b.jpg'
  import sdo from '@/assets/images/excos/exco10b.jpg'
  import senatepres from '@/assets/images/excos/exco11b.jpg'
  import depsp from '@/assets/images/excos/exco12b.jpg'
  import senateClerk from '@/assets/images/excos/exco13b.jpg'

  const carouselData = ref([
    {
      name: `Stephen Babalola`,
      title: "President",
      imgBg: president,
    },
    
    {
      name: `Baderin Adebobola`,
      title: "Vice President",
      imgBg: vpresident,
    },
  
    {
      name: `Godlives Patrick`,
      title: "General Secretary",
      imgBg: gensec,
    },

    {
      name: `Laurette Ibekwe`,
      title: "Assistant General Secretary",
      imgBg: ags,
    },

    {
      name: `Ogo-Oluwa Mustapha`,
      title: "Public Relations Officer",
      imgBg: pro,
    },

    {
      name: `Michael Aijefo`,
      title: "Social Secretary",
      imgBg: socialsec,
    },
  
    {
      name: `Abraham Ajibade`,
      title: "Sports Secretary",
      imgBg: sportssec,
    },

    {
      name: `Oluwagbemisola Oyegunju`,
      title: "Financial Secretary",
      imgBg: finsec,
    },

    {
      name: `Favour Oyewale`,
      title: "Treasurer",
      imgBg: treasurer,
    },

    {
      name: `Mercy Badejo`,
      title: "Special Duties Officer",
      imgBg: sdo,
    },

    {
      name: `Jane Egun`,
      title: "Senate President",
      imgBg: senatepres,
    },

    {
      name: `Toluwalase Adegboye`,
      title: "Deputy Senate President",
      imgBg: depsp,
    },

    {
      name: `Theophilus Akintoye`,
      title: "Senate Clerk",
      imgBg: senateClerk,
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