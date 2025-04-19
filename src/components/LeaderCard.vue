<template>
  <div class="card-container">
    <vue-flip :active-click="true" width="100%" height="100%" class="card-flip">
      <!-- Front of card -->
      <template v-slot:front>
        <div class="card-face" :class="cardBorderClass">
          <div class="card-image-container">
            <div class="card-image-overlay"></div>
            <img
              :src="
                person.profilePicture || getPlaceholderImage(person.fullName)
              "
              :alt="person.fullName"
              class="card-image"
              @error="handleImageError"
            />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ person.fullName }}</h3>
            <p :class="textColorClass">{{ person.office }}</p>
            <span v-if="person.level" class="card-level"
              >{{ person.level }}L</span
            >
          </div>
          <div class="flip-hint">Tap to flip</div>
        </div>
      </template>

      <!-- Back of card -->
      <template v-slot:back>
        <div class="card-face card-back" :class="cardBorderClass">
          <div class="card-back-content">
            <h3 :class="['card-back-title', textColorClass]">
              {{ person.fullName }}
            </h3>
            <p class="card-back-subtitle">{{ person.office }}</p>

            <div class="card-details">
              <div class="detail-item">
                <span class="detail-label">Level:</span>
                <span class="text-gray-900 dark:text-gray-100">{{
                  person.level || "N/A"
                }}</span>
              </div>

              <div class="detail-item">
                <span class="detail-label">Hobbies:</span>
                <span class="text-gray-900 dark:text-gray-100">{{
                  person.hobbies || "N/A"
                }}</span>
              </div>

              <div class="detail-item">
                <span class="detail-label">Skills:</span>
                <div class="skills-list">
                  <span
                    v-if="!person.skills?.length"
                    class="text-gray-900 dark:text-gray-100"
                    >N/A</span
                  >
                  <span
                    v-else
                    v-for="skill in person.skills"
                    :key="skill"
                    class="skill-tag"
                    :class="skillTagClass"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <div class="detail-item">
                <span class="detail-label">Contact:</span>
                <a
                  v-if="person.phoneNumber"
                  :href="`tel:${person.phoneNumber}`"
                  :class="['contact-link', textColorClass]"
                >
                  {{ person.phoneNumber }}
                </a>
                <span v-else class="text-gray-900 dark:text-gray-100">N/A</span>
              </div>
            </div>
          </div>
          <div class="flip-hint">Tap to flip</div>
        </div>
      </template>
    </vue-flip>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { VueFlip } from "vue-flip";

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ["executive", "principal", "senator"].includes(value),
  },
});

const cardBorderClass = computed(() => ({
  "border-t-aps-orange": props.type === "principal",
  "border-t-aps-green": props.type === "senator" || props.type === "executive",
}));

const textColorClass = computed(() => ({
  "text-aps-orange": props.type === "principal",
  "text-aps-green": props.type === "senator" || props.type === "executive",
}));

const skillTagClass = computed(() => ({
  "bg-orange-50 text-aps-orange": props.type === "principal",
  "bg-green-50 text-aps-green":
    props.type === "senator" || props.type === "executive",
}));

const getPlaceholderImage = (fullName) => {
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("");
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&background=random&color=fff&size=256`;
};

const handleImageError = (event) => {
  event.target.src = getPlaceholderImage(props.person.fullName);
};
</script>

<style scoped>
.card-container {
  aspect-ratio: 3/4;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  perspective: 1000px;
  @apply font-poppins;
}

.card-flip {
  width: 100% !important;
  height: 100% !important;
}

.card-face {
  @apply bg-aps-white dark:bg-gray-800 rounded-xl shadow-md;
  @apply border-t-4;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-face:hover {
  @apply shadow-lg;
  transform: translateY(-4px);
}

.card-image-container {
  @apply relative;
  height: 55%;
  width: 100%;
  overflow: hidden;
}

.card-image {
  @apply w-full h-full object-cover transition-transform duration-300;
}

.card-face:hover .card-image {
  transform: scale(1.05);
}

.card-image-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10;
}

.card-content {
  @apply absolute bottom-0 left-0 right-0 p-4 text-center;
  @apply bg-aps-white dark:bg-gray-800 rounded-t-xl -mt-8;
}

.card-title {
  @apply font-bold text-base text-gray-800 dark:text-gray-200 truncate mb-1;
}

.card-level {
  @apply inline-block mt-2 px-2 py-0.5 rounded-full text-xs;
  @apply bg-aps-green/10 dark:bg-aps-green/20 text-aps-green dark:text-aps-green;
}

.card-back {
  @apply flex flex-col;
}

.card-back-content {
  @apply flex-1 p-4 overflow-y-auto;
}

.card-back-title {
  @apply text-lg font-bold text-center mb-1;
}

.card-back-subtitle {
  @apply text-gray-600 dark:text-gray-400 text-center text-sm mb-4;
  @apply pb-3 border-b border-aps-green/20 dark:border-aps-green/20;
}

.card-details {
  @apply space-y-3;
}

.detail-item {
  @apply flex flex-col gap-0.5;
}

.detail-label {
  @apply text-gray-500 dark:text-gray-400 text-xs font-medium;
}

.skills-list {
  @apply flex flex-wrap gap-1;
}

.skill-tag {
  @apply text-xs px-1.5 py-0.5 rounded;
  @apply bg-aps-green/10 text-aps-green dark:bg-aps-green/20 dark:text-aps-green;
}

.contact-link {
  @apply hover:underline transition-colors duration-200;
}

.flip-hint {
  @apply absolute top-2 right-2 bg-aps-green/75 text-aps-white text-xs;
  @apply px-2 py-0.5 rounded-full z-20 backdrop-blur-sm;
}
</style>
