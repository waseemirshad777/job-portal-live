<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
const store = useAuthStore();

const jobs = ref({});


const getJobs = async () => {
  try {
    const res = await axios.get(`/applied-jobs/${store.user._id}`);
    jobs.value = res.data;
    console.log(jobs.value, "dsjdksjd", res)
  }
  catch(error) {
    console.error(error)
  }
  
}


onMounted( ()=> {
    getJobs();
})

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, 'dd MMMM yyyy'); 
}
  </script>

<template>
  <section class="md">
    <div class="border border-gray-200 mx-3 my-8"></div>
    <div class="text-2xl font-bold m-3">Applied Jobs</div>


    <div v-for="(job, index) in jobs" :key="index">
      <div class="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-lg p-4 m-3  md:mb-0">
        <!-- Left Side: Image, Title, Time, Location -->
        <div class="flex items-center space-x-4">
          <img :src="`http://localhost:3000/${job.job.job_image}`" class="w-20 h-20 object-cover rounded-lg" alt="Job Image">
          <div>
            <h3 class="text-xl font-bold">{{ job.job.title }}</h3>
            <div class="text-gray-500 flex justify-between align-center space-x-4 text-sm">
              <div class="flex items-center"><Icon icon="mdi:map-marker" class="icon mr-2" /> {{ job.job.location }}</div>
              <div class="flex items-center"><Icon icon="mdi:clock-outline" class="icon mx-2" /> {{ job.job.job_type }}</div>
              <div class="flex items-center"><Icon icon="mdi-cash-multiple" class="icon mx-2" /> {{ job.job.salary_from +"$ to " + job.job.salary_to + "$ " }}</div>
            </div>
          </div>
        </div>
    
        <!-- Right Side: Apply Button, Date -->
        <div class="flex flex-col items-end">
          <button @click="" class="bg-green-500 flex align-center hover:bg-green-600 text-white font-bold py-2 px-4 rounded"><Icon icon="fa-solid:check-circle" class="h-5 w-5 mr-2 text-green-700" /> Applied</button>
          <p class="text-gray-500 mt-2 flex items-center"><Icon icon="mdi-calendar" class="mx-2" />{{ formatDate(job.job.date) }}</p>
        </div>
      </div>
    </div>

  </section>
</template>
  


  
