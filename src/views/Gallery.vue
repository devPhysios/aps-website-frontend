<template>
  <section class="text-white bg-green-100 font-display">
    <div class="flex flex-col text-center w-full p-8">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">Memories We Created</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-black">Get a peek into our community with snapshots of dinners, outreach, sports, and more. See the heart of who we are.</p>
    </div>
  </section>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 bg-green-100"
    >
      <div
        v-for="(image, index) in displayedImages"
        :key="index"
        :class="`col-span-${randomSize()} h-auto`"
      >
        <div class="relative">
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-auto object-cover rounded-lg"
          />
          <div
            class="transition-all duration-75 w-full h-full absolute z-20 top-0 left-0 opacity-0 hover:opacity-50"
          >
            <div class="bg-aps-orange h-full w-full">
              <div class="pt-[35%]">
                <h3 class="md:text-lg text-[14px] font-semibold text-center">
                  aaaaa
                </h3>
                <p class="text-[12px] md:text-sm text-center mb-1">aaaaaa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-4 p-4 bg-green-100">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-aps-green text-aps-white px-6 py-4 rounded-md hover:bg-aps-orange"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-aps-green text-aps-white px-6 py-4 rounded-md hover:bg-aps-orange"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const webimages = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://aps-website-backend.onrender.com/api/v1/gallery"
    );
    webimages.value = response.data.images;
    console.log(webimages.value);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});

const images = [
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 1" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 2" },
  { src: "src/assets/images/DSC_0554.jpg", alt: "Image 3" },
  // Add more images as needed
];

const currentPage = ref(1);
const pageSize = 15;

const totalPages = computed(() => Math.ceil(images.length / pageSize));

const displayedImages = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return images.slice(startIndex, endIndex);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
const randomSize = () => {
  const sizes = ["1", "2", "3", "4"];
  return sizes[Math.floor(Math.random() * sizes.length)];
};
</script>

<style scoped>
.masonry-item {
  display: inline-block;
  margin-bottom: 1em;
  width: 100%;
}
</style>
