<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-['Poppins',sans-serif]"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header with animation -->
      <div
        class="text-center mb-10 animate__animated animate__fadeIn animate__slow"
      >
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
        >
          My Project Topic
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your research project topic
        </p>
        <div
          class="mt-4 w-24 h-1 bg-green-500 mx-auto rounded-full animate__animated animate__fadeIn animate__delay-1s"
        ></div>
      </div>

      <!-- Add navigation links at the top of the page, right after the header section -->
      <div class="mt-4 flex flex-col md:flex-row gap-2 md:gap-4 mb-6">
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </RouterLink>

        <RouterLink
          to="/project-topics"
          class="inline-flex items-center justify-center py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md shadow-sm transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Browse All Project Topics
        </RouterLink>
      </div>

      <!-- Loading spinner -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"
        ></div>
      </div>

      <!-- Error message -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 shadow-sm"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500 mr-3"
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
          <h2 class="text-xl font-semibold text-red-700">
            Error fetching your project topic
          </h2>
        </div>
        <p class="mt-2 text-gray-700">{{ error }}</p>
        <button
          @click="fetchProjectTopics"
          class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition duration-200 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>

      <!-- Content for when student has no project topic -->
      <div
        v-else-if="!hasProjectTopic"
        class="bg-white rounded-lg p-8 shadow-md border-l-4 border-yellow-500"
      >
        <div class="text-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-yellow-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 class="text-2xl font-bold text-gray-800">
            No Project Topic Found
          </h2>
          <p class="text-gray-600 mt-2">
            You haven't registered a project topic yet. Add your research
            project topic now.
          </p>
        </div>

        <button
          @click="showAddTopicForm = true"
          class="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition duration-200 flex items-center justify-center font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Project Topic
        </button>
      </div>

      <!-- Content for when student has a project topic -->
      <div
        v-else-if="projectTopic"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div class="bg-green-500 p-4 text-white text-center">
          <h2 class="text-xl md:text-2xl font-bold">Your Project Topic</h2>
        </div>

        <div class="p-6">
          <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-1">
              {{ projectTopic.topic }}
            </h3>
            <div class="flex flex-wrap gap-3 mt-2">
              <span
                class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {{ projectTopic.year }}
              </span>
              <span
                class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {{ projectTopic.author.name }}
              </span>
              <span
                class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
              >
                {{ projectTopic.author.matricNumber }}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-md font-semibold text-gray-700 mb-2">
              Supervisor Information
            </h3>
            <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-500 mr-2"
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
                <div>
                  <p class="font-medium text-gray-800">
                    {{ projectTopic.supervisor.title }}
                    {{ projectTopic.supervisor.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              @click="showEditTopicForm = true"
              class="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition duration-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Topic
            </button>
            <button
              @click="confirmDelete = true"
              class="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition duration-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Topic
            </button>
          </div>
        </div>
      </div>

      <!-- Add Project Topic Form Modal -->
      <div
        v-if="showAddTopicForm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-bold text-gray-800">
                Add Project Topic
              </h2>
              <button
                @click="showAddTopicForm = false"
                class="text-gray-500 hover:text-gray-700"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form @submit.prevent="addProjectTopic">
              <div class="mb-4">
                <label
                  for="topic"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Project Topic</label
                >
                <input
                  id="topic"
                  v-model="topicForm.topic"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your project topic"
                />
                <p
                  v-if="validationErrors.topic"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ validationErrors.topic }}
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="year"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Year</label
                >
                <input
                  id="year"
                  v-model="topicForm.year"
                  type="number"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter year (e.g. 2023)"
                  min="2000"
                  :max="new Date().getFullYear()"
                />
                <p
                  v-if="validationErrors.year"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ validationErrors.year }}
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="supervisorName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Supervisor Name</label
                >
                <input
                  id="supervisorName"
                  v-model="topicForm.supervisor.name"
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
                  for="supervisorTitle"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Supervisor Title</label
                >
                <select
                  id="supervisorTitle"
                  v-model="topicForm.supervisor.title"
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
                  @click="showAddTopicForm = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="flex items-center">
                    <span
                      class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    ></span>
                    Submitting...
                  </span>
                  <span v-else>Add Project Topic</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Project Topic Form Modal -->
      <div
        v-if="showEditTopicForm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-bold text-gray-800">
                Edit Project Topic
              </h2>
              <button
                @click="showEditTopicForm = false"
                class="text-gray-500 hover:text-gray-700"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form @submit.prevent="updateProjectTopic">
              <div class="mb-4">
                <label
                  for="edit-topic"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Project Topic</label
                >
                <input
                  id="edit-topic"
                  v-model="editForm.topic"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your project topic"
                />
                <p
                  v-if="validationErrors.topic"
                  class="mt-1 text-sm text-red-600"
                >
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
                  v-model="editForm.supervisor.name"
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
                  v-model="editForm.supervisor.title"
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
                  @click="showEditTopicForm = false"
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

      <!-- Delete Confirmation Modal -->
      <div
        v-if="confirmDelete"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-lg w-full max-w-md p-6">
          <div class="text-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-red-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 class="text-2xl font-bold text-gray-800 mt-2">
              Delete Project Topic
            </h2>
            <p class="text-gray-600 mt-1">
              Are you sure you want to delete your project topic? This action
              cannot be undone.
            </p>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              @click="confirmDelete = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="deleteProjectTopic"
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <span
                  class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                ></span>
                Deleting...
              </span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/UserStore";
