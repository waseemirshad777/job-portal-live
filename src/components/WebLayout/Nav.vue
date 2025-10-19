<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/store/authStore';
import { RouterLink } from 'vue-router';
const store = useAuthStore();

let role ;
const profilePhoto = ref('')
if (store.user) {
  role = store.user.role;
  profilePhoto.value = store.user.profile_photo;
}

const token = localStorage.getItem('token')

// States for drawer and pages dropdown in mobile
const drawerOpen = ref(false)
const pagesDropdownOpen = ref(false)

// Toggle the drawer
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

// Toggle Pages dropdown in mobile drawer
const togglePagesDropdown = () => {
  pagesDropdownOpen.value = !pagesDropdownOpen.value
}

function logout() {
  store.logout()
  window.location.href = '/';
}
</script>
<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-white shadow-lg text-sm">
    <nav class="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <!--Logo -->
      <div>
        <RouterLink to="/"><img src="@/assets/images/logo.svg" alt=""></RouterLink>
      </div>

      <div class="hidden lg:flex space-x-12 font-bold">
        <RouterLink to="/" class="">Home</RouterLink>

        <div class="relative group pages-dropdown">
          <button class=" focus:outline-none">
            Find Jobs
            <i class="fa-solid fa-angle-down text-black"></i>
          </button>
          <div class="pages-dropdown-content">
            <RouterLink to="/jobs" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">All Jobs</RouterLink>
            <RouterLink to="/job-post" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">Post a Job</RouterLink>
          </div>
        </div>

        <RouterLink to="/companies" class="">Recruiters</RouterLink>
        <RouterLink to="/employees" class="">Candidates</RouterLink>
        <RouterLink to="/blog" class="">Blog</RouterLink>

        <div class="relative group pages-dropdown">
          <button class=" focus:outline-none">
            Pages
            <i class="fa-solid fa-angle-down text-black"></i>
          </button>
          <div class="pages-dropdown-content">
            <RouterLink to="/contact-us" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">Contact Us</RouterLink>
            <RouterLink to="/about-us" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">About Us</RouterLink>
          </div>
        </div>
      </div>

      <!-- Profile & Post Job Button -->
      <div class="hidden lg:flex lg:items-center space-x-6">
        <div class="space-x-4">
          <RouterLink v-if="!store.user" to="/register" class="py-3 underline text-main hover-up transition">Register</RouterLink>
          <RouterLink v-if="!store.user" to="/login" class="px-4 py-2 bg-main text-white rounded-md hover-up hover:bg-hover transition">Login</RouterLink>
          <RouterLink v-if="store.user" to="/my-account" class="px-4 py-3 bg-main text-white rounded-md hover-up hover:bg-hover transition">My Account</RouterLink>
          <RouterLink v-if="role ==='admin'" to="/dashboard/stats" class="px-4 py-3 bg-main text-white rounded-md hover-up hover:bg-hover transition">Dashboard</RouterLink>
        </div>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <div class="lg:hidden">
        <button @click="toggleDrawer" class="text-gray-800 hover:text-gray-900 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
      :class="drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'"
      @click="toggleDrawer"
    ></div>

    <aside
      class="fixed top-0 left-0 w-64 h-full bg-white shadow-lg text-sm font-bold z-50 transform transition-transform duration-300 ease-in-out"
      :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex justify-between items-center p-4 border-b">
        <a href="/"><img src="@/assets/images/logo.svg" alt=""></a>
        <button @click="toggleDrawer" class="text-gray-800 hover:text-gray-900 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <nav class="flex flex-col p-4 space-y-4">
        <a href="/" class="">Home</a>
        <a href="/find-jobs">Find Jobs</a>
        <a href="/companies">Companies</a>
        <a href="/employees">Employees</a>
        <a href="/blog" class="text-gray-600 hover:text-gray-900 transition">Blog</a>

        <!-- Pages Dropdown in Drawer -->
        <div>
          <button @click="togglePagesDropdown" class="text-gray-600 hover:text-gray-900 transition focus:outline-none w-full text-left">
            Pages
            <i class="fa-solid fa-angle-down text-black"></i>
          </button>
          <div v-if="pagesDropdownOpen" class="mt-2 space-y-2 pl-4">
            <a href="/contact" class="block text-sm text-gray-700 hover:bg-gray-100 transition">Contact Us</a>
            <a href="/about" class="block text-sm text-gray-700 hover:bg-gray-100 transition">About Us</a>
            <a href="/faqs" class="block text-sm text-gray-700 hover:bg-gray-100 transition">FAQs</a>
            <a href="/terms" class="block text-sm text-gray-700 hover:bg-gray-100 transition">Terms</a>
          </div>
        </div>

        <a href="/post-job" class="px-4 py-2 bg-main text-white rounded-md hover:bg-hover transition">
          Post a Job
        </a>
      </nav>
    </aside>
  </header>
</template>


<style scoped>
/* Dropdown Menu Styles */
.pages-dropdown .pages-dropdown-content {
  position: absolute;
  left: 0;
  margin-top: 0.3rem;
  width: 12rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  visibility: hidden;
  z-index: 50;
}

/* Show Dropdown on Hover */
.pages-dropdown:hover .pages-dropdown-content,
.pages-dropdown:focus-within .pages-dropdown-content {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

/* Dropdown Menu Styles */
.profile-dropdown .profile-dropdown-content {
  position: absolute;
  right: 0;
  margin-top: 0.3rem;
  width: 12rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  visibility: hidden;
  z-index: 50;
}

/* Show Dropdown on Hover */
.profile-dropdown:hover .profile-dropdown-content,
.profile-dropdown:focus-within .profile-dropdown-content {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

</style>