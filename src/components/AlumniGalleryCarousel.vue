<template> 
    <section class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-blue-100 rounded-md">
      <div class="my-1">
        <p class="text-2xl md:text-4xl font-bold pl-4 pt-2">Alumni Gallery</p>
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
            class="w-full h-[300px] rounded-lg text-gray-950 text-xl relative"
          >
            <div class="h-full w-full">
              <img class="h-full w-full object-cover" :src= data.imgBg>
            </div>
            <div class=" transition-all duration-75 w-full h-full absolute z-20 top-0 left-0 opacity-0 hover:opacity-50">
              <div class="bg-aps-orange h-full w-full">
                <div class="pt-[120px]">
                  <h3 class="md:text-lg text-[14px] font-semibold">{{ data.name}}</h3>
                  <p class="text-[12px] md:text-sm mb-1">{{ data.title }}</p>                  
                </div>

              </div>
              
            </div>
          </div>
        </Slide>
    
        <template #addons>
            <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </section>
  
  
    </template>
    
  <script setup>
    import { ref } from 'vue'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    
    const carouselData = ref([
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0450.jpg',
      },
      
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0457.jpg',
      },
    
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0554.jpg',
      },
  
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0560.jpg',
      },
  
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0682.jpg',
      },
  
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0685.jpg',
      },
    
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0687.jpg',
      },
  
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0720.jpg',
      },
  
      {
        name: `Dinner Pictures`,
        title: "Every Level",
        imgBg: 'src/assets/images/DSC_0777.jpg',
      },
  
      {
        name: `APS Fit`,
        title: "Every Level",
        imgBg: 'src/assets/images/IMG_0846.jpg',
      },
  
      {
        name: `APS Fit`,
        title: "Every Level",
        imgBg: 'src/assets/images/IMG_0848.jpg',
      },
  
      {
        name: `APS Fit`,
        title: "Every Level",
        imgBg: 'src/assets/images/IMG_0849.jpg',
      },
  
      {
        name: `APS Fit`,
        title: "Every Level",
        imgBg: 'src/assets/images/IMG_0850.jpg',
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