<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useAuthStore();

const Keyword = ref('');
const location = ref('');
const type = ref('');

const goToFilteredJobs = () => {
  router.push({
    name: 'Jobs',
    query: {
      jobType: type.value,
      jobLocation: location.value,
      jobKeyword: Keyword.value,
    }
  })
}
</script>

<template>
  <section class="h-screen bg-cover bg-center" style="background-image: url('/images/bg-banner.svg'); margin-top: 60px;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row justify-between items-center">
      
      <!-- Left Side: Heading, Paragraph, and Search Form -->
      <div class="w:1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-4">
        <h1 class="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
          The <em class="text-main">Easiest Way</em><br> to Get Your New Job
        </h1>
        <p class="text-gray-600 mb-8">
          Each month, more than 3 million job seekers turn to <br> our website in their search for work, making over 140,000 <br> applications every single day.
        </p>

        <!-- Search Fields -->
        <div class="flex flex-col md:flex-row items-center px-4 py-2 gap-2 bg-white rounded">
          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-2 shadow-sm">
            <i class="fas fa-search text-gray-400"></i>
            <input 
              type="text" 
              v-model="Keyword"
              placeholder="Keywords" 
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-2 shadow-sm">
            <i class="fas fa-location-dot text-gray-400"></i>
            <input 
              type="text" 
              v-model="location"
              placeholder="Location" 
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-2 shadow-sm">
            <i class="fas fa-briefcase text-gray-400"></i>
            <select v-model="type" class="ml-3 border-none focus:outline-none text-gray-700 text-sm">
              <option value="">Job Type</option>
              <option value="full">Full time</option>
              <option value="part">Part time</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          <button @click="goToFilteredJobs" class="w-full bg-main text-white py-2 px-2 rounded-md hover:bg-hover text-nowrap transition">
            Search Jobs
          </button>
        </div>
        <div class="mt-2 text-sm">
          <em class="text-gray-600 font-bold">Popolar Searches:</em>
          <a href="" class="ml-2 underline">Content Writer</a>,
          <a href="" class="ml-2 underline">Finance</a>,
          <a href="" class="ml-2 underline">Development</a>,
          <a href="" class="ml-2 underline">Management</a>
        </div>
        <!-- Search Button -->
        <!-- <button class="bg-main text-white text-semibold py-3 px-5 mt-5 transition  rounded-md hover:bg-hover text-nowrap transition">
          <RouterLink to="/jobs"><i class="fas fa-briefcase mr-2"></i> Find Jobs</RouterLink>
        </button> -->
      </div>

      <!-- Right Side: Image -->
      <div class="w:1/2">
        <img 
          src="/images/hero-image.png" 
          alt="Job Search" 
          class=" object-cover"
        />
      </div>
    </div>
  </section>
</template>

<!-- Tailwind CSS for custom responsiveness -->
<style scoped>
.seacrh-box input,
.seacrh-box select {
  width: 112px;
}
@media (max-width: 768px) {
  .seacrh-box {
    width: 100%;
  }
  .seacrh-box input,
  .seacrh-box select {
    width: 100%;
  } 
}
</style>


