<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { RouterLink, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const router = useRouter();
const store = useAuthStore();
const jobs = ref([]);


const getJobs = async () => {
  try {
    const res = await axios.get(`/jobs`);
    
    jobs.value = res.data.jobs.slice(0, 3); // Get only the first 6 jobs
    
  } catch (error) {
    console.error(error);
  }
};


const timeAgo = (createdAt) => {
  return dayjs(createdAt).fromNow();
};

function goToJobApply(jobId) {
  if (store.user) {
    router.push({ path: `/job-apply/${jobId}` });
  } else {
    router.push('/login');
  }
}

function goToJobEdit(jobId) {
  if (store.user) {
    router.push({ path: `/job-edit/${jobId}` });
  } else {
    router.push('/login');
  }
}

function truncateContent(content, wordLimit) {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}

onMounted(() => {
  getJobs();
});
</script>

<template>
  <section class="">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="text-center text-4xl font-bold">Jobs of the day</div>
      <p class="text-center mt-4 text-gray-600">Discover today's top job opportunities and take the next step <br> in your career journey!</p>
      
      <!-- <div class="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mt-6">
        <div
          v-for="category in categories"
          :key="category.name"
          class="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-main transition-all duration-300 cursor-pointer"
        >
          <div class="flex items-center space-x-2">
            <i :class="category.icon" class="text-main"></i>
            <span class="font-semibold text-sm text-gray-700 hover:text-main">{{ category.name }}</span>
          </div>
        </div>
      </div> -->

      <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <div v-for="(job, index) in jobs" :key="index" class="job-card p-3 border rounded-lg shadow-hover-up overflow-hidden">
          <div class="relative h-52 rounded-lg overflow-hidden">
          <img class="w-full h-full" :src="job.jobImage" alt="">
            <div class="absolute top-2 left-2 bg-main3 text-xs font-semibold text-main px-2 py-1 rounded">
              {{ job.jobType }}
            </div>
            <div class="absolute top-2 right-2 cursor-pointer">
              <i v-if="job.saved == false" class="fa-regular fa-heart bg-main3 text-main rounded-full px-1 py-1"></i>
              <i v-else class="fa-solid fa-heart bg-main3 text-red-500 rounded-full px-1 py-1"></i>
            </div>
          </div>
          <div class="mt-4">
            <h2 class="text-xl font-bold hover:text-main">
              {{ job.title }}
            </h2>
            <p class="mt-2 text-xs text-gray-600 flex items-center space-x-4 font-medium">
              <span>
                <i class="fa-solid fa-briefcase mr-1"></i> {{ job.jobType }}
              </span>
              <span>
                <i class="fa-regular fa-clock mr-1"></i> Posted {{ timeAgo(job.createdAt) }}
              </span>
            </p>
            <div class="my-6 space-x-1">
              <span v-for="tag in job.jobTags.split(',')" :key="index" class="capitalize py-1 px-2 text-main bg-main3 border font-semibold text-xs rounded">
                {{ tag.trim() }}
              </span>
            </div>
            <p class="my-6 text-sm text-gray-600 font-medium">
              {{ truncateContent(job.description, 16) }}
            </p>
            
            <div class="text-end mt-6 mb-3">
              <RouterLink :to="`/job-detail/${job._id}`" class="py-2 px-3 text-main bg-main3 border text-xs font-semibold rounded">Apply Now</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  

  
<style scoped>

</style>
  
