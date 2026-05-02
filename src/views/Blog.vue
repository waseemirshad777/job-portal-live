<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { RouterLink, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const router = useRouter();
const store = useAuthStore();
const blogs = ref([]);
const latestBlogs = ref([]);


const getBlogs = async () => {
  try {
    const res = await axios.get(`/blogs`);
    blogs.value = res.data.blogs;
    latestBlogs.value = blogs.value.slice(0, 3); 
    console.log(blogs.value)
    console.log(latestBlogs.value)
    
  } catch (error) {
    console.error(error);
  }
};


const timeAgo = (createdAt) => {
  return dayjs(createdAt).fromNow();
};

function truncateContent(content, wordLimit) {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}

onMounted(() => {
  getBlogs();
});
</script>


<template>
    <section class="job-dashboard mt-16 py-10">
        <div class="w-full h-40 flex items-center" style="background-image: url('/images/bg-breadcrumb.png');">
          <div class="text-dark max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
                <p class="text-xl lg:text-3xl font-bold">Blog</p>
                <p class="">Get the latest news, updates and tips</p>
            </div>
            <div class="text-xs rounded text-gray-400 bg-white py-2 px-3 mt-3 sm:mt-0 w-max">
              <i class="fas fa-home mr-2"></i> <RouterLink to="/">Home</RouterLink>
              <i class="fas fa-chevron-right mx-3"></i> Blog
            </div>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark mt-20">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                
                <div v-for="(blog, index) in latestBlogs" :key="index" class="bg-white rounded-xl shadow-hover-up overflow-hidden shadow-lg">
                    <div class="relative" style="height: 80vh;">
                        <img :src="blog.blogImage" alt="Blog Image" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                            <h3 class="text-white text-lg font-bold leading-tight">
                              <RouterLink :to="`/blog-detail/${blog._id}`">{{ blog.title }}</RouterLink>
                            </h3>
                            <div v-if="blog.user" class=" flex justify-between items-center  mt-4">
                              <div class="flex items-center space-x-2">
                                <img :src="blog.user.profilePhoto" alt="Admin Avatar" class="w-12 h-12 rounded-full">
                                <div class="text-sm text-white">{{ blog.user.username }}</div>
                              </div>
                              <div class="text-sm text-white capitalize">{{ timeAgo(blog.createdAt) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
              <div v-for="(blog, index) in blogs" :key="index" class="blog-card p-3 border rounded-lg shadow-hover-up overflow-hidden">
                    <div class="relative h-60 rounded-lg overflow-hidden">
                      <img :src="blog.blogImage" alt="" class="w-full h-full bg-cover bg-center">
                    </div>
                    <div class="mt-2">
                        <div class="space-x-1">
                          <span
                            v-for="(keyword, index) in blog.blogKeywords.split(',')"
                            :key="index"
                            class="py-1 px-2 text-main bg-main3 border font-semibold text-xs rounded"
                          >
                            {{ keyword.trim() }}
                          </span>
                        </div>
                        <h2 class="text-xl font-bold hover:text-main capitalize mt-3">
                          <RouterLink :to="`/blog-detail/${blog._id}`">{{ blog.title }}</RouterLink>
                        </h2>
                        
                        <p class="my-6 text-sm text-gray-600 font-medium">
                          {{ truncateContent(blog.blogContent, 20) }}
                        </p>
                        <div class="flex items-center justify-between text-gray-500">
                            <!-- Avatar -->
                            <div v-if="blog.user" class="flex items-center space-x-2">
                              <img  :src="blog.user.profilePhoto" alt="" class="w-12 h-12 rounded-full">
                                <div class="text-sm">
                                  <p class="font-semibold">{{ blog.user.username }}</p>
                                </div>
                            </div>
                            <p class="text-xs capitalize">{{ timeAgo(blog.createdAt) }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="text-center mt-10">
              <button class="text-sm text-white hover-up bg-dark py-3 px-3 rounded"><i class="fa-solid fa-spinner mr-1"></i> Load More Posts</button>
            </div> -->

            <!-- <div class="pagination-container">
        <vue-awesome-paginate
          paginate-buttons-class="paginate-btn"
          active-page-class="paginate-btn-active"
          back-button-class="paginate-back-btn"
          next-button-class="paginate-next-btn"
        >
          <template #prev-button>
            <button 
              class="h-8 w-8 bg-main2 text-gray-500 hover:text-main text-xs rounded-full border transition">
              <i class="fas fa-chevron-left"></i>
            </button>
        
          </template>
          <template #next-button>
            <button 
              class="h-8 w-8 bg-main2 text-gray-500 hover:text-main text-xs rounded-full border transition">
              <i class="fas fa-chevron-right"></i>
            </button>
          </template>
        </vue-awesome-paginate>
      </div> -->
        </div>
    </section>
</template>