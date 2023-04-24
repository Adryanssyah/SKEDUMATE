<template>
     <div class="w-full dark:bg-dark flex justify-center py-10 px-5">
          <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-dark fixed w-full z-20 -top-0 left-0 border-b border-gray-200 dark:border-dark-2">
               <div class="container relative max-w-[1100px] flex flex-wrap items-center justify-between mx-auto">
                    <router-link :to="{ name: 'Home' }" class="flex items-center">
                         <img v-if="isLightMode" src="../assets/logo/light.webp" class="h-6 w-full mr-3 sm:h-9" alt="Skedumate" />
                         <img v-if="!isLightMode" src="../assets/logo/dark.webp" class="h-6 w-full mr-3 sm:h-9" alt="Skedumate" />
                    </router-link>
                    <div class="flex flex-wrap items-center justify-between gap-10">
                         <div class="flex items-center order-3" v-if="userStore.isAuthenticated">
                              <button ref="trigger" @click="menuVisible = !menuVisible" type="button" class="group w-9 h-9 flex justify-center items-center text-black dark:text-white text-center cursor-pointer rounded-full" :class="[tema]">
                                   <div class="text-sm uppercase">{{ initials }}</div>
                              </button>

                              <transition
                                   enter-active-class="transform transition duration-200 ease-custom"
                                   enter-from-class="-translate-y-1/2 translate-x-1/2 scale-y-0 scale-x-0 opacity-0"
                                   leave-active-class="transform transition duration-200 ease-custom"
                                   leave-to-class="-translate-y-1/2 translate-x-1/2 scale-y-0 scale-x-0 opacity-0"
                              >
                                   <div
                                        v-if="menuVisible"
                                        v-closable="{ exclude: ['trigger'], handler: 'closeMenu' }"
                                        class="z-10 absolute top-10 right-0 text-start my-4 text-base bg-white divide-y divide-gray-100 rounded-lg border border-gray-300 dark:border-none shadow-lg dark:bg-dark-2 dark:divide-gray-600"
                                   >
                                        <div class="px-4 py-3">
                                             <span class="block text-sm text-gray-900 dark:text-white">{{ namaLengkap }}</span>
                                             <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{{ email }}</span>
                                        </div>
                                        <ul class="py-2">
                                             <li>
                                                  <span @click="logout" class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
                                             </li>
                                        </ul>
                                   </div>
                              </transition>

                              <button
                                   data-collapse-toggle="mobile-menu-2"
                                   type="button"
                                   class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                   aria-controls="mobile-menu-2"
                                   aria-expanded="false"
                              >
                                   <span class="sr-only">Open main menu</span>
                                   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                             fill-rule="evenodd"
                                             d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                             clip-rule="evenodd"
                                        ></path>
                                   </svg>
                              </button>
                         </div>

                         <div class="order-2 flex">
                              <Toggle @toggle="toggleDark" />
                         </div>

                         <div class="items-center justify-between hidden w-full md:flex md:w-auto order-1" id="mobile-menu-2">
                              <ul
                                   class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-dark-2 md:dark:bg-dark dark:border-dark-2"
                              >
                                   <li v-if="!userStore.isAuthenticated">
                                        <router-link
                                             :to="{ name: 'Login' }"
                                             class="block opacity-50 text-black dark:text-white py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent hover:opacity-100 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-dark-2"
                                             aria-current="page"
                                             >Login</router-link
                                        >
                                   </li>
                                   <li>
                                        <router-link
                                             v-show="userStore.isAuthenticated"
                                             :to="{ name: 'Dashboard' }"
                                             class="block opacity-50 text-black dark:text-white py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent hover:opacity-100 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-dark-2"
                                             >Dashboard</router-link
                                        >
                                   </li>
                              </ul>
                         </div>
                    </div>
               </div>
          </nav>
     </div>
</template>

<script>
import { useUserStore } from '../stores/user';
import { useJadwalStore } from '../stores/jadwal';
import axios from 'axios';
import Toggle from '../components/toggle/dark.vue';
export default {
     name: 'navigasi',
     data() {
          return {
               namaLengkap: '',
               email: '',
               initials: '',
               tema: '',
               isLightMode: true,
               menuVisible: false,
          };
     },
     components: {
          Toggle,
     },
     methods: {
          closeMenu() {
               this.menuVisible = false;
          },
          async logout() {
               const sessionId = 'logout';
               try {
                    const response = await axios.post(
                         'logout',
                         { sessionId },
                         {
                              withCredentials: true,
                         }
                    );
                    if (response) {
                         const userStore = useUserStore();
                         const jadwalStore = useJadwalStore();
                         userStore.$reset();
                         jadwalStore.$reset();
                         this.$router.push({ name: 'Home' });
                    }
               } catch (error) {
                    console.error(error);
               }
          },

          upperCaseFirtsLetter(text) {
               return text.charAt(0).toUpperCase() + text.slice(1);
          },

          toggleDark() {
               this.isLightMode = !this.isLightMode;
          },
     },
     created() {
          const userStore = useUserStore();
          userStore.isAuthenticated
               ? ((this.tema = userStore.user.tema),
                 (this.email = userStore.user.email),
                 (this.initials = userStore.setInitials),
                 (this.namaLengkap = this.upperCaseFirtsLetter(userStore.user.namaDepan) + ' ' + this.upperCaseFirtsLetter(userStore.user.namaBelakang)))
               : '';

          localStorage.getItem('isLightMode') ? (this.isLightMode = true) : (this.isLightMode = false);
     },

     setup() {
          const userStore = useUserStore();
          return {
               userStore,
          };
     },
};
</script>

<style>
.router-link-active {
     opacity: 1 !important;
     font-weight: 600;
}
</style>
