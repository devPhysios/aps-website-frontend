<template>
    <aside class="custom-transition w-[100px] bg-white pt-[80px] md:static md:w-60 md:pt-8">
        <div class="side-container">
            <div class="img relative">
                <img :src="store.user.profilePicture || avatar" :alt="store.user.firstName">
                <div v-if="editImage" class="flex flex-col items-center w-full mx-auto gap-2">
                    <input
                        type="file"
                        class="box-border border-0 w-[90%] mx-auto focus:outline-0 text-[12px]"
                    />
                    <button class="custom-transition text-[12px] rounded py-1 px-[2px] text-white bg-blue-400 w-[90%] md:text-[18px] hover:bg-blue-500" type="button" @click="handleUpload">Upload Image</button>
                </div>
                <span title="Upload Image" @click="editImage = !editImage" class="absolute top-[-6px] right-2 text-gray-500 md:text-xl cursor-pointer md:right-8 md:top-[-2px]">
                    <i class="bi bi-pencil-square"></i>
                </span>
            </div>
            <!-- First One -->
            <RouterLink to="/dashboard">
                <div class="sidemenu__items">
                    <span class="text-[12px] md:text-[20px]">
                        <i class="bi bi-ui-checks-grid"></i>
                    </span>
                    <h3 class="text-[12px] md:text-[20px]">Dashboard</h3>
                </div>
            </RouterLink>
            <!-- Second One -->
            <RouterLink to="/payment">
                <div class="sidemenu__items">
                    <span class="text-[12px] md:text-[20px]">
                        <i class="bi bi-cash-stack"></i>
                    </span>
                        <h3 class="text-[12px] md:text-[20px]">Payment</h3>
                </div>
            </RouterLink>
            <!-- Third One & Fourth One -->
            <div v-if="store.user.isAcademicCommittee">
                <RouterLink to="/dashboard/uploadquestion">
                    <div class="sidemenu__items">
                        <span class="text-[12px] md:text-[20px]">
                            <i class="bi bi-patch-question"></i>
                        </span>
                            <h3 class="text-center text-[12px] md:text-[20px]">Upload Questions</h3>
                    </div>
                </RouterLink>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'

const fileInput = ref(null)
const editImage = ref(false)

const store = useUserStore()

const avatar = "data:image/png;base64,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"

const handleUpload = () => {
    console.log("Submitted")
}
</script>

<style scoped>
.side-container {
    @apply flex flex-col gap-4 w-full h-full rounded-tr-lg md:rounded-tr-none md:gap-6;
}

.sidemenu__items {
    @apply border-b border-b-gray-100 min-w-full flex flex-col items-center gap-px font-medium text-gray-500 py-2 px-4 hover:shadow md:flex-row md:gap-2;
}

img {
    @apply w-[80px] h-[80px] rounded-full object-cover mx-auto mb-10 md:w-[200px] md:h-[200px];
}
</style>