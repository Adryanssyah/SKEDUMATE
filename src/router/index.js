import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Daftar from '../views/daftar.vue';
import Dashboard from '../views/dashboard.vue';
import Buat from '../views/buat.vue';
import Join from '../views/join.vue';
import NotFound from '@/views/notFound.vue';

import { useUserStore } from '../stores/user';
import checkAnggota from '../composables/checkAnggota';

const router = createRouter({
     history: createWebHistory(import.meta.env.BASE_URL),
     scrollBehavior(to, from, savedPosition) {
          if (savedPosition) {
               return savedPosition;
          } else {
               return { top: 0 };
          }
     },
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
               path: '/gabung/:id',
               name: 'Join',
               component: Join,
               meta: {
                    title: 'Gabung',
                    requiresAuth: true,
               },
               props: true,
          },
          {
               path: '/:pathMatch(.*)*',
               name: 'NotFound',
               component: NotFound,
               meta: {
                    title: 'Page Not Found',
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
     } else if (requiresAuth && !userStore.isAuthenticated) {
          document.title = `${from.meta.title + ' - Skedumate'}`;
          return next({
               name: 'Login',
          });
     } else if (to.name === 'Buat') {
          const { load } = checkAnggota(to.params.id);
          const anggota = await load();
          if (!anggota.permision && anggota.jenis === 'public') {
               document.title = `${from.meta.title + ' - Skedumate'}`;
               next({ name: 'Join', params: { id: to.params.id } });
          } else if (!anggota.permision && anggota.jenis === 'private') {
               document.title = `${to.meta.title + ' - Skedumate'}`;
               next({ name: 'Dashboard' });
          } else {
               userStore.role = anggota.role;
               next();
          }
     } else if (to.name === 'Join') {
          const { load } = checkAnggota(to.params.id);
          const anggota = await load();
          if (anggota.permision && anggota.jenis === 'public') {
               userStore.role = anggota.role;
               next({ name: 'Buat', params: { id: to.params.id } });
          } else if (anggota.jenis === 'private') {
               document.title = `${to.meta.title + ' - Skedumate'}`;
               next({ name: 'Dashboard' });
          } else {
               document.title = `${to.meta.title + ' - Skedumate'}`;
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
