<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">
      {{ activeTab === "executives" ? "Executive Council" : "Senate House" }}
    </h1>

    <div class="mb-8 sticky top-0 z-20 bg-white pb-4">
      <div class="flex justify-center space-x-4 mb-4">
        <button
          @click="activeTab = 'executives'"
          :class="[
            'px-4 py-2 rounded-lg',
            activeTab === 'executives'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700',
          ]"
        >
          Executives
        </button>
        <button
          @click="activeTab = 'senate'"
          :class="[
            'px-4 py-2 rounded-lg',
            activeTab === 'senate'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700',
          ]"
        >
          Senate
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'executives'" class="executives-section">
      <div class="flex flex-wrap justify-center gap-6">
        <vue-flip
          v-for="executive in executives"
          :key="executive.matricNumber"
          width="256px"
          height="384px"
          active-click
        >
          <template v-slot:front>
            <div class="bg-white rounded-lg shadow-lg p-4 h-full">
              <div class="w-full h-48 overflow-hidden">
                <img
                  :src="
                    executive.profilePicture ||
                    getPlaceholderImage(executive.fullName)
                  "
                  :alt="executive.fullName"
                  class="w-full object-cover object-top"
                />
              </div>
              <h3 class="text-lg font-semibold text-center mt-4">
                {{ executive.fullName }}
              </h3>
              <p class="text-sm text-gray-600 text-center">
                {{ executive.office }}
              </p>
            </div>
          </template>
          <template v-slot:back>
            <div
              class="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto"
            >
              <h3 class="text-lg font-semibold text-center mb-2">
                {{ executive.fullName }}
              </h3>
              <p class="text-sm mb-1">
                <strong>Level:</strong> {{ executive.level }}
              </p>
              <p class="text-sm mb-1">
                <strong>Hobbies:</strong> {{ executive.hobbies || "N/A" }}
              </p>
              <p class="text-sm mb-1">
                <strong>Skills:</strong>
                {{ executive.skills.join(", ") || "N/A" }}
              </p>
              <p class="text-sm">
                <strong>Phone:</strong> {{ executive.phoneNumber || "N/A" }}
              </p>
            </div>
          </template>
        </vue-flip>
      </div>
    </div>

    <div v-else-if="activeTab === 'senate'" class="senate-section">
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-center mb-6">Principal Officers</h2>
        <div class="flex flex-wrap justify-center gap-6">
          <vue-flip
            v-for="senator in principalOfficers"
            :key="senator.matricNumber"
            width="256px"
            height="384px"
            active-click
          >
            <template v-slot:front>
              <div class="bg-white rounded-lg shadow-lg p-4 h-full">
                <div class="w-full h-48 overflow-hidden">
                  <img
                    :src="
                      senator.profilePicture ||
                      getPlaceholderImage(senator.fullName)
                    "
                    :alt="senator.fullName"
                    class="w-full object-cover object-top"
                  />
                </div>
                <h3 class="text-lg font-semibold text-center mt-4">
                  {{ senator.fullName }}
                </h3>
                <p class="text-sm text-gray-600 text-center">
                  {{ senator.office }}
                </p>
              </div>
            </template>
            <template v-slot:back>
              <div
                class="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto"
              >
                <h3 class="text-lg font-semibold text-center mb-2">
                  {{ senator.fullName }}
                </h3>
                <p class="text-sm mb-1">
                  <strong>Level:</strong> {{ senator.level }}
                </p>
                <p class="text-sm mb-1">
                  <strong>Hobbies:</strong> {{ senator.hobbies || "N/A" }}
                </p>
                <p class="text-sm mb-1">
                  <strong>Skills:</strong>
                  {{ senator.skills.join(", ") || "N/A" }}
                </p>
                <p class="text-sm">
                  <strong>Phone:</strong> {{ senator.phoneNumber || "N/A" }}
                </p>
              </div>
            </template>
          </vue-flip>
        </div>
      </div>

      <div
        v-for="level in [500, 400, 300, 200, 100]"
        :key="level"
        class="mb-12"
      >
        <h2 class="text-2xl font-bold text-center mb-6">
          {{ level }}L Constituency
        </h2>
        <div class="flex flex-wrap justify-center gap-6">
          <vue-flip
            v-for="senator in senatorsByLevel(level)"
            :key="senator.matricNumber"
            width="256px"
            height="384px"
            active-click
          >
            <template v-slot:front>
              <div class="bg-white rounded-lg shadow-lg p-4 h-full">
                <div class="w-full h-48 overflow-hidden">
                  <img
                    :src="
                      senator.profilePicture ||
                      getPlaceholderImage(senator.fullName)
                    "
                    :alt="senator.fullName"
                    class="w-full object-cover object-top"
                  />
                </div>
                <h3 class="text-lg font-semibold text-center mt-4">
                  {{ senator.fullName }}
                </h3>
                <p class="text-sm text-gray-600 text-center">Senator</p>
              </div>
            </template>
            <template v-slot:back>
              <div
                class="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto"
              >
                <h3 class="text-lg font-semibold text-center mb-2">
                  {{ senator.fullName }}
                </h3>
                <p class="text-sm mb-1">
                  <strong>Level:</strong> {{ senator.level }}
                </p>
                <p class="text-sm mb-1">
                  <strong>Hobbies:</strong> {{ senator.hobbies || "N/A" }}
                </p>
                <p class="text-sm mb-1">
                  <strong>Skills:</strong>
                  {{ senator.skills.join(", ") || "N/A" }}
                </p>
                <p class="text-sm">
                  <strong>Phone:</strong> {{ senator.phoneNumber || "N/A" }}
                </p>
              </div>
            </template>
          </vue-flip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";
import { VueFlip } from "vue-flip";
import router from "@/router";
import { useToast } from "vue-toastification";

const toast = useToast();
const activeTab = ref("executives");
const executives = ref([]);
const senators = ref([]);

const principalOffices = [
  "Senate President",
  "Deputy Senate President",
  "Senate Clerk",
  "Senate Chief Whip",
];

const principalOfficers = computed(() =>
  principalOffices
    .map((office) =>
      senators.value.find((senator) => senator.office === office)
    )
    .filter(Boolean)
);

const regularSenators = computed(() =>
  senators.value.filter((senator) => !principalOffices.includes(senator.office))
);

const senatorsByLevel = computed(
  () => (level) =>
    regularSenators.value.filter((senator) => parseInt(senator.level) === level)
);

const getPlaceholderImage = (fullName) => {
  const names = fullName.split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
};

const fetchData = async () => {
  try {
    const response = await axios.post(
      "https://api.apsui.com/api/v1/leaders/officerss",
      { academicSession: "2023/2024" }
    );
    executives.value = response.data.executives.sort((a, b) => {
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
    });
    senators.value = response.data.senators;
  } catch (error) {
    toast.error("Internal Server Error");
    toast.error("We'll direct you back to the homepage");
    console.error("Error fetching data:", error);
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }
};

onBeforeMount(fetchData);
</script>

<style scoped>
.vue-flip {
  cursor: pointer;
}
</style>
