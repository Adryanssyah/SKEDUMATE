<template>
     <div class="fixed top-0 left-0 w-full py-5 h-full bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="closeModal">
          <div class="bg-white max-h-full w-full mx-2 max-w-[450px] md:max-w-[1000px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
               <div class="flex items-center justify-between mb-8">
                    <h3 class="font-medium text-xl">Jadwal Kosong</h3>
                    <span class="cursor-pointer" @click="closeModal">
                         <i class="bi bi-x-lg"></i>
                    </span>
               </div>
               <div class="text-sm w-full font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px">
                         <li class="mr-2">
                              <a href="#" class="inline-block p-4 text-black border-b-2 border-black rounded-t-lg dark:text-white dark:border-white" aria-current="page">Semua</a>
                         </li>
                         <li class="mr-2">
                              <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">R001</a>
                         </li>

                         <li class="mr-2">
                              <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">R002</a>
                         </li>
                         <li class="mr-2">
                              <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">R003</a>
                         </li>
                    </ul>
               </div>
               <div class="md:w-full max-h-[1000px] overflow-y-auto">
                    <div class="w-full py-5" v-for="(jadwals, index) in jadwalKosong" :key="index">
                         <h4 class="font-semibold text-lg mb-5 mt-5">{{ index }}</h4>
                         <div class="flex gap-3 flex-wrap whitespace-nowrap">
                              <div v-for="(jadwal, index) in jadwals" :key="index" class="border-2 text-center green rounded-md px-6 py-2">{{ jadwal }}</div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import axios from 'axios';
export default {
     name: 'modal-jadwal-kosong',
     props: ['param'],
     data() {
          return {
               jadwalKosong: {},
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
               console.log(response.data);
          } catch (error) {
               console.log(error);
          }
     },
};
</script>

<style></style>
