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
                    <div class="w-60 h-1 bg-green-400"></div>
                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>


                <div class="flex "> <i class="bi bi-geo-alt"></i>
                    <div>
                        <p class="text-white">&nbsp;Association of physiotherapy students,
                            <br>
                            Department of Physiotherapy, Faculty of Clinical <br>
                            Sciences, College of Medicine,University of <br>
                            Ibadan
                        </p>
                    </div>
                </div> <br>
                <div class="flex items-center">
                    <div class="flex"> <i class=" fill-blue-500 bi bi-envelope"></i>
                        <p class="text-white"> &nbsp;apsuiibadan@gmail.com</p>
                    </div>
                </div> <br>
                <div class="flex items-center">
                    <div class="flex"> <i class="bi bi-telephone"></i>
                        <p class="text-white"> &nbsp;+234 81213080920</p>
                    </div>
                </div>
            </div>
            <div class="flex-wrap p-5 ">
                <div class="flex-1 ">
                    <div class="text-white">
                        <p>
                        <ul class="list-none">
                            <strong>
                                <h1>Quick Links </h1>
                            </strong>
                            <div class="flex items-center">

                                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div class="w-60 h-1 bg-green-400"></div>
                            </div>
                            <li>Home</li>
                            <li>About Us </li>
                            <li>Gallery</li>
                            <li>Physiopress</li>
                            <li>Alumni</li>
                        </ul>
                        </p> <br>
                        <div class="flex">
                            <div class="flex-1 w-5 h-5 mr-6"> <i class="bi bi-whatsapp"></i>
                            </div>
                            <div class="contents">
                                <div class="flex-1 w-5 h-5 mr-6"> <i class="bi bi-instagram"></i>
                                </div>
                            </div>
                            <div class="flex-1 w-5 h-5 "><i class="bi bi-twitter-x"></i></div>
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


