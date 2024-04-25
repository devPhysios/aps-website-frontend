<template>
  <div class="font-display container mx-auto p-8 font-display">
    <h1 class="text-2xl font-bold mb-4">Upload to Gallery</h1>

    <input
      type="file"
      @change="handleImageUpload"
      class="mb-4 border border-gray-400 p-2 w-full"
    />

    <div v-if="imageUrl" class="mt-4 flex flex-col gap-2">
      <img :src="imageUrl" class="w-64" />
      <p class="text-sm text-gray-600" m-2>{{ imageUrl }}</p>
      <input
        type="text"
        v-model="title"
        placeholder="Image Title"
        class="border border-gray-400 p-2"
      />
      <input
        type="text"
        v-model="description"
        placeholder="Description"
        class="border border-gray-400 p-2"
      />
      <input
        type="text"
        v-model="tags"
        placeholder="Tags"
        class="border border-gray-400 p-2"
      />
      <input
        type="text"
        v-model="features"
        placeholder="Featuring:"
        class="border border-gray-400 p-2"
      />
      <button
        @click="submitData"
        class="mt-2 bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Submitting..." : "Submit" }}
      </button>
    </div>

    <div
      v-if="Object.keys(validationErrors).length > 0"
      class="font-display mt-4 bg-red-100 p-4 rounded"
    >
      <ul>
        <li v-for="(error, field) in validationErrors" :key="field">
          {{ field }}: {{ error }}
        </li>
      </ul>
    </div>
    <div
      v-if="submissionMessage"
      class="mt-4 p-4 rounded blink"
      :class="{
        'bg-green-100 text-green-700': messageType === 'success',
        'bg-red-100 text-red-700': messageType === 'error',
      }"
    >
      {{ submissionMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const imageFile = ref(null);
const imageUrl = ref(null);
const title = ref("");
const description = ref("");
const tags = ref("");
const features = ref("");
const isSubmitting = ref(false); // For loading state
const validationErrors = ref({}); // Store validation errors
const submissionMessage = ref(null); // For 'success' or 'error' messages
const messageType = ref(null); // 'success' or 'error'

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
  uploadToCloudinary();
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const uploadToCloudinary = async () => {
  const formData = new FormData();
  formData.append("file", imageFile.value);
  formData.append("upload_preset", "h6mtoaot"); // Create an upload preset in Cloudinary

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dp4sbuifi/image/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        transformations: "w_400,h_400,c_fill",
      }
    );
    imageUrl.value = response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
  }
};

const validateForm = () => {
  validationErrors.value = {}; // Clear previous errors

  let isValid = true;
  if (!imageUrl.value) {
    validationErrors.value.image = "Please upload an image";
    isValid = false;
  }
  if (!title.value.trim()) {
    validationErrors.value.title = "Please provide a title";
    isValid = false;
  }
  if (!description.value.trim()) {
    validationErrors.value.description = "Please provide a description";
    isValid = false;
  }
  if (!tags.value.trim()) {
    validationErrors.value.tags = "Please provide at least one tag";
    isValid = false;
  }
  if (!features.value.trim()) {
    validationErrors.value.features = "Please provide at least one feature";
    isValid = false;
  }
  // ... Add more validation rules as needed.
  return isValid;
};

const submitData = async () => {
  isSubmitting.value = true;

  if (!validateForm()) {
    isSubmitting.value = false;
    return; // Don't proceed if validation fails
  }
  try {
    await axios.post(
      "https://aps-website-backend.onrender.com/api/v1/gallery",
      {
        imageUrl: imageUrl.value,
        title: title.value,
        description: description.value,
        tags: tags.value.split(",").map((tag) => tag.trim()),
        features: features.value.split(",").map((feature) => feature.trim()),
      }
    );
    isSubmitting.value = false; // Submission successful
    // Submission successful!
    submissionMessage.value = "Image submitted successfully!";
    messageType.value = "success";
    setTimeout(() => resetForm(), 5000);
    cwindow.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error("Submission error:", error);
    submissionMessage.value = "There was an error. Please try again.";
    messageType.value = "error";
    setTimeout(() => resetForm(), 5000);
  }
};
const resetForm = () => {
  imageUrl.value = null;
  title.value = "";
  description.value = "";
  tags.value = "";
  submissionMessage.value = null;
  messageType.value = null;
};
</script>

<style scoped>
.blink {
  animation: blinker 1.5s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
