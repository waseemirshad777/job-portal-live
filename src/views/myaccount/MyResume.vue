<script setup>
import { ref, onMounted } from 'vue';
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

const resumeId = ref('');
const getResume = async () => {
  try {
    const response = await axios.get(`/employee-resume/${store.user._id}`);
    console.log(response)
    if(response.data.length >= 1) {
      resumeId.value = response.data[0]._id;
      fullName.value = response.data[0].fullName;
      designation.value = response.data[0].designation;
      resumeBanner.value = response.data[0].resumeBanner;
      resume.value = response.data[0].resume;
      profilePicture.value = response.data[0].profilePicture;
      experience.value = response.data[0].experience;
      shortDetails.value = response.data[0].shortDetails;
      expectedSalary.value = response.data[0].expectedSalary;
      educationLevel.value = response.data[0].educationLevel;
      aboutYourself.value = response.data[0].aboutYourself;
      workingExperience.value = response.data[0].workingExperience;
      language.value = response.data[0].language;
      skills.value = response.data[0].skills;
      fullAddress.value = response.data[0].address.fullAddress;
      state.value = response.data[0].address.state;
      country.value = response.data[0].address.country;
      email.value = response.data[0].contactInfo.email;
      phone.value = response.data[0].contactInfo.phone;
    }

  } catch (error) {
    console.error('Error:', error);
  }
};

const employeeId = store.user._id; 
const fullName = ref('');
const designation = ref('');
const experience = ref('');
const resumeBanner = ref('');
const profilePicture = ref('');
const resume = ref('');
const expectedSalary = ref('');
const educationLevel = ref('');
const language = ref('');
const aboutYourself = ref('');
const skills = ref('');
const shortDetails = ref('');
const workingExperience = ref('');
const fullAddress = ref('');
const country = ref('');
const state = ref('');
const email = ref('');
const phone = ref('');


const formData = ref(new FormData());

const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0];
  formData.value.append(fieldName, file);
};

