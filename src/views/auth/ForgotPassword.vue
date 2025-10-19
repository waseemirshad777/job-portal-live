<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const emailError = ref('');
const router = useRouter();

const handleForgotPassword = async () => {
  emailError.value = '';

  if (!email.value) {
    emailError.value = 'Email field is required.';
    return;
  }

  try {
    const response = await axios.post('/auth/forgot-password', { email: email.value });
    if (response.data.status === 200) {
      alert(response.data.message);
      router.push('/login');
    } else {
      emailError.value = response.data.message.email || 'An error occurred.';
    }
  } catch (error) {
    emailError.value = 'An error occurred. Please try again later.';
  }
};
</script>

<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border mt-16 sm:mx-auto sm:w-full sm:max-w-md p-4 rounded-lg">
        <div class="">
          <!-- <img class="mx-auto" src="https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/template/jobhub-logo.svg" alt="Logo" /> -->
          <h2 class="mt-5 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
        </div>

        <div class="mt-10 ">
          <form @submit.prevent="handleForgotPassword" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Enter Email <span class="text-red-500">*</span></label>
              <input id="email" v-model="email" type="email" placeholder="john@gmail.com"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md" required>
            </div>
    
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md bg-main hover-up p-3 text-sm font-semibold text-white shadow-sm hover:bg-hover ">
                Next
              </button>
            </div>
          </form>
    
          <p class="mt-10 text-center text-sm">
            <RouterLink to="/login" class="font-semibold bg-main text-white rounded-lg p-3"><i class="fas fa-arrow-left mr-3"></i>Back</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
