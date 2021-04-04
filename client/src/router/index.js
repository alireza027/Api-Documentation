import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AllApi from '../views/AllApi.vue';
import SingleApi from '../views/SingleApi.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'all_api',
    component: AllApi
  },
  {
    path: '/api/:id',
    name: 'single_api',
    component: SingleApi
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
