<template>
        <div class="min-h-screen flex">
      <!-- Sidebar -->
      <div :class="['fixed inset-y-0 left-0 z-30 w-64 bg-green-600 transform', { '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }]" 
           class="transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0">
        <div class="flex items-center justify-between h-14 bg-white px-4">
            <RouterLink to="/" class="ml-7"><img src="/images/logo.png" alt="" width="50px"></RouterLink>
            <Icon icon="bi:x-circle" @click="toggleSidebar" class="h-6 w-6 lg:hidden text-black" />
        </div>
        <nav class="mt-7">
          <RouterLink to="/dashboard" class="flex items-center px-4 py-2 text-white"> <Icon icon="mdi:view-grid" class="text-2xl mr-4" />Dashboard</RouterLink>
          <RouterLink to="/users" class="flex items-center px-4 py-2 text-white"> <Icon icon="mdi:account-group" class="text-2xl mr-4" />Users</RouterLink>
          <RouterLink to="/admin-profile" class="flex items-center px-4 py-2 text-white"> <Icon icon="mdi:account-circle" class="text-2xl mr-4" />Profile</RouterLink>
          <button  class="flex items-center px-4 py-2 text-white"> <Icon icon="heroicons-outline:logout" class="text-2xl mr-4" />Logout</button>
        </nav>
      </div>
  
      <!-- Sidebar Overlay -->
      <div v-if="sidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black opacity-50 lg:hidden z-20"></div>
  
      <!-- Content Area -->
      <div class="flex-1 flex flex-col min-h-screen overflow-hidden">
        <!-- Navbar -->
        <header class="bg-white text-white flex items-center justify-between p-4 h-14">
          <div class="flex items-center">
            <button @click="toggleSidebar" class="lg:hidden focus:outline-none">
                <Icon icon="fa-solid:bars" class="h-6 w-6 text-black" />
            </button>
            
          </div>
          <div class="flex items-center">
            <RouterLink to="admin-profile">
                <img class="h-10 w-10 rounded-full cursor-pointer mr-7" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile Picture">
            </RouterLink>
          </div>
        </header>
  
        <!-- Main Content -->
        <main class="flex-1 p-6 bg-gray-100">
            <h1 class="text-2xl font-semibold text-gray-800">Profile</h1>

          
            <div class="mt-5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <!-- Profile Header -->
                <div class="bg-cover bg-center h-56" style="background-image: url('/images/8.jpg');">
                  <div class="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div class="text-center">
                      <img class="h-24 w-24 rounded-full mx-auto border-4 border-white" src="/images/hero_1.jpg" alt="User Image">
                      <h1 class="text-2xl font-bold text-white mt-2">John Doe</h1>
                      <p class="text-gray-200">Software Developer</p>
                    </div>
                  </div>
                </div>
        
                <!-- Profile Content -->
                <div class="px-4 py-8 sm:px-10">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Personal Information -->
                <div>
                  <h2 class="text-xl font-semibold mb-4">Personal Information</h2>
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <span class="text-gray-600 font-medium">Full Name:</span>
                      <span class="ml-2 text-gray-800">John Doe</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-gray-600 font-medium">Email:</span>
                      <span class="ml-2 text-gray-800">john.doe@example.com</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-gray-600 font-medium">Phone:</span>
                      <span class="ml-2 text-gray-800">+1 234 567 890</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-gray-600 font-medium">Address:</span>
                      <span class="ml-2 text-gray-800">123 Main Street, New York, NY 10001</span>
                    </div>
                  </div>
                  <div class="mt-4">
                    <button type="submit" class="bg-green-600 text-white font-bold py-2 px-6 rounded-md">Edit Information</button>
                  </div>
                </div>
      
                <!-- Professional Information -->
                <div>
                  <h2 class="text-xl font-semibold mb-4">Change Password</h2>
                  <div class="space-y-4">
                    <form>
                      <div class="">
                        <label for="old" class="text-sm text-gray-700">Enter Old Password</label>
                        <input  type="password" id="old" placeholder="********" class="w-full mt-2 p-2 border border-gray-300 rounded-md placeholder:text-gray-300  focus:border-green-600" />
                        <div class="text-sm text-red-600"> {{ }} </div>
                      </div>
                      <div class="">
                        <label for="new" class="text-sm text-gray-700">Enter New Password</label>
                        <input  type="password" id="new" placeholder="********" class="w-full mt-2 p-2 border border-gray-300 rounded-md placeholder:text-gray-300  focus:border-green-600" />
                        <div class=" text-sm text-red-600"> {{  }} </div>
                      </div>
                      <div class="mt-4">
                        <button type="submit" class="bg-yellow text-black font-bold py-3 px-7 rounded-md">Change Password</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
                </div>
            </div>
        </main>
      </div>
    </div>
    
  </template>
  
  <script setup>
    import { ref } from 'vue';
  import { Icon } from '@iconify/vue';
  
  const sidebarOpen = ref(false);
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };



  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main Street, New York, NY 10001',
    jobTitle: 'Software Developer',
    company: 'ABC Corp',
    experience: '5 years',
    skills: 'JavaScript, Vue.js, Node.js, CSS',
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here if necessary */
  </style>
  