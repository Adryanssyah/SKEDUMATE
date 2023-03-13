import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Daftar from '../views/daftar.vue';
import Dashboard from '../views/dashboard.vue';
import Buat from '../views/buat.vue';
import Join from '../views/join.vue';

import { useUserStore } from '../stores/user';
import checkSession from '../composables/checkSession';

const router = createRouter({
     history: createWebHistory(import.meta.env.BASE_URL),
     routes: [
          {
               path: '/',
               name: 'Home',
               component: Home,
               meta: {
                    title: 'Selamat Datang',
               },
          },
          {
               path: '/login',
               name: 'Login',
               component: Login,
               meta: {
                    title: 'Masuk',
                    authPage: true,
               },
          },
          {
               path: '/daftar',
               name: 'Daftar',
               component: Daftar,
               meta: {
                    title: 'Daftar',
                    authPage: true,
               },
          },
          {
               path: '/dashboard',
               name: 'Dashboard',
               component: Dashboard,
               meta: {
                    title: 'Dashboard',
                    requiresAuth: true,
               },
          },
          {
               path: '/jadwal/:id',
               name: 'Buat',
               component: Buat,
               meta: {
                    title: 'Jadwal',
                    requiresAuth: true,
               },
               props: true,
          },
          {
               path: '/gabung',
               name: 'Join',
               component: Join,
               meta: {
                    title: 'Gabung',
               },
          },
     ],
});

router.beforeEach(async (to, from, next) => {
     const userStore = useUserStore();
     document.title = `${to.meta.title + ' - Skedumate'}`;
     const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

     if (to.name === 'Login' || to.name === 'Daftar') {
          if (userStore.isAuthenticated) {
               document.title = `${from.meta.title + ' - Skedumate'}`;
               return next(from);
          } else {
               next();
          }
     } else if (requiresAuth) {
          if (requiresAuth && !userStore.isAuthenticated) {
               document.title = `${from.meta.title + ' - Skedumate'}`;
               return next({
                    name: 'Login',
               });
          } else {
               next();
          }
     } else {
          next();
     }
});
export default router;
