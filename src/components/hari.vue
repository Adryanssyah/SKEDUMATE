<template>
     <div class="w-full mb-8 pb-8 border-b-2 border-l-gray-100 dark:border-dark-2">
          <span class="font-medium text-2xl text-gray-500">{{ namaHari }}</span>
          <div ref="container" class="flex flex-wrap gap-5 mt-8 pb-5 cursor-pointer whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-dark dark:scrollbar-track-dark-3">
               <div v-for="(kegiatan, id) in kegiatanHari.sort((a, b) => a.start.localeCompare(b.start))" :key="kegiatan.id" @click="focusedIndex = kegiatan.id" class="relative">
                    <div
                         v-closable="{
                              exclude: ['container'],
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
                                   <div v-if="kegiatan.id === focusedIndex" class="flex gap-4">
                                        <button type="button" @click="toggleModal('ModalDetail', { kegiatan, dataJadwal })">
                                             <i class="bi bi-eye-fill cursor-pointer opacity-70 hover:opacity-100"></i>
                                        </button>

                                        <button type="button" @click="toggleModal('ModalEditKegiatan', { kegiatan, dataJadwal })">
                                             <i class="bi bi-pencil-fill cursor-pointer opacity-70 hover:opacity-100"></i>
                                        </button>

                                        <button type="button" @click="toggleModal('ModalHapus', { kegiatan, dataJadwal })">
                                             <i class="bi bi-trash-fill cursor-pointer opacity-70 hover:opacity-100"></i>
                                        </button>

                                        <span v-if="kegiatan.id === focusedIndex" class="mr-4"> | </span>
                                   </div>
                              </transition>
                              <span class="font-semibold">{{ kegiatan.start }} - {{ kegiatan.end }}</span>
                              <span class="mx-4"> | </span>
                              <span class="font-medium">{{ kegiatan.title }}</span>
                         </div>
                    </div>
               </div>

               <button
                    v-if="userRole !== 'Anggota'"
                    @click="toggleModal('ModalTambahHari', dataJadwal)"
                    class="max-h-[43.2px] font-medium text-base border-2 dark:border-dark-2 dark:bg-dark-2 py-2 px-4 border-gray-300 rounded-md bg-gray-200"
               >
                    <i class="bi bi-plus-lg"></i> <span>Tambah</span>
               </button>
          </div>
     </div>
</template>

<script>
import { useUserStore } from '../stores/user';
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
     setup() {
          const userStore = useUserStore();
          const userRole = userStore.role;
          return {
               userRole,
          };
     },
};
</script>

<style scoped></style>
