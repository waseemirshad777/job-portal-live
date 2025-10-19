<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';


const stats = ref('');

async function getStats() {
  try {
    const res = await axios.get(`/stats`);
    stats.value = res.data ;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getStats();
});

</script>

<template>
    <section class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Stats Container -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <!-- Each Stat Block -->
          <div>
            <p class="text-gray-600 mb-2">
              Empowering job seekers with thousands of opportunities across various industries.
            </p>
            <h3 class="font-semibold text-lg">Total Jos</h3>
            <p class="text-main text-4xl font-bold mt-2">{{ stats.totalJobs }} +</p>
          </div>
          <div>
            <p class="text-gray-600 mb-2">
              Partnered with top companies to provide diverse career paths for job seekers.
            </p>
            <h3 class="font-semibold text-lg">Registered Companies</h3>
            <p class="text-main text-4xl font-bold mt-2">{{ stats.totalEmployers }} +</p>
          </div>
          <div>
            <p class="text-gray-600 mb-2">
              Connecting talented professionals to dynamic roles in growing industries.
            </p>
            <h3 class="font-semibold text-lg">Active Employees</h3>
            <p class="text-main text-4xl font-bold mt-2">{{ stats.totalEmployees }} +</p>
          </div>
        </div>
      </div>
    </section>
</template>
  
  
  <style scoped>
  /* You can adjust padding or text styling further if needed */
  </style>
  