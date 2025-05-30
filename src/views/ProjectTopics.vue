<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-['Poppins',sans-serif]"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header with animation -->
      <div
        class="text-center mb-10 animate__animated animate__fadeIn animate__slow"
      >
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
        >
          Project Topics
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse the collection of past research projects
        </p>
        <div
          class="mt-4 w-24 h-1 bg-aps-green mx-auto rounded-full animate__animated animate__fadeIn animate__delay-1s"
        ></div>
      </div>

      <!-- Dashboard navigation link -->
      <div class="flex justify-center md:justify-start mb-8">
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </RouterLink>
      </div>

      <!-- Filters -->
      <ProjectTopicsFilter
        v-model="filters"
        :available-years="availableYears"
        v-model:is-expanded="isFilterExpanded"
        @reset-filters="resetFilters"
      />

      <!-- Stats -->
      <ProjectTopicsStats
        :displayed-count="displayedTopics.length"
        :total-items="totalItems"
        :filtered-topics-count="filteredTopics.length"
        :is-generating-P-D-F="isGeneratingPDF" 
        v-model:items-per-page="itemsPerPage"
        @generate-pdf="openPdfExportOptions"
      />

      <!-- PDF Export Options Modal -->
      <PdfExportOptionsModal
        :show="showPdfExportOptions"
        v-model="pdfOptions"
        @close="showPdfExportOptions = false"
        @generate-pdf="generatePDFWithOptions"
      />

      <!-- PDF Generation Success Modal -->
      <PdfGeneratedModal
        :show="showPdfModal"
        :filtered-topics-count="filteredTopics.length"
        :pdf-page-count="pdfPageCount"
        :pdf-options="pdfOptions"
        :active-filters="filters"
        @close="showPdfModal = false"
        @download-pdf="handleDownloadPdf"
        @preview-pdf="handlePreviewPdf"
      />

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex justify-center items-center py-20 animate__animated animate__fadeIn"
      >
        <div class="flex flex-col items-center">
          <div
            class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-aps-green mb-4"
          ></div>
          <p class="text-gray-600 font-medium">Loading project topics...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 text-center my-10 animate__animated animate__fadeIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto text-red-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-red-600 font-medium text-lg mb-2">
          Oops! Something went wrong
        </p>
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button
          @click="fetchProjectTopics"
          class="mt-2 px-5 py-2 bg-aps-orange text-white rounded-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-aps-orange focus:ring-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 inline-block mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>
      </div>

      <!-- Results -->
      <div v-else>
        <!-- No Results -->
        <div
          v-if="displayedTopics.length === 0"
          class="text-center py-16 bg-white rounded-lg shadow-sm animate__animated animate__fadeIn"
        >
          <div class="max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-20 w-20 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-gray-500 text-lg mb-2 font-medium">
              No project topics found
            </p>
            <p class="text-gray-400 mb-6">
              Try adjusting your search criteria to find what you're looking for
            </p>
            <button
              @click="resetFilters"
              class="px-6 py-2.5 bg-aps-green text-white rounded-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 inline-block mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Clear All Filters
            </button>
          </div>
        </div>

        <div v-else class="animate__animated animate__fadeIn">
          <!-- Top Pagination -->
          <ProjectTopicsPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @previous-page="previousPage"
            @next-page="nextPage"
            @go-to-page="goToPage"
            class="mb-6"
          />

          <!-- Results Table -->
          <ProjectTopicsTable :topics="displayedTopics" />

          <!-- Bottom Pagination -->
          <ProjectTopicsPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @previous-page="previousPage"
            @next-page="nextPage"
            @go-to-page="goToPage"
          />
        </div>
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <FloatingActionButtons
      :show-scroll-top="showScrollTop"
      :is-filter-expanded="isFilterExpanded"
      :is-at-top="isAtTop"
      @scroll-to-top="scrollToTop"
      @toggle-filters="toggleFilters"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import apiClient from "@/config/axios";
