<script setup>
import Dashboard from '@/components/DashboardLayout/dashboard.vue';
import { useAuthStore } from '@/store/authStore';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
const store = useAuthStore();


const blogs = ref([]);
const modalOpen = ref(false);
const modalType = ref('add');
const selectedBlogId = ref(null);

const currentPage = ref(1);
const totalBlogs = ref(0);
const lastPage = ref(0);
const perPage = ref(10);

const searchTitle = ref('');


const fetchBlogs = async ( page = 1) => {
  const res = await axios.get(`/blogs?title=${searchTitle.value}&page=${page}`);
  blogs.value = res.data.blogs;
  currentPage.value = res.data.pagination.currentPage;
  perPage.value = res.data.pagination.perPage;
  lastPage.value = res.data.pagination.totalPages;
  totalBlogs.value = res.data.pagination.totalBlogs;
  console.log(blogs.value);
};

const paginationHandler = (page) => {
    fetchBlogs(page);
};

const filterBlogs = () => {
    fetchBlogs(currentPage.value);
};

const title = ref('');
const blogContent = ref('');
const blogKeywords = ref('');
const blogImage = ref('');

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    blogImage.value = file;
    console.log(blogImage.value)
  }
}

const openModal = (type, blog = null) => {
  modalType.value = type;
  modalOpen.value = true;
  if (type === 'edit' && blog) {
    title.value = blog.title;
    blogContent.value = blog.blogContent;
    selectedBlogId.value = blog._id;
    blogImage.value = blog.blogImage;
  } else {
    title.value = '';
    blogKeywords.value = '';
    blogContent.value = '';
    blogImage.value = '';
  }
};

const submitForm = async () => {
  if (modalType.value === 'add') {
    try{
        const formData = new FormData();
        formData.append('user', store.user._id);
        formData.append('title', title.value);
        formData.append('blogKeywords', blogKeywords.value);
        formData.append('blogContent', blogContent.value);
        formData.append('blogImage', blogImage.value);

        await axios.post('/blog/post', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
      console.error(error);
    }
  } else {
    try{
        const formData = new FormData();
        formData.append('user', store.user._id);
        formData.append('title', title.value);
        formData.append('blogKeywords', blogKeywords.value);
        formData.append('blogContent', blogContent.value);
        formData.append('blogImage', blogImage.value);

        await axios.put(`/update/blog/${selectedBlogId.value}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
      console.error(error);
    }
  }
  modalOpen.value = false;
  fetchBlogs();
};

const deleteBlog= async (id) => {
  if (confirm('Are you sure you want to delete this Blog?')) {
    await axios.delete(`/delete/blog/${id}`);
    fetchBlogs();
  }
};


onMounted(fetchBlogs);
</script>


<template>
<Dashboard>
  <div class="p-0 md:p-6 container mx-auto">
      <div class="flex justify-between items-center flex-col md:flex-row space-y-4 md:space-y-0 mb-4">
        <h2 class="text-2xl font-bold">Manage Blogs</h2>
        <button @click="openModal('add')" class="bg-main text-white px-4 py-2 rounded-lg hover:bg-hover transition">
          Add Blog
        </button>
      </div>
  
      <div class="mb-4">
        <input 
          v-model="searchTitle"
          @input="filterBlogs" 
          type="text"
          placeholder="Search By Title"
          class="w-full p-2 border rounded-lg"
        />
      </div>
  
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left">Blog Title</th>
              <th class="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in blogs" :key="blog._id" class="border-b">
              <td class="p-3">{{ blog.title }}</td>
              <td class="p-3 text-center">
                <button @click="openModal('edit', blog)" class="text-blue-500 hover:text-blue-700">
                  <i class="fas fa-pencil-alt"></i>
                  <!-- <Icon icon="bi:pencil-square"/> -->
                </button>
                <button @click="deleteBlog(blog._id)" class="text-red-500 hover:text-red-700 ml-4">
                  <Icon icon="bi:trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-container">
        <div class="pages-count text-sm">Page {{ currentPage + ' of ' + lastPage}}</div>
        <vue-awesome-paginate
          :total-items="totalBlogs"
          :items-per-page="perPage"
          :max-pages-shown="lastPage.value"
          v-model="currentPage"
          :on-click="paginationHandler"
          paginate-buttons-class="paginate-btn"
          active-page-class="paginate-btn-active"
          back-button-class="paginate-back-btn"
          next-button-class="paginate-next-btn"
        >
          <template #prev-button>
            <span class="text-sm">
              Prev
            </span>
          </template>
          <template #next-button>
            <span class="text-sm">
              Next
            </span>
          </template>
        </vue-awesome-paginate>
  
      </div>
  
      
      <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl mx-4 md:mx-0 text-sm">
          <h3 class="text-xl font-bold mb-4">{{ modalType === 'add' ? 'Add Blog' : 'Edit Blog' }}</h3>
          
          <div class="mb-4">
            <label class="block mb-2">Blog Title</label>
            <input v-model="title" type="text" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">Enter Blog Keywords</label>
            <input v-model="blogKeywords" type="text" placeholder='Events, Tips, nature' class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">Upload Blog Image</label>
            <input @change="handleFileChange($event)" type="file" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">Enter Blog Content</label>
            <textarea row="10" v-model="blogContent" type="text" placeholder='' class="w-full p-2 border rounded-lg" ></textarea>
          </div>
          <div class="flex justify-end">
            <button @click="modalOpen = false" class="bg-gray-300 px-4 py-2 rounded-lg mr-2">Cancel</button>
            <button @click="submitForm" class="bg-main text-white px-4 py-2 rounded-lg">
              {{ modalType === 'add' ? 'Add' : 'Update' }}
            </button>
          </div>
        </div>
      </div>
  </div>
</Dashboard>
  
        

  </template>

  
  <style scoped>
  /* Add your custom styles here if necessary */
  </style>
  
  