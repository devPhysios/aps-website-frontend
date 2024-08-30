<template>
  <h3 class="mb-2 font-bold text-md text-gray-500 md:text-l">
    Administrative Information
  </h3>
  <!-- First Parameter -->
  <div class="mb-2 pl-4">
    <h4 class="font-bold text-[14px] text-gray-400 md:text-[16px]">
      Executive Member:
      <span class="font-medium text-[12px] md:text-[14px]">
        {{ store.user.isExecutive ? "Member" : "Not a Member" }}
      </span>
    </h4>
  </div>
  <!-- Second Parameter -->
  <div class="mb-2 pl-4">
    <h4 class="font-bold text-[14px] text-gray-400 md:text-[16px]">
      Academic Committee:
      <span class="font-medium text-[12px] md:text-[14px]">
        {{ store.user.isAcademicCommittee ? "Member" : "Not a Member" }}
      </span>
    </h4>
  </div>
  <!-- Third Parameter -->
  <div class="mb-2 pl-4">
    <h4 class="font-bold text-[14px] text-gray-400 md:text-[16px]">
      Senate Member:
      <span class="font-medium text-[12px] md:text-[14px]">
        {{ store.user.isSenator ? "Member" : "Not a Member" }}
      </span>
    </h4>
  </div>
  <!-- Fourth Parameter -->
  <div class="mb-2 pl-4">
    <h4 class="font-bold text-[14px] text-gray-400 md:text-[16px]">
      Alumnus:
      <span class="font-medium text-[12px] md:text-[14px]">
        {{ store.user.isAlumni ? "An Alumnus" : "Not an Alumnus" }}
      </span>
    </h4>
  </div>
  <!-- Fifth Parameter -->
  <div class="mb-2 pl-4">
    <h4 class="font-bold text-[14px] text-gray-400 md:text-[16px]">
      Current Post(s):
      <span v-if="currentPosts.length === 0"> None </span>
      <span v-else class="font-medium text-[12px] md:text-[14px]">
        {{ currentPosts.join(", ") }}
      </span>
    </h4>
  </div>
  <!-- Sixth Parameter -->
  <div class="mb-2 pl-4">
    <h4 class="font-bold text-[14px] text-gray-400 md:text-[16px]">
      Past Post(s):
    </h4>
    <ul v-if="pastPosts.length > 0" class="list-disc pl-8">
      <li v-for="post in pastPosts" :key="post.title" class="font-medium text-[12px] md:text-[14px]">
        {{ post.title }} ({{ post.academicSession }})
      </li>
    </ul>
    <span v-else class="font-medium text-[12px] md:text-[14px] pl-4">
      None
    </span>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";
import { computed } from 'vue';

const store = useUserStore();
const currentSession = "2023/2024";

const currentPosts = computed(() => {
  return store.user.post
    .filter(post => post.academicSession === currentSession)
    .map(post => post.title);
});

const pastPosts = computed(() => {
  return store.user.post.filter(post => post.academicSession !== currentSession);
});
</script>