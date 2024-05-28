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
      Post(s):
      <span v-if="store.user.post.length === 0"> None </span>
      <span v-else-if="store.user.post.length === 1">
        <span class="font-medium text-[14px]">{{ store.user.post[0] }}</span>
      </span>
      <span v-else>
        {{ store.user.post.join(", ") }}
      </span>
    </h4>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/UserStore";

const store = useUserStore();
</script>
