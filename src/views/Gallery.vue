<template>
  <section class="text-white bg-green-100 font-display">
    <div class="flex flex-col text-center w-full p-8">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">
        Memories We Created
      </h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-black">
        Get a peek into our community with snapshots of dinners, outreach,
        sports, and more. See the heart of who we are.
      </p>
    </div>
  </section>
  <div class="flex justify-center bg-green-100">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by name, title, or tag"
      class="px-4 py-2 border rounded-l-md focus:outline-none w-[50%]"
      @input="handleInput"
      @keyup.enter="searchImages"
    />
    <button
      @click="searchImages"
      class="px-4 py-2 bg-aps-green text-white rounded-r-md hover:bg-aps-orange"
    >
      Search
    </button>
  </div>

  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-8 bg-green-100"
    >
      <div
        v-for="(image, index) in displayedImages"
        :key="index"
        class="flex justify-center"
      >
        <div class="max-w-md md:max-w-lg lg:max-w-xl relative">
          <div
            v-if="loadingImages[index]"
            class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
          >
            <svg
              class="animate-spin h-8 w-8 text-green-500"
              viewBox="0 0 24 24"
            >
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
          <img
            :src="image.imageUrl"
            :alt="image.title"
            class="w-full h-auto object-cover rounded-lg"
            @load="loadingImages[index] = false"
            @error="loadingImages[index] = false"
          />
          <div
            class="transition-all duration-75 w-full h-full absolute z-20 top-0 left-0 opacity-0 hover:opacity-50"
          >
            <div
              class="bg-aps-orange text-zinc-950 font-extrabold h-full w-full font-display"
            >
              <div class="h-full flex flex-col justify-center items-center">
                <h3 class="md:text-lg text-[14px] font-semibold text-center">
                  {{ image.title }}
                </h3>
                <p class="text-[12px] h-full md:text-sm text-center mb-1">
                  {{ image.description }}
                </p>
                <p class="text-[12px] md:text-sm text-center mb-1">
                  <span v-for="(feature, index) in image.features" :key="index">
                    {{ feature }},
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
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
    <div class="flex justify-center gap-4 p-4 bg-green-100">
      <div class="flex items-center">
        <button
          v-if="currentPage !== 1"
          @click="prevPage"
          class="text-aps-green hover:text-aps-orange transition-colors duration-300"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="mx-4 text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          v-if="currentPage !== totalPages"
          @click="nextPage"
          class="text-aps-green hover:text-aps-orange transition-colors duration-300"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div class="ml-4 flex items-center">
        <label for="pageInput" class="mr-2 text-gray-700">Go to page:</label>
        <input
          id="pageInput"
          v-model="jumpToPage"
          type="number"
          min="1"
          :max="totalPages"
          class="w-16 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-aps-green"
          @keyup.enter="goToPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import router from "@/router";

const webimages = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const jumpToPage = ref(1);
const shuffle = ref(true);
const loadingImages = ref([]);

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  try {
    const response = await axios.get("https://api.apsui.com/api/v1/gallery");
    webimages.value = response.data.images.map((image, index) => {
      loadingImages.value[index] = true; // Set loading state to true for each image
      return {
        ...image,
        imageUrl: transformToWebp(image.imageUrl),
      };
    });
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
    loading.value = false;
    router.push("/500");
  }
});

const transformToWebp = (url) => {
  return url.replace("/upload/", "/upload/f_webp/");
};

const goToPage = () => {
  const pageNumber = Math.max(1, Math.min(jumpToPage.value, totalPages.value));
  currentPage.value = pageNumber;
  jumpToPage.value = pageNumber;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const filterImages = (searchQuery, images) => {
  if (!searchQuery) {
    return images;
  }
  const query = searchQuery.toLowerCase();
  return images.filter((image) => {
    const title = image.title.toLowerCase();
    const description = image.description.toLowerCase();
    const tags = image.features.map((feature) => feature.toLowerCase());
    return (
      title.includes(query) ||
      description.includes(query) ||
      tags.some((tag) => tag.includes(query))
    );
  });
};

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const filteredImages = computed(() =>
  filterImages(searchQuery.value, webimages.value)
);

function handleInput() {
  currentPage.value = 1;
}

const displayedImages = computed(() => {
  if (shuffle.value === true) {
    const shuffledImages = shuffleArray(filteredImages.value);
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, shuffledImages.length);
    return shuffledImages.slice(startIndex, endIndex);
  } else {
    const shuffledImages = filteredImages.value;
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, shuffledImages.length);
    return shuffledImages.slice(startIndex, endIndex);
  }
});

const currentPage = ref(1);
const pageSize = 15;

const totalPages = computed(() =>
  Math.ceil(filteredImages.value.length / pageSize)
);

const nextPage = () => {
  shuffle.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  shuffle.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const searchImages = () => {
  currentPage.value = 1;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const shouldStackImages = computed(() => {
  return window.innerWidth < 768;
});
</script>

<style scoped>
.masonry-item {
  display: inline-block;
  margin-bottom: 1em;
  width: 100%;
}
.pagination-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
