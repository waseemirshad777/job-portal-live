<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { format } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import MyAccountBanner from '@/components/MyAccountBanner.vue';
const store = useAuthStore();
const router = useRouter();

const isEmployeeOrAdmin = store.isEmployeeOrAdmin;
const isEmployerOrAdmin = store.isEmployerOrAdmin;

async function logout() {
  await store.logout(); 
  router.push('/'); 
}

const applications  = ref([]);
const appliedJobs = async() => {
  const res = await axios.get(`/applied-jobs/${store.user._id}`);
  applications.value = res.data;
  console.log(applications.value)
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, 'dd MMMM yyyy'); 
}

onMounted( () => {
  appliedJobs();
})
</script>


<template>
    <section class="job-dashboard mt-20 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
            <MyAccountBanner />

            <hr class="mt-20 mb-10">

            <div class="flex flex-col lg:flex-row text-sm">
                <!-- Sidebar -->
                <div class="w-full lg:w-1/4 lg:p-4 lg:border-r">
                  <ul class="space-y-4">
                    <RouterLink to="/my-account" class="flex items-center px-4 py-2 border rounded-lg hover:border-main hover:text-main hover-up">
                      <span  class=""> <i class="fas fa-user-tie mr-4 text-gray-400"></i>My Account</span>
                    </RouterLink>
                    <RouterLink v-if="isEmployeeOrAdmin" to="/my-resume" class="flex items-center px-4 py-2 border rounded-lg hover:border-main  hover:text-main hover-up">
                        <span  class=""> <i class="fas fa-user-tie mr-4 text-gray-400"></i>My Resume</span>
                      </RouterLink>
                    <RouterLink v-if="isEmployeeOrAdmin" to="/past-applications" class="flex items-center px-4 py-2 border rounded-lg border-main  hover:text-main hover-up">
                        <span  class="text-main"> <i class="fas fa-file mr-4 text-gray-400"></i>Past Applications</span>
                      </RouterLink>
                    <RouterLink v-if="isEmployerOrAdmin" to="/my-company" class="flex items-center px-4 py-2 border rounded-lg hover:border-main hover:text-main hover-up">
                      <span  class=""><i class="fa-regular fa-building mr-4 text-gray-400"></i>My Company</span>
                    </RouterLink>
                    <RouterLink v-if="isEmployerOrAdmin" to="/jobs-dashboard" class="flex items-center px-4 py-2 border rounded-lg hover:border-main hover:text-main hover-up">
                      <span  class=""> <i class="fas fa-briefcase mr-4 text-gray-400"></i>Jobs Dashboard</span>
                    </RouterLink>
                    <RouterLink to="/account-detail" class="flex items-center px-4 py-2 border rounded-lg hover:border-main hover:text-main hover-up">
                      <span  class=""><i class="fa-solid fa-gear mr-4 text-gray-400"></i>Account Details</span>
                    </RouterLink>
                    <!-- <RouterLink v-if="isEmployeeOrAdmin" to="/saved-jobs" class="flex items-center px-4 py-2 border rounded-lg hover:border-main hover:text-main hover-up">
                        <span  class=""><i class="fa-solid fa-heart mr-4 text-gray-400"></i>Saved Jobs</span>
                      </RouterLink> -->
                    <a href="" @click="logout" class="flex items-center px-4 py-2 border rounded-lg hover:border-main hover:text-main hover-up">
                      <span class="text-red-600"><i class="fa-solid fa-right-from-bracket mr-4 text-gray-400"></i>Logout</span>
                    </a>
                  </ul>
                </div>

                <!-- Main Content -->
                <div class="w-full lg:w-3/4 lg:px-8 mt-5 lg:mt-0">
                  <h2 class="text-lg font-semibold mb-4">Your listings are shown in the table below.</h2>
            
                  <table class="min-w-full border">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="py-2 px-4 text-left font-semibold">Title</th>
                        <th class="py-2 px-4 text-left font-semibold">Company</th>
                        <th class="py-2 px-4 text-left font-semibold">Closing Date</th>
                      </tr>
                    </thead>
                    <tbody >
                      <tr v-for="(application , index) in applications" :key="index">
                        <td class="text-sm py-2 px-4  text-gray-600">{{ application.job.title }}</td>
                        <td class="text-sm py-2 px-4  text-gray-600" v-if="application.job">{{ application.job.company.companyName }}</td>
                        <td class="text-sm py-2 px-4  text-gray-600">{{ formatDate(application.job.closingDate) }}</td>
                      </tr>
                    </tbody>
                  </table>
          
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped>
.profile-pic {
    left: 20px;
    bottom: -70px;
}
</style>