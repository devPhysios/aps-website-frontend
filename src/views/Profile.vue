<template>
  <section
    class="flex w-full min-h-full bg-gray-50 pt-20 font-display md:min-h-full"
  >
    <DashBoardSideMenu/>
    <div
      class="w-[80%] mx-2 h-full rounded pt-4 pl-4 bg-gray-50 pb-3 md:pb-8 md:ml-4 md:pt-6"
    >
      <h2 class="text-aps-green font-bold text-lg pb-4">Profile Information</h2>
      <div class="shadow py-4 px-4 max-w-[500px] mx-auto md:mx-4">
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <h3 class="mb-2 font-bold text-lg text-gray-500">
              Personal Information
            </h3>
            <button
              class="text-md font-semibold"
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
                class="font-semibold border-0 w-full focus:outline-0"
                :class="editMode ? 'text-gray-500 border-black border-2 border-solid rounded-lg' : 'text-gray-400'"
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
              <select
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4"
                v-model="gender"
                :disabled="!editMode"
                :class="editMode? 'border-black border-2 border-solid rounded-lg' : 'border-gray-100'"
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
              <select
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4"
                v-model="month"
                :disabled="!editMode"
                :class="editMode? 'border-black border-2 border-solid rounded-lg' : 'border-gray-100'"
              >
                <option value="">Select Month</option>
                <option
                  v-for="(month, index) in months"
                  :key="index"
                  :value="index + 1"
                >
                  {{ month }}
                </option>
              </select>
            </div>
          </div>
          <!-- Fourth Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400"
              >Date of Birth</label
            >
            <div class="flex gap-2 items-center border border-gray-100">
              <select
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4"
                v-model="day"
                :disabled="!editMode || !month"
                :class="editMode? 'border-black border-2 border-solid rounded-lg' : 'border-gray-100'"
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
              <input
                type="text"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4"
                placeholder="Enter Hall of Residence"
                v-model="hallOfResidence"
                :readonly="!editMode"
                :class="editMode? 'border-black border-2 border-solid rounded-lg' : 'border-gray-100'"
              />
            </div>
          </div>
          <!-- Sixth Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400">Room No.</label>
            <div class="flex gap-2 items-center border border-gray-100">
              <input
                type="text"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4"
                placeholder="Enter Room No."
                v-model="roomNo"
                :readonly="!editMode"
                :class="editMode? 'border-black border-2 border-solid rounded-lg' : 'border-gray-100'"
              />
            </div>
          </div>
          <!-- Seventh Parameter -->
          <div class="mb-px mt-4">
            <label class="font-bold text-[13px] text-gray-400">Hobbies</label>
            <div class="flex gap-2 items-center border border-gray-100">
              <input
                type="text"
                class="font-semibold border-0 w-full focus:outline-0 text-gray-500 py-2 px-4"
                placeholder="Enter Hobbies"
                v-model="hobbies"
                :readonly="!editMode"
                :class="editMode? 'border-black border-2 border-solid rounded-lg' : 'border-gray-100'"
              />
            </div>
          </div>
          <button
            class="bg-blue-500 w-full mt-6 py-2 text-white text-lg font-medium transition"
            @click.prevent="handleSubmit"
            v-if="editMode"
          >
            Save Update
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
const emailAddress = ref(store.user.email || null);
const hallOfResidence = ref(store.user.hallOfResidence || null);
const roomNo = ref(store.user.roomNo || null);
const gender = ref(store.user.gender || "gender");
const month = ref(store.user.monthOfBirth || null);
const day = ref(store.user.dayOfBirth || null);
const hobbies = ref(store.user.hobbies || null);
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

  const daysInMonth = new Date(2023, month, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Always include February 29th as an option
  if (month === 2) {
    dates.push(29);
  }
  return dates;
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const handleSubmit = async () => {
  const data = JSON.stringify({
    dayOfBirth: day.value,
    monthOfBirth: month.value,
    gender: gender.value,
    roomNo: roomNo.value.toUpperCase(),
    hallOfResidence: hallOfResidence.value.toUpperCase(),
    email: emailAddress.value.toLowerCase(),
    hobbies: hobbies.value,
  });

  const { jsonData } = await saveData( data);

  store.save(jsonData.student);
  editMode.value = false;
};


</script>
