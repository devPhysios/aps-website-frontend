<template>
  <!-- Navigation Button to Uploading Birthday Events -->
  <div class="mt-4 flex justify-center md:justify-end mx-4 md:mx-6">
    <RouterLink to="/dashboard/birthdayupload">
      <button class="bg-yellow-500 text-white p-2 rounded w-full md:w-auto">
        Create Birthday Events
      </button>
    </RouterLink>
  </div>
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 font-poppins"
  >
    <div class="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
        Birthday Events Manager
      </h1>
      <div v-if="loading" class="flex justify-center items-center py-10">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="birthday in birthdays"
          :key="birthday._id"
          class="relative p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-cover bg-center overflow-hidden"
        >
          <div
            class="absolute inset-0 z-0"
            :class="{
              'bg-red-200 bg-opacity-70': statusText(birthday) === 'Past',
              'bg-green-200 bg-opacity-70': statusText(birthday) === 'Today',
              'bg-yellow-200 bg-opacity-70':
                statusText(birthday) === 'Upcoming',
            }"
          ></div>
          <div
            class="absolute inset-0 bg-opacity-20 flex justify-center items-center overflow-hidden"
          >
            <span
              class="text-6xl md:text-7xl lg:text-8xl font-bold uppercase rotate-[-30deg] opacity-30 select-none"
              :class="{
                'text-red-300': statusText(birthday) === 'Past',
                'text-green-300': statusText(birthday) === 'Today',
                'text-yellow-300': statusText(birthday) === 'Upcoming',
              }"
            >
              {{ statusText(birthday) }}
            </span>
          </div>
          <div
            class="relative w-full aspect-square sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 z-20"
          >
            <img
              :src="birthday.imageUrl"
              alt="Birthday celebrant"
              class="rounded-full object-cover w-full h-full shadow-md"
              loading="lazy"
            />
          </div>
          <div class="flex-1 z-20 text-center sm:text-left space-y-1">
            <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold">
              {{ birthday.fullName }}
            </h2>
            <p class="text-sm sm:text-base text-gray-600">
              {{ birthday.classSet }} - {{ birthday.level }} Level
            </p>
            <p class="text-sm sm:text-base text-gray-600">
              Birthday: {{ monthName(birthday.birthdayMonth) }}
              {{ birthday.birthdayDay }}
            </p>
            <div class="mt-2 text-sm md:text-base text-gray-800">
              <span
                v-html="shortenedWish(birthday.birthdayWish, birthday._id)"
              ></span>
              <button
                v-if="
                  birthday.birthdayWish.length > 100 && !expanded[birthday._id]
                "
                @click="toggleExpand(birthday._id)"
                class="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
              >
                Read more
              </button>
              <button
                v-if="expanded[birthday._id]"
                @click="toggleExpand(birthday._id)"
                class="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
              >
                Collapse
              </button>
            </div>
            <div
              v-if="isUpcoming(birthday)"
              class="mt-2 flex justify-center sm:justify-start space-x-2"
            >
              <div
                v-for="(value, label) in countdown[birthday._id]"
                :key="label"
                class="text-center"
              >
                <div class="text-lg md:text-xl lg:text-2xl font-semibold">
                  {{ value }}
                </div>
                <div class="text-sm md:text-base text-gray-600">
                  {{ label }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex space-x-2 z-20 mt-2 sm:mt-0">
            <button
              @click="updateBirthday()"
              class="text-blue-500 hover:text-blue-700 flex items-center transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span class="ml-1">Update</span>
            </button>
            <button
              @click="confirmDelete(birthday.matricNumber)"
              class="text-red-500 hover:text-red-700 flex items-center transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span class="ml-1">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="confirmationModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <p>
          Are you sure you want to delete this birthday event? This action is
          irreversible.
        </p>
        <div class="mt-4 flex justify-end">
          <button
            @click="cancelDelete()"
            class="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            @click="deleteBirthday(matricNumberToDelete)"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/UserStore";
import { deleteFromFirebase } from "../utils/useFirebase";

const confirmationModal = ref(false);
const users = useUserStore();
const toast = useToast();
const birthdays = ref([]);
const loading = ref(true);
const router = useRouter();
const expanded = ref({});
const countdown = ref({});
const matricNumberToDelete = ref(null);

const confirmDelete = (matricNumber) => {
  confirmationModal.value = true;
  matricNumberToDelete.value = matricNumber;
};

const cancelDelete = () => {
  confirmationModal.value = false;
  matricNumberToDelete.value = null;
};

const fetchBirthdays = async () => {
  const token = localStorage.getItem("studentToken");
  try {
    const response = await axios.get(
      "https://api.apsui.com/api/v1/birthdays/allevents",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    birthdays.value = response.data.birthdays;
    initializeCountdown();
  } catch (error) {
    console.error("Error fetching birthdays:", error);
    toast.error("Error fetching birthdays");
  } finally {
    loading.value = false;
  }
};

const deleteFromServer = async (matricNumber) => {
  try {
    const token = localStorage.getItem("studentToken");
    await axios.delete(`https://api.apsui.com/api/v1/birthdays/delete`, {
      data: {
        matricNumber: matricNumber,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    birthdays.value = birthdays.value.filter(
      (birthday) => birthday.matricNumber !== matricNumber
    );
    toast.success("Birthday Event deleted successfully");
  } catch (error) {
    console.error("Error deleting birthday:", error);
    toast.error("Error deleting birthday");
  }
};

const deleteBirthday = async (matricNumber) => {
  loading.value = true;
  confirmationModal.value = false;
  const isDeletedFromFirebase = await deleteFromFirebase(matricNumber);
  if (isDeletedFromFirebase) {
    deleteFromServer(matricNumber);
    loading.value = false;
  } else {
    loading.value = false;
  }
  matricNumberToDelete.value = null;
  return;
};

const updateBirthday = () => {
  router.push(`/dashboard/birthdayupload`);
};

// const statusClass = (birthday) => {
//   const today = dayjs();
//   const birthdayDate = dayjs(
//     `${today.year()}-${birthday.birthdayMonth}-${birthday.birthdayDay}`
//   );
//   if (birthdayDate.isBefore(today, "day")) {
//     return "bg-red-100 text-red-800";
//   }
//   if (birthdayDate.isSame(today, "day")) {
//     return "bg-green-100 text-green-800";
//   }
//   return "bg-yellow-100 text-yellow-800";
// };

const statusText = (birthday) => {
  const today = dayjs();
  const birthdayDate = dayjs(
    `${today.year()}-${birthday.birthdayMonth}-${birthday.birthdayDay}`
  );
  if (birthdayDate.isBefore(today, "day")) {
    return "Past";
  }
  if (birthdayDate.isSame(today, "day")) {
    return "Today";
  }
  return "Upcoming";
};

const monthName = (month) => {
  return dayjs()
    .month(month - 1)
    .format("MMMM");
};

const shortenedWish = (wish, id) => {
  if (expanded.value[id]) {
    return wish;
  }
  if (wish.length > 100) {
    return wish.substring(0, 100) + "...";
  }
  return wish;
};

const toggleExpand = (id) => {
  expanded.value[id] = !expanded.value[id];
};

const initializeCountdown = () => {
  setInterval(() => {
    birthdays.value.forEach((birthday) => {
      if (isUpcoming(birthday)) {
        const countdownValues = calculateCountdown(birthday);
        countdown.value[birthday._id] = countdownValues;
      }
    });
  }, 1000);
};

const isUpcoming = (birthday) => {
  const today = dayjs();
  const birthdayDate = dayjs(
    `${today.year()}-${birthday.birthdayMonth}-${birthday.birthdayDay}`
  );
  return birthdayDate.isAfter(today, "day");
};

const calculateCountdown = (birthday) => {
  const today = dayjs();
  const birthdayDate = dayjs(
    `${today.year()}-${birthday.birthdayMonth}-${birthday.birthdayDay}`
  );
  const diffSeconds = birthdayDate.diff(today, "second");
  const days = Math.floor(diffSeconds / (60 * 60 * 24));
  const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diffSeconds % (60 * 60)) / 60);
  const seconds = diffSeconds % 60;
  return {
    days: `${days} ${days === 1 ? "day" : "days"}`,
    hours: `${hours} ${hours === 1 ? "hour" : "hours"}`,
    minutes: `${minutes} ${minutes === 1 ? "minute" : "minutes"}`,
    seconds: `${seconds} ${seconds === 1 ? "second" : "seconds"}`,
  };
};

onMounted(() => {
  const allowedMatricNumbers = ["213569", "220978"];
  if (allowedMatricNumbers.includes(users.user.matricNumber)) {
    fetchBirthdays();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    router.push("/not-allowed");
  }
});
</script>

<style scoped></style>