import { generateProjectTopicsPDF } from "@/utils/pdfGenerator";
import { useToast } from "vue-toastification";

// Import new components
import ProjectTopicsFilter from "@/components/project-topics/ProjectTopicsFilter.vue";
import ProjectTopicsStats from "@/components/project-topics/ProjectTopicsStats.vue";
import ProjectTopicsTable from "@/components/project-topics/ProjectTopicsTable.vue";
import ProjectTopicsPagination from "@/components/project-topics/ProjectTopicsPagination.vue";
import PdfExportOptionsModal from "@/components/project-topics/PdfExportOptionsModal.vue";
import PdfGeneratedModal from "@/components/project-topics/PdfGeneratedModal.vue";
import FloatingActionButtons from "@/components/project-topics/FloatingActionButtons.vue";

// Import utility functions
import { formatSupervisor } from "@/utils/project-topics/formattingUtils";
import { extractUniqueYears } from "@/utils/project-topics/dataUtils";
import { usePdfUtils } from "@/utils/project-topics/pdfUtils";

// Initialize toast
const toast = useToast();

// State
const projectTopics = ref([]);
const filteredTopics = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(20);
const availableYears = ref([]);
const showScrollTop = ref(false);
const isFilterExpanded = ref(false);
const isAtTop = ref(true);
const showPdfModal = ref(false);
const showPdfExportOptions = ref(false);
const isGeneratingPDF = ref(false);
const generatedPdf = ref(null);
const filters = ref({
  year: "",
  supervisor: "",
  author: "",
  search: "",
});
const pdfOptions = ref({
  columns: {
    topic: true,
    year: true,
    supervisor: true,
    author: true,
  },
  includeHeader: true,
  includeFooter: true,
  includePageNumbers: true,
});

// PDF Utility functions from usePdfUtils
const {
  downloadPDF: utilDownloadPDF,
  previewPDF: utilPreviewPDF,
  pdfPageCount,
} = usePdfUtils(generatedPdf, filters);

// Get displayed topics for current page
const displayedTopics = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = Math.min(
    startIndex + itemsPerPage.value,
    filteredTopics.value.length
  );
  return filteredTopics.value.slice(startIndex, endIndex);
});

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Handle scroll event for back-to-top button
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
  isAtTop.value = window.scrollY < 100;
};

