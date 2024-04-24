<template>
  
      <marquee class="pt-20 w-full font-display pb-2 px-4 bg-yellow-100 z-[20] rounded-md text-center fixed flex justify-between items-center gap-4">
        <div>
            <p class="font-bold text-center text-[10px] md:text-md">Call For Donations</p>
        </div>
        <div class="justify-normal text-center text-[8px] md:text-sm flex gap-2">
          <p class="font-bold">Account Number: <span class="font-normal cursor-pointer" @click="copyToClipboard">0034046597</span></p>
          <p><span class="font-bold">Account Name:</span> Association Of Physiotherapy Students, UI</p>
          <p><span class="font-bold">Bank Name:</span> Access Bank Plc</p>
        </div>
      </marquee>


    <div class="font-display pt-20">

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
          <div class="col-span-2 p-1 w-full rounded-md relative">
            <p class=" border-box border-1 m-1 text-center p-1 font-alumni font-bold text-6xl md:text-9xl lg:text-[200px] xl:text-[238px]">Alumni </p>
            <p class="absolute z-20 top-0 left-[25%] font-alumni2 text-orange-500 text-4xl md:text-6xl lg:text-9xl xl:text-[200px] -rotate-12 drop-shadow-md">Our</p>
          </div>
          <div class=" w-full h-[68px] md:h-[134px] lg:h-[200px] xl:h-[238px] bg-red-400 rounded-md">
            <img class="w-full h-full object-cover rounded-md" :src= "a4" />
          </div>
          <div class=" w-full bg-red-400 rounded-md h-[120px] md:h-[280px]">
            <img class="h-full w-full object-cover rounded-md" :src= "a5" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a6" />

          </div>
          <div class="w-full h-[120px] md:h-[280px] bg-red-400 rounded-md">
            <img class="h-full w-full object-cover rounded-md" :src= "a7" />

          </div>
        </div>
      </div>
      <AlumniGalleryCarousel />
      <PastPresidents />
      
      <div class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-green-200 rounded-md">
        <div class="">
            <p class="font-bold text-center text-2xl md:text-4xl ">Message to Our Alumni</p>
        </div>
        <p class="p-4 justify-normal text-justify">Dear Esteemed Alumni,
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

      <div class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-yellow-100 rounded-md text-center">
        <div>
            <p class="font-bold text-center text-2xl md:text-4xl ">Call For Donations</p>
        </div>
        <div class="p-4 justify-normal text-center text-xl">
          <p class="font-bold">Account Number: <span class="font-normal cursor-pointer" @click="copyToClipboard">0034046597</span></p> 
          <br/>
          <p><span class="font-bold">Account Name:</span> Association Of Physiotherapy Students, UI</p>
          <br/>
          <p><span class="font-bold">Bank Name:</span> Access Bank Plc</p>
        </div>
      </div>

    </div>


</template>

<script setup>
    import a1 from '@/assets/images/alumni/DSC_0457.jpg'
    import a2 from '@/assets/images/alumni/IMG_7537.jpg'
    import a3 from '@/assets/images/alumni/IMG_7539.jpg'
    import a4 from '@/assets/images/alumni/IMG_7541 1.jpg'
    import a5 from '@/assets/images/alumni/IMG_7544.jpg'
    import a6 from '@/assets/images/alumni/IMG_7547.jpg'
    import a7 from '@/assets/images/alumni/IMG_7548.jpg'
    import AlumniGalleryCarousel from '@/components/AlumniGalleryCarousel.vue';
    import PastPresidents from '@/components/PastPresidents.vue';

    import { ref } from 'vue';

    const textToCopy = ref("0034046597");

    const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(textToCopy.value);
    alert("Text copied to clipboard: " + textToCopy.value);
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    alert('Failed to copy text to clipboard');
  }
};
</script>