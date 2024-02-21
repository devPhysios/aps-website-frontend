<template>
    <div class="w-[95%] mx-auto h-full">
        <h2 class="my-4 font-semibold text-aps-green">
                        Profile
        </h2>

        <div class="bg-gray-100">
            <div>
                <label for="">
                    Full Name:
                </label>
                <div>
                    <span></span>
                    <input
                        type="text"
                        readonly :value="fullName"
                    />
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