<template>
    <section class="">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20 my-10">
            <!-- Left Section with Cards -->
            <div class="md:w-1/2">
              <div class="w-full  lg:w-5/6 float-left lg:float-right">
                <img class="rounded-lg" src="https://media.istockphoto.com/id/475352876/photo/man-applying-for-a-job-on-the-internet.jpg?s=612x612&w=0&k=20&c=SQeciz8vqdGWu_KJoGC7yK8xmpBl69UewPtZSyWSrOI=" alt="Graph Overview" />
              </div>
            </div>
        
            <!-- Right Section with Text -->
            <div class="md:w-1/2  mt-10 md:mt-0">
              <div class="space-y-3 text-center lg:text-left">
                <p class="text-3xl font-extrabold text-gray-400">Millions Of Jobs.</p> 
                <h1 class="text-5xl font-extrabold text-dark">Find The One That's</h1>
                <h1 class="text-5xl font-extrabold text-dark"><span class="text-blue-500">Right</span> For You</h1>
              </div>
              <p class="mt-4 text-gray-600 text-center lg:text-left">
                Search all the open positions on the web. Get your own <br> personalized salary estimate. Read reviews on over <br> 600,000 companies worldwide. The right job is out there.
              </p>
              <div class="flex items-center justify-center lg:justify-start space-x-4 mt-6">
                <RouterLink to="/jobs" class="bg-main text-white px-6 py-3 rounded-lg hover-up hover:bg-hover">Search Jobs</RouterLink>
                <RouterLink to="/about-us" href="#" class="text-dark underline hover-up">Learn More</RouterLink>
              </div>
            </div>
        </div>
    </section>
</template>
  
  <script>
import { RouterLink } from 'vue-router';

  export default {
    name: 'JobPromoComponent',
  };
  </script>
  
  <style scoped>

  </style>
  