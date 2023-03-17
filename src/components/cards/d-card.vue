<template>
     <div class="px-4 py-4 border-slate-200 dark:bg-dark-2 dark:border-dark-2 border-2 rounded-md mb-2 flex flex-col justify-between">
          <div class="mb-12 flex gap-5 overflow-hidden">
               <router-link :to="{ name: 'Buat', params: { id: jadwal.custom_id } }" v-if="jadwal.jenis == 'private'" class="text-6xl px-5 py-4 bg-blue-200 rounded-md text-blue-500">
                    <i class="bi bi-person-fill"></i>
               </router-link>
               <router-link :to="{ name: 'Buat', params: { id: jadwal.custom_id } }" v-if="jadwal.jenis == 'public'" class="text-6xl px-5 py-4 bg-orange-200 rounded-md text-orange-500">
                    <i class="bi bi-people-fill"></i>
               </router-link>
               <div class="flex flex-col">
                    <router-link :to="{ name: 'Buat', params: { id: jadwal.custom_id } }" class="text-lg font-semibold line-clamp-2 cursor-pointer hover:underline mb-3">{{ jadwal.namaJadwal }}</router-link>
                    <div class="text-xs flex gap-1 whitespace-nowrap">
                         <span class="border-slate-200 dark:border-gray-600 border-2 px-3 py-1 rounded">12 Kegiatan</span>
                         <span class="border-slate-200 dark:border-gray-600 border-2 px-3 py-1 rounded">1 Acara</span>
                    </div>
               </div>
          </div>
          <div class="w-full flex justify-between items-center">
               <div class="text-xs text-slate-500 dark:text-gray-300">
                    <span v-if="jadwal.jenis == 'public'"> kamu, budi ... dan 8 lainnya </span>
               </div>
               <span><i class="bi bi-three-dots-vertical text-xl cursor-pointer"></i></span>
          </div>
     </div>
</template>

<script>
export default {
     name: 'dcard',
     props: ['jadwal'],
};
</script>

<style></style>
