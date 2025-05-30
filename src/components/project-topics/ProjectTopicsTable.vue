<template>
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
            v-for="(topic, index) in topics"
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
</template>

<script setup>
import { formatSupervisor as fs } from '@/utils/project-topics/formattingUtils';

defineProps({
  topics: {
    type: Array,
    required: true,
  },
});

const formatSupervisor = fs;
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 