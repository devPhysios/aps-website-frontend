<template>
    <section class="flex w-full h-[80vh] bg-gray-50">
        <DashBoardSideMenu />
        <main class="h-full w-full overflow-y-auto">
            <div class="px-8 mx-auto w-[1536px] grid">
                <h2 class="my-6 font-semibold text-aps-green">
                    Student's Dashboard
                </h2>

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

const store = useUserStore()

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
</script>