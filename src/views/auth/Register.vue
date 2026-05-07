<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { successToast, errorToast } from '@/utils/util-functions'
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmpassword = ref('');
const role = ref('');
const username = ref('');

const errorMessage = ref({
 
  password: '',
  confirmPassword: '',
  email: '',
  role: '',
  username: '',
});

const register = async () => {
  const userData = new FormData();
  userData.append('email', email.value);
  userData.append('password', password.value);
  userData.append('confirmPassword', confirmpassword.value);
  userData.append('role', role.value);
  userData.append('username', username.value);

  try {
    const response = await axios.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
   
    if (response.data.status === 201) {
      successToast('Account created successfully!')
      router.push({
        path: '/resend-email',
        query: { email: email.value }
      })
    }else if(response.data.status === 422 || response.data.status === 401) {
      errorMessage.value.password = response.data.message.password ? `${response.data.message.password}` : '';
      errorMessage.value.confirmPassword = response.data.message.confirmPassword ? `${response.data.message.confirmPassword}` : '';
      errorMessage.value.username = response.data.message.username ? `${response.data.message.username}` : '';
      errorMessage.value.email = response.data.message.email ? `${response.data.message.email}` : '';
      errorMessage.value.role = response.data.message.role ? `${response.data.message.role}` : '';
    }
   
  } catch (error) {
    console.error(error)
  }
};



function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    profile_photo.value = file;
  }
}

const categories = ref([]);
const fetchCategories = async () => {
  const response = await axios.get('/categories');
  categories.value = response.data.categories;
};

onMounted( ()=> {
  fetchCategories();
})
</script>

<template>
    <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border mt-16 sm:mx-auto sm:w-full sm:max-w-md p-4 rounded-lg">
        <div class="">
          <!-- <img class="mx-auto" src="https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/template/jobhub-logo.svg" alt="Logo" /> -->
          <h2 class="mt-5 text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
        </div>

        <div class="mt-10 ">
          <form @submit.prevent="register" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700">Username <span class="text-red-500">*</span></label>
              <input v-model="username" type="text" placeholder="john"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <p class="text-red-500 text-sm">{{ errorMessage.username }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email Address <span class="text-red-500">*</span></label>
              <input v-model="email" type="email" placeholder="john@gmail.com"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <p class="text-red-500 text-sm">{{ errorMessage.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Password <span class="text-red-500">*</span></label>
              <input v-model="password" type="password" placeholder="********"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <p class="text-red-500 text-sm">{{ errorMessage.password }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Confirm Password <span class="text-red-500">*</span></label>
              <input v-model="confirmpassword" type="password" placeholder="********"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <p class="text-red-500 text-sm">{{ errorMessage.confirmPassword }}</p>
            </div>

            <div class="flex items-center space-x-4">
              <p class="font-semibold text-gray-700">Register as:</p>
              <div class="flex items-center space-x-2">
                <input type="radio" id="recruiter" v-model="role" value="employer" class="form-radio h-4 w-4 text-blue-600">
                <label for="recruiter" class="text-gray-600">Recruiter</label>
              </div>
              <div class="flex items-center space-x-2">
                <input type="radio" id="candidate" v-model="role" value="employee" class="form-radio h-4 w-4 text-blue-600">
                <label for="candidate" class="text-gray-600">Candidate</label>
              </div>
            </div>
            <p class="text-red-500 text-sm">{{ errorMessage.role }}</p>
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-main hover-up p-3 text-sm font-semibold text-white shadow-sm hover:bg-hover ">
                Register
              </button>
            </div>
          </form>

         <p class="mt-10 text-center text-sm text-gray-500">
           Already a member? 
           <RouterLink to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</RouterLink>
         </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>


</style>
