<template>
  <section
    class="flex w-full min-h-full bg-gray-50 pt-20 font-display md:min-h-full"
  >
    <DashBoardSideMenu />
    <div
      class="w-[80%] mx-2 h-full rounded pt-4 pl-4 bg-gray-50 pb-3 md:pb-8 md:ml-4 md:pt-6"
    >
      <h2
        class="font-display text-aps-green font-bold text-[14px] pb-4 md:text-l"
      >
        Profile Information
      </h2>
      <!-- Loading Icon -->
      <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50"
      >
        <svg
          class="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 4.421 2.906 8.166 6.998 9.494l1.002-4.203z"
          ></path>
        </svg>
      </div>

      <!-- Profile Information -->
      <div class="shadow py-4 px-4 max-w-[500px] mx-auto md:mx-4">
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <h3 class="mb-2 font-bold text-[14px] text-gray-500 md:text-md">
              Personal Information
            </h3>
            <button
              class="text-[14px] font-semibold text-md"
              :class="
                editMode
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-500 cursor-pointer'
              "
              @click="editMode = true"
              :disabled="editMode"
            >
              Edit
            </button>
          </div>
          <!-- Non-editable Parameters -->
          <ProfileInformation />
          <!-- First Parameter -->
          <div class="mb-px">
            <label class="font-bold text-[13px] text-gray-400">Email</label>
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-envelope text-2xl"></i>
              </span>
              <input
                type="email"
                class="font-semibold border-0 w-full focus:outline-0 text-[12px] py-2 px-4 md:text-[16px]"
                :class="
                  editMode
                    ? 'text-gray-500 border-black border-2 border-solid rounded-lg'
                    : 'text-gray-400'
                "
                placeholder="No email address"
                :readonly="!editMode"
                v-model="emailAddress"
              />
            </div>
          </div>
          <!-- Second Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400">Gender</label>
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-person text-2xl"></i>
              </span>
              <select
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                v-model="gender"
                :disabled="!editMode"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <!-- Third Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400"
              >Month of Birth</label
            >
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-calendar3 text-2xl"></i>
              </span>
              <select
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                v-model="month"
                :disabled="!editMode"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              >
                <option value="">Select Month</option>
                <option
                  v-for="(monthName, index) in months"
                  :key="index"
                  :value="monthName"
                >
                  {{ monthName }}
                </option>
              </select>
            </div>
          </div>
          <!-- Fourth Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400"
              >Day of Birth</label
            >
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-calendar3 text-2xl"></i>
              </span>
              <select
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                v-model="day"
                :disabled="!editMode || !month"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              >
                <option value="">Select Date</option>
                <option
                  v-for="date in getDatesForMonth(month)"
                  :key="date"
                  :value="date"
                >
                  {{ date }}
                </option>
              </select>
            </div>
          </div>
          <!-- Fifth Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400"
              >Hall of Residence</label
            >
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-house text-2xl"></i>
              </span>
              <input
                type="text"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                placeholder="Enter Hall of Residence"
                v-model="hallOfResidence"
                :readonly="!editMode"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              />
            </div>
          </div>
          <!-- Sixth Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400">Room No.</label>
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-0-circle text-2xl"></i>
              </span>
              <input
                type="text"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                placeholder="Enter Room No."
                v-model="roomNo"
                :readonly="!editMode"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              />
            </div>
          </div>
          <!-- Seventh Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400">Hobbies</label>
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-controller text-2xl"></i>
              </span>
              <input
                type="text"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                placeholder="Enter Hobbies"
                v-model="hobbies"
                :readonly="!editMode"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              />
            </div>
          </div>
          <!-- Eighth Parameter (Phone Number) -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400"
              >Phone Number</label
            >
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-phone text-2xl"></i>
              </span>
              <input
                type="tel"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                placeholder="Enter Phone Number"
                v-model="phoneNumber"
                :readonly="!editMode"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              />
            </div>
          </div>
          <!-- Ninth Parameter (Skills) -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400">Skills</label>
            <div class="flex gap-2 items-center border border-gray-100">
              <span class="text-gray-400 border border-gray-100 px-2">
                <i class="bi bi-tools text-2xl"></i>
              </span>
              <input
                type="text"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4 text-[12px] md:text-[16px]"
                placeholder="Enter Skills"
                v-model="skills"
                :readonly="!editMode"
                :class="
                  editMode
                    ? 'border-black border-2 border-solid rounded-lg'
                    : 'border-gray-100'
                "
              />
            </div>
          </div>
          <button
            class="bg-blue-500 w-full mt-6 py-2 text-white text-[12px] font-medium transition md:text-lg"
            @click.prevent="handleSubmit"
            v-if="editMode"
          >
            Save Update
          </button>
          <button
            class="bg-gray-400 text-white w-full mt-6 py-2 text-[12px] font-medium transition text-lg"
            @click="cancelEdit"
            v-if="editMode"
          >
            Cancel
          </button>
        </div>
        <hr />
        <div class="my-4">
          <AdministrativeRoles />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import { useToast } from "vue-toastification";
import { saveData } from "@/utils/useSaveData";
import { ref, onMounted } from "vue";
import DashBoardSideMenu from "@/components/DashBoardSideMenu.vue";
import AdministrativeRoles from "@/components/AdministrativeRoles.vue";
import ProfileInformation from "@/components/ProfileInformation.vue";

const store = useUserStore();

const toast = useToast();
const editMode = ref(false);
const isLoading = ref(false);
const emailAddress = ref(store.user.email || null);
const hallOfResidence = ref(store.user.hallOfResidence || null);
const roomNo = ref(store.user.roomNo || null);
const gender = ref(store.user.gender || "gender");
const month = ref(store.user.monthOfBirth || null);
const day = ref(store.user.dayOfBirth || null);
const hobbies = ref(store.user.hobbies || null);
const phoneNumber = ref(store.user.phoneNumber || null);
const skills = ref(store.user.skills || null);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDatesForMonth = (month) => {
  if (!month) return [];

  const monthIndex = months.indexOf(month) + 1;
  const daysInMonth = new Date(2023, monthIndex, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Always include February 29th as an option
  if (month === "February") {
    dates.push(29);
  }
  return dates;
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const cancelEdit = () => {
  // Reset form fields
  emailAddress.value = store.user.email || null;
  gender.value = store.user.gender || "gender";
  month.value = store.user.monthOfBirth || null;
  day.value = store.user.dayOfBirth || null;
  hallOfResidence.value = store.user.hallOfResidence || null;
  roomNo.value = store.user.roomNo || null;
  hobbies.value = store.user.hobbies || null;
  phoneNumber.value = store.user.phoneNumber || null;
  skills.value = store.user.skills || null;

  // Disable edit mode
  editMode.value = false;
};

const handleSubmit = async () => {
  isLoading.value = true;
  const data = JSON.stringify({
    dayOfBirth: day.value ?? null,
    monthOfBirth: month.value ?? null,
    gender: gender.value?.toLowerCase() ?? null,
    roomNo: roomNo.value ?? null,
    hallOfResidence: hallOfResidence.value?.toUpperCase() ?? null,
    email: emailAddress.value?.toLowerCase() ?? null,
    hobbies: hobbies.value ?? null,
    phoneNumber: phoneNumber.value ?? null,
    skills: skills.value ?? null,
  });

  const { jsonData } = await saveData(data);

  store.save(jsonData.student);
  isLoading.value = false;
  editMode.value = false;
};
</script>
