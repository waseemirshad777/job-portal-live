<template>
    <aside
      :class="[
        'bg-dark text-white w-64 space-y-6 py-7 fixed inset-y-0 left-0 transform transition-transform duration-300 shadow-lg',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar content -->
      
      <div class="flex items-center justify-between md:justify-center">
        <RouterLink to="/"><h2 class="font-bold text-xl text-white">Online Job Portal</h2></RouterLink>
        <Icon icon="bi:x-circle" class="h-6 w-6 md:hidden text-black" />
      </div>
      <ul>
        <li class="py-2 px-4 hover:bg-main rounded flex items-center gap-3"><Icon icon="mdi:view-grid" class="text-2xl" /><RouterLink to="/dashboard/stats">Dashboard</RouterLink></li>
        <li class="py-2 px-4 hover:bg-main rounded flex items-center gap-3"><Icon icon="mdi:account-group" class="text-2xl" /><RouterLink to="/dashboard/users">Users</RouterLink></li>
        <li class="py-2 px-4 hover:bg-main rounded flex items-center gap-3"><Icon icon="mdi:briefcase" class="text-2xl" /><RouterLink to="/dashboard/jobs">Jobs</RouterLink></li>
        <li class="py-2 px-4 hover:bg-main rounded flex items-center gap-3"><Icon icon="mdi:view-list" class="text-2xl" /><RouterLink to="/dashboard/add-category">Add categories</RouterLink></li>
        <li class="py-2 px-4 hover:bg-main rounded flex items-center gap-3"><i class="fa-regular fa-newspaper"></i><RouterLink to="/dashboard/blog">Blog Post</RouterLink></li>
      </ul>
    </aside>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue';
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  });
  </script>
  
  