<template>
    <div class="w-[95%] mx-auto h-full">
            <h2 class="my-4 font-semibold text-aps-green">
                            Profile Information
            </h2>

        <div class="shadow py-4 px-4 max-w-[500px] mx-auto">
            <div class="mb-4">
                <div class="flex items-center justify-between">
                    <h3 class="mb-2 font-bold text-lg text-gray-500">
                        Personal Information
                    </h3>
                    <button
                        class="text-blue-400 text-md font-semibold"
                        :class="editMode ? 'cursor-not-allowed' : 'cursor-pointer'"
                        :disabled="editMode"
                        @click="editMode = true"
                    >
                        Edit
                    </button>
                </div>
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
                            <i class="bi bi-person-vcard text-2xl"></i>
                        </span>
                        <div class="text-gray-400 font-semibold">{{ store.user.matricNumber }}</div>
                    </div>
                </div>
                <div class="mb-px">
                    <label class="font-bold text-[13px] text-gray-400">
                        Program
                    </label>
                    <div class="flex gap-2 items-center border border-gray-100">
                        <span class="text-gray-400 border border-gray-100 px-2">
                            <i class="bi bi-award text-2xl"></i>
                        </span>
                        <div class="text-gray-400 font-semibold">{{ store.user.program }}</div>
                    </div>
                </div>
                <!-- Third Parameter -->
                <div class="flex gap-[20px]">
                    <div class="mb-px w-1/2">
                        <label class="font-bold text-[13px] text-gray-400">
                            Level
                        </label>
                        <div class="flex gap-2 items-center border border-gray-100">
                            <span class="text-gray-400 border border-gray-100 px-2">
                                <i class="bi bi-bar-chart-steps text-2xl"></i>
                            </span>
                            <div class="text-gray-400 font-semibold">{{ store.user.level }}</div>
                        </div>
                    </div>

                    <div class="mb-px w-1/2">
                        <label class="font-bold text-[13px] text-gray-400">
                            Set
                        </label>
                        <div class="flex gap-2 items-center border border-gray-100">
                            <span class="text-gray-400 border border-gray-100 px-2">
                                <i class="bi bi-people text-2xl"></i>
                            </span>
                            <div class="text-gray-400 font-semibold">{{ store.user.set }}</div>
                        </div>
                    </div>
                </div>
                <!-- Fourth Parameter -->
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
                            class="text-gray-400 font-semibold border-0 focus:outline-0"
                            placeholder="No email address"
                            :readonly="!editMode"
                            v-model="emailAddress"
                        />
                    </div>
                </div>
                <!-- Fifth Parameter -->
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
                            class="text-gray-400 font-semibold border-0 focus:outline-0"
                            placeholder="Hall Of Residence"
                            :readonly="!editMode"
                            v-model="hallOfResidence"
                        />
                    </div>
                </div>
                <!-- Sixth Parameter -->
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
                            class="text-gray-400 font-semibold border-0 focus:outline-0 w-full"
                            placeholder="Room Number e.g., A22"
                            :readonly="!editMode"
                            v-model="roomNumber"
                        />
                    </div>
                </div>
                <!-- Seventh Parameter -->
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
                            class="w-full focus:outline-0 text-gray-400 font-semibold"
                        >
                            <option value="gender">Sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="not to say">Choose not to say</option>
                        </select>
                    </div>
                </div>
                <!-- Eighth Parameter -->
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
                                type="number"
                                :readonly="!editMode"
                                class="text-gray-400 font-semibold border-0 focus:outline-0 w-[50px] text-center"
                                v-model="month"
                                maxlength="2"
                                placeholder="mm"
                            />
                            <span class="text-gray-400 font-semibold">/</span>
                            <input
                                type="number"
                                :readonly="!editMode"
                                class="w-[50px] text-gray-400 font-semibold border-0 focus:outline-0 text-center"
                                v-model="day"
                                maxlength="2"
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
                <h3 class="mb-2 font-bold text-lg text-gray-500">
                        Administrative Information
                </h3>
                <!-- First Parameter -->
                <div class="mb-2 pl-4">
                    <h4 class="font-bold text-[16px] text-gray-400">
                        Executive Member: 
                        <span class="font-medium text-[14px]">
                            {{ store.user.isExecutive ? "Member" : "Not a Member" }}
                        </span>
                    </h4>
                </div>
                <!-- Second Parameter -->
                <div class="mb-2 pl-4">
                    <h4 class="font-bold text-[16px] text-gray-400">
                        Academic Committee: 
                        <span class="font-medium text-[14px]">
                            {{ store.user.isAcademicCommittee ? "Member" : "Not a Member" }}
                        </span>
                    </h4>
                </div>
                <!-- Third Parameter -->
                <div class="mb-2 pl-4">
                    <h4 class="font-bold text-[16px] text-gray-400">
                        Senate Member: 
                        <span class="font-medium text-[14px]">
                            {{ store.user.isSenator ? "Member" : "Not a Member" }}
                        </span>
                    </h4>
                </div>
                <!-- Fourth Parameter -->
                <div class="mb-2 pl-4">
                    <h4 class="font-bold text-[16px] text-gray-400">
                        Alumnus: 
                        <span class="font-medium text-[14px]">
                            {{ store.user.isAlumni ? "An Alumnus" : "Not an Alumnus" }}
                        </span>
                    </h4>
                </div>
                <!-- Fifth Parameter -->
                <div class="mb-2 pl-4">
                    <h4 class="font-bold text-[16px] text-gray-400">
                        Post(s): 
                        <span class="font-medium text-[14px]" v-if="store.user.post.length === 0">None</span>
                        <span class="font-medium text-[14px]" v-else v-for="(p,index) in store.user.post" :key="index">{{ p }}</span>
                    </h4>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore'
import { saveData } from '@/utils/useSaveData'
import { ref } from 'vue'
import capitalize from '@/utils/capitalize'

const store = useUserStore()

const fullName = ref(`${ store.user.lastName.toUpperCase() }, ${ capitalize(store.user.firstName) } ${ capitalize(store.user.middleName) }`)

const editMode = ref(false)
const emailAddress = ref(store.user.email || null)
const hallOfResidence = ref(store.user.hallOfResidence || null)
const roomNumber = ref(store.user.roomNo || null)
const selectedOption = ref(store.user.gender || "gender")
const month = ref(store.user.monthOfBirth || null)
const day = ref(store.user.dayOfBirth || null)

const handleSubmit = async() => {
    const data = JSON.stringify({
        dayOfBirth: day.value,
        monthOfBirth: month.value,
        gender: selectedOption.value,
        roomNo: roomNumber.value,
        hallOfResidence: hallOfResidence.value,
        email: emailAddress.value,
        matricNumber: store.user.matricNumber
    })

    const { jsonData } = await saveData(store.user.id, data)
    
    store.save(jsonData.student)
    editMode.value = false
}
</script>