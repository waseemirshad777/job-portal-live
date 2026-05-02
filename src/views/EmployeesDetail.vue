<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { format } from 'date-fns';
import { useAuthStore } from '@/store/authStore';
import { useToast } from 'vue-toast-notification';
import Subscribe from '@/components/Home/Subscribe.vue';
const toast = useToast();
const store = useAuthStore();
const route = useRoute();

const employee = ref({});
const resumeId = route.params.id;


const getEmployeeDetail = async () => {
  try {
    const res = await axios.get(`/resume/${resumeId}`);
    employee.value = res.data;
    console.log(employee.value);
  } catch (error) {
    console.error(error);
  }
};



onMounted(() => {
  getEmployeeDetail();
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, 'dd MMMM yyyy'); 
}

function sendEmail(receiverEmail) {
  const mailtoLink = `mailto:${receiverEmail}?subject=Contact Request&body=Hi, I would like to reach out to you.`;
  window.location.href = mailtoLink;
}

async function downloadResume(filePath) {
  try {
    const url = filePath;
    
    // Fetch the file as a Blob
    const response = await axios.get(url, {
      responseType: 'blob',  // Important! Get the file as a blob
    });

    const blob = new Blob([response.data]);
    const link = document.createElement('a');

    // Create a local URL for the blob
    link.href = URL.createObjectURL(blob);

    // Extract the filename from the path and set it as download name
    const filename = filePath.split('/').pop();
    link.download = filename;

    // Programmatically click the link to start the download
    link.click();

    // Cleanup the object URL after download
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading resume:', error);
    alert('Failed to download resume. Please try again.');
  }
}
</script>


<template>
  <section class="job-detail mt-20 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
      <!-- <div class="bg-cover bg-center h-72 rounded-xl" ></div> -->
      <div class="w-full bg-cover bg-center h-72 rounded-xl relative" style="background-image: url('/images/candidate-banner.jpg');">
        <div class="profile-pic absolute">
          <div class="bg-main2 rounded-full w-20 h-20  overflow-hidden">
            <img :src="employee.profilePicture" alt="" class="h-full w-full">
          </div>
          <div class="mt-4 flex justify-between items-center w-full">
            <div>
              <h2 class="text-xl font-semibold  hover:text-main">{{ employee.fullName }}  <span v-if="employee.address" class="text-gray-500 ml-5 text-xs"><i class="fas fa-location-dot mr-1"></i>{{ employee.address.fullAddress }}</span></h2>
              <p class="mt-2">{{ employee.designation }}</p>
            </div>
            <div>
                <button  @click="downloadResume(employee.resume)"  class="flex items-center bg-main hover-up text-white py-3 px-4 font-semibold rounded hover:bg-hover transition whitespace-nowrap	">
                    <i class="fas fa-cloud-arrow-down mr-2 text-2xl"></i> Download CV
                </button>
            </div>
            
          </div>
          
        </div>
      </div>

      <hr class="mt-32 mb-12">

      <section class="grid grid-cols-10 gap-4">
        <div class="col-span-7 pl-2 pr-10">
          <h2 class="text-xl font-bold mb-4">About Me</h2>
          <p class="text-sm leading-loose">{{ employee.aboutYourself }}</p>
          
          <h2 class="text-xl font-bold my-5">Skills</h2>
          <ul class="list-outside list-disc pl-8 leading-loose">
            <li v-if="employee.skills" v-for="skill in employee.skills.split(',')">{{ skill.trim() }}</li>
          </ul>
          <p class="text-md text-gray-500 leading-loose	">
            Hello there! My name is Alan Walker. I am a graphic designer, and I’m very passionate and dedicated to my work. With 20 years experience as a professional a graphic designer, I have acquired the skills and knowledge necessary to make your project a success.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!
          </p>

          <h2 class="text-xl font-bold my-5">Work Experience</h2>
          <p class="text-md text-gray-500 leading-loose	">
            Hello there! My name is Alan Walker. I am a graphic designer, and I’m very passionate and dedicated to my work. With 20 years experience as a professional a graphic designer, I have acquired the skills and knowledge necessary to make your project a success.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!
          </p>
        </div>
        
        <div class="col-span-3">
          <div class="border rounded-lg p-4">
            <div>
              <h3 class="font-bold  text-xl hover:text-main">Overview</h3>
            </div>
            <hr class="my-10">
            <div class="text-gary-400 my-8 text-sm flex gap-4">
              <div><i class="fa-solid fa-briefcase text-xl text-gray-400"></i></div>
              <div>
                <p>Experience</p>
                <h4 class="text-dark font-semibold mt-1">{{ employee.experience }}</h4>
              </div>
            </div>
            <div class="text-gary-400 my-8 text-sm flex gap-4">
              <div><i class="fa-solid fa-dollar text-xl text-gray-400"></i></div>
              <div>
                <p>Expected Salary</p>
                <h4 class="text-dark font-semibold mt-1">{{ employee.expectedSalary }}</h4>
              </div>
            </div>
            <div class="text-gary-400 my-8 text-sm flex gap-4">
              <div><i class="fa-solid fa-earth-americas text-xl text-gray-400"></i></div>
              <div>
                <p>Language</p>
                <h4 class="text-dark font-semibold mt-1">{{ employee.language }}</h4>
              </div>
            </div>
            <div class="text-gary-400 my-8 text-sm flex gap-4">
              <div><i class="fa-solid fa-user-graduate text-xl text-gray-400"></i></div>
              <div>
                <p>Education Level</p>
                <h4 class="text-dark font-semibold mt-1">{{ employee.educationLevel }}</h4>
              </div>
            </div>
            <hr class="my-10">
            <ul class="list-outside list-disc pl-4 leading-loose my-5">
              <li v-if="employee.address">{{ employee.address.fullAddress + ' ' + employee.address.state + ' ' + employee.address.country }}</li>
              <li v-if="employee.contactInfo">Phone : {{ employee.contactInfo.phone }}</li>
              <li v-if="employee.contactInfo">Email : {{ employee.contactInfo.email }}</li>
            </ul>
            <button @click="sendEmail(employee.contactInfo.email)" class="flex items-center bg-main hover-up text-white py-3 px-4 font-semibold rounded hover:bg-hover transition whitespace-nowrap	">
              <i class="fas fa-envelope mr-2 text-2xl"></i> Send message
            </button>
          </div>
        </div>
      </section>
    </div>
  </section>
  <Subscribe />
</template>



<style scoped>
.profile-pic {
    padding-left: 20px;
    bottom: -100px;
    width: 100%;
}
</style>