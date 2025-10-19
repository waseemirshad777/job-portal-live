<script setup>
import Dashboard from '@/components/DashboardLayout/dashboard.vue';
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import router from '@/router';
const toast = useToast();


const jobs = ref([]);
async function getJobs() {
  try {
    const { data } = await axios.get(`/jobs`);
    jobs.value = data.jobs;
    console.log(data);

  } catch (error) {
    console.error(error);
  }
};



const jobId = ref(''); 

const editModal = ref(false);
const title = ref('');
const email = ref('');
const employerId = ref('');
const jobType = ref('');
const companyName = ref(''); 
const location = ref('');
const salaryFrom = ref('');
const salaryTo = ref('');
const gender = ref('');
const experience = ref('');
const description = ref('');
const requirements = ref('');
const jobImage = ref(null);

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    jobImage.value = file;
  }
}

function showEditModal(job) {
  jobId.value = job._id;
  title.value = job.title;
  email.value = job.employer_email;
  employerId.value = job.employer_id;
  jobType.value = job.job_type;
  companyName.value = job.company_name;
  location.value = job.location;
  salaryFrom.value = job.salary_from;
  salaryTo.value = job.salary_to;
  gender.value = job.gender;
  experience.value = job.experience;
  description.value = job.description;
  requirements.value = job.requirements;

  editModal.value = true;
}

async function updateJob() {
  const jobData = new FormData();
  jobData.append('title', title.value);
  jobData.append('employer_email', email.value);
  jobData.append('employer_id', employerId.value);
  jobData.append('job_type', jobType.value);
  jobData.append('company_name', companyName.value);
  jobData.append('location', location.value);
  jobData.append('salary_from', salaryFrom.value);
  jobData.append('salary_to', salaryTo.value);
  jobData.append('gender', gender.value);
  jobData.append('experience', experience.value);
  jobData.append('description', description.value);
  jobData.append('requirements', requirements.value);
  jobData.append('job_image', jobImage.value);

  try {
    const res = await axios.put(`/updatejob/${jobId.value}`, jobData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    editModal.value = false;
    window.location.reload();

  } catch (error) {
    toast.error('Failed to update job');
  }
}

const deletejob = async (jobId) => {
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

onMounted(getJobs);
</script>

<template>
  <Dashboard>
    <h1 class="text-2xl font-semibold text-gray-800">Jobs Listing</h1>
    <div class="overflow-x-auto mt-7">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Image</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comapny</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(job, index) in jobs" :key="job._id">
            <!-- Photo -->
            <td class="px-6 py-3 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img :src="`http://localhost:3000/${job.jobImage}`" alt="User Photo" class="h-10 w-10 rounded-full">
                </div>
              </div>
            </td>
            <!-- Name -->
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ job.title }}</div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ job.company.companyName }}</div>
            </td>
            <!-- Email -->
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ job.location }}</div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ '$' + job.salaryFrom + ' -  $' + job.salaryTo }}</div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ job.jobType }}</div>
            </td>
            <!-- Action (Edit & Delete Icons) -->
            <td class="px-4 py-3 whitespace-nowrap ">
              <!-- <Icon @click="showEditModal(job)" icon="bi:pencil-square" class="h-5 w-5 cursor-pointer text-green-600" /> -->
              <Icon @click="deletejob(job._id)" icon="bi:trash" class="h-5 w-5 cursor-pointer text-red-600" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Dashboard>


  <!-- Edit Modal -->
  <div v-if="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">Edit Job</h2>
      <form @submit.prevent="updateJob">
        <div class="space-y-2">
            <div class="md:flex md:space-x-4">
                <div class="md:w-1/2">
                    <label class="text-sm text-gray-700">Title</label>
                    <input v-model="title" type="text" class="w-full  p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
                <div class="md:w-1/2"> 
                    <label class="text-sm text-gray-700">Comapny Name</label>
                    <input v-model="companyName" type="text" class="w-full  p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
            </div>
            <div class="md:flex md:space-x-4">
                <div class="md:w-1/2">
                    <label class="text-sm text-gray-700">Location</label>
                    <input v-model="location" type="text" class="w-full  p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
                <div class="md:w-1/2"> 
                    <label class="text-sm text-gray-700">Job Type</label>
                    <select v-model="jobType" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600 sm:text-sm focus:outline-none">
                        <option value="">Select an option</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part time</option>
                    </select>
                </div>
            </div>
            <div class="md:flex md:space-x-4">
                <div class="md:w-1/2">
                    <label class="text-sm text-gray-700">Salary From</label>
                    <input v-model="salaryFrom" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
                <div class="md:w-1/2"> 
                    <label class="text-sm text-gray-700">Salary To</label>
                    <input v-model="salaryTo" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
            </div>
            <div class="md:flex md:space-x-4">
                <div class="md:w-1/2">
                    <label class="text-sm text-gray-700">Gender</label>
                    <input v-model="gender" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
                <div class="md:w-1/2"> 
                    <label class="text-sm text-gray-700">Experience</label>
                    <input v-model="experience" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
            </div>
            <div class="md:flex md:space-x-4">
                <div class="md:w-1/2">
                    <label class="text-sm text-gray-700">Description</label>
                    <input v-model="description" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
                <div class="md:w-1/2"> 
                    <label class="text-sm text-gray-700">Requirements</label>
                    <input v-model="requirements" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600" />
                </div>
            </div>
          <div>
            <label for="edit-image" class="text-sm text-gray-700">Image</label>
            <input id="image" @change="handleFileChange($event)" type="file" class="block w-full py-1 px-1 h-full text-gray-900 rounded-md ring-1 ring-gray-300 cursor-pointer" />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-4">
          <button type="button" @click="editModal = false" class="bg-gray-400 text-white font-bold py-2 px-4 rounded-md">Cancel</button>
          <button type="submit" class="bg-main text-white font-bold py-2 px-4 rounded-md">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>
  

  
  <style scoped>
  </style>
  