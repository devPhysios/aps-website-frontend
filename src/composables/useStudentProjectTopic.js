import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/UserStore";
import apiClient from "@/config/axios";

export function useStudentProjectTopic() {
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

      if (projectTopics.value.length > 0) {
        projectTopic.value = projectTopics.value[0];
        editForm.value = {
          topic: projectTopic.value.topic,
          supervisor: {
            name: projectTopic.value.supervisor.name,
            title: projectTopic.value.supervisor.title,
          },
        };
      } else {
        projectTopic.value = null; // Ensure projectTopic is null if no topics
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
    if (!formData.topic.trim()) errors.topic = "Project topic is required";
    if (!formData.year) errors.year = "Year is required";
    else if (formData.year < 2000 || formData.year > new Date().getFullYear())
      errors.year = "Please enter a valid year";
    if (!formData.supervisor.name.trim())
      errors.supervisorName = "Supervisor name is required";
    if (!formData.supervisor.title)
      errors.supervisorTitle = "Supervisor title is required";
    else if (!supervisorTitles.includes(formData.supervisor.title))
      errors.supervisorTitle = "Please select a valid title";
    return errors;
  };

  // Add a new project topic
  const addProjectTopic = async () => {
    const errors = validateTopicForm(topicForm.value);
    validationErrors.value = errors;

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    try {
      const token = localStorage.getItem("studentToken");
      await apiClient.post("/project-topics/", topicForm.value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Project topic added successfully");
      showAddTopicForm.value = false;
      topicForm.value = {
        topic: "",
        year: new Date().getFullYear(),
        supervisor: { name: "", title: "" },
      };
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
      year: projectTopic.value.year,
    });
    validationErrors.value = errors;

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    try {
      const token = localStorage.getItem("studentToken");
      await apiClient.patch(
        `/project-topics/${projectTopic.value._id}`,
        editForm.value,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Project topic updated successfully");
      showEditTopicForm.value = false;
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
      await fetchProjectTopics();
    } catch (err) {
      console.error("Error deleting project topic:", err);
      toast.error(err.response?.data?.error || "Failed to delete project topic");
    } finally {
      isSubmitting.value = false;
    }
  };

  // Initialize
  const initialize = () => {
    if (!userStore.user) {
      router.push("/login");
      return;
    }
    fetchProjectTopics();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return {
    projectTopics,
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
    userStore // Expose userStore if needed by components, though direct usage is discouraged
  };
} 