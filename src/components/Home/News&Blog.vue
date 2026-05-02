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


const getBlogs = async () => {
  try {
    const res = await axios.get(`/blogs`);
    blogs.value = res.data.blogs.slice(0, 3); 
    
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
    <section class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center text-4xl font-bold">News and Blog</div>
            <p class="text-center mt-4 text-gray-600">Get the latest news, updates and tips</p>
            <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
                <div v-for="(blog, index) in blogs" :key="index" class="blog-card p-3 border rounded-lg shadow-hover-up overflow-hidden">
                    <div class="relative bg-cover bg-center h-60 rounded-lg overflow-hidden">
                      <img :src="blog.blogImage" alt="">
                    </div>
                    <div class="mt-2">
                        <div class="space-x-1">
                          <span
                            v-for="(keyword, index) in blog.blogKeywords.split(',')"
                            :key="index"
                            class="capitalize py-1 px-2 text-main bg-main3 border font-semibold text-xs rounded"
                          >
                            {{ keyword.trim() }}
                          </span>
                        </div>
                        <h2 class="text-xl font-bold hover:text-main capitalize mt-3">
                          <RouterLink :to="`/blog-detail/${blog._id}`">{{ blog.title }}</RouterLink>
                        </h2>
                        
                        <p class="my-6 text-sm text-gray-600 font-medium">
                          {{ truncateContent(blog.blogContent, 16) }}
                        </p>
                        <div class="flex items-center justify-between text-gray-500">
                            <!-- Avatar -->
                            <div v-if="blog.user" class="flex items-center space-x-2">
                              <img  :src="blog.user.profilePhoto" alt="" class="w-12 h-12 rounded-full">
                                <div class="text-sm">
                                  <p class="font-semibold">{{ blog.user.username }}</p>
                                </div>
                            </div>
                            <p class="text-xs">{{ timeAgo(blog.createdAt) }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-10">
              <RouterLink to="/blog" class="text-sm text-white hover-up bg-dark py-3 px-3 rounded"><i class="fa-solid fa-spinner mr-1"></i> Load More Posts</RouterLink>
            </div>
        </div>
    </section>
</template>
  

  
  <style scoped>
  /* You can adjust padding or text styling further if needed */
  </style>
  