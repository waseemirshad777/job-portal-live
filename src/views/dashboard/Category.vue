<script setup>
import Dashboard from '@/components/DashboardLayout/dashboard.vue';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';


const categories = ref([]);
const modalOpen = ref(false);
const modalType = ref('add');
const category = ref('');
const icon = ref('');
const selectedCategoryId = ref(null);

const currentPage = ref(1);
const totalCategories = ref(0);
const lastPage = ref(0);
const perPage = ref(10);

const categoryName = ref('');


const fetchCategories = async ( page = 1) => {
  const res = await axios.get(`/categories?categoryName=${categoryName.value}&page=${page}`);
  categories.value = res.data.categories;
  currentPage.value = res.data.pagination.currentPage;
  perPage.value = res.data.pagination.perPage;
  lastPage.value = res.data.pagination.totalPages;
  totalCategories.value = res.data.pagination.totalCategories;
  console.log(categories.value);
};

const paginationHandler = (page) => {
    fetchCategories(page);
};

const filterJobs = () => {
  getJobs(currentPage.value);
};


const openModal = (type, ctg = null) => {
  modalType.value = type;
  modalOpen.value = true;
  if (type === 'edit' && ctg) {
    category.value = ctg.categoryName;
    icon.value = ctg.icon;
    selectedCategoryId.value = ctg._id;
  } else {
    category.value = '';
    icon.value = '';
  }
};

const submitForm = async () => {
  if (modalType.value === 'add') {
    try{
      await axios.post('/add-category',{
        categoryName: category.value,
        icon: icon.value,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    await axios.put(`/update-category/${selectedCategoryId.value}`, {
      categoryName: category.value,
      icon: icon.value,
    });
  }
  modalOpen.value = false;
  fetchCategories();
};

const deleteCategory = async (id) => {
  if (confirm('Are you sure you want to delete this category?')) {
    await axios.delete(`/category/${id}`);
    fetchCategories();
  }
};


onMounted(fetchCategories);
</script>


<template>
<Dashboard>
  <div class="p-0 md:p-6 container mx-auto">
      <div class="flex justify-between items-center flex-col md:flex-row space-y-4 md:space-y-0 mb-4">
        <h2 class="text-2xl font-bold">Manage Categories</h2>
        <button @click="openModal('add')" class="bg-main text-white px-4 py-2 rounded-lg hover:bg-hover transition">
          Add Category
        </button>
      </div>
  
      <div class="mb-4">
        <input 
          v-model="categoryName"
          @input="fetchCategories" 
          type="text"
          placeholder="Search Categories"
          class="w-full p-2 border rounded-lg"
        />
      </div>
  
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left">Category Name</th>
              <th class="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ctg in categories" :key="category._id" class="border-b">
              <td class="p-3">{{ ctg.categoryName }}</td>
              <td class="p-3 text-center">
                <button @click="openModal('edit', ctg)" class="text-blue-500 hover:text-blue-700">
                  <i class="fas fa-pencil-alt"></i>
                  <!-- <Icon icon="bi:pencil-square"/> -->
                </button>
                <button @click="deleteCategory(ctg._id)" class="text-red-500 hover:text-red-700 ml-4">
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
          :total-items="totalCategories"
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
  
      <!-- Add/Edit Category Modal -->
      <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0 text-sm">
          <h3 class="text-xl font-bold mb-4">{{ modalType === 'add' ? 'Add Category' : 'Edit Category' }}</h3>
          
          <div class="mb-4">
            <label class="block mb-2">Category Name</label>
            <input v-model="category" type="text" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">Enter Category Icon Code</label>
            <input v-model="icon" type="text" placeholder='<i class="fa-solid fa-house"></i>' class="w-full p-2 border rounded-lg" />
          </div>
          <a class="text-sm text-main" target="_blank" href="https://fontawesome.com/search">Click here to get icon code...</a>
          <div class="flex justify-end">
            <button @click="modalOpen = false" class="bg-gray-300 px-4 py-2 rounded-lg mr-2">Cancel</button>
            <button @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded-lg">
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
  
  