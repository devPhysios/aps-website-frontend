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
          Browse the collection of research projects and find inspiration
        </p>
        <div
          class="mt-4 w-24 h-1 bg-aps-green mx-auto rounded-full animate__animated animate__fadeIn animate__delay-1s"
        ></div>
      </div>

      <!-- Filters with enhanced styling -->
      <div
        class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8 border-l-4 border-aps-orange transform transition-all duration-300 hover:shadow-lg"
      >
        <h2
          class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100"
        >
          Filter Options
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
                v-model="filters.year"
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
                v-model="filters.supervisor"
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
                v-model="filters.author"
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
                v-model="filters.search"
                type="text"
                placeholder="Search by keywords in project topics"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-aps-green focus:ring-aps-green transition-all duration-200 pl-10 pr-4 py-2"
              />
            </div>
          </div>
        </div>

        <div class="mt-5 flex justify-end">
          <button
            @click="resetFilters"
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
      </div>

      <!-- Stats -->
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div class="text-sm text-gray-600 mb-3 md:mb-0 flex items-center">
          <span class="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-aps-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </span>
          <span
            >Showing
            <span class="font-medium text-aps-green">{{
              displayedTopics.length
            }}</span>
            of
            <span class="font-medium text-aps-green">{{ totalItems }}</span>
            topics</span
          >
        </div>
        <div class="flex items-center">
          <span class="font-medium text-gray-700 mr-2">Items per page:</span>
          <div class="relative">
            <select
              v-model="itemsPerPage"
              class="appearance-none border-gray-300 rounded-md shadow-sm focus:border-aps-green focus:ring-aps-green transition-all duration-200 pl-3 pr-8 py-1"
            >
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            >
              <svg
                class="h-4 w-4 text-gray-400"
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
      </div>

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
          <div
            class="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6 hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center mb-4 md:mb-0">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 mr-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50"
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                class="flex items-center space-x-1 overflow-x-auto hide-scrollbar"
              >
                <template v-for="page in paginationRange" :key="page">
                  <button
                    v-if="page !== '...'"
                    @click="goToPage(page)"
                    :class="[
                      'w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50',
                      currentPage === page
                        ? 'bg-aps-green text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
                    ]"
                    :aria-label="`Go to page ${page}`"
                    :aria-current="currentPage === page ? 'page' : undefined"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="px-2 text-gray-500">...</span>
                </template>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 ml-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50"
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="text-sm text-gray-600 flex items-center">
              <span
                class="px-3 py-1 rounded-full bg-aps-green bg-opacity-10 text-aps-green font-medium"
              >
                Page {{ currentPage }} of {{ totalPages }}
              </span>
            </div>
          </div>

          <!-- Results Table -->
          <div
            class="bg-white shadow-md rounded-lg overflow-hidden mb-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Year
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
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
                        Topic
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
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
                        Author
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                        Supervisor
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(topic, index) in displayedTopics"
                    :key="topic._id"
                    class="hover:bg-gray-50 transition-colors duration-150"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td
                      class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-aps-green bg-opacity-10 text-aps-green"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {{ topic.year }}
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-sm text-gray-700">
                      <div
                        class="max-w-lg line-clamp-2 hover:line-clamp-none transition-all duration-200"
                      >
                        {{ topic.topic }}
                      </div>
                    </td>
                    <td
                      class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                    >
                      <div class="flex items-center">
                        <span
                          class="h-8 w-8 rounded-full bg-aps-orange bg-opacity-20 text-aps-orange flex items-center justify-center mr-2"
                        >
                          {{ topic.author.name.charAt(0) }}
                        </span>
                        {{ topic.author.name }}
                      </div>
                    </td>
                    <td
                      class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                    >
                      <div class="flex items-center">
                        <span
                          class="h-8 w-8 rounded-full bg-aps-green bg-opacity-20 text-aps-green flex items-center justify-center mr-2"
                        >
                          {{
                            topic.supervisor?.name
                              ? topic.supervisor.name.charAt(0)
                              : "?"
                          }}
                        </span>
                        {{ formatSupervisor(topic.supervisor) }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bottom Pagination -->
          <div
            class="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center mb-4 md:mb-0">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 mr-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50"
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                class="flex items-center space-x-1 overflow-x-auto hide-scrollbar"
              >
                <template v-for="page in paginationRange" :key="page">
                  <button
                    v-if="page !== '...'"
                    @click="goToPage(page)"
                    :class="[
                      'w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50',
                      currentPage === page
                        ? 'bg-aps-green text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
                    ]"
                    :aria-label="`Go to page ${page}`"
                    :aria-current="currentPage === page ? 'page' : undefined"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="px-2 text-gray-500">...</span>
                </template>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 ml-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50"
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="text-sm text-gray-600 flex items-center">
              <span
                class="px-3 py-1 rounded-full bg-aps-green bg-opacity-10 text-aps-green font-medium"
              >
                Page {{ currentPage }} of {{ totalPages }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to top button -->
    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 p-2 rounded-full bg-aps-green text-white shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-aps-green focus:ring-opacity-50 z-50"
      aria-label="Scroll to top"
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
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import apiClient from "@/config/axios";
import dayjs from "dayjs";

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
const filters = ref({
  year: "",
  supervisor: "",
  author: "",
  search: "",
});

// Helper for pagination display
const paginationRange = computed(() => {
  const range = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  range.push(1);

  if (currentPage.value > 3) {
    range.push("...");
  }

  const start = Math.max(2, currentPage.value - 1);
  const end = Math.min(totalPages.value - 1, currentPage.value + 1);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (currentPage.value < totalPages.value - 2) {
    range.push("...");
  }

  if (totalPages.value > 1) {
    range.push(totalPages.value);
  }

  return range;
});

// Get displayed topics for current page
const displayedTopics = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = Math.min(
    startIndex + itemsPerPage.value,
    filteredTopics.value.length
  );
  return filteredTopics.value.slice(startIndex, endIndex);
});

// Format supervisor name
const formatSupervisor = (supervisor) => {
  if (!supervisor || !supervisor.name) return "Unknown";
  return `${supervisor.title ? supervisor.title + " " : ""}${
    supervisor.name
  }`.trim();
};

// Extract unique years from project topics data
const extractUniqueYears = (topics) => {
  const years = topics.map((topic) => topic.year);
  return [...new Set(years)].sort((a, b) => b - a); // Sort descending
};

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
  // Scroll to top of results
  const resultsElement = document.querySelector(
    ".bg-white.shadow-md.rounded-lg"
  );
  if (resultsElement) {
    resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    // Scroll to top of results
    const resultsElement = document.querySelector(
      ".bg-white.shadow-md.rounded-lg"
    );
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    // Scroll to top of results
    const resultsElement = document.querySelector(
      ".bg-white.shadow-md.rounded-lg"
    );
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  // Re-fetch without filters
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
});

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.animate__animated {
  --animate-duration: 0.5s;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .flex-col-reverse {
    flex-direction: column-reverse;
  }

  .space-x-1 > * + * {
    margin-left: 0.15rem;
  }

  .w-10.h-10 {
    width: 2rem;
    height: 2rem;
    font-size: 0.85rem;
  }
}
</style>
