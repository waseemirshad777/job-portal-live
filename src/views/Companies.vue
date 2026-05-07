<script setup>
import { Icon } from '@iconify/vue';
import NewsBlog from '@/components/Home/News&Blog.vue';
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import { format } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import { RouterLink, useRouter } from 'vue-router';
import Subscribe from '@/components/Home/Subscribe.vue';
const router = useRouter();
const store = useAuthStore();


const companies = ref([]);
const currentPage = ref(1);
const totalCompanies = ref(0);
const lastPage = ref(1);
const perPage = ref(10);
const from = ref('');
const to = ref('');

const location = ref('');
const companyName = ref(''); 

const getCompanies = async (page = 1) => {
  try {
    const res = await axios.get(`/companies?companyName=${companyName.value}&city=${location.value}&page=${page}&perPage=${perPage.value}`);
    companies.value = res.data.companies;
    currentPage.value = res.data.pagination.currentPage;
    perPage.value = res.data.pagination.perPage;
    lastPage.value = res.data.pagination.totalPages;
    totalCompanies.value = res.data.pagination.totalCompanies;
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
  getCompanies(currentPage.value);
});

watch(currentPage, (newPage) => {
  getCompanies(newPage);
});

const filterCompanies = () => {
  getCompanies(currentPage.value);
};


onMounted( () => {
  getCompanies();
})
</script>

<template>
  <section class="job-filters py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class=" bg-main2 text-center rounded-xl text-sm px-3 md:px-10 py-10">
        <h2 class="text-xl md:text-3xl font-bold mb-3">Browse Companies</h2>
        <p>Discover a diverse range of companies committed to excellence <br> in their respective industries.
        </p>
        <div class="flex flex-col lg:flex-row justify-between items-center px-4 py-5 md:py-3 md:w-2/3 mx-auto mt-10 gap-2 bg-white rounded">
          
          <!-- Company Input -->
          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-3 shadow-sm">
            <i class="fas fa-building text-gray-400"></i>
            <input 
              type="text" 
              v-model="companyName"
              placeholder="Company" 
              @input="getCompanies"
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <!-- Location Input -->
          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-3 shadow-sm">
            <i class="fas fa-location-dot text-gray-400"></i>
            <input 
              type="text" 
              v-model="location"
              @input="getCompanies"
              placeholder="Location" 
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <!-- Search Button -->
          <button @click="filterCompanies" class="w-full lg:w-auto bg-main text-white hover-up py-3 px-2 mt-3 md:mt-0 rounded-md hover:bg-hover text-nowrap transition">
            <i class="fas fa-search mr-1"></i> Search Company
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
              <!-- <div>
                <label for="sort" class="sr-only">Sort by</label>
                <select id="sort" name="sort" class="block w-full border border-gray-300 rounded focus:border-main">
                  <option>Sort by</option>
                  <option>Rating</option>
                  <option>Date</option>
                </select>
              </div> -->
            </div>
        </div>
        <hr class="mt-2">

        <div class="grid gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-10">
    
            <div v-for="(company, index) in companies" :key="index" class="bg-white py-8 rounded-lg border flex justify-center flex-col items-center shadow-hover-up">
                <img :src="company.companyLogo" alt="Company Logo" class="w-16 h-16 rounded mx-auto mb-4">
                <RouterLink :to="`/company-detail/${company._id}`" class="text-xl font-semibold hover:text-main mb-4">{{ company.companyName }}</RouterLink>
                <div class="flex justify-center items-center space-x-1 text-xs text-yellow-400">
                   <i class="fas fa-star text-yellow-400"></i>
                   <span class="text-gray-600">(46)</span>
                </div>
                <p class="text-sm text-gray-500 text-xs">{{ company.address.city }}</p>
                <button class="mt-8 px-4 py-2 bg-main2 text-gray-600 hover:text-main font-semibold rounded-md">{{ company.openJobs }} Job Open</button>
            </div>
        </div>

      <div class="pagination-container">
        <!-- <div class="pages-count text-sm text-green-600">Page {{ currentPage + ' of ' + lastPage}}</div> -->
        <vue-awesome-paginate
          :total-items="totalCompanies"
          :items-per-page="perPage"
          :max-pages-shown="lastPage"
          v-model="currentPage"
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
  