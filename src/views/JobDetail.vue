<script setup>
import { Icon } from '@iconify/vue';
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { format } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import { useToast } from 'vue-toast-notification';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const toast = useToast();
const store = useAuthStore();
const route = useRoute();
const role = ref('');



const getResumeId = async () => {
  try {
    const res = await axios.get(`/employee-resume/${store.user._id}`);
    employeeResume.value = res.data[0]._id;
  } catch (error) {
    console.error(error);
  }
};

const job = ref({});
const jobId = route.params.id;
const applyEmail = ref('');
const employerId = ref('');
const employerCompany = ref('');


const employeeId = store.user._id;
const employeeResume = ref('');


const fullName = ref('');
const email = ref('');
const resume = ref(null);
const jobTitle = ref('');
const message = ref('');

const errorMessage = ref({
  fullName: '',
  email: '',
  resume: '',
  jobTitle: '',
});

if (store.user) {
  role.value = store.user.role;
  fullName.value = store.user.username;
  email.value = store.user.email;
}

const getJobDetail = async () => {
  try {
    const res = await axios.get(`/job/${jobId}`);
    job.value = res.data;
    jobTitle.value = job.value.title;
    employerId.value = job.value.employerId;
    applyEmail.value = job.value.applyEmail;
    employerCompany.value = job.value.company._id;

    console.log(res.data)
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getJobDetail();
  getResumeId();
});

const applyForJob = async () => {
  const formData = new FormData();
  formData.append('employeeId', employeeId);
  formData.append('employeeResume', employeeResume.value);
  formData.append('employerId', employerId.value);
  formData.append('employerCompany', employerCompany.value);
  formData.append('job', jobId);
  formData.append('applyEmail', applyEmail.value);

 
  formData.append('resume', resume.value);
  formData.append('jobTitle', jobTitle.value);
  formData.append('fullName', fullName.value);
  formData.append('email', email.value);

  try {
    const res = await axios.post(`/apply/job`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    

    if(res.data.status === 422) {
      errorMessage.value.fullName = res.data.message.fullName ? `${res.data.message.fullName}` : '';
      errorMessage.value.email = res.data.message.email ? `${res.data.message.email}` : '';
      errorMessage.value.resume = res.data.message.resume ? `${res.data.message.resume}` : '';
      errorMessage.value.jobTitle = res.data.message.jobTitle ? `${res.data.message.jobTitle}` : '';
      
    }else if (res.status == 200) {
      toast.open({
        message: 'Applied Successfully!',
        type: 'success',
        position: 'top-right', 
      });
      name.value = '';
      email.value = '';
      resume.value = null;
      errorMessage.value = '';
    }
    
    

  } catch (error) {
    console.error(error);
    message.value = 'Failed to send application. Please try again later.';
  }
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, 'dd MMMM yyyy'); 
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    resume.value = file;
  }
}

const timeAgo = (createdAt) => {
  return dayjs(createdAt).fromNow();
};





</script>


