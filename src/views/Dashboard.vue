<template>
    <section class="pb-10 flex w-full h-[80vh] bg-gray-50 md:pb-0" v-if="store.user">
        <div v-if="sideMenuOpen" @click="openSideMenu"
            class="custom-transition fixed inset-0 bg-gray-500 z-10 opacity-60 md:hidden"></div>
        <DashBoardSideMenu :sideMenu="sideMenuOpen" @handleEmit="openSideMenu" />
        <main class="h-full w-full overflow-y-auto">
            <div class="px-8 mx-auto max-w-[1536px] grid">
                <div class="flex justify-between items-center my-6 bg-white p-2 md:p-px md:bg-transparent">
                    <span @click="openSideMenu"
                        class="cursor pointer text-4xl text-aps-green hover:text-yellow-600 md:hidden">
                        <i class="bi bi-filter-left"></i>
                    </span>

                    <h2 class="hidden my-6 font-semibold text-aps-green sm:block">
                        Student's Dashboard
                    </h2>

                    <button @click="handleLogout"
                        class="custom-transition text-red-500 font-bold hover:text-red-700 px-4 py-2 rounded-lg hover:border-red-500">Log
                        Out</button>
                </div>

                <div class="border-l-4 border-aps-green p-2">
                    <b>Hello, </b>
                    <span>{{ capitalize(store.user.firstName) }} {{ capitalize(store.user.lastName) }}</span>
                </div>

                <div class="mt-8">
                    <DashBoardCards />
                </div>
            </div>
        </main>
    </section>
</template>

<script setup>
import DashBoardSideMenu from '@/components/DashBoardSideMenu.vue'
import DashBoardCards from '@/components/DashBoardCards.vue'
import { useUserStore } from '@/stores/UserStore'
import { ref, onMounted } from 'vue'
import router from '@/router';

const store = useUserStore()
const sideMenuOpen = ref(false)

onMounted(() => {
    if (store.user===null) {
        router.push('/auth/login')
    }
})
const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const handleLogout = () => {
    store.logout()
    router.push('/auth/login')
}

const openSideMenu = () => {
    sideMenuOpen.value = !sideMenuOpen.value
    // return sideMenuOpen.value
}
  
</script>