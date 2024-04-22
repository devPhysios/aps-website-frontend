<template>
    <section class="flex w-full h-[80vh] bg-gray-50 md:h-[69.6vh] font-display" v-if="store.user">
        <DashBoardSideMenu />
        <!-- <main class="h-full w-full overflow-y-auto"> -->
            <div class="w-[80%] overflow-y-auto mx-4 h-full pl-4 pt-4 bg-gray-50 md:w-[70%] md:h-full pb-3 md:pb-8 md:px-4 md:pl-8">
                <div class="flex justify-between items-center mt-2 p-px md:p-px">
                    <h2 class="text-[14px] my-4 font-semibold text-aps-green md:text-lg">
                        Student's Dashboard
                    </h2>
                    <button @click="handleLogout"
                        class="custom-transition text-sm text-red-500 font-bold hover:text-red-700 px-4 py-2 rounded-lg md:text-lg hover:border-red-500">
                        Log Out
                    </button>
                </div>

                <div class="text-[14px] border-l-4 border-aps-green px-2 my-4 md:text-lg">
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