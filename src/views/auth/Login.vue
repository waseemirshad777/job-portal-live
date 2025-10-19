<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
const store = useAuthStore();

const email = ref('');
const password = ref('');

const errorMessage = ref({
  password: '',
  email: '',
})

const login = async () => {
  try {
    const response = await axios.post('/auth/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.status === 201) {
      const user = response.data.user;
      store.setUser(user);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
      window.location
    }else if(response.data.status === 422) {
      errorMessage.value.password = response.data.message.password ? `${response.data.message.password}` : '';
      errorMessage.value.email = response.data.message.email ? `${response.data.message.email}` : '';
    }else if(response.data.status === 401) {
      errorMessage.value.password = response.data.message.password ? `${response.data.message.password}` : '';
      errorMessage.value.email = response.data.message.email ? `${response.data.message.email}` : '';
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
 await store.logout()
})

</script>

<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border mt-16 sm:mx-auto sm:w-full sm:max-w-md p-4 rounded-lg">
        <div class="">
          <!-- <img class="mx-auto" src="https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/template/jobhub-logo.svg" alt="Logo" /> -->
          <h2 class="mt-5 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <div class="mt-10 ">
          <form @submit.prevent="login" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email Address <span class="text-red-500">*</span></label>
              <input v-model="email" type="email" placeholder="john@gmail.com"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <p class="text-red-500 text-sm">{{ errorMessage.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Password <span class="text-red-500">*</span></label>
              <input v-model="password" type="password" placeholder="*********"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
              <p class="text-red-500 text-sm">{{ errorMessage.password }}</p>
            </div>
    
            <div>
              <RouterLink to="/forgot-password" class="font-semibold text-sm text-indigo-600 hover:text-indigo-500">forgot password ?</RouterLink>
            </div>
    
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-main hover-up p-3 text-sm font-semibold text-white shadow-sm hover:bg-hover ">
                Login
              </button>
            </div>
          </form>
    
          <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <RouterLink to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
/* input {
  outline: none;
  border: none;
} */
</style>