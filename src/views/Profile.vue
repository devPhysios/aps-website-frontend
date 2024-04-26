<template>
    <section class="flex w-full min-h-full bg-gray-50 pt-20 font-display md:min-h-full">
      <DashBoardSideMenu v-if="isLargeScreen" />
      <div class="w-[80%] mx-2 h-full rounded pt-4 pl-4 bg-gray-50 pb-3 md:pb-8 md:ml-4 md:pt-6">
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
              <label class="font-bold text-[13px] text-gray-400"> Email </label>
              <div class="flex gap-2 items-center border border-gray-100">
                <span class="text-gray-400 border border-gray-100 px-2">
                  <i class="bi bi-envelope text-2xl"></i>
                </span>
                <input
                  type="email"
                  class="font-semibold border-0 w-full focus:outline-0"
                  :class="editMode ? 'text-gray-500' : 'text-gray-400'"
                  placeholder="No email address"
                  :readonly="!editMode"
                  v-model="emailAddress"
                />
              </div>
            </div>
            <!-- Second Parameter -->
            <!-- Third Parameter -->
            <!-- Fourth Parameter -->
            <!-- Fifth Parameter -->
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
  import { saveData } from "@/utils/useSaveData";
  import { ref, watch, onMounted, computed } from "vue";
  import DashBoardSideMenu from "@/components/DashBoardSideMenu.vue";
  import AdministrativeRoles from "@/components/AdministrativeRoles.vue";
  import ProfileInformation from "@/components/ProfileInformation.vue";
  
  const store = useUserStore();
  
  const editMode = ref(false);
  const emailAddress = ref(store.user.email || null);
  const hallOfResidence = ref(store.user.hallOfResidence || null);
  const roomNumber = ref(store.user.roomNo || null);
  const selectedOption = ref(store.user.gender || "gender");
  const month = ref(store.user.monthOfBirth || null);
  const day = ref(store.user.dayOfBirth || null);
  
  onMounted(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  const isValidNumber = (value) => {
    return /^\d+$/.test(value);
  };
  
  const isValidDay = (monthValue, dayValue) => {
    const month = parseInt(monthValue);
    const day = parseInt(dayValue);
    if (month === 2) {
      return day >= 1 && day <= 29;
    } else if ([4, 6, 9, 11].includes(month)) {
      return day >= 1 && day <= 30;
    } else {
      return day >= 1 && day <= 31;
    }
  };
  
  watch(month.value, (newMonth) => {
    if (!isValidDay(newMonth, day.value)) {
      day.value = "";
    }
  });
  watch(day.value, (newDay) => {
    if (!isValidNumber(newDay) || !isValidDay(month.value, newDay)) {
      day.value = "";
    }
  });
  
  const handleSubmit = async () => {
    const data = JSON.stringify({
      dayOfBirth: day.value,
      monthOfBirth: month.value,
      gender: selectedOption.value,
      roomNo: roomNumber.value.toUpperCase(),
      hallOfResidence: hallOfResidence.value.toUpperCase(),
      email: emailAddress.value.toLowerCase(),
    });
  
    const { jsonData } = await saveData(store.user.id, data);
  
    store.save(jsonData.student);
    editMode.value = false;
  };
  
  // Calculate whether the screen is large enough to display the side menu
  const isLargeScreen = computed(() => {
    return window.innerWidth >= 768; // You can adjust this breakpoint as needed
  });
  </script>
  