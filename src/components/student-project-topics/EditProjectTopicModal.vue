<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">Edit Project Topic</h2>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="emit('submit-form')">
          <div class="mb-4">
            <label
              for="edit-topic"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Project Topic</label
            >
            <input
              id="edit-topic"
              :value="editForm.topic"
              @input="emit('update:editForm', { ...editForm, topic: $event.target.value })"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your project topic"
            />
            <p v-if="validationErrors.topic" class="mt-1 text-sm text-red-600">
              {{ validationErrors.topic }}
            </p>
          </div>

          <div class="mb-4">
            <label
              for="edit-supervisorName"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Supervisor Name</label
            >
            <input
              id="edit-supervisorName"
              :value="editForm.supervisor.name"
              @input="emit('update:editForm', { ...editForm, supervisor: { ...editForm.supervisor, name: $event.target.value } })"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter supervisor's name"
            />
            <p
              v-if="validationErrors.supervisorName"
              class="mt-1 text-sm text-red-600"
            >
              {{ validationErrors.supervisorName }}
            </p>
          </div>

          <div class="mb-6">
            <label
              for="edit-supervisorTitle"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Supervisor Title</label
            >
            <select
              id="edit-supervisorTitle"
              :value="editForm.supervisor.title"
              @input="emit('update:editForm', { ...editForm, supervisor: { ...editForm.supervisor, title: $event.target.value } })"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>Select a title</option>
              <option
                v-for="title in supervisorTitles"
                :key="title"
                :value="title"
              >
                {{ title }}
              </option>
            </select>
            <p
              v-if="validationErrors.supervisorTitle"
              class="mt-1 text-sm text-red-600"
            >
              {{ validationErrors.supervisorTitle }}
            </p>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <span
                  class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                ></span>
                Updating...
              </span>
              <span v-else>Update Project Topic</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  show: Boolean,
  editForm: Object,
  validationErrors: Object,
  supervisorTitles: Array,
  isSubmitting: Boolean,
});

const emit = defineEmits(["close", "submit-form", "update:editForm"]);
</script> 