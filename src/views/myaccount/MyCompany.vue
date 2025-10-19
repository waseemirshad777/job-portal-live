<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useToast } from 'vue-toast-notification';
import MyAccountBanner from '@/components/MyAccountBanner.vue';
import { useRouter } from 'vue-router';
const toast = useToast();
const store = useAuthStore();
const router = useRouter();

const isEmployeeOrAdmin = store.isEmployeeOrAdmin;
const isEmployerOrAdmin = store.isEmployerOrAdmin;

const companyId = ref('');
const getCompany = async () => {
  try {
    const response = await axios.get(`/employer-company/${store.user._id}`);
    if(response.data.length >= 1) {
      companyId.value = response.data[0]._id;
      companyName.value = response.data[0].companyName;
      companyTagline.value = response.data[0].companyTagline;
      companyBanner.value = response.data[0].companyBanner;
      companyLogo.value = response.data[0].companyLogo;
      shortDetails.value = response.data[0].shortDetails;
      skills.value = response.data[0].skills;
      aboutCompany.value = response.data[0].aboutCompany;
      companyField.value = response.data[0].companyField;
      fullAddress.value = response.data[0].address.fullAddress;
      state.value = response.data[0].address.state;
      city.value = response.data[0].address.city;
      country.value = response.data[0].address.country;
      email.value = response.data[0].contactInfo.email;
      phone.value = response.data[0].contactInfo.phone;
      console.log(companyBanner)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const employerId = store.user._id; 
const companyName = ref('');
const companyTagline = ref('');
const companyBanner = ref('');
const companyLogo = ref('');
const shortDetails = ref('');
const skills = ref('');
const aboutCompany = ref('');
const companyField = ref('');
const fullAddress = ref('');
const country = ref('');
const state = ref('');
const city = ref('');
const email = ref('');
const phone = ref('');

const formData = ref(new FormData());

const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0];
  formData.value.append(fieldName, file);
};

const addCompany = async () => {
  try {
    formData.value.append('employerId', employerId);
    formData.value.append('companyName', companyName.value);
    formData.value.append('companyTagline', companyTagline.value);
    formData.value.append('shortDetails', shortDetails.value);
    formData.value.append('skills', skills.value);
    formData.value.append('aboutCompany', aboutCompany.value);
    formData.value.append('companyField', companyField.value);
    formData.value.append('country', country.value);
    formData.value.append('state', state.value);
    formData.value.append('city', city.value);
    formData.value.append('fullAddress', fullAddress.value);
    formData.value.append('email', email.value);
    formData.value.append('phone', phone.value);

    const response = await axios.post('/company/add', formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    toast.open({
        message: 'Company Added Successfully!',
        type: 'success',
        position: 'top-right',
      });
  } catch (error) {
    console.error('Error adding compnay:', error);
  }
};

const updateCompany = async () => {
  try {
    formData.value.append('employerId', employerId);
    formData.value.append('companyName', companyName.value);
    formData.value.append('companyTagline', companyTagline.value);
    formData.value.append('shortDetails', shortDetails.value);
    formData.value.append('skills', skills.value);
    formData.value.append('aboutCompany', aboutCompany.value);
    formData.value.append('companyField', companyField.value);
    formData.value.append('country', country.value);
    formData.value.append('state', state.value);
    formData.value.append('city', city.value);
    formData.value.append('fullAddress', fullAddress.value);
    formData.value.append('email', email.value);
    formData.value.append('phone', phone.value);

    const response = await axios.put(`/company/update/${companyId.value}`, formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response)
    toast.open({
        message: 'Company Updated Successfully!',
        type: 'success',
        position: 'top-right',
      });
      getCompany();
  } catch (error) {
    console.error('Error updating company:', error);
  }
};

const handleSubmit = async () => {
  if (companyId.value) {
    await updateCompany();
  } else {
    await addCompany();
  }
};


onMounted( () => {
  getCompany();
})

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
                    <RouterLink v-if="isEmployerOrAdmin" to="/my-company" class="flex items-center px-4 py-2 border rounded-lg border-main hover:text-main hover-up">
                      <span  class="text-main"><i class="fa-regular fa-building mr-4 text-gray-400"></i>My Company</span>
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
                    <button v-if="companyId" class="bg-main p-3 mb-3 text-white font-semibold hover-up rounded-lg">Update Company</button>
                    <button v-else class="bg-main p-3 mb-3 text-white font-semibold hover-up rounded-lg">Add Company</button>
                    <form @submit.prevent="handleSubmit">
                        <h2 class="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">Company Details</h2>
                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Company Name <span class="text-red-500">*</span></label>
                            <input type="text" v-model="companyName"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md" required placeholder="Arbi Soft">
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Company Field </label>
                            <input type="text" v-model="companyField" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Accounting / Finance">
                          </div>
                        </div>
                    
                        <div class="mt-6">
                          <label class="block text-sm font-medium text-gray-700">Company Tagline <span class="text-red-500">*</span></label>
                          <input type="text" v-model="companyTagline" class="mt-1 block w-full p-3 border border-gray-300 rounded-md " required>
                          <p class="mt-1 text-sm text-gray-500">Tagline shows under the company name</p>
                        </div>
                    
                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">Short Detail <span class="text-red-500">*</span></label>
                          <textarea rows="5" v-model="shortDetails" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required></textarea>
                        </div>
                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">About Company</label>
                          <textarea rows="5" v-model="aboutCompany" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">Preffered Skills <span class="text-red-500">*</span></label>
                          <textarea rows="5" v-model="skills" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-6 mt-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Company Logo <span class="text-red-500">*</span></label>
                            <input type="file" @change="handleFileUpload($event, 'companyLogo')" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Company Banner Image <span class="text-red-500">*</span></label>
                            <input type="file" @change="handleFileUpload($event, 'companyBanner')"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
                          </div>
                        </div>

                        <h2 class="text-xl lg:text-2xl font-semibold text-gray-900 my-4">Address</h2>

                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Country <span class="text-red-500">*</span></label>
                            <input type="text" v-model="country" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Pakistan" required>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">State <span class="text-red-500">*</span></label>
                            <input type="text" v-model="state" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Punjab" required>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">City <span class="text-red-500">*</span></label>
                            <input type="text" v-model="city" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Pakistan" required>
                          </div>
                          <div>
                            <label  class="block text-sm font-medium text-gray-700">Address <span class="text-red-500">*</span></label>
                          <input type="text" v-model="fullAddress" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Samanabad Town, Lahore, 54500" required>
                          </div>
                        </div>

                        <h2 class="text-xl lg:text-2xl font-semibold text-gray-900 my-4">Contact Info</h2>

                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Phone <span class="text-red-500">*</span></label>
                            <input type="text" v-model="phone" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g (123) 456-7890" required>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
                            <input type="text" v-model="email" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g contact@Evara.com" required>
                          </div>
                        </div>

                        <button v-if="companyId" class="mt-6 bg-main hover-up hover:bg-hover px-3 py-2 rounded-lg text-white font-semibold">Update Company</button>
                        <button v-else class="mt-6 bg-main hover-up hover:bg-hover px-3 py-2 rounded-lg text-white font-semibold">Add Company</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped>

</style>