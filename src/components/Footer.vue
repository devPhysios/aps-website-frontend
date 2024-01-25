<template>
    <footer class="bg-[#450a0a]">
        <p> {{ footerText }}</p>
        <div class="md:flex ">
            <div class="flex-1 p-5">
                <strong>
                    <h1 class=" underline-green-500 text-white">
                        Our Address</h1>
                </strong>
                <div class="flex items-center">
                    <div class="w-1/4 h-1 bg-green-400"></div>
                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>


                <div class="flex items-center">
                    <div>
                        <p class="text-white">Association of physiotherapy students,
                            <br>
                            Department of physiotherapy, Faculty of clinical <br>
                            Sciences, College of Medicine,University of <br>
                            Ibadan
                        </p>
                    </div>
                </div>
                <div class="flex items-center">
                    <div>
                        <p class="text-white"> &nbsp;apsuiibadan@gmail.com</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <div>
                        <p class="text-white">+234 81213080920</p>
                    </div>
                </div>
            </div>
            <div class="flex-wrap ">
                <div class="flex-1 p-5">
                    <div class="text-white">
                        <p>
                        <ul class="list-none">
                            <strong>
                                <h1>Quick Links </h1>
                            </strong>
                            <li>Home</li>
                            <li>About Us </li>
                            <li>Gallery</li>
                            <li>Physiopress</li>
                            <li>Alumni</li>
                        </ul>
                        </p> <br>
                        <div class="flex">
                            <div class="flex-1 w-5 h-5 mr-6"><img src="c:\Users\ACER\Desktop\images (9).png">
                            </div>
                            <div class="contents">
                                <div class="flex-1 w-5 h-5 mr-6"><img src="c:\Users\ACER\Desktop\download (50).jpeg">
                                </div>
                            </div>
                            <div class="flex-1 w-5 h-5 "><img src="c:\Users\ACER\Desktop\download (1).png"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </footer>
</template>
<script >
export default {
    name: 'Footer',
    setup() {
        return {
            footerText: ''

        }
    }
}
</script>


