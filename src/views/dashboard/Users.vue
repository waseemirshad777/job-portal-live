<script setup>
import Dashboard from '@/components/DashboardLayout/dashboard.vue';
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';

import { useToast } from 'vue-toast-notification';
import router from '@/router';
const toast = useToast();
  


const users = ref([]);
async function getUsers() {
  try {
    const { data } = await axios.get(`/users`);
    users.value = data;

  } catch (error) {
    console.error(error);
  }
};



const userId = ref(''); 

const editModal = ref(false);
const username = ref('');
const fname = ref('');
const lname = ref('');
const email = ref('');
const role = ref('');
const photo = ref(null);

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    photo.value = file;
  }
}

function showEditModal(user) {
  username.value = user.username;
  fname.value = user.fname;
  lname.value = user.lname;
  email.value = user.email;
  role.value = user.role;
  userId.value = user._id;

  editModal.value = true;
}

async function updateProfile() {
  const userData = new FormData();
  userData.append('email', email.value);
  userData.append('profilePhoto', photo.value);
  userData.append('username', username.value);
  userData.append('fname', fname.value);
  userData.append('lname', lname.value);
  userData.append('role', role.value);

  try {
    const res = await axios.put(`/user/update/${userId.value}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    // if (res.status == 200) {
    //   toast.open({
    //     message: 'Updated Successfully!',
    //     type: 'success',
    //     position: 'top-right', 
    //   });
    // }
    editModal.value = false;
    window.location.reload();

  } catch (error) {
    toast.error('Failed to update profile');
  }
}

const deleteUser = async (userId) => {
  const confirmDelete = confirm("Are you sure you want to delete this job?");
  if (confirmDelete) {
    try {
      await axios.delete(`/user/delete/${userId}`);
      getUsers();
      toast.open({
        message: 'User Deleted Successfully!',
        type: 'error',
        position: 'top-right', 
      });
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(getUsers);
</script>

<template>
  <Dashboard>
    <h1 class="text-2xl font-semibold text-gray-800">Users Listing</h1>
    <div class="overflow-x-auto mt-7">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(user, index) in users" :key="user.id">
            <!-- Photo -->
            <td class="px-6 py-3 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img :src="user.profilePhoto" alt="User Photo" class="h-10 w-10 rounded-full">
                </div>
              </div>
            </td>
            <!-- Name -->
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.username }}</div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.role }}</div>
            </td>
            <!-- Email -->
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
            </td>
            <!-- Action (Edit & Delete Icons) -->
            <td class="px-4 py-3 whitespace-nowrap flex align-center space-x-3">
              <Icon @click="showEditModal(user)" icon="bi:pencil-square" class="h-5 w-5 cursor-pointer text-green-600" />
              <Icon @click="deleteUser(user._id)" icon="bi:trash" class="h-5 w-5 cursor-pointer text-red-600" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Dashboard>


  <!-- Edit Modal -->
  <div v-if="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 class="text-xl font-semibold mb-4">Edit Information</h2>
      <form @submit.prevent="updateProfile">
        <div class="space-y-2">
          <div>
            <label  class="text-sm text-gray-700">First Name</label>
            <input v-model="fname" type="text"  class="w-full  p-2 border border-gray-300 rounded-md focus:border-green-600" />
          </div>
          <div>
            <label  class="text-sm text-gray-700">Last Name</label>
            <input v-model="lname" type="text"  class="w-full  p-2 border border-gray-300 rounded-md focus:border-green-600" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Username</label>
            <input v-model="username" type="text"  class="w-full  p-2 border border-gray-300 rounded-md focus:border-green-600" />
          </div>
          <div>
            <label for="edit-email" class="text-sm text-gray-700">Email</label>
            <input v-model="email" type="email" id="edit-email" class="w-full  p-2 border border-gray-300 rounded-md focus:border-green-600" />
          </div>
          <div>
            <label for="role-dropdown" class="text-sm text-gray-700">Role</label>
                <select id="role-dropdown" v-model="role" class="w-full p-2 border border-gray-300 rounded-md focus:border-green-600 sm:text-sm focus:outline-none">
                  <option value="">Select an option</option>
                  <option value="employer">Employer</option>
                  <option value="employee">Employee</option>
                </select>
          </div>
          <div>
            <label for="edit-image" class="text-sm text-gray-700">Photo</label>
            <input id="image" @change="handleFileChange($event)" type="file" class="block w-full py-1 px-1 h-full text-gray-900 rounded-md ring-1 ring-gray-300 cursor-pointer" />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-4">
          <button type="button" @click="editModal = false" class="bg-gray-400 text-white font-bold py-2 px-4 rounded-md">Cancel</button>
          <button type="submit" class="bg-main text-white font-bold py-2 px-4 rounded-md">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>
  

  
  <style scoped>
  </style>
  