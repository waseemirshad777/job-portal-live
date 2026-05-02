<script setup>
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useToast } from 'vue-toast-notification';
import { ref, onMounted } from 'vue';
import MyAccountBanner from '@/components/MyAccountBanner.vue';
import { useRouter } from 'vue-router';
const toast = useToast();
const store = useAuthStore();
const router = useRouter();

const isEmployeeOrAdmin = store.isEmployeeOrAdmin;
const isEmployerOrAdmin = store.isEmployerOrAdmin;
const userId = store.user._id; 

const user = ref({});


const username = ref('');
const fname = ref('');
const lname = ref('');
const email = ref('');
const photo = ref(null);

onMounted(() => {
  user.value = store.user;
  username.value = store.user.username || '';
  fname.value = store.user.fname || '';
  lname.value = store.user.lname || '';
  email.value = store.user.email || '';
});
async function updateProfile() {
  const userData = new FormData();
  userData.append('email', email.value);
  if (photo.value) {
    userData.append('profilePhoto', photo.value);
  }
  
  userData.append('username', username.value);
  userData.append('fname', fname.value);
  userData.append('lname', lname.value);
  try {
    const res = await axios.put(`/user/update/${userId}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
    }
    });
    const user = res.data.user;
    store.setUser(user);
    toast.open({
        message: 'Updated Successfully!',
        type: 'success',
        position: 'top-right',
      });
    // window.location.reload();

  } catch (error) {
    toast.error('Failed to update profile');
  }
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    photo.value = file;
  }
}

const newPassword = ref('');
const oldPassword = ref('');
const errorMessage = ref('');

async function updatePassword() {
  try {
    const res = await axios.put(`/user/password/update/${userId}`,  {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });
    if(res.data.status === 401 || res.data.status === 422) {
      errorMessage.value = res.data.message ? `${res.data.message}` : '';
    }else if(res.status === 200) {
      store.logout();
      router.push('/login')
    }

  } catch (error) {
    toast.error('Failed to update profile');
  }
}

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
                    <RouterLink to="/my-account" class="flex items-center px-4 py-2 border rounded-lg hover:border-main hover:text-main hover-up">
                      <span  class=""> <i class="fas fa-user-tie mr-4 text-gray-400"></i>My Account</span>
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
                    <RouterLink to="/account-detail" class="flex items-center px-4 py-2 border rounded-lg border-main hover:text-main hover-up">
                      <span  class="text-main"><i class="fa-solid fa-gear mr-4 text-gray-400"></i>Account Details</span>
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
                    <form @submit.prevent="updateProfile">
                       <div class="grid grid-cols-2 gap-6">
                         <div>
                           <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
                           <input type="text" v-model="fname" id="first_name" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:border-main">
                         </div>
                         <div>
                           <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
                           <input type="text" v-model="lname" id="last_name" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:border-main">
                         </div>
                       </div>
                   
                       <div class="mt-6">
                         <label for="display_name" class="block text-sm font-medium text-gray-700">Display name <span class="text-red-500">*</span></label>
                         <input type="text" v-model="username" id="display_name" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                         <p class="mt-1 text-sm text-gray-500">This will be how your name will be displayed in the account section and in reviews. <span v-if="!username" class="text-red-500 text-sm">Username cannot be empty</span></p>
                       </div>

                       <div class="grid grid-cols-2 gap-6 mt-6">
                         <div>
                            <label for="email_address" class="block text-sm font-medium text-gray-700">Email address <span class="text-red-500">*</span></label>
                            <input type="email" v-model="email" id="email_address" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <p v-if="!email" class="text-red-500 text-sm">Email cannot be empty</p>
                         </div>
                         <div>
                           <label class="block text-sm font-medium text-gray-700">Profile Photo</label>
                           <input type="file" @change="handleFileChange($event)" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                         </div>
                       </div>
                       <button class="mt-6 bg-main hover-up hover:bg-hover px-3 py-2 rounded-lg text-white font-semibold">Save Changes</button>
                    </form>


                    <h2 class="text-xl lg:text-2xl font-medium text-gray-900 my-4">Password change</h2>

                    <form @submit.prevent="updatePassword">
                    
                        <div class="mb-6">
                          <label for="current_password" class="block text-sm font-medium text-gray-700">
                            Current password (leave blank to leave unchanged)
                          </label>
                          <input type="password" v-model="oldPassword" id="current_password" name="current_password" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        </div>
                      
                        <div class="mb-6">
                          <label for="new_password" class="block text-sm font-medium text-gray-700">
                            New password (leave blank to leave unchanged)
                          </label>
                          <input type="password" v-model="newPassword" id="new_password" name="new_password" class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:border-main">
                          <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
                        </div>
                        
                        <button class="bg-main hover-up hover:bg-hover px-3 py-2 rounded-lg text-white font-semibold">Change Password</button>
                    </form>
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