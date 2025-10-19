<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" />

    <!-- Main Content Area -->
    <div :class="['flex-1 flex flex-col transition-all duration-300', isSidebarOpen ? 'md:ml-64' : 'ml-0']">
      <!-- Navbar -->
      <Navbar @toggle="toggleSidebar" />

      <!-- Content Area -->
      <div class="flex-1 px-2 py-6 md:p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Navbar from './DashboardNav.vue';
import Sidebar from './Sidebar.vue';

const isSidebarOpen = ref(true); 

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};



onMounted(() => {
  const updateSidebarState = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      isSidebarOpen.value = false;
    } else {
      isSidebarOpen.value = true;
    }
  };

  // Initial check
  updateSidebarState();

  // Add the resize listener
  window.addEventListener('resize', updateSidebarState);
});
</script>
