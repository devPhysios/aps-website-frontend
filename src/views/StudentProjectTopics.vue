<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-['Poppins',sans-serif]"
  >
    <div class="max-w-4xl mx-auto">
      <StudentProjectTopicHeader />

      <LoadingSpinner v-if="loading" />

      <ErrorMessage
        v-else-if="error"
        :message="error"
        @retry="fetchProjectTopics"
      />

      <NoProjectTopicView
        v-else-if="!hasProjectTopic"
        @add-topic="showAddTopicForm = true"
      />

      <StudentProjectTopicDetails
        v-else-if="projectTopic"
        :project-topic="projectTopic"
        @edit-topic="showEditTopicForm = true"
        @delete-topic="confirmDelete = true"
      />

      <AddProjectTopicModal
        :show="showAddTopicForm"
        :topic-form="topicForm"
        :validation-errors="validationErrors"
        :supervisor-titles="supervisorTitles"
        :is-submitting="isSubmitting"
        @update:topicForm="topicForm = $event"
        @close="showAddTopicForm = false"
        @submit-form="addProjectTopic"
      />

      <EditProjectTopicModal
        :show="showEditTopicForm"
        :edit-form="editForm"
        :validation-errors="validationErrors"
        :supervisor-titles="supervisorTitles"
        :is-submitting="isSubmitting"
        @update:editForm="editForm = $event"
        @close="showEditTopicForm = false"
        @submit-form="updateProjectTopic"
      />

      <DeleteTopicModal
        :show="confirmDelete"
        :is-submitting="isSubmitting"
        @close="confirmDelete = false"
        @confirm-delete="deleteProjectTopic"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStudentProjectTopic } from "@/composables/useStudentProjectTopic";
import StudentProjectTopicHeader from "@/components/student-project-topics/StudentProjectTopicHeader.vue";
import StudentProjectTopicDetails from "@/components/student-project-topics/StudentProjectTopicDetails.vue";
import AddProjectTopicModal from "@/components/student-project-topics/AddProjectTopicModal.vue";
import EditProjectTopicModal from "@/components/student-project-topics/EditProjectTopicModal.vue";
import DeleteTopicModal from "@/components/student-project-topics/DeleteTopicModal.vue";
import NoProjectTopicView from "@/components/student-project-topics/NoProjectTopicView.vue";
import LoadingSpinner from "@/components/student-project-topics/LoadingSpinner.vue";
import ErrorMessage from "@/components/student-project-topics/ErrorMessage.vue";

const {
  projectTopic,
  loading,
  error,
  showAddTopicForm,
  showEditTopicForm,
  confirmDelete,
  isSubmitting,
  validationErrors,
  hasProjectTopic,
  supervisorTitles,
  topicForm,
  editForm,
  fetchProjectTopics,
  addProjectTopic,
  updateProjectTopic,
  deleteProjectTopic,
  initialize,
} = useStudentProjectTopic();

onMounted(() => {
  initialize();
});
</script>

<style scoped>
/* Minimal styles, as most are handled by Tailwind or component-specific styles */
</style>
