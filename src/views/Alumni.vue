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
            <p class="m-1 text-center font-bold text-6xl md:text-9xl lg:text-[200px] xl:text-[238px]"> Our Alumni </p>
          </div>
          <div class=" w-full h-[120px] md:h-[270px] xl:h-[460px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a1" />

          </div>
          <div class=" w-full bg-red-400 rounded-md h-[120px] md:h-[280px]">
            <img class="h-full w-full object-cover rounded-md" :src= "a3" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a1" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a2" />

          </div>
        </div>
      </div>
      <AlumniGalleryCarousel />
      <PastPresidents />
      
      <div class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-green-200 rounded-md">
        <div class="">
            <p class="font-bold text-center text-2xl md:text-4xl ">Message to Our Alumni</p>
        </div>
        <p class="p-1">Dear Esteemed Alumni,
                    <br/>
                    <br/>
          It is with great joy and pride that we extend a warm welcome to each and every one of you, our valued alumni, who have played an integral role in shaping the rich tapestry of our school's history.
          <br/>
          <br/>
          Your journey with us marked not just the completion of your academic pursuits but the beginning of a lifelong connection with a community that cherishes its members. As you navigate through this dedicated alumni space, we invite you to reminisce, reconnect, and rediscover the bonds that tie us together.
          <br/>
          <br/>
          Your achievements, both personal and professional, are a testament to the resilience, intellect, and character that define our alumni. We take immense pride in witnessing your successes and celebrate the diverse paths each one of you has chosen.
          <br/>
          <br/>
          This platform is not just a digital space; it's a testament to the enduring spirit of our school community. Here, you'll find a wealth of resources, from career opportunities to the latest happenings within the school. We encourage you to explore, contribute, and stay engaged as we continue to grow and evolve.
          <br/>
          <br/>
          Your stories, experiences, and continued involvement are what make our school's legacy vibrant and enduring. Whether you graduated recently or several years ago, you remain an integral part of our ever-expanding family.
          Thank you for being an essential part of our journey. We look forward to fostering a deeper connection with you and creating more memories together.
          <br/>
          <br/>
          Welcome back home!
          <br/>
          Warm regards,
          <br/>
          [APS] Alumni Relations Team</p>
      </div>

    </div>


</template>

<script setup>
    import a1 from '@/assets/images/DSC_0457.jpg'
    import a2 from '@/assets/images/IMG_0848.jpg'
    import a3 from '@/assets/images/IMG_0850.jpg'
    import AlumniGalleryCarousel from '../components/AlumniGalleryCarousel.vue';
    import PastPresidents from '../components/PastPresidents.vue';
</script>