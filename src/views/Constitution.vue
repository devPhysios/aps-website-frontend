<template>
    <div class="flex w-full h-[100vh] gap-2 bg-gray-50 md:h-[70vh] font-display" v-if="store.user">
        <DashBoardSideMenu />
        
        <section class="w-[80%] ml-2">
            <div class="my-1">
                <p class="text-4xl font-bold pl-4 pt-2">APS CONSTITUTION</p>
                <div class="flex items-center pl-4">
                <div class="md:w-1/4 w-3/4 bg-aps-green h-[4px]"></div>
                <div class="rounded-full h-4 w-4 bg-aps-orange"></div>
                </div>
            </div>
  
            <div class="w-[90%] mx-auto outline-none my-2">
                <select
                    class="text-center bg-aps-orange text-white rounded-2xl w-full p-4 font-semibold hover:bg-aps-green"
                    v-model="selectedSection"
                    @change="navigateToSection"
                >
                    <option
                        v-for="(data, index) in constitutionData"
                        :key="index"
                        :value="index" 
                        class="text-center bg-aps-orange rounded-2xl p-4 font-semibold hover:bg-aps-green">
                            {{ data.name }}
                    </option>
                </select>

                <Carousel>
                    <Slide v-for="(data, i) in constitutionData" :key="i">
                        <div class="w-full bg-aps-green max-h-[70vh] rounded-2xl text-aps-white text-xl gap-2 font-display">
                            <h3 class="text-3xl font-semibold">{{ data.name }}</h3>

                            <div class="tab">
                                <div class="w-full flex justify-between px-4">
                                    <button 
                                        v-for="(sub, a) in data.subArray" :key="a"
                                        class="text-lg pt-4 font-semibold"
                                        type="button"
                                    >
                                        {{ sub.section }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Slide>
                </Carousel>
            </div>
        </section>
    </div>
</template>

<script setup>
import DashBoardSideMenu from "../components/DashBoardSideMenu.vue"
import { useUserStore } from '@/stores/UserStore'
import constitutionData from "@/data"
import { ref } from "vue"
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const store = useUserStore()

const selectedSection = ref(0)
</script>

<style scoped>
.carousel__slide {
    display: block !important;
    margin-top: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>