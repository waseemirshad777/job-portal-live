<script setup>
import { Icon } from '@iconify/vue';
import NewsBlog from '@/components/Home/News&Blog.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { format } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import Subscribe from '@/components/Home/Subscribe.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const router = useRouter();
const store = useAuthStore();


const jobs = ref([])
const currentPage = ref(1);
const totalJobs = ref(0);
const lastPage = ref(0);
const perPage = ref(10);
const from = ref('');
const to = ref('');


const keyword = ref('');
const jobType = ref('');
const location = ref(''); 

const getJobs = async (page = 1) => {
  try {
    const res = await axios.get(`/jobs?keyword=${keyword.value}&location=${location.value}&jobType=${jobType.value}&page=${page}&perPage=${perPage.value}`);
    jobs.value = res.data.jobs;
    currentPage.value = res.data.pagination.currentPage;
    perPage.value = res.data.pagination.perPage;
    lastPage.value = res.data.pagination.totalPages;
    totalJobs.value = res.data.pagination.totalJobs;
    from.value = res.data.pagination.from;
    to.value = res.data.pagination.to;
    console.log(res)
  }
  catch(error) {
    console.error(error)
  }
  
}

const showPerPage = ref(perPage.value);

watch(showPerPage, (newVal) => {
  perPage.value = newVal;
  getJobs(currentPage.value);
});

const paginationHandler = (page) => {
  currentPage.value = page;
  getJobs(page);
};


const filterJobs = () => {
  getJobs(currentPage.value);
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, 'dd MMMM yyyy'); // Change the format as per your requirement
}

function truncateContent(content, wordLimit) {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}

onMounted( () => {
  getJobs();
})
</script>

<template>
  <section class="job-filters py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class=" bg-main2 text-center rounded-xl text-sm px-3 md:px-10 py-10">
        <h2 class="text-xl md:text-3xl font-bold mb-3"><span class="text-main">22 Jobs</span> Available Now</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellendus<br>
          magni, atque delectus molestias quis
        </p>
        <div class="flex flex-col lg:flex-row justify-between items-center px-4 py-5 md:py-3 md:w-2/3 mx-auto mt-10 gap-2 bg-white rounded">
          <!-- Keyword Input -->
          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-3 shadow-sm">
            <i class="fas fa-search text-gray-400"></i>
            <input 
              type="text" 
              v-model="keyword"
              placeholder="Keywords"
              @input="getJobs" 
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <!-- Company Input -->
          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-3 shadow-sm">
            <i class="fas fa-location-dot text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Location"
              v-model="location" 
              @input="getJobs"
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <!-- Job Type Select -->
          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-3 shadow-sm">
            <i class="fas fa-briefcase text-gray-400"></i>
            <select @change="getJobs" v-model="jobType" class="ml-3 border-none focus:outline-none text-gray-700 text-sm">
              <option value=""selected>Job Type</option>
              <option value="full">Full time</option>
              <option value="part">Part time</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          <!-- Search Button -->
          <button class="w-full lg:w-auto bg-main text-white hover-up py-3 px-2 mt-3 md:mt-0 rounded-md hover:bg-hover text-nowrap transition">
            <i class="fas fa-search mr-1"></i> Search Jobs
          </button>
        </div>
      </div>

      <div class="flex justify-between items-center mt-20 px-2">
            <p class="text-sm text-gray-500">Showing {{ from }} to {{ to }} of {{ totalCompanies }}</p>
            <div class="flex space-x-4 text-sm">
              <div>
                <label for="show" class="sr-only">Show</label>
                <select v-model="showPerPage" id="show" name="show" class="block w-full border border-gray-300 rounded focus:border-main">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
        </div>
        <hr class="mt-2">

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3  mt-20">
        <div v-for="(job, index) in jobs" :key="index" class="job-card p-3 border rounded-lg shadow-hover-up overflow-hidden">
          <div class="relative h-52 rounded-lg overflow-hidden">
          <img class="w-full h-full" :src="`http://localhost:3000/${job.jobImage}`" alt="">
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
            <p class="my-6 text-sm text-gray-600 font-medium">
              {{ truncateContent(job.description, 20) }}
            </p>
            <div class="my-6 space-x-2 text-xs text-gray-600">
              <span v-for="tag in job.jobTags" class="hover:text-main bg-main2 rounded py-2 px-3">{{ tag }}</span>
            </div>
            <div class="text-end mt-6">
              <button class="py-2 px-3 text-main bg-main3 border text-xs font-semibold rounded">
                <RouterLink :to="`/job-detail/${job._id}`">Apply Now</RouterLink> </button>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-container">
        <!-- <div class="pages-count text-sm text-green-600">Page {{ currentPage + ' of ' + lastPage}}</div> -->
        <vue-awesome-paginate
          :total-items="totalJobs"
          :items-per-page="perPage"
          :max-pages-shown="lastPage.value"
          v-model="currentPage"
          :on-click="paginationHandler"
          paginate-buttons-class="paginate-btn"
          active-page-class="paginate-btn-active"
          back-button-class="paginate-back-btn"
          next-button-class="paginate-next-btn"
        >
          <template #prev-button>
            <button 
              class="h-8 w-8 bg-main2 text-gray-500 hover:text-main text-xs rounded-full border transition">
              <i class="fas fa-chevron-left"></i>
            </button>
        
          </template>
          <template #next-button>
            <button 
              @click="nextSlide" 
              class="h-8 w-8 bg-main2 text-gray-500 hover:text-main text-xs rounded-full border transition">
              <i class="fas fa-chevron-right"></i>
            </button>
          </template>
        </vue-awesome-paginate>
      </div>
    </div>
    <NewsBlog />
    <Subscribe />
  </section>
</template>
  

  
<style scoped>
.job-filters {
  margin-top: 70px;
}
.seacrh-box {
  width: 100%;
}
.seacrh-box input,
.seacrh-box select {
  width: 100%;
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

.job-card:hover button {
   background-color: #3C65F5;
   transition: all;
   transition-duration: 300;
   color: white;
}
</style>
  