<template>
    <div class="w-[95%] mx-auto h-full">
        <h2 class="my-4 font-semibold text-aps-green">
                        Profile Information
        </h2>

        <div class="shadow py-4 px-2">
            <!-- First Parameter -->
            <div class="mb-px">
                <label class="font-bold text-[13px] text-gray-400">
                    Full Name
                </label>
                <div class="flex gap-2 items-center border border-gray-100">
                    <span class="text-gray-400 border border-gray-100 px-2">
                        <i class="bi bi-person text-2xl"></i>
                    </span>
                    <div class="text-gray-400 font-semibold">{{ fullName }}</div>
                </div>
            </div>
            <!-- Second Parameter -->
            <div class="mb-px">
                <label class="font-bold text-[13px] text-gray-400">
                    Matric Number
                </label>
                <div class="flex gap-2 items-center border border-gray-100">
                    <span class="text-gray-400 border border-gray-100 px-2">
                        <i class="bi bi-fingerprint text-2xl"></i>
                    </span>
                    <div class="text-gray-400 font-semibold">{{ store.user.matricNumber }}</div>
                </div>
            </div>
            <!-- Third Parameter -->
            <div class="mb-px">
                <label class="font-bold text-[13px] text-gray-400">
                    Level
                </label>
                <div class="flex gap-2 items-center border border-gray-100">
                    <span class="text-gray-400 border border-gray-100 px-2">
                        <i class="bi bi-person-vcard text-2xl"></i>
                    </span>
                    <div class="text-gray-400 font-semibold">{{ store.user.level }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import capitalize from '@/utils/capitalize'

const store = useUserStore()

const fullName = ref(`${ store.user.lastName.toUpperCase() }, ${ capitalize(store.user.firstName) } ${ capitalize(store.user.middleName) }`)
</script>