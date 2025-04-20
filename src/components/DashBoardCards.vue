<template>
  <div
    class="grid gap-3 sm:divide-aps-green overflow-hidden rounded-lg md:bg-gray-200 md:shadow md:grid md:grid-cols-2 md:gap-px md:divide-y-0"
  >
    <div
      class="shadow rounded rounded-tl-lg rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="inline-flex rounded-lg p-3 bg-blue-50 text-blue-700 ring-white"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </span>
      </div>
      <div class="mt-8">
        <h3
          class="text-[14px] font-semibold leading-6 text-gray-900 md:text-lg"
        >
          <RouterLink
            to="/profile"
            class="focus:outline-none text-[12px] md:text-lg"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            Account Information
          </RouterLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 md:text-md">
          View Your Full Profile Information.
        </p>
      </div>
      <span
        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          ></path>
        </svg>
      </span>
    </div>
    <div
      class="shadow rounded sm:rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="inline-flex rounded-lg p-3 bg-teal-50 text-teal-700 ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="bi bi-patch-question-fill w-6 h-6"
            viewBox="0 0 18 18"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627"
            />
          </svg>
        </span>
      </div>
      <div class="mt-8">
        <h3
          class="text-[14px] font-semibold leading-6 text-gray-900 md:text-lg"
        >
          <RouterLink
            to="/dashboard/questions"
            class="focus:outline-none text-[12px] md:text-lg"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            Question Bank
          </RouterLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 md:text-md">
          Check out the question bank.
        </p>
      </div>
      <span
        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          ></path>
        </svg>
      </span>
    </div>
    <div
      class="shadow rounded sm:rounded-tl-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="inline-flex rounded-lg p-3 bg-orange-50 text-aps-orange ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="bi bi-book w-6 h-6"
            viewBox="0 0 18 18"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"
            />
          </svg>
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-[14px] font-semibold leading-6 text-gray-900 text-lg">
          <RouterLink
            to="/constitution"
            class="focus:outline-none text-[12px] md:text-lg"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            Constitution
          </RouterLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 md:text-md">
          Get acquainted with the APS Constitution.
        </p>
      </div>
      <span
        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          ></path>
        </svg>
      </span>
    </div>
    <div
      class="shadow rounded sm:rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="inline-flex rounded-lg p-3 bg-yellow-50 text-yellow-700 ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="bi bi-journal w-6 h-6"
            viewBox="0 0 18 18"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"
            />
          </svg>
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          <RouterLink
            to="/dashboard/yellowbook"
            class="focus:outline-none text-[12px] md:text-lg"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            Yellow Book
          </RouterLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 md:text-md">
          Get Course Requirements and Information about every course.
        </p>
      </div>
      <span
        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          ></path>
        </svg>
      </span>
    </div>
    <div
      class="shadow rounded sm:rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="inline-flex rounded-lg p-3 bg-yellow-50 text-yellow-700 ring-white"
        >
          <i class="bi bi-calculator"></i>
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          <RouterLink
            to="/dashboard/cgpacalculator"
            class="focus:outline-none text-[12px] md:text-lg"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            CGPA Calculator
          </RouterLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 md:text-md">
          Calculate your Cummulative Grade Points Total.
        </p>
      </div>
      <span
        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          ></path>
        </svg>
      </span>
    </div>
    <div
      class="shadow rounded sm:rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="inline-flex rounded-lg p-3 bg-purple-50 text-purple-700 ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="bi bi-journal-text w-6 h-6"
            viewBox="0 0 18 18"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"
            />
          </svg>
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          <RouterLink
            to="/project-topics"
            class="focus:outline-none text-[12px] md:text-lg"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            Project Topics
          </RouterLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 md:text-md">
          Browse through the collection of project topics.
        </p>
      </div>
      <span
        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          ></path>
        </svg>
      </span>
    </div>
    <div
      v-if="userStore.user.level === '500'"
      class="shadow rounded sm:rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="inline-flex rounded-lg p-3 bg-green-50 text-green-700 ring-white"
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </span>
      </div>
      <div class="mt-8">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          <RouterLink
            to="/dashboard/my-project-topic"
            class="focus:outline-none text-[12px] md:text-lg"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            My Project Topic
          </RouterLink>
        </h3>
        <p class="mt-2 text-sm text-gray-500 md:text-md">
          Manage your research project topic as a final year student.
        </p>
      </div>
      <span
        class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
</script>

<style scoped>
h3 {
  font-size: 12px;
}

p {
  font-size: 10px;
}
</style>
