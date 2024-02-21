<template>
    <aside class="custom-transition flex gap-2 absolute top-0 left-0 w-[50%] z-10 h-full md:static md:w-80" :class="[sideMenu ? 'left-0' : 'left-[-1000px]']">
        <button class="custom-transition z-100 absolute top-4 right-4 text-red-400 font-bold text-xl hover:text-red-600 md:hidden" @click="handleClick">X</button>
        <div class="w-full h-full bg-white rounded-tr-lg md:rounded-tr-none">
                <div class="flex">
                    <span>Image</span>
                    <h3>Dashboard</h3>
                </div>
        </div>
    </aside>
</template>

<script setup>
const props = defineProps({
    sideMenu: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['handleEmit'])

const handleClick = () => {
    emit("handleEmit")
}
</script>