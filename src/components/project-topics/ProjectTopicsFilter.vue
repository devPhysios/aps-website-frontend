<template>
  <div
    class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8 border-l-4 border-aps-orange transform transition-all duration-300 hover:shadow-lg"
  >
    <div
      @click="toggleFilterExpansion"
      class="flex justify-between items-center cursor-pointer"
    >
      <h2 class="text-xl font-semibold text-gray-800 pb-2">
        Filter Options
      </h2>
      <button
        class="text-gray-500 hover:text-aps-green transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transform transition-transform duration-200"
          :class="{ 'rotate-180': !isExpanded }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

    <div
      v-show="isExpanded"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 transition-all duration-300"
    >
      <!-- Year Filter -->
      <div class="transition-all duration-200 transform hover:scale-[1.02]">
        <label
          for="year"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Year
        </label>
        <div class="relative">
          <select
            id="year"
            :value="modelValue.year"
            @input="updateFilter('year', $event.target.value)"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-aps-green focus:ring-aps-green transition-all duration-200 pl-4 pr-10 py-2 appearance-none bg-white"
          >
            <option value="">All Years</option>
            <option
              v-for="year in availableYears"
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Supervisor Filter -->
      <div class="transition-all duration-200 transform hover:scale-[1.02]">
        <label
          for="supervisor"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Supervisor
        </label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <input
            id="supervisor"
            :value="modelValue.supervisor"
            @input="updateFilter('supervisor', $event.target.value)"
            type="text"
            placeholder="Type supervisor name"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-aps-green focus:ring-aps-green transition-all duration-200 pl-10 pr-4 py-2"
          />
        </div>
      </div>

      <!-- Author Filter -->
      <div class="transition-all duration-200 transform hover:scale-[1.02]">
        <label
          for="author"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Author
        </label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </span>
          <input
            id="author"
            :value="modelValue.author"
            @input="updateFilter('author', $event.target.value)"
            type="text"
            placeholder="Type author name"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-aps-green focus:ring-aps-green transition-all duration-200 pl-10 pr-4 py-2"
          />
        </div>
      </div>

      <!-- Search -->
      <div
        class="md:col-span-2 lg:col-span-3 transition-all duration-200 transform hover:scale-[1.01]"
      >
        <label
          for="search"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Search Topics
        </label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            id="search"
            :value="modelValue.search"
            @input="updateFilter('search', $event.target.value)"
            type="text"
            placeholder="Search by keywords in project topics"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-aps-green focus:ring-aps-green transition-all duration-200 pl-10 pr-4 py-2"
          />
        </div>
      </div>
    </div>

    <div v-show="isExpanded" class="mt-5 flex justify-end">
      <button
        @click="$emit('reset-filters')"
        class="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200 flex items-center transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2"
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
        Reset Filters
      </button>
    </div>

    <div
      v-if="hasActiveFilters"
      class="mt-3 flex flex-wrap gap-2 pt-2 border-t border-gray-100"
    >
      <span class="text-sm text-gray-600 mr-1">Active filters:</span>
      <span
        v-if="modelValue.year"
        class="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center"
      >
        Year: {{ modelValue.year }}
        <button
          @click="updateFilter('year', '')"
          class="ml-1 text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </span>
      <span
        v-if="modelValue.supervisor"
        class="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center"
      >
        Supervisor: {{ modelValue.supervisor }}
        <button
          @click="updateFilter('supervisor', '')"
          class="ml-1 text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </span>
      <span
        v-if="modelValue.author"
        class="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center"
      >
        Author: {{ modelValue.author }}
        <button
          @click="updateFilter('author', '')"
          class="ml-1 text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </span>
      <span
        v-if="modelValue.search"
        class="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center"
      >
        Search: {{ modelValue.search }}
        <button
          @click="updateFilter('search', '')"
          class="ml-1 text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  availableYears: {
    type: Array,
    default: () => [],
  },
  isExpanded: Boolean,
});

const emit = defineEmits(['update:modelValue', 'update:isExpanded', 'reset-filters']);

const updateFilter = (key, value) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};

const toggleFilterExpansion = () => {
  emit('update:isExpanded', !props.isExpanded);
  if (!props.isExpanded) {
    // Scroll to filter section when expanding
    const filterSection = document.querySelector('.border-l-4.border-aps-orange');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

const hasActiveFilters = computed(() => {
  return Boolean(
    props.modelValue.year ||
    props.modelValue.supervisor ||
    props.modelValue.author ||
    props.modelValue.search
  );
});
</script> 