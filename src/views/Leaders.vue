<template>
  <div class="min-h-screen bg-aps-white dark:from-gray-900 dark:to-gray-800">
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center min-h-screen"
    >
      <div
        class="w-16 h-16 border-4 border-aps-green border-t-transparent rounded-full animate-spin"
      ></div>
      <h2 class="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">
        Loading APS Leaders...
      </h2>
    </div>

    <!-- Error State -->
    <div
      v-else-if="hasError"
      class="flex flex-col items-center justify-center min-h-screen px-4"
    >
      <div
        class="max-w-md w-full bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-red-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mt-4">
          {{ errorMessage }}
        </h3>
        <div class="mt-6 space-y-3">
          <button @click="retryFetch" class="btn-primary">Try Again</button>
          <button @click="goHome" class="btn-secondary">
            Return to Homepage
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-aps-green to-aps-orange"
        >
          {{
            activeTab === "executives" ? "Executive Council" : "Senate House"
          }}
        </h1>
      </header>

      <!-- Navigation Tabs -->
      <nav
        class="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-4 shadow-sm rounded-lg mb-8"
      >
        <div class="flex justify-center space-x-4">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="btn-tab"
            :class="{ 'btn-tab-active': activeTab === tab.id }"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </nav>

      <!-- Executives Section -->
      <section v-if="activeTab === 'executives'" class="fade-in">
        <div v-if="!executives.length" class="empty-state">
          <h3>No Executives Found</h3>
          <p>No executive data is available for the current session.</p>
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 auto-rows-fr"
        >
          <LeaderCard
            v-for="(executive, index) in executives"
            :key="executive.matricNumber"
            :person="executive"
            :index="index"
            type="executive"
          />
        </div>
      </section>

      <!-- Senate Section -->
      <section v-else class="fade-in">
        <!-- Quick Navigation -->
        <div class="mb-8 overflow-x-auto scrollbar-hide">
          <div class="flex justify-center space-x-2 pb-2 min-w-max mx-auto">
            <button
              v-for="nav in senateNavigation"
              :key="nav.id"
              @click="scrollToSection(nav.id)"
              class="btn-nav"
              :class="nav.class"
            >
              {{ nav.label }}
            </button>
          </div>
        </div>

        <!-- Principal Officers -->
        <section id="principal-officers" class="mb-16 scroll-mt-20">
          <SectionHeader
            title="Principal Officers"
            gradient="from-aps-orange to-aps-green"
          />
          <div v-if="!principalOfficers.length" class="empty-state">
            <p>No principal officers found for this session.</p>
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 auto-rows-fr"
          >
            <LeaderCard
              v-for="(officer, index) in principalOfficers"
              :key="officer.matricNumber"
              :person="officer"
              :index="index"
              type="principal"
            />
          </div>
        </section>

        <!-- Level-based Constituencies -->
        <section
          v-for="level in [500, 400, 300, 200, 100]"
          :key="`level-${level}`"
          :id="`level-${level}`"
          class="mb-16 scroll-mt-20"
        >
          <SectionHeader
            :title="`${level}L Constituency`"
            gradient="from-aps-green to-aps-orange"
          />
          <div v-if="!senatorsByLevel(level).length" class="empty-state">
            <p>No senators found for {{ level }}L constituency.</p>
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 auto-rows-fr"
          >
            <LeaderCard
              v-for="(senator, index) in senatorsByLevel(level)"
              :key="senator.matricNumber"
              :person="senator"
              :index="index"
              type="senator"
            />
          </div>
        </section>
      </section>

      <!-- Back to Top Button -->
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 btn-primary rounded-full p-3 shadow-lg transform hover:scale-110 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { VueFlip } from "vue-flip";
import apiClient from "../config/axios";
import LeaderCard from "../components/LeaderCard.vue";
import SectionHeader from "../components/SectionHeader.vue";
import { ShieldCheckIcon, BuildingOfficeIcon } from "@heroicons/vue/24/outline";

// Router and Toast
const router = useRouter();
const toast = useToast();

// UI State
const activeTab = ref("executives");
const isLoading = ref(true);
const hasError = ref(false);
const errorMessage = ref("");
const showBackToTop = ref(false);

// Data
const executives = ref([]);
const senators = ref([]);
const retryCount = ref(0);

// Constants
const tabs = [
  { id: "executives", label: "Executives", icon: ShieldCheckIcon },
  { id: "senate", label: "Senate", icon: BuildingOfficeIcon },
];

const senateNavigation = [
  {
    id: "principal-officers",
    label: "Principal Officers",
    class:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `level-${(5 - i) * 100}`,
    label: `${(5 - i) * 100}L`,
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  })),
];

// Computed Properties
const principalOfficers = computed(() => {
  const offices = [
    "Senate President",
    "Deputy Senate President",
    "Senate Clerk",
    "Senate Chief Whip",
  ];
  return offices
    .map((office) =>
      senators.value.find((senator) => senator.office === office)
    )
    .filter(Boolean);
});

const regularSenators = computed(() =>
  senators.value.filter(
    (senator) =>
      ![
        "Senate President",
        "Deputy Senate President",
        "Senate Clerk",
        "Senate Chief Whip",
      ].includes(senator.office)
  )
);

const senatorsByLevel = computed(
  () => (level) =>
    regularSenators.value.filter((senator) => {
      const senatorLevel = senator.level;
      if (!senatorLevel || senatorLevel === "Alumnus") return false;
      return parseInt(senatorLevel) === level;
    })
);

// Methods
const fetchData = async () => {
  isLoading.value = true;
  hasError.value = false;

  try {
    const response = await apiClient.post("/leaders/officers", {
      academicSession: "2023/2024",
    });

    const processOfficers = (officers) => {
      return officers.map((officer) => {
        return {
          ...officer,
          skills: Array.isArray(officer.skills)
            ? officer.skills
            : officer.skills
            ? [officer.skills]
            : [],
        };
      });
    };

    executives.value = processOfficers(response.data.executives || []).sort(
      (a, b) => {
        const order = [
          "President",
          "Vice President",
          "General Secretary",
          "Assistant General Secretary",
          "Public Relations Officer",
          "Financial Secretary",
          "Treasurer",
          "Social Secretary",
          "Sports Secretary",
          "Special Duties Officer",
        ];
        return order.indexOf(a.office) - order.indexOf(b.office);
      }
    );

    senators.value = processOfficers(response.data.senators || []);
    retryCount.value = 0;
  } catch (error) {
    hasError.value = true;
    errorMessage.value =
      error.response?.data?.message ||
      "Failed to load APS leaders. Please try again.";
    retryCount.value++;
  } finally {
    isLoading.value = false;
  }
};

const retryFetch = () => {
  if (retryCount.value >= 3) {
    toast.warning("Multiple retry attempts failed. Please try again later.");
    return;
  }
  toast.info("Retrying...");
  fetchData();
};

const goHome = () => router.push("/");
const scrollToSection = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const checkScrollPosition = () => (showBackToTop.value = window.scrollY > 300);

// Lifecycle Hooks
onMounted(() => {
  fetchData();
  window.addEventListener("scroll", checkScrollPosition);
  checkScrollPosition();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScrollPosition);
});
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.btn-tab {
  @apply px-5 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm md:text-base flex items-center gap-2;
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600;
}

.btn-tab-active {
  @apply bg-aps-green text-white shadow-md hover:shadow-lg hover:bg-aps-green/90;
}

.btn-nav {
  @apply px-3 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300;
}

.empty-state {
  @apply text-center py-12 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 max-w-md mx-auto;
}
</style>
