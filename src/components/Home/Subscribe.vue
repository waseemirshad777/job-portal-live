<script setup>
import axios from "axios";
import { ref } from "vue";
import { useToast } from 'vue-toast-notification';
const toast = useToast();

const email = ref('');
const error = ref('');

const subscribe = async () => {
  try {
    const res = await axios.post(`/subscribe`,  {
      email: email.value,
      headers: {
        'Content-Type': 'json/form-data'
      }
    });
    

    if(res.data.status === 422 || res.data.status === 401) {
      error.value = res.data.message ? `${res.data.message}` : '';
    }else if (res.data.status == 201) {
      toast.open({
        message: 'Subscribe Successfully!',
        type: 'success',
        position: 'top-right', 
      });
      email.value = '';
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <section class="py-16">
    <div class="max-w-7xl mx-4 lg:mx-auto lg:px-4 sm:px-6 lg:px-8">
      <div class="bg-cover bg-center rounded-xl flex justify-between items-center p-5" style="background-image: url('/images/bg-newsletter.svg');">
        <div class="hidden md:block">
          <img src="/images/newsletter-left.png" alt="">
        </div>
        <div>
          <h3 class="text-2xl lg:text-4xl text-white font-bold mb-6 text-center">New Things Will Always <br> Update Regularly</h3>
          <form @submit.prevent="subscribe" class="flex flex-col md:flex-row justify-center items-center">
            <div class="seacrh-box flex items-center bg-white border rounded-md px-2 py-2 shadow-sm w-full">
              <i class="fa-solid fa-envelope text-gray-400 text-2xl"></i>
              <input 
                type="text" 
                v-model="email"
                placeholder="Enter Email" 
                class="mx-3 border-none focus:outline-none text-gray-700 text-sm w-full"
              />
              <button class="bg-main hover-up text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition whitespace-nowrap	">
                <i class="fas fa-check-circle mr-2 hidden lg:inline"></i> Subscribe
              </button>
            </div>  
            
          </form>
          <div class=" text-sm text-white mt-3 text-center"> {{ error }} </div>
        </div>
        <div class="hidden md:block">
          <img src="/images/newsletter-right.png" alt="">
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped></style>