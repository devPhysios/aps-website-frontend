<template>
  <section
    class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-blue-100 rounded-md"
  >
    <div class="my-1" :onclick="directToGallery">
      <p class="text-2xl md:text-4xl font-bold pl-4 pt-2">Gallery</p>
      <div class="flex items-center pl-4">
        <div class="w-[30%] bg-aps-green h-[4px] md:w-1/4"></div>
        <div class="rounded-full h-4 w-4 bg-aps-orange"></div>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center mt-4">
      <!-- Loader SVG icon -->
      <svg class="animate-spin h-8 w-8 text-green-500" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.86 0-7.255-1.54-9.798-4.045l1.414-1.414z"
        ></path>
      </svg>
    </div>

    <Carousel
      v-bind="settings"
      :wrap-around="true"
      :autoplay="8000"
      :pause-autoplay-on-hover="true"
      :breakpoints="breakpoints"
    >
      <Slide v-for="(data, index) in carouselData" :key="index">
        <div
          class="w-full h-[300px] rounded-lg text-gray-950 text-xl relative mx-3"
        >
          <div class="h-full w-full">
            <img class="h-full w-full object-cover" :src="data.imgBg" />
          </div>
          <div
            class="transition-all duration-75 w-full h-full absolute z-20 top-0 left-0 opacity-0 hover:opacity-50"
          >
            <div class="bg-aps-orange h-full w-full">
              <div class="pt-[120px]">
                <h3 class="md:text-lg text-[14px] font-extrabold">
                  {{ data.name }}
                </h3>
                <p class="text-[12px] md:text-sm mb-1 font-bold">
                  {{ data.title }}
                </p>
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
import { ref, onMounted, computed } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import axios from "axios"; // Import axios for HTTP requests
import "vue3-carousel/dist/carousel.css";
import router from "@/router";

const selectedImages = ref([]);

const loading = ref(true); // Initialize loading state

onMounted(async () => {
  try {
    // Check if selectedImages is already populated
    if (selectedImages.value.length === 0) {
      const response = await axios.get(
        "https://aps-website-backend.onrender.com/api/v1/gallery"
      );
      const images = response.data.images;
      // Select 7 random images from the fetched data
      selectedImages.value = selectRandomImages(images, 10);
    }
    loading.value = false; // Set loading to false once data is fetched
  } catch (error) {
    console.error("Error fetching images:", error);
    loading.value = false; // Set loading to false in case of error
  }
});

// Define a function to select random images from an array
function selectRandomImages(images, count) {
  const shuffledImages = images.sort(() => Math.random() - 0.5);
  return shuffledImages.slice(0, count);
}

// Define carouselData as a computed property to ensure it's updated when selectedImages changes
const carouselData = computed(() => {
  // Check if selectedImages has been loaded
  if (!loading.value && selectedImages.value.length > 0) {
    return selectedImages.value.map((image) => ({
      name: "APS Gallery",
      title: image.title,
      imgBg: image.imageUrl,
    }));
  } else {
    return []; // Return empty array if selectedImages is not loaded
  }
});

function directToGallery() {
  router.push("/gallery");
}

// Define settings and breakpoints
const settings = ref({
  itemsToShow: 1.5,
  itemsToScroll: 1,
  snapAlign: "center",
});
const breakpoints = ref({
  768: {
    itemsToShow: 2.5,
    snapAlign: "center",
  },
});
</script>

<style scoped>
/* Your scoped styles */
</style>
