<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

const companies = ref([]);
const getCompanies = async () => {
  const res = await axios.get(`/companies`);
  companies.value = res.data.companies;
  console.log(companies.value, 'hoooo')
}

onMounted( () => {
  getCompanies();
})

</script>


<template>
    <section class="recruiter-section py-12">

      <div class="relative max-w-7xl mx-4 lg:mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">Top Recruiters</h1>
          <p class="text-gray-600">Discover your next career move, freelance gig, or internship</p>
        </div>

        <div class="min-w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-2">
            <RouterLink  :to="`/company-detail/${company._id}`" v-for="(company, index) in companies" :key="index" class="shadow-hover-up border text-dark border-gray-100 rounded-lg  px-4 py-4">
                <div class="flex items-center gap-4">
                    <img :src="company.companyLogo" alt="Job Category" class="w-12 h-12 rounded-lg">
                    <div>
                        <h3 class="font-bold text-sm hover:text-main">{{ company.companyName }}</h3>
                        <p class="text-xs mt-2 text-yellow-500">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <span class="ml-2">(67)</span>
                        </p>
                    </div>
                </div>
                <div class="text-xs flex justify-between items-center mt-3 text-gray-500">
                    <span v-if="company.address"><i class="fa-solid fa-location-dot mr-1"></i> {{ company.address.city }}</span>
                    <span> {{ company.openJobs }} Job Open </span>
                </div>
            </RouterLink>
        </div>
      </div>
    </section>
  </template>
  

  
  <style scoped>
  .category-section {
    margin-top: -70px;
  }
  
  </style>
  
  