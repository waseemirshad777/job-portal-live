<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import { useToast } from 'vue-toast-notification';
const toast = useToast();
const store = useAuthStore();

const jobs = ref([]);


const getJobs = async () => {
  try {
    const res = await axios.get(`/jobs/${store.user._id}`);
    jobs.value = res.data;
  }
  catch(error) {
    console.error(error)
  }
  
}
onMounted( ()=> {
    getJobs();
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, 'dd MMMM yyyy'); 
}


const deleteJob = async (jobId) => {
  const confirmDelete = confirm("Are you sure you want to delete this job?");
  if (confirmDelete) {
    try {
      await axios.delete(`/job/${jobId}`);
      getJobs();
      toast.open({
        message: 'Job Deleted Successfully!',
        type: 'error',
        position: 'top-right', 
      });
    } catch (error) {
      console.error(error);
    }
  }
};

</script>

<template>

  <section class="md">
    <div class="border border-gray-200 mx-3 my-8"></div>
    <div class="text-2xl font-bold m-3">Jobs Posted By You</div>


    <div v-for="(job, index) in jobs" :key="index">
      <div class="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-lg p-4 m-3  md:mb-0">
        <!-- Left Side: Image, Title, Time, Location -->
        <div class="flex items-center space-x-4">
          <img :src="`http://localhost:3000/${job.job_image}`" class="w-20 h-20 object-cover rounded-lg" alt="Job Image">
          <div>
            <h3 class="text-xl font-bold">{{ job.title }}</h3>
            <div class="text-gray-500 flex justify-between align-center space-x-4 text-sm">
              <div class="flex items-center"><Icon icon="mdi:map-marker" class="icon mr-2" /> {{ job.location }}</div>
              <div class="flex items-center"><Icon icon="mdi:clock-outline" class="icon mx-2" /> {{ job.job_type }}</div>
              <div class="flex items-center"><Icon icon="mdi-cash-multiple" class="icon mx-2" /> {{ job.salary_from +"$ to " + job.salary_to + "$ " }}</div>
            </div>
          </div>
        </div>
    
        <!-- Right Side: Apply Button, Date -->
        <div class="flex flex-col items-end">
          <button @click="deleteJob(job._id)" class="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete Job</button>
          <p class="text-gray-500 mt-2 flex items-center"><Icon icon="mdi-calendar" class="mx-2" />{{ formatDate(job.date) }}</p>
        </div>
      </div>
    </div>

  </section>
</template>
  


  