const addResume = async () => {
  try {
    formData.value.append('employeeId', employeeId);
    formData.value.append('fullName', fullName.value);
    formData.value.append('designation', designation.value);
    formData.value.append('language', language.value);
    formData.value.append('skills', skills.value);
    formData.value.append('expectedSalary', expectedSalary.value);
    formData.value.append('educationLevel', educationLevel.value);
    formData.value.append('experience', experience.value);
    formData.value.append('workingExperience', workingExperience.value);
    formData.value.append('shortDetails', shortDetails.value);
    formData.value.append('aboutYourself', aboutYourself.value);
    formData.value.append('country', country.value);
    formData.value.append('state', state.value);
    formData.value.append('fullAddress', fullAddress.value);
    formData.value.append('email', email.value);
    formData.value.append('phone', phone.value);

    const response = await axios.post('/resume/add', formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    toast.open({
        message: 'Resume Added Successfully!',
        type: 'success',
        position: 'top-right',
      });
      getResume();
  } catch (error) {
    console.error('Error adding resume:', error);
  }
};

const updateResume = async () => {
  try {
    formData.value.append('employeeId', employeeId);
    formData.value.append('fullName', fullName.value);
    formData.value.append('designation', designation.value);
    formData.value.append('language', language.value);
    formData.value.append('skills', skills.value);
    formData.value.append('expectedSalary', expectedSalary.value);
    formData.value.append('educationLevel', educationLevel.value);
    formData.value.append('experience', experience.value);
    formData.value.append('workingExperience', workingExperience.value);
    formData.value.append('shortDetails', shortDetails.value);
    formData.value.append('aboutYourself', aboutYourself.value);
    formData.value.append('country', country.value);
    formData.value.append('state', state.value);
    formData.value.append('fullAddress', fullAddress.value);
    formData.value.append('email', email.value);
    formData.value.append('phone', phone.value);

    const response = await axios.put(`/resume/update/${resumeId.value}`, formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    toast.open({
        message: 'Resume Updated Successfully!',
        type: 'success',
        position: 'top-right',
      });
      getResume();
  } catch (error) {
    console.error('Error updating company:', error);
  }
};

const handleSubmit = async () => {
  if (resumeId.value) {
    await updateResume();
  } else {
    await addResume();
  }
};

onMounted( () => {
  getResume();
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
                    <RouterLink v-if="isEmployeeOrAdmin" to="/my-resume" class="flex items-center px-4 py-2 border rounded-lg border-main  hover:text-main hover-up">
                        <span  class="text-main"> <i class="fas fa-user-tie mr-4 text-gray-400"></i>My Resume</span>
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
                    <button v-if="resumeId" class="bg-main p-3 text-white font-semibold hover-up rounded-lg">Update Resume</button>
                    <button v-else class="bg-main p-3 text-white font-semibold hover-up rounded-lg">Add Resume</button>
                    <form @submit.prevent="handleSubmit">
                        <h2 class="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">Resume Details</h2>
                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Full Name <span class="text-red-500">*</span></label>
                            <input type="text" v-model="fullName" placeholder="M Wsaseem"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md" required>
                            <!-- <p v-if="!fullName" class="text-red-500 text-sm">Full Name cannot be empty</p> -->
                          </div>
                          <div>
                            <label  class="block text-sm font-medium text-gray-700">Designation <span class="text-red-500">*</span></label>
                            <input type="text" v-model="designation" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Python Developer" required>
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-6 mt-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Resume Banner <span class="text-red-500">*</span></label>
                            <input type="file" @change="handleFileUpload($event, 'resumeBanner')" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Profile Picture <span class="text-red-500">*</span></label>
                            <input type="file" @change="handleFileUpload($event, 'profilePicture')" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-6 mt-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Experience <span class="text-red-500">*</span></label>
                            <input type="text" v-model="experience"  class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="5 year" required>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Expected Salary </label>
                            <input type="text" v-model="expectedSalary" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="$234 - $678">
                          </div>
                        </div>
                        <div class="grid grid-cols-2 gap-6 mt-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Education Level <span class="text-red-500">*</span></label>
                            <input type="text" v-model="educationLevel" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Master Degree" required>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Language <span class="text-red-500">*</span></label>
                            <input type="text" v-model="language" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="German, English" required>
                          </div>
                        </div>

                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">Short Details <span class="text-red-500">*</span></label>
                          <textarea rows="5" v-model="shortDetails" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required></textarea>
                        </div>
                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">About Yourself <span class="text-red-500">*</span></label>
                          <textarea rows="7" v-model="aboutYourself" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required></textarea>
                        </div>
                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">Skills <span class="text-red-500">*</span></label>
                          <textarea rows="5" v-model="skills" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">Working Experience </label>
                          <textarea rows="5" v-model="workingExperience" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>

                        <div class="mt-6">
                          <label class="block text-sm font-medium text-gray-700">Upload Resume <span class="text-red-500">*</span></label>
                          <input type="file" @change="handleFileUpload($event, 'resume')" class="mt-1 block w-full p-3 border border-gray-300 rounded-md">
                        </div>

                        <h2 class="text-xl lg:text-2xl font-semibold text-gray-900 my-4">Address</h2>

                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-sm font-medium text-gray-700">Country <span class="text-red-500">*</span></label>
                            <input type="text" v-model="country" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Pakistan" required>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-gray-700">State <span class="text-red-500">*</span></label>
                            <input type="text" v-model="state" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="e.g Lahore" required>
                          </div>
                        </div>
                        <div class="mt-6">
                          <label  class="block text-sm font-medium text-gray-700">Address <span class="text-red-500">*</span></label>
                          <input type="text" v-model="fullAddress" class="mt-1 block w-full p-3 border border-gray-300 rounded-md" placeholder="Smanabad Town, Lahore, Pakistan" required>
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

                        <button v-if="resumeId" class="mt-6 bg-main hover-up hover:bg-hover px-3 py-2 rounded-lg text-white font-semibold">Update Resume</button>
                        <button v-else class="mt-6 bg-main hover-up hover:bg-hover px-3 py-2 rounded-lg text-white font-semibold">Save Changes</button>
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