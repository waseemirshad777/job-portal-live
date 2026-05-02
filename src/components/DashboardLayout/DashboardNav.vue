<script setup>
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router'; 

const store = useAuthStore();
const router = useRouter();

async function logout() {
  await store.logout(); 
  router.push('/'); 
}
</script>


<template>
    <nav class="flex items-center justify-between bg-white shadow p-2">
      <!-- Left side: Sidebar Toggle and Logo -->
      <div class="flex items-center space-x-8">
        <button @click="$emit('toggle')" class="text-gray-500 focus:outline-none">
          <!-- <i class="fas fa-bars text-2xl"></i> -->
          <Icon icon="fa-solid:bars" class="h-6 w-6 text-gray-800" />
        </button>
        <h1 class="font-bold text-xl text-gray-800">Dashboard</h1>
      </div>
  
      <!-- Right side: Profile Icon -->
      <div class="flex items-center space-x-8">
        <button @click="logout" class="text-red-500 focus:outline-none font-bold">Logout</button>
        <div >
            <img :src="store.user.profilePhoto" class="h-10 w-10 rounded-full cursor-pointer mr-7" alt="Profile Picture">
        </div>
      </div>
    </nav>
  </template>
  