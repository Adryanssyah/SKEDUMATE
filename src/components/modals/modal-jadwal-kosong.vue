<template>
     <div class="bg-white max-h-full w-full mx-2 md:max-w-[1000px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <div class="flex items-center justify-between mb-8">
               <h3 class="font-medium text-xl">Jadwal Kosong</h3>
               <span class="cursor-pointer" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
               </span>
          </div>

          <div v-if="!loading" class="text-sm w-full font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
               <ul class="flex flex-wrap -mb-px">
                    <li class="mr-2">
                         <a href="#" class="inline-block p-4 text-black border-b-2 border-black rounded-t-lg dark:text-white dark:border-white" aria-current="page">Semua</a>
                    </li>
                    <li v-for="(item, index) in kelas" :key="index" class="mr-2">
                         <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                              {{ item.namaKelas }}
                         </button>
                    </li>
               </ul>
          </div>
          <div
               v-if="!loading"
               class="md:w-full max-h-[1000px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-dark dark:scrollbar-track-dark-3 overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          >
               <div class="w-full py-5 flex flex-col gap-4 items-center" v-for="(jadwals, namaHari) in jadwalKosong" :key="namaHari">
                    <h4 class="font-semibold text-lg mb-5 mt-5">{{ namaHari }}</h4>
                    <div class="flex gap-3 flex-wrap whitespace-nowrap justify-center">
                         <div v-if="jadwals != ''" v-for="(jadwal, index) in jadwals" :key="index" class="border-2 font-semibold text-center green rounded-md px-6 py-2">{{ jadwal }}</div>
                         <div v-if="jadwals == ''" class="">Hari {{ namaHari }} penuh</div>
                    </div>
               </div>
          </div>

          <div v-if="loading" class="w-full text-center py-12">
               <Spinner />
          </div>
     </div>
</template>

<script>
import { useJadwalStore } from '../../stores/jadwal';
import Spinner from '../loader/spiner.vue';
import axios from 'axios';
export default {
     name: 'modal-jadwal-kosong',
     props: ['param'],
     components: {
          Spinner,
     },
     data() {
          return {
               jadwalKosong: {},
               loading: true,
          };
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },
     },

     async mounted() {
          try {
               const response = await axios.get('jadwal-kosong/' + this.param, {
                    withCredentials: true,
               });
               this.jadwalKosong = response.data.jadwalKosong;
               this.loading = false;
          } catch (error) {
               console.log(error);
          }
     },

     setup() {
          const jadwalStore = useJadwalStore();
          const kelas = jadwalStore.kelas;
          return {
               kelas,
          };
     },
};
</script>

<style></style>
