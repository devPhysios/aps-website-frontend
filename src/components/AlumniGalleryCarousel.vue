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
              <img class="h-full w-full object-cover sm:object-scale-down" :src= data.imgBg>
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

      </Carousel>
    </section>
  
  
    </template>
    
  <script setup>
    import { ref } from 'vue'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    import i1 from "@/assets/images/alumni/DSC_0457.jpg";
    import i2 from "@/assets/images/alumni/DSC_0480.jpg";
    import i3 from "@/assets/images/alumni/DSC_0485.jpg";
    import i4 from "@/assets/images/alumni/DSC_0492.jpg";
    import i5 from "@/assets/images/alumni/DSC_0497.jpg";
    import i6 from "@/assets/images/alumni/DSC_0504.jpg";
    import i7 from "@/assets/images/alumni/DSC_0514.jpg";
    import i8 from "@/assets/images/alumni/DSC_0516.jpg";
    import i9 from "@/assets/images/alumni/DSC_0523.jpg";
    import i10 from "@/assets/images/alumni/DSC_0530.jpg";
    import i11 from "@/assets/images/alumni/DSC_0581.jpg";
    import i12 from "@/assets/images/alumni/DSC_0634.jpg";
    import i13 from "@/assets/images/alumni/DSC_0655.jpg";
    import i14 from "@/assets/images/alumni/DSC_0675.jpg";
    import i15 from "@/assets/images/alumni/DSC_0763.jpg";
    import i16 from "@/assets/images/alumni/DSC_0765.jpg";
    import i17 from "@/assets/images/alumni/DSC_0909.jpg";
    import i18 from "@/assets/images/alumni/IMG_0004.jpg";
    import i19 from "@/assets/images/alumni/IMG_0044.jpg";
    import i20 from "@/assets/images/alumni/IMG_0050.jpg";
    import i21 from "@/assets/images/alumni/IMG_0082.jpg";
    import i22 from "@/assets/images/alumni/IMG_0100.jpg";
    import i23 from "@/assets/images/alumni/IMG_0130.jpg";
    import i24 from "@/assets/images/alumni/IMG_0211.jpg";
    import i25 from "@/assets/images/alumni/IMG_0230.jpg";
    import i26 from "@/assets/images/alumni/IMG_0305.jpg";
    import i27 from "@/assets/images/alumni/IMG_0471.jpg";
    import i28 from "@/assets/images/alumni/IMG_0494.jpg";
    import i29 from "@/assets/images/alumni/IMG_0502.jpg";

    const carouselData = ref([
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i1,
      },

      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i2,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i3,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i4,
      },
    
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i5,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i6,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i7,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i8,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i9,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i10,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i11,
      },

      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i12,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i13,
      },
    
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i14,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i15,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i16,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i17,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i18,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i19,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i20,
      },

      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i21,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i22,
      },
    
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i23,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i24,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i25,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i26,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i27,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i28,
      },
  
      {
        name: `Dinner Pictures`,
        title: "2023",
        imgBg: i29,
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