import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'

import HomeView from '../views/HomeView.vue'

import JobPost from '../views/JobPost.vue'
import Jobs from '../views/Jobs.vue'
import FilteredJobs from '../views/FilteredJobs.vue'
import JobEdit from '../views/EditJob.vue'
import JobDeatil from '../views/JobDetail.vue'
import Companies from '../views/Companies.vue'
import CompanyDetail from '@/views/CompanyDetail.vue'
import Employees from '../views/Employees.vue'
import EmployeeDetail from '@/views/EmployeesDetail.vue'


import AboutUs from '../views/pages/AboutUs.vue'
import ContactUs from '../views/pages/ContactUs.vue'
import Blog from '@/views/Blog.vue'
import BlogDetail from '@/views/BlogDetail.vue'

import MyAccount from '@/views/myaccount/MyAccount.vue'
import JobDashboard from '@/views/myaccount/JobDashboard.vue'
import AccountDetail from '@/views/myaccount/AccountDetail.vue'
import MyCompany from '@/views/myaccount/MyCompany.vue'
import MyResume from '@/views/myaccount/MyResume.vue'
import PastApplications from '@/views/myaccount/PastApplications.vue'
import SavedJobs from '@/views/myaccount/SavedJobs.vue'

import Dashboard from '../views/dashboard/Dashboard.vue'
import Users from '../views/dashboard/Users.vue'
import DashJobs from '../views/dashboard/Jobs.vue'
import Category from '../views/dashboard/Category.vue'
import DashBlog from '../views/dashboard/Blog.vue'
import AdminProfile from '../views/dashboard/AdminProfile.vue'


import { useAuthStore } from '@/store/authStore';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [

    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    { path: '/reset-password/:token', name: 'reset-password', component: ResetPassword },
    { path: '/', name: 'home', component: HomeView },

    { path: '/job-post', name: 'Jobpost', component: JobPost, meta:{ requiresAuth: true}  },
    { path: '/jobs', name: 'Jobs', component: Jobs },
    // { path: '/jobs', name: 'FilteredJobs', component: FilteredJobs },
    { path: '/job-edit/:id', name: 'JobEdit', component: JobEdit, },
    { path: '/job-detail/:id', name: 'Jobdetail', component: JobDeatil, meta:{ requiresAuth: true} },
    { path: '/companies', name: 'companies', component: Companies },
    { path: '/company-detail/:id', name: 'company-detail', component: CompanyDetail, meta:{ requiresAuth: true}  },
    { path: '/employees', name: 'employees', component: Employees  },
    { path: '/employee-detail/:id', name: 'employee-detail', component: EmployeeDetail, meta:{ requiresAuth: true} },    


    { path: '/about-us', name: 'about-us', component: AboutUs },
    { path: '/contact-us', name: 'contact-us', component: ContactUs },
    { path: '/blog', name: 'blog', component: Blog },
    { path: '/blog-detail/:id', name: 'blog-detail', component: BlogDetail },

    { path: '/my-account', name: 'my-account', component: MyAccount, meta:{ requiresAuth: true} },
    { path: '/jobs-dashboard', name: 'Jobdashboard', component: JobDashboard, meta:{ requiresAuth: true} },
    { path: '/account-detail', name: 'account-detail', component: AccountDetail, meta:{ requiresAuth: true} },
    { path: '/my-company', name: 'my-company', component: MyCompany, meta:{ requiresAuth: true} },
    { path: '/my-resume', name: 'my-resume', component: MyResume, meta:{ requiresAuth: true} },
    { path: '/past-applications', name: 'past-applications', component: PastApplications, meta:{ requiresAuth: true}},
    { path: '/saved-jobs', name: 'saved-jobs', component: SavedJobs,  meta:{ requiresAuth: true}},

    { path: '/dashboard/stats', name: 'dashboard', component: Dashboard, meta: { hideNavFooter: true, requiresAuth: true } },
    { path: '/dashboard/users', name: 'users', component: Users, meta: { hideNavFooter: true, requiresAuth: true } },
    { path: '/dashboard/jobs', name: 'dash-jobs', component: DashJobs, meta: { hideNavFooter: true, requiresAuth: true } },
    { path: '/dashboard/admin-profile', name: 'admin-profile', component: AdminProfile, meta: { hideNavFooter: true, requiresAuth: true } },
    { path: '/dashboard/add-category', name: 'category', component: Category, meta: { hideNavFooter: true, requiresAuth: true } },
    { path: '/dashboard/blog', name: 'dash-blog', component: DashBlog, meta: { hideNavFooter: true, requiresAuth: true } },
    

    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.user) {
      return next({ name: 'login' });
    }

    if (to.meta.roles && !to.meta.roles.includes(authStore.user.role)) {
      return next({ name: 'home' });
    }
  }
  next();
});


export default router
