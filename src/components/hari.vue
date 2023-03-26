<template>
     <div class="w-full mb-8 pb-8 border-b-2 border-l-gray-100 dark:border-dark-2">
          <h3 class="font-medium text-2xl text-gray-500">{{ namaHari }}</h3>
          <div class="flex flex-wrap gap-5 mt-8 pb-5 cursor-pointer whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-dark dark:scrollbar-track-dark-3">
               <div v-for="(kegiatan, index) in kegiatanHari.sort((a, b) => a.start.localeCompare(b.start))" :key="kegiatan.id" @click="focusedIndex = index" class="relative">
                    <div
                         v-closable="{
                              exclude: ['modal'],
                              handler: 'closeButton',
                         }"
                         :class="getKelasWarna(kegiatan.kelas[0])"
                         class="flex w-auto flex-col py-2 px-4 focus:h-auto rounded-md border-2"
                    >
                         <div class="flex items-center">
                              <transition
                                   enter-active-class="transform transition duration-300 ease-custom"
                                   enter-from-class="translate-x-1/2 scale-x-0 opacity-0"
                                   leave-active-class="transform transition duration-300 ease-custom"
                                   leave-to-class="translate-x-1/2 scale-x-0 opacity-0"
                              >
                                   <div v-if="index === focusedIndex" class="flex gap-4">
                                        <button type="button" @click="toggleModal('ModalEditKegiatan', { kegiatan, dataJadwal })">
                                             <i class="bi bi-pencil-fill cursor-pointer opacity-70 hover:opacity-100"></i>
                                        </button>

                                        <button type="button" @click="toggleModal('ModalHapus', { kegiatan, dataJadwal })">
                                             <i class="bi bi-trash-fill cursor-pointer opacity-70 hover:opacity-100"></i>
                                        </button>
                                        <span v-if="index === focusedIndex" class="mr-4"> | </span>
                                   </div>
                              </transition>
                              <span class="font-semibold">{{ kegiatan.start }} - {{ kegiatan.end }}</span>
                              <span class="mx-4"> | </span>
                              <span class="font-medium">{{ kegiatan.title }}</span>
                         </div>
                    </div>
               </div>

               <button @click="toggleModal('ModalTambahHari', dataJadwal)" class="max-h-[43.2px] font-medium text-base border-2 dark:border-dark-2 dark:bg-dark-2 py-2 px-4 border-gray-300 rounded-md bg-gray-200">
                    <i class="bi bi-plus-lg"></i> <span>Tambah</span>
               </button>
          </div>
     </div>
</template>

<script>
export default {
     data() {
          return {
               focusedIndex: null,
               dataJadwal: {
                    id: this.id,
                    namaHari: this.namaHari,
               },

               newData: {
                    title: '',
               },
          };
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

          closeButton() {
               this.focusedIndex = null;
          },
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
};
</script>

<style scoped></style>