import apiClient from "@/config/axios";

// State variables
const projectTopics = ref([]);
const projectTopic = ref(null);
const loading = ref(true);
const error = ref(null);
const showAddTopicForm = ref(false);
const showEditTopicForm = ref(false);
const confirmDelete = ref(false);
const isSubmitting = ref(false);
const validationErrors = ref({});

// Store and router
const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

// Computed properties
const hasProjectTopic = computed(() => projectTopics.value.length > 0);

// Form states
const supervisorTitles = ["Dr.", "Prof.", "Mr.", "Mrs.", "Miss"];

const topicForm = ref({
  topic: "",
  year: new Date().getFullYear(),
  supervisor: {
    name: "",
    title: "",
  },
});

const editForm = ref({
  topic: "",
  supervisor: {
    name: "",
    title: "",
  },
});

// Fetch student's project topics
const fetchProjectTopics = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const response = await apiClient.get("/project-topics/my-topics", {
      headers: { Authorization: `Bearer ${token}` },
    });

    projectTopics.value = response.data.projectTopics || [];

    // If there are project topics, set the current one
    if (projectTopics.value.length > 0) {
      projectTopic.value = projectTopics.value[0];

      // Initialize edit form with current project topic
      editForm.value = {
        topic: projectTopic.value.topic,
        supervisor: {
          name: projectTopic.value.supervisor.name,
          title: projectTopic.value.supervisor.title,
        },
      };
    }
  } catch (err) {
    console.error("Error fetching project topics:", err);
    error.value =
      err.response?.data?.error ||
      "Failed to load your project topic. Please try again.";
    toast.error("Failed to load your project topic");
  } finally {
    loading.value = false;
  }
};

// Validate form data
const validateTopicForm = (formData) => {
  const errors = {};

  if (!formData.topic.trim()) {
    errors.topic = "Project topic is required";
  }

  if (!formData.year) {
    errors.year = "Year is required";
  } else if (formData.year < 2000 || formData.year > new Date().getFullYear()) {
    errors.year = "Please enter a valid year";
  }

  if (!formData.supervisor.name.trim()) {
    errors.supervisorName = "Supervisor name is required";
  }

  if (!formData.supervisor.title) {
    errors.supervisorTitle = "Supervisor title is required";
  } else if (!supervisorTitles.includes(formData.supervisor.title)) {
    errors.supervisorTitle = "Please select a valid title";
  }

  return errors;
};

// Add a new project topic
const addProjectTopic = async () => {
  const errors = validateTopicForm(topicForm.value);
  validationErrors.value = errors;

  if (Object.keys(errors).length > 0) {
    return;
  }

  isSubmitting.value = true;

  try {
    const token = localStorage.getItem("studentToken");
    const response = await apiClient.post("/project-topics/", topicForm.value, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Project topic added successfully");
    showAddTopicForm.value = false;

    // Reset form
    topicForm.value = {
      topic: "",
      year: new Date().getFullYear(),
      supervisor: {
        name: "",
        title: "",
      },
    };

    // Refresh project topics
    await fetchProjectTopics();
  } catch (err) {
    console.error("Error adding project topic:", err);
    toast.error(err.response?.data?.error || "Failed to add project topic");
  } finally {
    isSubmitting.value = false;
  }
};

// Update existing project topic
const updateProjectTopic = async () => {
  const errors = validateTopicForm({
    ...editForm.value,
    year: projectTopic.value.year, // Keep the original year
  });
  validationErrors.value = errors;

  if (Object.keys(errors).length > 0) {
    return;
  }

  isSubmitting.value = true;

  try {
    const token = localStorage.getItem("studentToken");
    await apiClient.patch(
      `/project-topics/${projectTopic.value._id}`,
      editForm.value,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Project topic updated successfully");
    showEditTopicForm.value = false;

    // Refresh project topics
    await fetchProjectTopics();
  } catch (err) {
    console.error("Error updating project topic:", err);
    toast.error(err.response?.data?.error || "Failed to update project topic");
  } finally {
    isSubmitting.value = false;
  }
};

// Delete project topic
const deleteProjectTopic = async () => {
  isSubmitting.value = true;

  try {
    const token = localStorage.getItem("studentToken");
    await apiClient.delete(`/project-topics/${projectTopic.value._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Project topic deleted successfully");
    confirmDelete.value = false;

    // Refresh project topics
    await fetchProjectTopics();
  } catch (err) {
    console.error("Error deleting project topic:", err);
    toast.error(err.response?.data?.error || "Failed to delete project topic");
  } finally {
    isSubmitting.value = false;
  }
};

// Initialize component
onMounted(() => {
  // Check if user is logged in
  if (!userStore.user) {
    router.push("/login");
    return;
  }

  fetchProjectTopics();

  // Scroll to top of the page when component mounts
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<style scoped>
/* Add any component-specific styles here */
.animate__animated {
  animation-duration: 1s;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

.animate__delay-1s {
  animation-delay: 1s;
}

.animate__slow {
  animation-duration: 2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
