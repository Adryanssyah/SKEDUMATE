<template>
     <div class="w-full dark:bg-gray-900 dark:text-white flex justify-center px-5">
          <div class="w-full max-w-[1100px] flex flex-col">
               <section class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-20">
                    <div class="order-last lg:order-first flex flex-col items-center lg:items-start justify-center px-10 lg:px-0">
                         <h1 class="font-bold lg:text-center text-5xl lg:text-7xl">Skedumate</h1>
                         <h2 class="font-regular text-center lg:text-start text-lg lg:text-xl my-8">Kolaborasi jadwal seru dan asyik, hanya dengan Skedumate.</h2>
                         <div>
                              <router-link :to="{ name: 'Login' }" class="bg-black dark:bg-yellow-400 dark:text-black text-white px-4 py-2 rounded-md">Mulai Sekarang <i class="bi bi-arrow-right ml-2"></i></router-link>
                         </div>
                    </div>
                    <div class="flex justify-center items-center lg:justify-end">
                         <img src="../assets/img/hero2.png" alt="" class="w-[320px] lg:w-[420px]" />
                    </div>
               </section>
          </div>
     </div>
     <div class="bg-gray-100 dark:bg-gray-800 w-full flex justify-center px-5">
          <div class="w-full max-w-[1100px] flex flex-col">
               <h1 class="text-center font-medium text-3xl mt-10 dark:text-gray-100">Kenapa Skedumate?</h1>
               <section class="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:grid-cols-2 mb-10 mt-10 items-center">
                    <div class="bg-white dark:bg-gray-900 dark:text-white rounded-md min-h-full shadow-md flex flex-col p-5">
                         <div class="w-full rounded-lg h-[235.03px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center py-10 overflow-hidden">
                              <img src="../assets/img/comp2.svg" alt="" class="w-48" />
                         </div>
                         <div class="flex flex-col mt-4 gap-2 text-center px-2">
                              <h3 class="text-2xl font-semibold">Kolaborasi</h3>
                              <p>Kamu bisa ajak yang lain untuk kelola jadwal secara bersama-sama</p>
                         </div>
                    </div>
                    <div class="bg-white dark:bg-gray-900 dark:text-white rounded-md min-h-full shadow-md flex flex-col p-5">
                         <div class="w-full rounded-lg h-[235.03px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center py-10 overflow-hidden">
                              <img src="../assets/img/comp3.svg" alt="" class="w-48" />
                         </div>
                         <div class="flex flex-col mt-4 gap-2 text-center px-2">
                              <h3 class="text-2xl font-semibold">Kelola</h3>
                              <p>Mudah digunakan untuk kelola jadwal yang banyak</p>
                         </div>
                    </div>
                    <div class="bg-white dark:bg-gray-900 dark:text-white rounded-md min-h-full shadow-md flex flex-col p-5">
                         <div class="w-full rounded-lg h-[235.03px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center py-10 overflow-hidden">
                              <img src="../assets/img/comp4.svg" alt="" class="w-48" />
                         </div>
                         <div class="flex flex-col mt-4 gap-2 text-center px-2">
                              <h3 class="text-2xl font-semibold">Cari Jadwal</h3>
                              <p>Solusi untuk mencari jadwal pengganti jika ada jadwal yang bertabrakan</p>
                         </div>
                    </div>
               </section>
          </div>
     </div>
</template>

<script>
export default {
     name: 'home',
};
</script>

<style></style>
