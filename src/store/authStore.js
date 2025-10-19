// src/store/authStore.js
import router from '@/router';
import { defineStore } from 'pinia'
import { computed } from 'vue';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  getters: {
    role: (state) => state.user?.role || null,

    // Computed properties for role checks
    isEmployeeOrAdmin: (state) => computed(() => state.user?.role === 'employee' || state.user?.role === 'admin'),
    isEmployerOrAdmin: (state) => computed(() => state.user?.role === 'employer' || state.user?.role === 'admin'),
  },
});

