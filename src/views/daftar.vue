<template>
     <div class="w-full md:min-w-[200px] md:max-w-[360px] md:px-0 px-10">
          <form @submit.prevent="signUp" class="w-full min-h-screen py-10 md:py-10 flex flex-col justify-center items-center gap-6">
               <h1 class="text-2xl text-center font-medium whitespace-pre-wrap mb-8">Gabung ke <strong>Skedumate.</strong></h1>

               <div class="flex flex-col gap-4 w-full text-sm">
                    <div class="relative">
                         <input
                              class="text-lg border border-gray-400 py-3 pl-14 w-full rounded-md bg-gray-100 dark:bg-dark-2 dark:border-gray-900"
                              :class="{ 'border-red-500 dark:border-red-500': errors.namaDepan }"
                              type="text"
                              name="namaDepan"
                              placeholder="Nama Depan"
                              v-model="namaDepan"
                         />
                         <i class="bi bi-person-fill text-lg text-gray-500 absolute left-5 top-[28%]"></i>
                    </div>
                    <div class="text-red-500 text-xs -mt-2 flex items-center" v-if="errors.namaDepan !== ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.namaDepan }}</div>
                    <div class="relative">
                         <input
                              class="text-lg border border-gray-400 py-3 pl-14 w-full rounded-md bg-gray-100 dark:bg-dark-2 dark:border-gray-900"
                              :class="{ 'border-red-500 dark:border-red-500': errors.namaBelakang }"
                              type="text"
                              name="namaBelakang"
                              placeholder="Nama Belakang"
                              v-model="namaBelakang"
                         />
                         <i class="bi bi-person-fill text-lg text-gray-500 absolute left-5 top-[28%]"></i>
                    </div>
                    <div class="text-red-500 text-xs -mt-2 flex items-center" v-if="errors.namaBelakang !== ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.namaBelakang }}</div>
                    <div class="relative">
                         <input
                              class="text-lg border border-gray-400 py-3 pl-14 w-full rounded-md bg-gray-100 dark:bg-dark-2 dark:border-gray-900"
                              :class="{ 'border-red-500 dark:border-red-500': errors.email }"
                              type="email"
                              name="email"
                              placeholder="Email"
                              v-model="email"
                         />
                         <i class="bi bi-envelope-fill text-lg text-gray-500 absolute left-5 top-[28%] p-0"></i>
                    </div>
                    <div class="text-red-500 text-xs -mt-2 flex items-center" v-if="errors.email !== ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.email }}</div>

                    <div class="relative">
                         <input
                              class="text-lg border border-gray-400 py-3 pl-14 w-full rounded-md bg-gray-100 dark:bg-dark-2 dark:border-gray-900"
                              :class="{ 'border-red-500 dark:border-red-500': errors.password }"
                              type="password"
                              name="password"
                              placeholder="Password"
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
                         <span>{{ isLoading ? 'Tunggu...' : 'Daftar' }}</span> <i v-if="!isLoading" class="bi bi-arrow-right ml-2"></i>
                    </button>
               </div>
               <div class="dark:text-gray-300">Sudah punya akun? <router-link :to="{ name: 'Login' }" class="underline font-bold dark:text-white">Masuk</router-link></div>
          </form>
     </div>
</template>

<script>
import axios from 'axios';

export default {
     name: 'daftar',
     data() {
          return {
               namaDepan: '',
               namaBelakang: '',
               email: '',
               password: '',
               errors: {
                    namaDepan: '',
                    namaBelakang: '',
                    email: '',
                    password: '',
               },
               isLoading: false,
          };
     },
     methods: {
          async signUp() {
               try {
                    this.isLoading = true;
                    const response = await axios.post(
                         `register`,
                         {
                              namaDepan: this.namaDepan,
                              namaBelakang: this.namaBelakang,
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
                                   namaDepan: '',
                                   namaBelakang: '',
                                   email: '',
                                   password: '',
                              }
                         );
                         return this.errors;
                    }

                    this.$router.push({ name: 'Dashboard' });
               } catch (error) {
                    if (error.response) {
                         this.errors = error.response.data;
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
