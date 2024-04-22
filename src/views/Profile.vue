<template>
    <section class="flex w-full min-h-full bg-gray-50 font-display md:min-h-full">
        <DashBoardSideMenu />
        <div class="w-[80%] mx-2 h-full rounded pt-4 pl-4 bg-gray-50 pb-3 md:pb-8 md:ml-4 md:pt-6">
            <h2 class="text-aps-green font-bold text-lg pb-4">Profile Information</h2>
            <div class="shadow py-4 px-4 max-w-[500px] mx-auto md:mx-4">
                <div class="mb-4">
                    <div class="flex items-center justify-between">
                        <h3 class="mb-2 font-bold text-lg text-gray-500">
                            Personal Information
                        </h3>
                        <button
                            class="text-md font-semibold"
                            :class="editMode ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 cursor-pointer'"
                            @click="editMode = true"
                            :disabled="editMode"
                        >
                            Edit
                        </button>
                    </div>
                    <!-- Non-editable Parameters -->
                    <ProfileInformation />

                    <!-- First Parameter -->
                    <div class="mb-px">
                        <label class="font-bold text-[13px] text-gray-400">
                            Email
                        </label>
                        <div class="flex gap-2 items-center border border-gray-100">
                            <span class="text-gray-400 border border-gray-100 px-2">
                                <i class="bi bi-envelope text-2xl"></i>
                            </span>
                            <input
                                type="email"
                                class="font-semibold border-0 w-full focus:outline-0"
                                :class="editMode ? 'text-gray-500' : 'text-gray-400'"
                                placeholder="No email address"
                                :readonly="!editMode"
                                v-model="emailAddress"
                            />
                        </div>
                    </div>
                    <!-- Second Parameter -->
                    <div class="mb-px">
                        <label class="font-bold text-[13px] text-gray-400">
                            Hall of Residence
                        </label>
                        <div class="flex gap-2 items-center border border-gray-100">
                            <span class="text-gray-400 border border-gray-100 px-2">
                                <i class="bi bi-house text-2xl"></i>
                            </span>
                            <input
                                type="text"
                                class="font-semibold border-0 w-full focus:outline-0"
                                :class="editMode ? 'text-gray-500' : 'text-gray-400'"
                                placeholder="Hall Of Residence"
                                :readonly="!editMode"
                                v-model="hallOfResidence"
                            />
                        </div>
                    </div>
                    <!-- Third Parameter -->
                    <div class="mb-px">
                        <label class="font-bold text-[13px] text-gray-400">
                            Room Number
                        </label>
                        <div class="flex gap-2 items-center border border-gray-100">
                            <span class="text-gray-400 border border-gray-100 px-2">
                                <i class="bi bi-1-square text-2xl"></i>
                            </span>
                            <input
                                type="text"
                                class="font-semibold border-0 focus:outline-0 w-full"
                                :class="editMode ? 'text-gray-500' : 'text-gray-400'"
                                placeholder="Room Number e.g., A22"
                                :readonly="!editMode"
                                v-model="roomNumber"
                            />
                        </div>
                    </div>
                    <!-- Fourth Parameter -->
                    <div class="mb-px">
                        <label class="font-bold text-[13px] text-gray-400">
                            Sex
                        </label>
                        <div class="flex gap-2 items-center border border-gray-100">
                            <span class="text-gray-400 border border-gray-100 px-2">
                                <i class="bi bi-person text-2xl"></i>
                            </span>
                            <select 
                                v-model="selectedOption"
                                :disabled="!editMode"
                                class="w-full focus:outline-0 font-semibold"
                                :class="editMode ? 'text-gray-500' : 'text-gray-400'"
                            >
                                <option value="gender">Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="not to say">Choose not to say</option>
                            </select>
                        </div>
                    </div>
                    <!-- Fifth Parameter -->
                    <div class="mb-px">
                        <label class="font-bold text-[13px] text-gray-400">
                            Date Of Birth
                        </label>
                        <div class="flex gap-2 items-center border border-gray-100">
                            <span class="text-gray-400 border border-gray-100 px-2">
                                <i class="bi bi-calendar-date text-2xl"></i>
                            </span>
                            <div class="flex items-center gap-2">
                                <input
                                    type="text"
                                    :readonly="!editMode"
                                    class="font-semibold border-0 focus:outline-0 w-[50px] text-center"
                                    :class="editMode ? 'text-gray-500' : 'text-gray-400'"
                                    v-model="month"
                                    maxLength="2"
                                    placeholder="mm"
                                />
                                <span class="text-gray-400 font-semibold">/</span>
                                <input
                                    type="text"
                                    :readonly="!editMode"
                                    class="w-[50px] font-semibold border-0 focus:outline-0 text-center"
                                    :class="editMode ? 'text-gray-500' : 'text-gray-400'"
                                    v-model="day"
                                    maxLength="2"
                                    placeholder="dd"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        class="bg-blue-500 w-full mt-6 py-2 text-white text-lg font-medium transition"
                        @click.prevent="handleSubmit"
                        v-if="editMode"
                    >
                        Save Update
                    </button>
                </div>

                <hr>

                <div class="my-4">
                    <AdministrativeRoles />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore'
import { saveData } from '@/utils/useSaveData'
import { ref, watch } from 'vue'

import DashBoardSideMenu from '@/components/DashBoardSideMenu.vue'
import AdministrativeRoles from '@/components/AdministrativeRoles.vue'
import ProfileInformation from '@/components/ProfileInformation.vue'

const store = useUserStore()

const editMode = ref(false)
const emailAddress = ref(store.user.email || null)
const hallOfResidence = ref(store.user.hallOfResidence || null)
const roomNumber = ref(store.user.roomNo || null)
const selectedOption = ref(store.user.gender || "gender")
const month = ref(store.user.monthOfBirth || null)
const day = ref(store.user.dayOfBirth || null)

const isValidNumber = (value) => {
    return /^\d+$/.test(value)
}

const isValidDay = (monthValue, dayValue) => {
    const month = parseInt(monthValue)
    const day = parseInt(dayValue)
    if (month === 2) {
        return day >= 1 && day <= 29
    } else if ([4, 6, 9, 11].includes(month)) {
        return day >= 1 && day <= 30
    } else {
        return day >= 1 && day <= 31
    }
}

watch(month.value, (newMonth) => {
    if (!isValidDay(newMonth, day.value)) {
        day.value = ''
    }
});
watch(day.value, (newDay) => {
    if (!isValidNumber(newDay) || !isValidDay(month.value, newDay)) {
        day.value = ''
    }
});

const handleSubmit = async() => {
    const data = JSON.stringify({
        dayOfBirth: day.value,
        monthOfBirth: month.value,
        gender: selectedOption.value,
        roomNo: roomNumber.value.toUpperCase(),
        hallOfResidence: hallOfResidence.value.toUpperCase(),
        email: emailAddress.value.toLowerCase(),
    })

    const { jsonData } = await saveData(store.user.id, data)
    
    store.save(jsonData.student)
    editMode.value = false
}
</script>