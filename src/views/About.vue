<template>
    <div class="font-display pt-14">
<!-- This is the ABOUT US section beginning--->
        <div class="bg-gray-200 md:flex md:justify-between md:items-center gap-4 p-8">
            <div class="md:w-3/4 pb-2 md:pb-0 md:pr-4 lg:pr-24">
                <p class="text-3xl font-extrabold text-center md:text-left mb-4">History</p>
                <p class="md:text-left justify-normal text-justify">
                    Physiotherapy, also known as physical therapy, is a healthcare profession that focuses on optimizing human movement and function. It involves the assessment, diagnosis, and treatment of various physical conditions and injuries to enhance an individual's overall well-being.
                    <br />
                    <br />
                    Physiotherapists, or physical therapists, use a combination of manual therapy, exercise prescription, education, and other therapeutic modalities to help patients recover from injuries, manage chronic conditions, and improve their overall physical health. The goal is to restore and maximize functional independence, enabling individuals to perform daily activities with ease. Physiotherapists also play a crucial role in preventive care by educating patients about proper body mechanics, ergonomics, and exercises to reduce the risk of injuries and promote long-term health.
                    <br />
                    <br />
                    In essence, physiotherapy is a comprehensive and patient-centered approach that goes beyond the alleviation of symptoms. It aims to enhance the quality of life by promoting physical well-being and functional independence for individuals across various stages of life and health conditions.
                    <br />
                    <br />
                    In June, 1978 the students of the Department of Physiotherapy, University College Hospital, Ibadan formed an association called "Association of Undergraduate Physiotherapists". It was the first by any physiotherapist body in Nigeria. After a while, it was redesignated Association of Physiotherapy Students (APS).

                </p>
            </div>
            <div class="h-full md:w-1/4">
                <img class="h-full w-full md:w-[450px] object-cover" :src= "apsBuilding1" />
            </div>
        </div>
<!-- This is the ABOUT US section end--->

<!-- This is the ABOUT THE LOGO section beginning--->
        <div class="bg-green-200 md:flex md:justify-between md:items-center gap-4 p-4 m-8">
            <div class="h-[150px] md:w-3/4 md:pb-0 pb-4">
                <img class= "h-full object-cover mx-auto" :src= "apsLogo" />
            </div>
            <div class="md:w-3/4">
                <p class="text-3xl font-extrabold text-center md:text-right mb-4">Our Logo's Meaning</p>
                <p class="text-justify md:text-right">
                    The logo of the Association shall consist of a snake coiling round a crutch that is 
positioned between a hand and a spark. The snake stands for the oneness of the medical 
profession. The crutch symbolizes ambulation, the hand stands for massage and exercise 
therapy and the spark symbolizes electrotherapy.

                </p>
            </div>

        </div>
<!-- This is the ABOUT OUR LOGO section end--->


<!-- This is the OUR AIMS section beginning--->        
        <div class="bg-yellow-200 md:flex md:justify-between md:items-center gap-4 m-8 p-4">
            <div class="md:w-3/4">
                <p class="text-3xl font-extrabold text-center md:text-left mb-4">Our Aims</p>
                <ul class="text-justify md:text-left md:pb-0 pb-6">
                    <li>1. To protect the rights and privileges of her members.</li> 
                    <li>2. To create awareness of the profession among the general public.</li> 
                    <li>3. To promote cordial relationship with other student bodies within and outside the country whose objectives are acceptable to the Association.</li>
                    <li>4. To ensure mutual interactions amongst members.</li> 
                    <li>5. To create awareness among members about the latest trend in physiotherapy practice in 
                    Nigeria and the rest of the world.</li>
                    <li>6. To organize activities that will harmonize the pre-clinical and clinical students.</li>
                </ul>
            </div>
            <div class="h-full w-full md:w-1/4">
                <img class="h-3/4 w-full md:w-[350px] object-cover" :src= "apsBuilding2" />
            </div>
        </div>
<!-- This is the OUR AIMS section end--->

<!-- This is the OUR MOTTO section beginning--->
        <div class="bg-gray-200 m-8 p-4">
            <p class="text-3xl font-extrabold text-center mb-4">Our Motto</p>
            <p class="text-center">TO SERVE MANKIND AND HONOUR GOD</p>
        </div>
<!-- This is the OUR MOTTO section end--->
<Lecturerscarousel />
    </div>



</template>
<script setup>
    import apsBuilding1 from '@/assets/images/dept/dept02.png'
    import apsBuilding2 from '@/assets/images/dept/dept01.png'
    import apsLogo from '@/assets/images/aps-logo.png'
    import Lecturerscarousel from "@/components/LecturerCarousel.vue"


</script>
