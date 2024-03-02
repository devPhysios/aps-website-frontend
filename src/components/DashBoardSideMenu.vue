<template>
    <aside class="custom-transition flex gap-2 absolute top-0 left-0 w-[50%] pt-8 pl-2 z-10 h-full md:static md:w-80">
        <div class="side-container">
            <!-- First One -->
            <RouterLink to="/dashboard">
                <div class="sidemenu__items">
                    <span>
                        <i class="bi bi-ui-checks-grid"></i>
                    </span>
                    <h3>Dashboard</h3>
                </div>
            </RouterLink>
            <!-- Second One -->
            <RouterLink to="/#">
                <div class="sidemenu__items">
                    <span>
                        <i class="bi bi-cash-stack"></i>
                    </span>
                        <h3>Payment</h3>
                </div>
            </RouterLink>
        </div>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.side-container {
    @apply flex flex-col gap-1 w-full h-full bg-white rounded-tr-lg md:rounded-tr-none;
}

.sidemenu__items {
    @apply flex gap-2 font-medium text-gray-500 text-lg py-2 px-4 hover:shadow;
}
</style>