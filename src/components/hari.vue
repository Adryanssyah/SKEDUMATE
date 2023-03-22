<template>
     <div class="w-full mb-8 pb-8 border-b-2 border-l-gray-100 dark:border-dark-2 overflow-y-auto">
          <h3 class="font-medium text-2xl text-gray-500">{{ namaHari }}</h3>
          <div class="flex flex-wrap gap-5 mt-8 cursor-pointer whitespace-nowrap">
               <button
                    v-if="kegiatanHari.length !== 0"
                    v-for="kegiatan in kegiatanHari.sort((a, b) => a.start.localeCompare(b.start))"
                    :key="kegiatan.title"
                    class="group h-[43.2px] flex flex-col py-2 px-4 focus:h-auto rounded-md border-2"
                    :class="getKelasWarna(kegiatan.kelas)"
               >
                    <div class="flex items-center">
                         <span class="font-semibold">{{ kegiatan.start }} - {{ kegiatan.end }}</span>
                         <span class="mx-4"> | </span>
                         <span class="font-medium">{{ kegiatan.title }}</span>
                    </div>
                    <div class="hidden justify-between w-full items-center border-t border-gray-100 dark:border-gray-500 mt-4 pt-4 group-focus:flex">
                         <div v-if="kegiatan.kelas != ''" class="flex flex-col items-start">
                              <span class="text-xs mb-1">Kelas</span>
                              <span class="font-medium">{{ kegiatan.kelas }}</span>
                         </div>
                         <div class="flex flex-col items-start">
                              <span class="text-xs mb-1">Terakhir ubah</span>
                              <span class="font-medium">Adryan</span>
                         </div>
                         <div>
                              <i class="bi bi-three-dots-vertical text-xl cursor-pointer"></i>
                         </div>
                    </div>
               </button>
               <button @click="toggleModal('ModalTambahHari', dataJadwal)" class="max-h-[43.2px] font-medium text-base border-2 dark:border-dark-2 dark:bg-dark-2 py-2 px-4 border-gray-300 rounded-md bg-gray-200">
                    <i class="bi bi-plus-lg"></i> Tambah
               </button>
          </div>
     </div>
</template>

<script>
export default {
     components: {},
     data() {
          return {
               dataJadwal: {
                    id: this.id,
                    namaHari: this.namaHari,
               },
          };
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
          kelas: {
               type: Array,
               required: true,
          },
          id: {
               type: String,
               required: true,
          },
     },
     methods: {
          getKelasWarna(kelas) {
               for (let i = 0; i < this.kelas.length; i++) {
                    if (this.kelas[i].namaKelas === kelas) {
                         return this.kelas[i].warna;
                    }
               }
               return '';
          },
     },
};
</script>

<style scoped></style>