// Toggle filter expansion
const toggleFilters = () => {
  isFilterExpanded.value = !isFilterExpanded.value;
  // If expanding, scroll to filter section
  if (isFilterExpanded.value) {
    const filterSection = document.querySelector(
      ".border-l-4.border-aps-orange"
    );
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

// Fetch all project topics from API
const fetchProjectTopics = async () => {
  loading.value = true;
  error.value = null;

  try {
    const params = {};
    // Only add params that have values
    if (filters.value.year) params.year = filters.value.year;

    const { data } = await apiClient.get("/project-topics", { params });

    projectTopics.value = data.projectTopics || [];
    totalItems.value = data.count || 0;

    // Extract unique years if we don't have year filter applied
    if (!filters.value.year && projectTopics.value.length > 0) {
      availableYears.value = extractUniqueYears(projectTopics.value);
    }

    applyClientSideFilters();
  } catch (err) {
    console.error("Error fetching project topics:", err);
    error.value = "Failed to fetch project topics. Please try again.";
    projectTopics.value = [];
    filteredTopics.value = [];
    totalItems.value = 0;
  } finally {
    loading.value = false;
  }
};

// Apply client-side filtering
const applyClientSideFilters = () => {
  filteredTopics.value = projectTopics.value.filter((topic) => {
    // Only apply filters that are set
    let matchesSupervisor = true;
    let matchesAuthor = true;
    let matchesSearch = true;

    // Supervisor filter (case insensitive)
    if (filters.value.supervisor) {
      const supervisorName = topic.supervisor?.name || "";
      const regex = new RegExp(filters.value.supervisor, "i");
      matchesSupervisor = regex.test(supervisorName);
    }

    // Author filter (case insensitive)
    if (filters.value.author) {
      const authorName = topic.author?.name || "";
      const regex = new RegExp(filters.value.author, "i");
      matchesAuthor = regex.test(authorName);
    }

    // Search filter (case insensitive)
    if (filters.value.search) {
      const topicText = topic.topic || "";
      const searchRegex = new RegExp(filters.value.search, "i");
      matchesSearch = searchRegex.test(topicText);
    }

    return matchesSupervisor && matchesAuthor && matchesSearch;
  });

  // Update pagination
  totalPages.value = Math.max(
    1,
    Math.ceil(filteredTopics.value.length / itemsPerPage.value)
  );

  // Reset to page 1 when filters change
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
};

// Pagination functions
const goToPage = (page) => {
  currentPage.value = page;
  // Scroll to top of results table only
  scrollToResults();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    // Scroll to top of results table only
    scrollToResults();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    // Scroll to top of results table only
    scrollToResults();
  }
};

// Scroll to results table function
const scrollToResults = () => {
  // Try multiple selectors in case some elements aren't loaded yet
  const targets = [
    ".min-w-full.divide-y.divide-gray-200", // Table when results exist
    ".bg-white.shadow-md.rounded-lg.overflow-hidden", // Results container
    ".text-center.py-16.bg-white.rounded-lg.shadow-sm", // "No results" message
    ".flex.justify-between.items-center.bg-white.p-4.rounded-lg", // Pagination area
  ];

  // Try each selector until we find a valid target
  let targetElement = null;
  for (const selector of targets) {
    targetElement = document.querySelector(selector);
    if (targetElement) break;
  }

  // If we found a target element, scroll to it
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  } else {
    // If no specific target is found, at least scroll past the header
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  }
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    year: "",
    supervisor: "",
    author: "",
    search: "",
  };
  currentPage.value = 1;
  fetchProjectTopics();
};

// Watch for filter changes to update results in real-time
watch(
  () => [filters.value.supervisor, filters.value.author, filters.value.search],
  () => {
    applyClientSideFilters();
    currentPage.value = 1;
  },
  { deep: true }
);

// Watch for year filter changes to re-fetch from API
watch(
  () => filters.value.year,
  () => {
    fetchProjectTopics();
  }
);

// Watch for items per page changes
watch(
  () => itemsPerPage.value,
  () => {
    totalPages.value = Math.max(
      1,
      Math.ceil(filteredTopics.value.length / itemsPerPage.value)
    );
    if (currentPage.value > totalPages.value) {
      currentPage.value = 1;
    }
  }
);

// Setup event listeners
onMounted(() => {
  fetchProjectTopics();
  window.addEventListener("scroll", handleScroll);
  scrollToTop();
});

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// PDF functions
const openPdfExportOptions = () => {
  showPdfExportOptions.value = true;
};

// Function to actually generate the PDF after options are selected
const generatePDFWithOptions = async () => {
  if (filteredTopics.value.length === 0) {
    toast.info("No topics to export based on current filters.");
    return;
  }
  isGeneratingPDF.value = true;
  showPdfExportOptions.value = false;

  try {
    const doc = generateProjectTopicsPDF(
      filteredTopics.value,
      filters.value,
      formatSupervisor,
      pdfOptions.value
    );

    generatedPdf.value = doc;
    showPdfModal.value = true;
    toast.success("PDF generated successfully!");
  } catch (err) {
    console.error("Error generating PDF:", err);
    error.value = "Failed to generate PDF. Please try again later.";
    toast.error("Failed to generate PDF. Please try again.");
  } finally {
    isGeneratingPDF.value = false;
  }
};

const handleDownloadPdf = () => {
  if (utilDownloadPDF()) {
    showPdfModal.value = false;
  }
};

const handlePreviewPdf = () => {
  utilPreviewPDF();
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

.animate__animated {
  --animate-duration: 0.5s;
}
</style>
