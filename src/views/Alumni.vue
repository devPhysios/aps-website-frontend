<template>
    <div class="font-display">
      <div class="w-full
       p-1">
        <div class="grid grid-cols-3 md:gap-4 gap-3 h-full md:p-12 p-3">
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a1" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a2" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a3" />

          </div>
          <div class="col-span-2 p-1 w-full rounded-md ">
            <p class="m-1 text-center font-bold text-6xl md:text-9xl lg:text-[220px]"> Our Alumni </p>
          </div>
          <div class=" w-full h-[120px] md:h-[270px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a1" />

          </div>
          <div class=" w-full bg-red-400 rounded-md h-[120px] md:h-[280px]">
            <img class="h-full w-full object-cover rounded-md" :src= "a2" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a2" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a2" />

          </div>
        </div>
      </div>
      
    </div>


</template>

<script setup>
    import a1 from '@/assets/images/DSC_0457.jpg'
    import a2 from '@/assets/images/IMG_0848.jpg'
    import a3 from '@/assets/images/IMG_0850.jpg'
</script>