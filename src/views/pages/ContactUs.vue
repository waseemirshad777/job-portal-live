<script setup>
import Subscribe from '@/components/Home/Subscribe.vue';
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import { useAuthStore } from '@/store/authStore';
import router from '@/router';
const store = useAuthStore();
const toast = useToast();

// Form state variables
const senderId = ref('');
const name = ref('');
const company = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');

// Function to submit the contact form
const submitContactForm = async () => {
  if(store.user) {
    senderId.value = store.user._id;
  }else {
    return router.push('/login')
  }
  try {
    const payload = {
      senderId: senderId.value,
      name: name.value,
      company: company.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    };

    const response = await axios.post('/contact-us', payload);
    
    if (response.status === 200) {
      toast.open({
        message: 'Message sent successfully!',
        type: 'success',
        position: 'top-right', 
      });
      
      name.value = '';
      company.value = '';
      email.value = '';
      phone.value = '';
      message.value = '';
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    toast.open({
        message: 'Failed to send message. Please try again later.',
        type: 'danger',
        position: 'top-right', 
      });
      
  }
};

</script>

<template>
  <section class="job-dashboard mt-16 py-10">
    <div
      class="w-full h-48 flex items-center bg-center"
      style="
        background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9),
            rgba(0, 0, 0, 0)
          ),
          url('/images/job-single.svg');
      "
    >
      <div
        class="inset-0 text-white max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between"
      >
        <div>
          <p class="text-xl lg:text-3xl font-bold">Contact Us</p>
          <p class="">Get the latest news, updates and tips</p>
        </div>
        <div
          class="text-xs rounded text-gray-400 bg-white py-2 px-3 mt-3 sm:mt-0 w-max"
        >
          <i class="fas fa-home mr-2"></i> <RouterLink to="/">Home</RouterLink>
          <i class="fas fa-chevron-right mx-3"></i> Contact Us
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
      <div class="grid grid-cols-10 gap-4 my-20">
        <div class="col-span-10 lg:col-span-7">
          <h2 class="text-3xl text-dark font-bold mb-3">Get in touch</h2>
          <p>The right move at the right time saves your investment. live <br>
            the dream of expanding your business.</p>
            <form @submit.prevent="submitContactForm">
              <div class="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <input type="text" v-model="name" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your name" required>
                </div>
                <div>
                  <input type="text" v-model="company" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Company (optional)">
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <input type="text" v-model="email" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Your Email" required>
                </div>
                <div>
                  <input type="text" v-model="phone" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Phone number">
                </div>
              </div>
              <textarea v-model="message" placeholder="Tell us about yourself" rows="8" class="border p-4 w-full rounded-lg mt-5" id=""></textarea>
              <button class="mt-5 flex items-center bg-main hover-up text-white py-3 px-4 font-semibold rounded hover:bg-hover transition whitespace-nowrap	">
                <i class="fas fa-envelope mr-2 text-2xl"></i> Send message
              </button>
            </form>
        </div>
        <div class="col-span-10 lg:col-span-3">
          <img src="/images/contact-image.png" class="w-full h-full" alt="">
        </div>
      </div>
    </div>
  </section>

  <Subscribe />
</template>

<style scoped>
.post-job-hero {
  height: 45vh;
}
</style>
