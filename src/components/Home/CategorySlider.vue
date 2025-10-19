<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();

const jobCategories = ref([]);
const getcategories = async () => {
  const res = await axios.get(`categories`);
  jobCategories.value = res.data.categories;
}


const goToFilteredJobs = (category) => {
  // const formattedCategory = category.replace(/\s+/g, '-');
  router.push({
    name: 'Jobs',
    query: {
      jobCategory: category._id,
    }
  })
}

onMounted( () => {
  getcategories();
})

</script>

<template>
  <section class="category-section">
    <!-- Left Arrow -->
     
    <div class="relative max-w-7xl mx-4 lg:mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Browse by category</h1>
        <p class="text-gray-600">Find the job that’s perfect for you. about 800+ new jobs everyday</p>
      </div>
      <!-- <div class="flex gap-4 items-center justify-end mb-3 mr-2">
        <button 
          @click="prevSlide" 
          class="h-8 w-8 bg-main2 text-gray-500 hover:text-main text-xs rounded-full border transition">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button 
          @click="nextSlide" 
          class="h-8 w-8 bg-main2 text-gray-500 hover:text-main text-xs rounded-full border transition">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div> -->
      
  
      <div class="min-w-full mx-auto grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-2">
        <button @click="goToFilteredJobs(category)" to="" v-for="(category, index) in jobCategories" :key="index" class="flex items-center shadow-hover-up border text-dark border-gray-100 rounded-lg p-4">
          <div class="flex items-center space-x-4">
            <div class="text-main text-2xl"><i :class="category.icon"></i></div>
            <h3 class="font-bold text-sm hover:text-main">{{ category.categoryName }}</h3>
          </div>
        </button>
      </div>
    </div>

  </section>
</template>



<style scoped>
.category-section {
  margin-top: -70px;
}

</style>

