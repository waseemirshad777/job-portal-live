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


const employees = ref([]);
const currentPage = ref(1);
const totalEmployees = ref(0);
const lastPage = ref(0);
const perPage = ref(10);
const from = ref('');
const to = ref('');

const skill = ref('');
const name = ref(''); 

const getEmployees = async (page = 1) => {
  try {
    const res = await axios.get(`/resumes?fullName=${name.value}&skill=${skill.value}&page=${page}&perPage=${perPage.value}`);
    employees.value = res.data.resumes;
    currentPage.value = res.data.pagination.currentPage;
    perPage.value = res.data.pagination.perPage;
    lastPage.value = res.data.pagination.totalPages;
    totalEmployees.value = res.data.pagination.totalResumes;
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
  getEmployees(currentPage.value);
});

const paginationHandler = (page) => {
  currentPage.value = page;
  getEmployees(page);
};

const filterCompanies = () => {
  getEmployees(currentPage.value);
};


onMounted( () => {
  getEmployees();
})
</script>

<template>
  <section class="job-filters py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class=" bg-main2 text-center rounded-xl text-sm px-3 md:px-10 py-10">
        <h2 class="text-xl md:text-3xl font-bold mb-3">Browse Candidates</h2>
        <p>Find top candidates across industries and hire the perfect fit. <br> Start your search now!
        </p>
        <div class="flex flex-col lg:flex-row justify-between items-center px-4 py-5 md:py-3 md:w-2/3 mx-auto mt-10 gap-2 bg-white rounded">
          <!-- Keyword Input -->
          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-3 shadow-sm">
            <i class="fas fa-search text-gray-400"></i>
            <input 
              type="text" 
              v-model="skill"
              @input="getEmployees"
              placeholder="Search By Skills" 
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-3 shadow-sm">
            <i class="fas fa-user text-gray-400"></i>
            <input 
              type="text" 
              v-model="name"
              @input="getEmployees"
              placeholder="Search By Name" 
              class="ml-3 border-none focus:outline-none text-gray-700 text-sm"
            />
          </div>

          <!-- Search Button -->
          <button @click="filterCompanies" class="w-full lg:w-auto bg-main text-white hover-up py-3 px-2 mt-3 md:mt-0 rounded-md hover:bg-hover text-nowrap transition">
            <i class="fas fa-search mr-1"></i> Find Employees
          </button>
        </div>
      </div>

        <div class="flex justify-between items-center mt-20 px-2">
            <p class="text-sm text-gray-500">Showing {{ from }} to {{ to }} of {{ totalEmployees }}</p>
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

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
            <div v-for="(employee, index) in employees" :key="index" class="bg-white p-6 rounded-lg border shadow-hover-up text-center">
              <!-- Profile Picture -->
              <img :src="employee.profilePicture" alt="Profile Picture" class="w-24 h-24 rounded-full mx-auto mb-4">
              
              <!-- Name and Profession -->
              <RouterLink :to="`/employee-detail/${employee._id}`" class="text-lg hover:text-main transition font-semibold">{{ employee.fullName }}</RouterLink>
              <p class="text-sm text-gray-500">{{ employee.designation }}</p>
              
              <!-- Star Rating -->
              <div class="flex justify-center items-center text-yellow-400 mt-2">
                <i class="fas fa-star text-xs text-yellow-500"></i>
                <i class="fas fa-star text-xs text-yellow-500"></i>
                <i class="fas fa-star text-xs text-yellow-500"></i>
                <i class="fas fa-star text-xs text-yellow-500"></i>
                <i class="fas fa-star text-xs text-yellow-500"></i>
                <span class="text-gray-600 text-sm ml-3">(97)</span>
              </div>
              
              <!-- Short Bio -->
              <p class="text-sm text-gray-700 mt-4">{{ employee.aboutYourself }}</p>
              
              <!-- Skill Tags -->
              <div class="flex flex-wrap justify-center mt-4">
                <span v-if="employee.skills" v-for="(skill, index) in employee.skills.split(',')" :key="index" class="text-xs bg-gray-200 rounded-full px-3 py-1 m-1">{{ skill.trim() }}</span>
              </div>
              
              <hr class="my-8">
              <div class="flex justify-between items-center mt-6 text-sm text-gray-500">
                <!-- <div class="flex items-center space-x-1">
                  <i class="text-gray-400 fa-solid fa-location-dot mr-2"></i>
                  <span v-if="employee.address">{{ employee.address.fullAddress }}</span>
                </div> -->
                <div class="flex items-center space-x-1">
                  <span >{{ employee.expectedSalary }}</span>
                </div>
              </div>
            </div>
        </div>

      <div class="pagination-container">
        <!-- <div class="pages-count text-sm text-green-600">Page {{ currentPage + ' of ' + lastPage}}</div> -->
        <vue-awesome-paginate
          :total-items="totalEmployees"
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
  </section>
  <NewsBlog />
  <Subscribe />
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
  