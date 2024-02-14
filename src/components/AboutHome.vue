<template>
    <section class="p-1 pb-6 md:p-6 font-display my-8 mx-4 md:m-8 bg-green-100 rounded-md">
        <div class="my-1">
        <p class="text-2xl md:text-4xl font-bold pl-4 pt-2">About Us</p>
        <div class="flex items-center pl-4">
            <div class="w-[30%] bg-aps-green h-[4px] md:w-1/4"></div>
            <div class="rounded-full h-4 w-4 bg-aps-orange"></div>
        </div>      
        </div>

        <div class="flex items-center flex-column mx-4 my-6">
            <p class="about-us__text md:basis-3/5 text-justify">
                Physiotherapy, also known as physical therapy, is a healthcare profession that focuses on optimizing human movement and function. It involves the assessment, diagnosis, and treatment of various physical conditions and injuries to enhance an individual's overall well-being. <br> <br>
                Physiotherapists, or physical therapists, use a combination of manual therapy, exercise prescription, education, and other therapeutic modalities to help patients...
            </p>

            <div class="w-full items-center justify-center basis-1/2 hidden md:flex">
                <img :src="APSLogo" alt="Association of Physiotherapy Logo" />
            </div>

        </div>

        <div class="flex items-center justify-center">
            <RouterLink to="/about" class="bg-aps-green text-aps-white px-6 py-4 rounded-md hover:bg-aps-orange">
                Read More
            </RouterLink>
        </div>
    </section>
</template>

<script setup>
    import APSLogo from "../assets/images/aps-logo.png"
</script>