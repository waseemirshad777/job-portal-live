<script setup>
import Subscribe from '@/components/Home/Subscribe.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { RouterLink, useRoute } from 'vue-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const route = useRoute();
const store = useAuthStore();

const blog = ref('');
const blogId = route.params.id;

const getBlog = async () => {
  try {
    const res = await axios.get(`/blog/${blogId}`);
    blog.value = res.data;
    console.log(res)
    
  } catch (error) {
    console.error(error);
  }
};


const timeAgo = (createdAt) => {
  return dayjs(createdAt).fromNow();
};


onMounted(() => {
  getBlog();
});
</script>

<template>
    <section class="job-detail mt-20 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
            <div class="w-full h-96 rounded-xl relative">
              <img :src="blog.blogImage" alt="" class="w-full h-full">
            </div>
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
                <div v-if="blog.blogKeywords" class="space-x-2 text-center">
                  <span
                    v-for="(keyword, index) in blog.blogKeywords.split(',')"
                    :key="index"
                    class="py-1 px-2 text-main bg-main3 border font-semibold text-xs rounded"
                  >
                    {{ keyword.trim() }}
                  </span>
                </div>
                <div class="flex justify-center mt-5">
                    <h2 class="font-semibold max-w-2xl capitalize text-center text-xl lg:text-4xl">{{ blog.title }}</h2>
                </div>
                <div class="flex justify-center items-center space-x-8 mt-5 text-sm">
                    <div v-if="blog.user" class="flex items-center space-x-2">
                        <img :src="blog.user.profilePhoto" alt="" class="w-12 h-12 rounded-full">
                        <div class="text-sm">
                          <p class="font-semibold">{{ blog.user.username }}</p>
                        </div>
                    </div>
                    <p><i class="fa-regular fa-clock mr-2 text-gray-300"></i> {{ timeAgo(blog.createdAt) }}</p>
                </div>
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
                    <p>
                        {{ blog.blogContent }}
                    </p>
                </div>
            </div>
        </div>
    </section>
    <Subscribe />
</template>