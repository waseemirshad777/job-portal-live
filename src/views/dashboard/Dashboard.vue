<script setup>
import Dashboard from '@/components/DashboardLayout/dashboard.vue';
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';


const stats = ref([
  { id: 1, title: 'Total Users', count: '0', iconClass: 'mdi:account' },
  { id: 2, title: 'Total Jobs', count: '0', iconClass: 'mdi:briefcase' },
  { id: 3, title: 'Total Applications', count: '0', iconClass: 'mdi:clipboard-list' },
  { id: 4, title: 'Active Employers', count: '0', iconClass: 'mdi:account-group' },
  { id: 5, title: 'Active Employees', count: '0', iconClass: 'mdi:account-group' },
  { id: 6, title: 'Total Subscribers', count: '0', iconClass: 'mdi:account-group' },
]);

async function getStats() {
  try {
    const res = await axios.get(`/stats`);
    const data = res.data;

    // Map the fetched data to the stats array
    stats.value = [
      { id: 1, title: 'Total Users', count: data.totalUsers, iconClass: 'mdi:account' },
      { id: 2, title: 'Total Jobs', count: data.totalJobs, iconClass: 'mdi:briefcase' },
      { id: 3, title: 'Total Applications', count: data.totalApplications, iconClass: 'mdi:clipboard-list' },
      { id: 4, title: 'Active Employers', count: data.totalEmployers, iconClass: 'mdi:account-group' },
      { id: 5, title: 'Active Employees', count: data.totalEmployees, iconClass: 'mdi:account-group' },
      { id: 6, title: 'Total Subscribers', count: data.totalSubscribers, iconClass: 'mdi:account-group' },
    ];
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getStats();
});
</script>


<template>
  <Dashboard>
    <h1 class="text-2xl font-semibold text-gray-800">Dashboard Statistics</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
        <div v-for="stat in stats" :key="stat.id" class="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
            <div class="bg-main text-white p-3 rounded-lg">
              <Icon :icon="stat.iconClass" class="text-3xl" />
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold">{{ stat.title }}</h2>
              <p class="text-gray-500">{{ stat.count }}</p>
            </div>
        </div>
    </div>
  </Dashboard>  
</template>

  
  <style scoped>
  </style>
  