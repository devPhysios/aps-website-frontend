<template>
    <div class="font-display">
<!-- This is the ABOUT US section beginning--->
        <div class="bg-gray-200 md:flex md:justify-between md:items-center gap-4 p-4">
            <div class="md:w-3/4">
                <p class="text-3xl font-extrabold text-center md:text-left mb-4">About Us</p>
                <p class="text-center md:text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius suscipit obcaecati veniam quae possimus mollitia ad id? Explicabo facilis animi quos omnis quod unde excepturi quisquam, iste odio architecto veniam reiciendis alias consequatur obcaecati quam! Esse ratione consectetur quos recusandae libero, dignissimos cumque eum quia? Doloribus, reprehenderit. Porro eius aliquam voluptates quas odit cumque, temporibus laudantium in maxime recusandae officia! Harum animi pariatur voluptate delectus tempore! Iste doloremque, repudiandae, quasi perferendis ipsa architecto earum nemo consequuntur qui asperiores ducimus magni. Facilis asperiores ipsum quos minima doloremque, veniam, accusantium provident beatae debitis alias omnis voluptates neque unde, rerum eligendi voluptatibus. Aut nesciunt eligendi et voluptatibus deleniti saepe, sed enim tenetur quisquam? Quo alias accusamus numquam aperiam, ducimus quaerat minus, dignissimos quis asperiores incidunt nisi veritatis mollitia harum porro fugiat sequi delectus natus vel nam perferendis sint quia. Inventore perferendis, quaerat itaque rerum eaque repellat quidem, sapiente debitis temporibus fugiat praesentium!
                </p>
            </div>
            <div class="h-full md:w-3/4">
                <img class="h-full w-full object-cover" :src= "apsBuilding" />
            </div>
        </div>
<!-- This is the ABOUT US section end--->

<!-- This is the ABOUT THE LOGO section beginning--->
        <div class="bg-green-200 md:flex md:justify-between md:items-center gap-4 p-4 m-8">
            <div class="h-[150px] md:w-3/4 md:pb-0 pb-4">
                <img class= "h-full object-cover mx-auto" :src= "apsLogo" />
            </div>            
            <div class="md:w-3/4">
                <p class="text-3xl font-extrabold text-center md:text-right mb-4">About the Logo</p>
                <p class="text-center md:text-right">
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
                <ul class="text-center md:text-left md:pb-0 pb-6">
                    <li>1. To protect the rights and privileges of her members.</li> 
                    <li>2. To create awareness of the profession among the general public.</li> 
                    <li>3. To promote cordial relationship with other student bodies within and outside the country whose objectives are acceptable to the Association.</li>
                    <li>4. To ensure mutual interactions amongst members.</li> 
                    <li>5. To create awareness among members about the latest trend in physiotherapy practice in 
                    Nigeria and the rest of the world.</li>
                    <li>6. To organize activities that will harmonize the pre-clinical and clinical students.</li>
                </ul>
            </div>
            <div class="h-full md:w-3/4">
                <img class="h-full w-full object-cover" :src= "apsBuilding" />
            </div>
        </div>
<!-- This is the OUR AIMS section end--->

<!-- This is the OUR MOTTO section beginning--->
        <div class="bg-gray-200 m-8 p-4">
            <p class="text-3xl font-extrabold text-center mb-4">Our Motto</p>
            <p class="text-center">TO SERVE MANKIND AND HONOUR GOD</p>
        </div>
<!-- This is the OUR MOTTO section end--->
<lecturersCarousel />
    </div>



</template>
<script setup>
    import apsBuilding from '@/assets/images/DSC_0450.jpg'
    import apsLogo from '@/assets/images/aps-logo.png'
    import lecturersCarousel from "../components/lecturersCarousel.vue"


</script>
