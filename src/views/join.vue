<template lang="">
     <form v-if="!loading" @submit.prevent="gabung" class="min-h-screen flex justify-center items-center mx-3 w-full md:w-[500px]">
          <div class="w-full border border-gray-400 dark:border-dark-3 rounded-md p-10 flex flex-col items-center gap-8 max-w-[500px]">
               <h1 class="font-medium text-3xl text-center mb-2">{{ jadwals.nama_jadwal }}</h1>

               <div class="flex gap-1 items-end flex-wrap justify-center px-5">
                    <span v-for="(item, index) in anggota.slice(0, max)" :key="index" class="capitalize">
                         {{ item.namaDepan }}
                         <span v-if="index !== anggota.slice(0, max).length - 1 && index !== anggota.slice(0, max).length - 2">,</span>
                         <span class="lowercase" v-if="index == anggota.slice(0, max).length - 2"> dan</span>
                    </span>
                    <span v-if="anggota.length - max > 0" class="text-gray-400 text-sm">serta {{ anggota.length - max }} lainnya</span>
               </div>
               <input
                    class="text-lg border-2 py-3 w-full rounded-md bg-gray-100 dark:bg-dark-2 text-center"
                    :class="{ 'border-red-500': errors.error && password == '', 'border-gray-400 dark:border-gray-900': !errors.error && password != '' }"
                    type="password"
                    placeholder="Password"
                    v-model="password"
               />
               <div class="text-red-500 text-xs -mt-6 flex items-center" v-if="errors.error && password == ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i> {{ errors.msg }}</div>
               <div class="">
                    <button type="submit" class="bg-black dark:bg-yellow-400 dark:text-black text-white px-4 py-2 rounded-md text-lg">Gabung <i class="bi bi-arrow-right ml-2"></i></button>
               </div>
          </div>
     </form>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import getJadwalDetail from '../composables/getJadwalDetail';
import { useUserStore } from '../stores/user';
export default {
     name: 'join',
     props: ['id'],
     data() {
          return {
               jadwals: ref(null),
               password: '',
               anggota: '',
               max: 5,
               loading: true,
               errors: {
                    error: false,
                    msg: '',
               },
          };
     },
     methods: {
          async loadData() {
               const { loadDetail, schedule } = getJadwalDetail(this.id);
               await loadDetail();
               this.jadwals = schedule;

               this.anggota = [
                    {
                         userId: this.jadwals.pemilik,
                         role: 'Pemilik',
                    },
                    ...this.jadwals.peserta.map((item) => ({
                         userId: item.userId,
                         role: item.role,
                    })),
               ];

               const response = await axios.post('get-anggota', this.anggota, {
                    withCredentials: true,
               });
               if (response.status == 200) {
                    this.anggota = response.data;
                    this.loading = false;
               }
          },

          async gabung() {
               const userStore = useUserStore();
               const parameter = {
                    _id: this.jadwals._id,
                    userId: userStore.user.id,
                    password: this.password,
               };
               const response = await axios.post('gabung', parameter, {
                    withCredentials: true,
               });

               if (!response.data.error) {
                    console.log('Berhasil');
               } else {
                    this.errors = response.data;
                    this.password = '';
                    console.log(this.errors);
               }
          },
     },

     created() {
          this.loadData();
     },
};
</script>
