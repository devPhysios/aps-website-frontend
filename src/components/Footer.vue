<template>
  <footer class="bg-[#450a0a] font-display">
    <p>{{ footerText }}</p>
    <div class="md:flex">
      <div class="flex-1 p-5">
        <strong>
          <h1 class="underline-green-500 text-white">Our Address</h1>
        </strong>
        <div class="flex items-center">
          <div class="w-1/4 h-1 bg-green-400"></div>
          <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>

        <div class="flex items-center">
          <div class="flex items-center gap-4">
            <div><i class="bi bi-geo-alt-fill text-white"></i></div>
            <p class="text-white">
              Room EE, Alexander Brown Hall, University College Hospital,
              Ibadan.
            </p>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex items-center gap-4">
            <div><i class="bi bi-envelope-open-fill text-white"></i></div>
            <p class="text-white">&nbsp;apsibadan@gmail.com</p>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex items-center gap-4">
            <div><i class="bi bi-telephone-fill text-white"></i></div>
            <p class="text-white">+234 9165305415</p>
          </div>
        </div>
      </div>
      <div class="flex-wrap">
        <div class="flex-1 p-5">
          <div class="text-white">
            <!-- <p> -->
            <strong>
              <h1>Quick Links</h1>
            </strong>
            <div class="flex items-center">
              <div class="w-1/4 h-1 bg-green-400"></div>
              <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <ul class="list-none">
              <li>
                <RouterLink to="/"> Home </RouterLink>
              </li>
              <li>
                <RouterLink to="/about"> About </RouterLink>
              </li>
              <li>
                <RouterLink to="/gallery"> Gallery </RouterLink>
              </li>
              <li>
                <a
                  href="https://physiopressui.wordpress.com/home/"
                  target="_blank"
                  >PhysioPress</a
                >
              </li>
              <li>
                <RouterLink to="/alumni"> Alumni </RouterLink>
              </li>
            </ul>
            <!-- </p> <br> -->
            <div class="flex">
              <div class="flex-1 w-5 h-5 mr-6"></div>
              <div class="contents">
                <div class="flex-1 w-5 h-5 mr-6"></div>
              </div>
              <div class="flex-1 w-5 h-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  setup() {
    return {
      footerText: "",
    };
  },
};
</script>
