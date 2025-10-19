<template>
  <section class="pt-12 pb-4">
  <footer class="text-dark text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap -mx-4">
        <!-- About Section -->
        <div class="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <img src="https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/jobhub-logo.svg" alt="">
          <p class="pr-8 mt-3">JobBox is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide</p>
          <div class="mt-3 space-x-3">
            <i class="fa-brands fa-facebook text-dark text-xl cursor-pointer"></i>
            <i class="fa-brands fa-twitter text-dark text-xl cursor-pointer"></i>
            <a href="https://www.linkedin.com/in/waseemirshad/" target="_blank"> <i class="fa-brands fa-linkedin text-dark text-xl cursor-pointer"></i></a>
            
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="w-full md:w-1/4 px-4 mb-8 md:mb-0 text-sm">
          <h3 class="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li><RouterLink to="/jobs" class="text-dark ">Jobs</RouterLink></li>
            <li><RouterLink to="/companies" class="text-dark ">Companies</RouterLink></li>
            <li><RouterLink to="/employees" class="text-dark ">Employees</RouterLink></li>
            <li><RouterLink to="/blog" class="text-dark ">Blog</RouterLink></li>
          </ul>
        </div>

        <div class="w-full md:w-1/6 px-4 mb-8 md:mb-0 text-sm">
          <h3 class="text-lg font-bold mb-4">More</h3>
          <ul>
            <li><RouterLink to="/" class="text-dark ">Home</RouterLink></li>
            <li><RouterLink to="/about-us" class="text-dark ">About Us</RouterLink></li>
            <li><RouterLink to="/contact-us" class="text-dark ">Contact Us</RouterLink></li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="w-full md:w-1/4 px-4 mb-8 md:mb-0 text-sm">
          <h3 class="text-lg font-bold mb-4">Contact Us</h3>
          <p class="">Email: wasimirshad345@gmail.com</p>
          <p class="">Phone: +92 308 6693345</p>
          <p class="">Faisalabad, Punjab, Pakistan</p>
        </div>

      </div>

      <hr class="my-4">
      <div class="mt-12 text-center text-gray-400">
        <p>&copy; 2024 Mian Waseem. All rights reserved.</p>
      </div>
    </div>
  </footer>
</section>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
/* Add your custom styles here if necessary */
</style>
