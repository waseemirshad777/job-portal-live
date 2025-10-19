<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useLoadingStore } from '@/store/loadingStore';
import Loading from '@/components/WebLayout/Loading.vue';
import { useAuthStore } from '@/store/authStore';
import { useToast } from 'vue-toast-notification';
import Subscribe from '@/components/Home/Subscribe.vue';
import { RouterLink } from 'vue-router';
const toast = useToast();
const store = useAuthStore();
const loadingStore = useLoadingStore();

const title = ref('');
const applyEmail = ref('');
const jobType = ref('');
const jobCategory = ref('');
const jobTags = ref('');
const jobSkills = ref('');
const company = ref(''); 
const location = ref('');
const salaryFrom = ref('');
const salaryTo = ref('');
const salaryCurrency = ref('');
const experience = ref('');
const description = ref('');
const requirements = ref('');
const closingDate = ref('');
const jobImage = ref(null);


function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    jobImage.value = file;
  }
}


const errorMessage = ref({
  title: '',
  applyEmail: '',
  jobType: '',
  jobCategory: '',
  jobTags: '',
  jobSkills: '',
  company: '',
  location: '',
  description: '',
  requirements: '',
  jobImage: '',
});

const jobPost = async () => {
  const jobData = new FormData();
  jobData.append('employerId', store.user._id);
  jobData.append('title', title.value);
  jobData.append('applyEmail', applyEmail.value);
  jobData.append('jobType', jobType.value);
  jobData.append('jobCategory', jobCategory.value);
  jobData.append('jobTags', jobTags.value);
  jobData.append('jobSkills', jobSkills.value);
  jobData.append('company', company.value);
  jobData.append('location', location.value);
  jobData.append('salaryFrom', salaryFrom.value);
  jobData.append('salaryTo', salaryTo.value);
  jobData.append('salaryCurrency', salaryCurrency.value);
  jobData.append('experience', experience.value);
  jobData.append('description', description.value);
  jobData.append('requirements', requirements.value);
  jobData.append('closingDate', closingDate.value);
  jobData.append('jobImage', jobImage.value);

  try {
    loadingStore.show();
    const response = await axios.post('/job/post', jobData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
   
    if (response.data.status === 201) {
      toast.open({
        message: 'Job Posted Successfully!',
        type: 'success',
        position: 'top-right', 
      });
      
       // Clear all form fields
       title.value = '';
       applyEmail.value = '';
       jobType.value = '';
       jobCategory.value = '';
       jobTags.value = '';
       jobSkills.value = '';
       company.value = '';
       location.value = '';
       salaryFrom.value = '';
       salaryTo.value = '';
       salaryCurrency.value = '';
       experience.value = '';
       description.value = '';
       requirements.value = '';
       closingDate.value = '';
       jobImage.value = null;

       errorMessage.value = '';

    }else if(response.data.status === 422) {
      errorMessage.value.title = response.data.message.title ? `${response.data.message.title}` : '';
      errorMessage.value.applyEmail = response.data.message.applyEmail ? `${response.data.message.applyEmail}` : '';
      errorMessage.value.jobType = response.data.message.jobType ? `${response.data.message.jobType}` : '';
      errorMessage.value.jobCategory = response.data.message.jobCategory ? `${response.data.message.jobCategory}` : '';
      errorMessage.value.jobTags = response.data.message.jobTags ? `${response.data.message.jobTags}` : '';
      errorMessage.value.jobSkills = response.data.message.jobSkills ? `${response.data.message.jobSkills}` : '';
      errorMessage.value.company = response.data.message.company ? `${response.data.message.company}` : '';
      errorMessage.value.location = response.data.message.location ? `${response.data.message.location}` : '';
      errorMessage.value.description = response.data.message.description ? `${response.data.message.description}` : '';
      errorMessage.value.requirements = response.data.message.requirements ? `${response.data.message.requirements}` : '';
      errorMessage.value.jobImage = response.data.message.jobImage ? `${response.data.message.jobImage}` : '';
    }
   
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.hide();  // Hide the loading spinner
  }
};



const categories = ref([]);
const getCategories = async () => {
  const response = await axios.get('/categories');
  categories.value = response.data.categories;
  console.log(response.data)
};

const companies = ref([]);
const getCompanies = async () => {
  try {
    const response = await axios.get(`/employer-company/${store.user._id}`);
    
    if(response.data.length >= 1) {
      companies.value = response.data;
      console.log(companies.value)
    }

  } catch (error) {
    console.error('Error:', error);
  }
};
onMounted( () => {
  getCategories();
  getCompanies();
})
</script>

<template>
  <Loading />
  <section class="job-dashboard mt-16 py-10">
    <div class="w-full h-40 flex items-center" style="background-image: url('/src/assets/images/bg-breadcrumb.png');">
      <div class="text-dark max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between">
        <p class="text-xl lg:text-3xl font-bold">Post a Job</p>
        <div class="text-xs rounded text-gray-400 bg-white py-2 px-3 mt-3 sm:mt-0 w-max">
          <i class="fas fa-home mr-2"></i> <RouterLink to="/">Home</RouterLink>
          <i class="fas fa-chevron-right mx-3"></i> Post a Job
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
      <form @submit.prevent="jobPost" class="mt-16 text-sm">
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Title <span class="text-red-500">*</span></label>
            <input type="text" v-model="title" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Full Stack Engineer">
            <p class="text-red-500 text-sm">{{ errorMessage.title }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Location <span class="text-red-500">*</span></label>
            <input type="text" v-model="location" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Lahore">
            <p class="text-red-500 text-sm">{{ errorMessage.location }}</p>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Type <span class="text-red-500">*</span></label>
            <select v-model="jobType" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <option value="">Select Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>
            <p class="text-red-500 text-sm">{{ errorMessage.jobType }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Tags <span class="text-red-500">*</span></label>
            <input type="text" v-model="jobTags" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g PHP, Vue.js, JavaScript">
            <p class="text-red-500 text-sm">{{ errorMessage.jobTags }}</p>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Category <span class="text-red-500">*</span></label>
            <select v-model="jobCategory" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <option v-for="(ctg, index) in categories" :Key="index" :value="ctg._id">{{ ctg.categoryName }}</option>
            </select>
            <p class="text-red-500 text-sm">{{ errorMessage.jobCategory }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Skills <span class="text-red-500">*</span></label>
            <input type="text" v-model="jobSkills" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="HTML, CSS, JavaScript">
            <p class="text-red-500 text-sm">{{ errorMessage.jobSkills }}</p>
          </div>
        </div>
                  
        <div class="mt-6">
          <label  class="block text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
          <textarea v-model="description" rows="5" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          <p class="text-red-500 text-sm">{{ errorMessage.description }}</p>
        </div>
        <div class="mt-6">
          <label  class="block text-sm font-medium text-gray-700">Requirements <span class="text-red-500">*</span></label>
          <textarea v-model="requirements" rows="5" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          <p class="text-red-500 text-sm">{{ errorMessage.requirements }}</p>
        </div>
        <div class="grid md:grid-cols-4 gap-6 mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Closing Date </label>
            <input type="date" v-model="closingDate" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Salary From </label>
            <input type="number" v-model="salaryFrom" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g 1000">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Salary To </label>
            <input type="number" v-model="salaryTo" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g 2000">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Sallary Currency </label>
            <input type="text" v-model="salaryCurrency" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g USD">
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Image <span class="text-red-500">*</span></label>
            <input type="file" @change="handleFileChange($event)" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
            <p class="text-red-500 text-sm">{{ errorMessage.jobImage }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Experience </label>
            <input type="text" v-model="experience" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="10 Year">
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Company Name <span class="text-red-500">*</span></label>
            <select v-model="company" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <option value="">Select Type</option>
              <option v-for="(cmp, index) in companies" :key="index"  :value="cmp._id">{{ cmp.companyName }}</option>
            </select>
            <p class="text-red-500 text-sm">{{ errorMessage.company }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Apply Link Email <span class="text-red-500">*</span></label>
            <input type="email" v-model="applyEmail"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="contact@gmail.com">
            <p class="text-red-500 text-sm">{{ errorMessage.applyEmail }}</p>
          </div>
        </div>
                  
        <button class="mt-6 bg-main hover-up hover:bg-hover px-4 py-3 rounded-lg text-white font-semibold">Post Job</button>
      </form>
    </div>
  </section>

  <Subscribe />

</template>


<style scoped>

</style>