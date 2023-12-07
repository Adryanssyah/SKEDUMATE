<template>
     <div class="w-full md:min-w-[200px] md:max-w-[360px] md:px-0 px-10">
          <form @submit.prevent="login" class="w-full min-h-screen py-10 md:py-10 flex flex-col justify-center items-center gap-6">
               <h1 class="text-2xl text-center font-medium whitespace-pre-wrap mb-8">Selamat datang kembali</h1>

               <div class="flex flex-col gap-4 w-full">
                    <div class="relative">
                         <input
                              class="text-lg border-2 border-gray-400 py-3 pl-14 w-full rounded-md bg-gray-100 dark:bg-dark-2 dark:border-gray-900"
                              :class="{ 'border-red-500 dark:border-red-500': errors.email }"
                              type="email"
                              placeholder="Email"
                              name="email"
                              v-model="email"
                         />
                         <i class="bi bi-envelope-fill text-lg text-gray-500 absolute left-5 top-[28%]"></i>
                    </div>
                    <div class="text-red-500 text-xs -mt-2 flex items-center" v-if="errors.email !== ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.email }}</div>
                    <div class="relative">
                         <input
                              class="text-lg border-2 border-gray-400 py-3 pl-14 w-full rounded-md bg-gray-100 dark:bg-dark-2 dark:border-gray-900"
                              :class="{ 'border-red-500 dark:border-red-500': errors.password }"
                              type="password"
                              placeholder="Password"
                              name="password"
                              v-model="password"
                         />
                         <i class="bi bi-lock-fill text-lg text-gray-500 absolute left-5 top-[28%]"></i>
                    </div>
                    <div class="text-red-500 text-xs -mt-2 flex items-center" v-if="errors.password !== ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i> {{ errors.password }}</div>
               </div>
               <div class="py-4">
                    <button
                         type="submit"
                         :disabled="isLoading"
                         :class="{ 'bg-black dark:bg-yellow-400 dark:text-black text-white': !isLoading, 'bg-gray-400 dark:bg-gray-600 dark:text-black text-white cursor-not-allowed': isLoading }"
                         class="px-4 py-2 rounded-md flex gap-3"
                    >
                         <span>{{ isLoading ? 'Tunggu...' : 'Masuk' }}</span> <i v-if="!isLoading" class="bi bi-arrow-right ml-2"></i>
                    </button>
               </div>
               <div class="dark:text-gray-300">Belum punya akun? <router-link :to="{ name: 'Daftar' }" class="underline font-bold dark:text-white">Daftar</router-link></div>
               <Toggle />
          </form>
     </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../stores/user';
import checkSession from '../composables/checkSession';
import getJadwal from '../composables/getJadwal';
import Toggle from '../components/toggle/dark.vue';
const { load } = checkSession();
const { loadJadwal } = getJadwal();

export default {
     name: 'login',
     components: {
          Toggle,
     },
     data() {
          return {
               email: '',
               password: '',
               errors: {
                    email: '',
                    password: '',
               },
               isLoading: false,
          };
     },
     methods: {
          async login() {
               const userStore = useUserStore();
               try {
                    this.isLoading = true;
                    const response = await axios.post(
                         `login`,
                         {
                              email: this.email,
                              password: this.password,
                         },
                         {
                              withCredentials: true,
                         }
                    );
                    if (response.data.errors) {
                         this.errors = response.data.errors.reduce(
                              (acc, error) => {
                                   acc[error.param] = error.msg;
                                   return acc;
                              },
                              {
                                   email: '',
                                   password: '',
                              }
                         );
                         return this.errors;
                    } else {
                         await load();
                         await loadJadwal();
                         this.$router.push({ name: 'Dashboard' });
                    }
               } catch (error) {
                    if (error.response) {
                         console.log(this.errors);
                    } else {
                         console.error(error);
                    }
               } finally {
                    this.isLoading = false;
               }
          },
     },
};
</script>

<style></style>
