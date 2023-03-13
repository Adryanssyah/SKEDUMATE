<template lang="">
     <section class="min-h-screen flex justify-center items-center">
          <div class="w-full border border-gray-400 rounded-md p-10 flex flex-col items-center gap-8 max-w-[500px]">
               <h1 class="font-medium text-3xl text-center mb-2">Jadwal Angkatan 2019</h1>
               <div class="flex">
                    <div class="w-8 flex items-center justify-center h-8 rounded-full text-white bg-red-500">BS</div>
                    <div class="w-8 flex items-center justify-center h-8 rounded-full text-white bg-indigo-500 -ml-2">ER</div>
                    <div class="w-8 flex items-center justify-center h-8 rounded-full text-white bg-yellow-500 -ml-2">AS</div>
               </div>
               <div>
                    <span class="text-gray-400">Adryan, budi, rina ... +8</span>
               </div>
               <input class="text-lg border-2 border-gray-400 py-3 px-14 w-full rounded-md bg-gray-100 text-center" type="password" placeholder="Password" />
               <div class="">
                    <button class="bg-black text-white px-4 py-2 rounded-md text-lg">Gabung <i class="bi bi-arrow-right ml-2"></i></button>
               </div>
          </div>
     </section>
</template>

<script>
import { ref } from 'vue';
export default {
     name: 'join',
     setup() {},
};
</script>

<style lang=""></style>
