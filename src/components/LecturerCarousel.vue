<template> 
    <div class=" p-1 md:p-6 my-8 ml-8 md:m-8 font-display bg-blue-100 rounded-md">
      <div class="p-4">
        <p class="text-3xl font-extrabold text-center md:text-left">Our Lecturers</p>
      </div>
  
      <Carousel
        v-bind="settings"
        :autoplay="100000"
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
              <img class="h-full w-full object-cover rounded-md" :src= data.imgBg>
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
    </div>
  
  
    </template>
    
    <script setup>
    import { ref } from 'vue'
    import { Carousel, Slide, Pagination } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'

    import img1 from "@/assets/images/lecturers/lecturer1b.jpg"
    import img2 from "@/assets/images/lecturers/lecturer7b.jpg"
    import img3 from "@/assets/images/lecturers/lecturer8B.png"
    import img4 from "@/assets/images/lecturers/lecturer3b.jpg"
    import img5 from "@/assets/images/lecturers/lecturer9b.png"
    import img6 from "@/assets/images/lecturers/lecturer5b.jpg"
    import img7 from "@/assets/images/lecturers/lecturer6b.jpg"
    import img8 from "@/assets/images/lecturers/lecturer4b.jpg"
    import img9 from "@/assets/images/lecturers/lecturer2b.jpg"
    import img10 from "@/assets/images/lecturers/lecturer10b.png"
    import img11 from "@/assets/images/lecturers/lecturer11b.png"
    import img12 from "@/assets/images/lecturers/lecturer.jpg"
    import img13 from "@/assets/images/lecturers/lecturer.jpg"
        
    const carouselData = ref([
      {
        name: `Prof. Adesola C. Odole`,
        title: "Head of Department",
        imgBg: img1,
      },
      
      {
        name: `Prof. Aderonke O. Akinpelu`,
        title: "",
        imgBg: img2,
      },
      {
        name: `Prof. Babatunde O. Adegoke`,
        title: "",
        imgBg: img4,
      },
      {
        name: `Prof. O. Ayanniyi`,
        title: "",
        imgBg: img5,
      },
      {
        name: `Prof. A.F Adeniyi`,
        title: "",
        imgBg: img3,
      },
      {
        name: `Prof. Omoyemi O. Ogwumike`,
        title: "",
        imgBg: img9,
      },  
      {
        name: `Dr Ayodeji A. Fabunmi`,
        title: "",
        imgBg: img10,
      },

      {
        name: `Dr Nse A. Odunaiya`,
        title: "",
        imgBg: img12,
      },
      {
        name: `Dr Adeoluwa O. Jaiyesimi`,
        title: "",
        imgBg: img7,
      },
      {
        name: `Dr Olubukola A. Olaleye`,
        title: " ",
        imgBg: img11,
      },
      {
        name: `Dr Olumide O. Dada`,
        title: "",
        imgBg: img6,
      },
      {
        name: `Dr Margaret B. Fatudimu`,
        title: "",
        imgBg: img8,
      },
      {
        name: `Mr Olusegun V. Sotiloye`,
        title: "",
        imgBg: img13,
      },
    ])
  
    const settings = ref({
    itemsToShow: 1.5,
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
      padding: 10px;
    }
    
    .carousel__prev,
    .carousel__next {
      box-sizing: content-box;
      border: 5px solid white;
    }
    </style>