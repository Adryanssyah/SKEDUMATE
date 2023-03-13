<template>
     <div class="w-full flex justify-center border-b-2 py-6 px-5">
          <div class="w-full max-w-[1100px] flex justify-between items-center">
               <router-link :to="{ name: 'Home' }">
                    <img class="w-32" src="../assets/logo/light.png" alt="" />
               </router-link>
               <div class="flex justify-between items-center gap-10">
                    <router-link class="font-medium text-sm" v-show="userStore.isAuthenticated" :to="{ name: 'Dashboard' }">Dashboard</router-link>
                    <div class="h-8 border-l border-gray-300"></div>
                    <button><i class="bi bi-brightness-high-fill text-xl"></i></button>
                    <router-link class="font-medium" v-if="!userStore.isAuthenticated" :to="{ name: 'Login' }">Masuk</router-link>
                    <button v-show="userStore.isAuthenticated" class="group relative w-9 h-9 flex justify-center items-center text-white text-center cursor-pointer rounded-full" :class="[tema]">
                         <div class="text-sm uppercase">{{ initials }}</div>
                         <div class="absolute hidden group-focus:block rounded top-12 right-0 px-5 py-2 bg-white shadow-md border border-gray-200">
                              <span @click="logout" class="text-black font-medium">Logout</span>
                         </div>
                    </button>
               </div>
          </div>
     </div>
</template>

<script setup>
import axios from 'axios';
import { useUserStore } from '../stores/user';
import { useJadwalStore } from '../stores/jadwal';
const userStore = useUserStore();
const jadwalStore = useJadwalStore();
</script>

<script>
export default {
     name: 'navigasi',
     data() {
          return {
               initials: 'AJ',
               tema: '',
          };
     },
     methods: {
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
                    const userStore = useUserStore();
                    const jadwalStore = useJadwalStore();
                    userStore.$reset();
                    jadwalStore.$reset();
                    this.$router.push({ name: 'Login' });
               } catch (error) {
                    console.error(error);
               }
          },
     },
     created() {
          const userStore = useUserStore();
          this.initials = userStore.setInitials;
          userStore.isAuthenticated ? (this.tema = userStore.user.tema) : '';
     },
};
</script>

<style></style>