<template>
  <section class="job-detail mt-20 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
      <div class="bg-cover bg-center h-72 rounded-xl" style="background-image: url('/images/job-single.svg');"></div>
      <div class="my-8">
        <h2 class="text-xl font-bold hover:text-main">{{ job.title }}</h2>
        <p class="mt-2 text-xs text-gray-400 flex items-center space-x-4 font-medium">
          <span>
            <i class="fa-solid fa-briefcase mr-1"></i> {{ job.jobType }}
          </span>
          <span>
            <i class="fa-regular fa-clock mr-1"></i> {{ timeAgo(job.createdAt) }}
          </span>
        </p>
      </div>

      <hr class="my-10">

      <section class="grid grid-cols-10 gap-4">
        <div class="col-span-7 pl-2 pr-10">
          <h2 v-if="job.company" class="text-xl font-bold mb-4">Welcome to {{ job.company.companyName }}</h2>
          <p v-if="job.company" class="text-sm">{{ job.company.aboutCompany }}</p>
          
          <h2 class="text-xl font-bold my-5">Essential Knowledge, Skills, and Experience</h2>
          <ul v-if="job.jobSkills" v-for="skill in job.jobSkills.split(',')" class="list-outside list-disc pl-8 leading-loose">
            <li>{{ skill.trim() }}</li>
          </ul>

          <h2 class="text-xl font-bold my-5">Requirements</h2>
          <p>{{ job.requirements }}</p>
          <h2 class="text-xl font-bold my-5">Description</h2>
          <p>{{ job.description }}</p>

          <hr class="my-10">
          <form @submit.prevent="applyForJob">
            <div class="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Job Title <span class="text-red-500">*</span></label>
                <input type="text" v-model="jobTitle" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Full Stack Engineer">
                <p class="text-red-500 text-sm">{{ errorMessage.jobTitle }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
                <input type="text" v-model="fullName" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="">
                <p class="text-red-500 text-sm">{{ errorMessage.fullName }}</p>
              </div>
            </div>
            <div class="mt-6">
              <label  class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
              <input type="text" v-model="email" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="">
              <p class="text-red-500 text-sm">{{ errorMessage.email }}</p>
            </div>
            <div class="mt-6">
              <label  class="block text-sm font-medium text-gray-700">Upload Resume <span class="text-red-500">*</span></label>
              <input type="file" @change="handleFileChange($event)"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <p class="text-red-500 text-sm">{{ errorMessage.resume }}</p>
            </div>
            <button class="mt-5 border rounded-lg hover-up py-2 px-3 bg-main hover:bg-hover text-white">Apply Now</button>
          </form>
        </div>
        
        <div class="col-span-3">
          <div v-if="job.company" class="border rounded-lg p-4">
            <div class="flex items-center gap-4">
              <img :src="job.company.companyLogo" alt="Job Category"  class="rouded-lg w-20 h-20">
              <div>
                <h3 class="font-bold  text-xl hover:text-main">{{ job.company.companyName }}</h3>
                <p class="text-xs flex flex-col gap-5 text-gray-500">
                  <span><i class="fa-solid fa-location-dot mr-1"></i> {{ job.company.address.city }}</span>
                  <span> {{ job.company.openJobs }}</span>
                </p>
              </div>
            </div>
            <hr class="my-10">
            <!-- <div class="map h-40 rounded-lg bg-main2"></div> -->
            <ul class="list-outside list-disc pl-4 leading-loose my-5">
              <li v-if="job.company.address">{{ job.company.address.fullAddress + ' ' + job.company.address.state + ' ' + job.company.address.country }}</li>
              <li v-if="job.company.contactInfo">Phone : {{ job.company.contactInfo.phone }}</li>
              <li v-if="job.company.contactInfo">Email : {{ job.company.contactInfo.email }}</li>
            </ul>
          </div>
          <div class="border rounded-lg p-4 mt-10">
            <h2 class="text-xl font-bold">Similiar jobs</h2>

            <div>
              <hr class="my-5">
              <div class="flex items-center gap-4 text-dark">
                <img src="https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-7.svg" alt="Job Category" class="w-12 h-12">
                <div>
                  <h3 class="font-bold text-sm hover:text-main">Full Stack Engineer</h3>
                  <p class="mt-2 text-xs text-gray-400 flex items-center space-x-4 font-medium">
                    <span>
                      <i class="fa-solid fa-briefcase mr-1"></i> Full Time
                    </span>
                    <span>
                      <i class="fa-regular fa-clock mr-1"></i> Posted 21 days ago
                    </span>
                  </p>
                </div>
              </div>
              <p class="text-xs flex justify-end text-gray-500 mt-3">
                <span><i class="fa-solid fa-location-dot mr-1"></i> Chicago, US</span>
              </p>
            </div>
            <div>
              <hr class="my-5">
              <div class="flex items-center gap-4 text-dark">
                <img src="https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-14.svg" alt="Job Category" class="w-12 h-12">
                <div>
                  <h3 class="font-bold text-sm hover:text-main">Backend Developer</h3>
                  <p class="mt-2 text-xs text-gray-400 flex items-center space-x-4 font-medium">
                    <span>
                      <i class="fa-solid fa-briefcase mr-1"></i> Full Time
                    </span>
                    <span>
                      <i class="fa-regular fa-clock mr-1"></i> Posted 2 days ago
                    </span>
                  </p>
                </div>
              </div>
              <p class="text-xs flex justify-end text-gray-500 mt-3">
                <span><i class="fa-solid fa-location-dot mr-1"></i> Washington, US</span>
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  </section>
</template>



<style scoped>
.post-job-hero {
  height: 45vh;
}

</style>