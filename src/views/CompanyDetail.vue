<script setup>
import { Icon } from '@iconify/vue';
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

const company = ref({});
const companyId = route.params.id;


const getCompanyDetail = async () => {
  try {
    const res = await axios.get(`/company/${companyId}`);
    company.value = res.data;
    console.log(company.value);
  } catch (error) {
    console.error(error);
  }
};

const companyJobs = ref([]);
const cmpJobs = async () => {
  try {
    const res = await axios.get(`/company-jobs/${companyId}`);
    companyJobs.value = res.data;
    console.log(companyJobs.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getCompanyDetail();
  cmpJobs();
});

function truncateContent(content, wordLimit) {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}

function sendEmail(receiverEmail) {
  const mailtoLink = `mailto:${receiverEmail}?subject=Contact Request&body=Hi, I would like to reach out to you.`;
  window.location.href = mailtoLink;
}


</script>


<template>
  <section class="job-detail mt-20 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
      <div class="w-full bg-cover bg-center h-72 rounded-xl relative" style="background-image: url('/images/recruiter-banner.png');">
        <div class="profile-pic absolute">
          <div class="bg-gray-700 rounded-lg overflow-hidden w-20 h-20 ">
            <img :src="company.companyLogo" alt="" class="h-full w-full">
          </div>
          <div class="mt-4 flex justify-between items-center w-full">
            <div>
              <h2 class="text-xl font-semibold  hover:text-main">{{ company.companyName }} <span v-if="company.address" class="text-gray-500 ml-5 text-xs"><i class="fas fa-location-dot mr-1"></i>{{ company.address.city }}</span></h2>
              <p class="mt-2">{{ company.companyTagline }}</p>
            </div>
            <div>
              <!-- <button class="flex items-center bg-main hover-up text-white py-3 px-4 font-semibold rounded hover:bg-hover transition whitespace-nowrap	">
                <i class="fas fa-envelope mr-2 text-2xl"></i> Send Message
              </button> -->
            </div>
            
          </div>
          
        </div>
      </div>

      <hr class="mt-32 mb-12">

      <section class="grid grid-cols-10 gap-4">
        <div class="col-span-7 pl-2 pr-10">
          <h2 class="text-xl font-bold mb-4">Welcome to {{ company.companyName }}</h2>
          <p class="text-sm">
          <!-- {{ company.shortDetails }} -->
          The ideal candidate will have strong creative skills and a portfolio of work which demonstrates their passion for illustrative design and typography. This candidate will have experiences in working with numerous different design platforms such as digital and print forms.
          </p>
          
          <h2 class="text-xl font-bold my-5">About Company</h2>
          <ul class="list-outside list-disc text-gray-500 pl-8 leading-loose">
            <li>
              <!-- {{ company.aboutCompany }} -->
              A portfolio demonstrating well thought through and polished end to end customer journeys 5+ years of industry experience in interactive design and / or visual design Excellent interpersonal skills Aware of trends in mobile, communications, and collaboration Ability to create highly polished design prototypes, mockups, and other communication artifacts The ability to scope and estimate efforts accurately and prioritize tasks and goals independently History of impacting shipping products with your work A Bachelor s Degree in Design (or related field) or equivalent professional experience Proficiency in a variety of design tools such as Figma, Photoshop, Illustrator, and Sketch
            </li>
          </ul>

          <h2 class="text-xl font-bold my-5">Preferred Skills</h2>
          <ul class="list-outside list-disc pl-8 leading-loose">
            <!-- <li>{{ company.skills }}</li> -->
            <li>5+ years of industry experience in interactive design and / or visual design</li>
            <li>Excellent interpersonal skills</li>
            <li>Aware of trends in mobile, communications, and collaboration</li>
            <li>Ability to create highly polished design prototypes, mockups, and other communication</li>
            <li>The ability to scope and estimate efforts accurately and prioritize tasks and goals independently</li>
            <li>History of impacting shipping products with your work</li>
            <li>A Bachelor s Degree in Design (or related field) or equivalent professional experience</li>
            <li>Proficiency in a variety of design tools such as Figma, Photoshop, Illustrator, and Sketch</li>
          </ul>

          <h2 class="text-xl font-bold mb-4 mt-10">Latest jobs</h2>
    
          <div v-for="(job , index) in companyJobs" :key="index" class="shadow-hover-up job-card bg-blue-50 p-6 rounded-lg shadow-md border border-gray-200 my-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold">{{ job.title }}</h3>
                <div class="flex items-center text-gray-500 text-sm space-x-4 mt-2">
                  <span class="flex items-center">
                    <i class="fas fa-briefcase mr-1"></i> {{ job.jobType }}
                  </span>
                  <span class="flex items-center">
                    <i class="far fa-clock mr-1"></i> Posted 2 years ago
                  </span>
                </div>
              </div>
              
              <div class="space-x-1">
                <span v-if="job.jobTags" v-for="(tag, index) in job.jobTags.split(',')" :key="index" class="capitalize py-1 px-2 text-main bg-main3 border font-semibold text-xs rounded">
                  {{ tag.trim() }}
                </span>
              </div>
            </div>
      
            <p class="text-gray-600 mt-4">
              {{ truncateContent(job.description, 20) }}
            </p>
      
            <div class="text-right mt-4">
              <RouterLink :to="`/job-detail/${job._id}`" class="py-2 px-3 text-main bg-main3 border text-xs font-semibold rounded">Apply Now</RouterLink>
            </div>
          </div>
        </div>
        
        <div class="col-span-3">
          <div class="border rounded-lg p-4">
            <div>
              <h3 class="font-bold  text-xl hover:text-main">{{ company.companyName }}</h3>
              <p v-if="company.address" class="text-xs text-gray-500 mt-1"><i class="fa-solid fa-location-dot mr-1"></i> {{ company.address.city }}</p>
            </div>
            <hr class="my-10">
            <!-- <div class="map h-40 rounded-lg bg-main2"></div>
            <hr class="my-10"> -->
            <div class="text-gary-400 my-5 text-sm flex gap-4">
              <div><i class="fa-solid fa-briefcase text-xl text-gray-400"></i></div>
              <div>
                <p>Company Feild</p>
                <h4 class="text-dark font-bold mt-1">{{ company.companyField }}</h4>
              </div>
            </div>
            <div class="text-gary-400 my-5 text-sm flex gap-4">
              <div><i class="fa-solid fa-location-dot text-xl text-gray-400"></i></div>
              <div>
                <p>Location</p>
                <h4 v-if="company.address" class="text-dark font-bold mt-1">{{ company.address.fullAddress }}</h4>
              </div>
            </div>
            <hr class="my-10">
            <ul class="list-outside list-disc pl-4 leading-loose my-5">
              <li v-if="company.address">{{ company.address.fullAddress + ' ' + company.address.state + ' ' + company.address.country }}</li>
              <li v-if="company.contactInfo">Phone : {{ company.contactInfo.phone }}</li>
              <li v-if="company.contactInfo">Email : {{ company.contactInfo.email }}</li>
            </ul>
            <button @click="sendEmail(company.contactInfo.email)" class="flex items-center bg-main hover-up text-white py-3 px-4 font-semibold rounded hover:bg-hover transition whitespace-nowrap	">
              <i class="fas fa-envelope mr-2 text-2xl"></i> Send Message
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