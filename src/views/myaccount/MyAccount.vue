<script setup>
import MyAccountBanner from '@/components/MyAccountBanner.vue';
import { useAuthStore } from '@/store/authStore';
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
const store = useAuthStore();
const router = useRouter();

const isEmployeeOrAdmin = store.isEmployeeOrAdmin;
const isEmployerOrAdmin = store.isEmployerOrAdmin;

async function logout() {
  await store.logout(); 
  router.push('/'); 
}
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
                  <RouterLink to="/my-account" class="flex items-center px-4 py-2 border rounded-lg border-main hover:text-main hover-up">
                    <span  class="text-main"> <i class="fas fa-user-tie mr-4 text-gray-400"></i>My Account</span>
                  </RouterLink>
                  <RouterLink v-if="isEmployeeOrAdmin" to="/my-resume" class="flex items-center px-4 py-2 border rounded-lg hover:border-main  hover:text-main hover-up">
                      <span  class=""> <i class="fas fa-user-tie mr-4 text-gray-400"></i>My Resume</span>
                    </RouterLink>
                  <RouterLink v-if="isEmployeeOrAdmin" to="/past-applications" class="flex items-center px-4 py-2 border rounded-lg hover:border-main  hover:text-main hover-up">
                      <span  class=""> <i class="fas fa-file mr-4 text-gray-400"></i>Past Applications</span>
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
                <p class="text-gray-500 text-medium">Hello <b>{{ store.user.username }}</b> (not <b>{{ store.user.username }}</b>? <button @click="logout">Log out</button>)</p>
                <p v-if="isEmployeeOrAdmin" class="text-gray-500 text-medium mt-3">
                    Welcome to your account! Here you can view and manage your personal details, update your profile information, and track your job applications. Keep your profile up to date for the best experience.
                </p>
                <p v-if="isEmployerOrAdmin" class="text-gray-500 text-medium mt-3">
                  Welcome to your employer dashboard! Manage your company profile, post new job openings, review applications, and connect with potential candidates. Keep your listings up to date to attract the best talent.
                </p>

                <div class="mt-8 space-x-8">
                  <!-- <RouterLink v-if="isEmployerOrAdmin" to="jobs-dashboard" class="hover-up inline-block bg-main px-4 py-3 text-white font-semibold rounded-lg">Jobs Dashboard</RouterLink> -->
                  <RouterLink v-if="isEmployerOrAdmin" to="job-post" class="inline-block hover-up bg-main px-4 py-3 text-white font-semibold rounded-lg">Post a Job</RouterLink>
                  <RouterLink v-if="isEmployeeOrAdmin" to="past-applications" class="inline-block hover-up bg-main px-4 py-3 text-white font-semibold rounded-lg">My Applications</RouterLink>
                  <RouterLink v-if="isEmployeeOrAdmin" to="my-resume" class="inline-block bg-main hover-up px-4 py-3 text-white font-semibold rounded-lg">My Resume</RouterLink>
                </div>
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
  