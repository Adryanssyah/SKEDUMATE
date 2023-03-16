<template>
     <div class="mb-8 pb-8 border-b-2 border-l-gray-100 dark:border-gray-800 overflow-y-auto">
          <h3 class="font-medium text-2xl text-gray-500">{{ namaHari }}</h3>
          <div class="flex flex-wrap gap-5 mt-8 cursor-pointer whitespace-nowrap">
               <button v-if="kegiatanHari.length !== 0" v-for="kegiatan in kegiatanHari" :key="kegiatan.title" class="group h-[43.2px] flex flex-col py-2 px-4 focus:h-auto rounded-md border-2" :class="[kegiatan.theme]">
                    <div class="flex items-center dark:text-gray-900">
                         <span class="font-semibold">{{ kegiatan.start }} - {{ kegiatan.end }}</span>
                         <span class="mx-4"> | </span>
                         <span class="font-medium">{{ kegiatan.title }}</span>
                    </div>
                    <div class="hidden justify-between w-full items-center border-t-2 border-gray-100 dark:border-gray-200 mt-4 pt-4 group-focus:flex dark:text-gray-900">
                         <div class="flex flex-col items-start">
                              <span class="text-xs text-gray-500 mb-1">Kelas</span>
                              <span class="font-medium">R001</span>
                         </div>
                         <div class="flex flex-col items-start">
                              <span class="text-xs text-gray-500 mb-1">Terakhir ubah</span>
                              <span class="font-medium">Adryan</span>
                         </div>
                         <div>
                              <i class="bi bi-three-dots-vertical text-xl cursor-pointer"></i>
                         </div>
                    </div>
               </button>
               <button @click="toggleModal('ModalTambahHari', namaHari)" class="max-h-[43.2px] font-medium text-base border-2 dark:border-gray-700 dark:bg-gray-800 py-2 px-4 border-gray-300 rounded-md bg-gray-200">
                    <i class="bi bi-plus-lg"></i> Tambah
               </button>
          </div>
     </div>
</template>

<script>
export default {
     components: {},
     data() {
          return {};
     },
     props: {
          namaHari: {
               type: String,
               required: true,
          },
          kegiatanHari: {
               type: Array,
               required: true,
          },
          toggleModal: {
               type: Function,
               required: true,
          },
     },
};
</script>

<style scoped></style>
