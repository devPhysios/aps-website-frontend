<template>
    <section class="flex w-full h-[80vh] bg-gray-50 md:pb-0" v-if="store.user">
        <div v-if="sideMenuOpen" @click="openSideMenu"
            class="custom-transition fixed inset-0 bg-gray-500 z-10 opacity-60 md:hidden"></div>
        <DashBoardSideMenu :sideMenu="sideMenuOpen" @handleEmit="openSideMenu" />
        <!-- <main class="h-full w-full overflow-y-auto"> -->
            <div class="px-8 mx-auto w-full h-full md:w-[70%] overflow-y-auto">
                <div class="flex justify-between items-center mt-2 p-px md:p-px">
                    <!-- <span @click="openSideMenu"
                        class="cursor pointer text-4xl text-aps-green hover:text-yellow-600 md:hidden">
                        <i class="bi bi-filter-left"></i>
                    </span> -->

                    <h2 class="my-4 font-semibold text-aps-green">
                        Student's Dashboard
                    </h2>

                    <button @click="handleLogout"
                        class="custom-transition text-red-500 font-bold hover:text-red-700 px-4 py-2 rounded-lg hover:border-red-500">Log
                        Out</button>
                </div>

                <div class="border-l-4 border-aps-green px-2 my-4">
                    <b>Hello, </b>
                    <span>{{ capitalize(store.user.firstName) }} {{ capitalize(store.user.lastName) }}</span>
                </div>

                <div class="mt-2">
                    <DashBoardCards />
                </div>
            </div>
        <!-- </main> -->
    </section>
</template>

<script setup>
import DashBoardSideMenu from '@/components/DashBoardSideMenu.vue'
import DashBoardCards from '@/components/DashBoardCards.vue'
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import router from '@/router'
import capitalize from "@/utils/capitalize"

const store = useUserStore()
const sideMenuOpen = ref(false)

const handleLogout = () => {
    store.logout()
    router.push('/auth/login')
}

const openSideMenu = () => {
    sideMenuOpen.value = !sideMenuOpen.value
    // return sideMenuOpen.value
}
  
</script>