<template>
  <div class="flex w-full jusify-between h-[80vh]">

    <SideDashboard />
  
    <section class="w-full p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-blue-100 rounded-md">
      <div class="my-1">
        <p class="text-4xl font-bold pl-4 pt-2">APS CONSTITUTION</p>
        <div class="flex items-center pl-4">
          <div class="md:w-1/4 w-3/4 bg-aps-green h-[4px]"></div>
          <div class="rounded-full h-4 w-4 bg-aps-orange"></div>
        </div>
      </div>
  
      <!-- Dropdown list for section navigation -->
      <div class="text-center">
        <select class="text-center bg-aps-orange rounded-2xl w-full p-4 font-semibold hover:bg-aps-green my-2"
          v-model="selectedSection" @change="navigateToSection">
          <option v-for="(data, index) in carouselData" :key="index" :value="index" class="text-center bg-aps-orange rounded-2xl p-4 font-semibold hover:bg-aps-green my-2">{{ data.name }}</option>
        </select>
      </div>
  
      <!-- Carousel component -->
      <Carousel v-bind="settings" :wrap-around="true" :autoplay="0" :pause-autoplay-on-hover="true"
        :breakpoints="breakpoints" v-model="currentSlide">
        <!-- Slide content -->
        <Slide v-for="(item, index) in carouselData" :key="index">
          <div class="w-full rounded-lg text-gray-950 text-xl bg-white">
            <div class="p-4 text-center">
              <h3 class="text-3xl font-semibold">{{ item.name }}</h3>
              <div v-for="(subItem, subIndex) in item.subArray" :key="subIndex" class="text-justify overflow-y-auto">
                <p class="text-lg pt-4 font-semibold">{{ subItem.section }}</p>
                <div v-for="(nestedItem, nestedIndex) in subItem.listItems" :key="nestedIndex">
                  <p class="text-left py-1 text-base">{{ nestedItem.list }}</p>
                  <div v-for="(subnestedItem, subnestedIndex) in nestedItem.sublistItems" :key="subnestedIndex">
                    <ul class="text-left py-1 text-base">
                      <li>{{ subnestedItem }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
  
        <!-- Pagination -->
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import SideDashboard from '../components/DashBoardSideMenu.vue'

const currentSlide = ref(0);
const selectedSection = ref(0);

const settings = ref({
  itemsToShow: 1,
  itemsToScroll: 1,
  snapAlign: 'center',
});

// const breakpoints = ref({
//   768: {
//     itemsToShow: 1,
//     snapAlign: 'center',
//   },
// });

// Function to navigate to the selected section
const navigateToSection = () => {
  currentSlide.value = selectedSection.value;
};

// Function to handle slide change
const slideTo = (val) => {
  selectedSection.value = val;
  currentSlide.value = val;
};

// Watch for changes in currentSlide and update selectedSection accordingly
watch(currentSlide, (newValue) => {
  selectedSection.value = newValue;
});
</script>

<style scoped>
.carousel {
  height: 100%;
}

.carousel__slide {
  padding: 20px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>