<template>
     <div class="max-w-[250px]">
          <div class="w-full pl-8 border-l-2 border-l-gray-300 dark:border-dark-2 sticky top-10 hidden md:block">
               <h4 class="font-medium text-gray-400">Jenis Akses</h4>
               <div class="my-4">
                    <i class="bi bi-person-fill text-2xl mr-3"></i>
                    <span class="font-medium text-lg">Kelola Bersama</span>
                    <button @click="toggleModal('ModalJenisAkses', null)" class="w-full text-base border-2 py-2 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md mt-7 hover:bg-black hover:text-white">
                         Ubah jenis akses
                    </button>
               </div>
               <h4 class="font-medium text-gray-400 mt-8">Anggota</h4>
               <div class="my-4">
                    <span class="font-medium text-base">Adryan, budi, richard ani ... +8</span>
                    <button @click="toggleModal('ModalAnggota', null)" class="w-full text-base border-2 py-2 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md mt-7 hover:bg-black hover:text-white">
                         Kelola Anggota
                    </button>
               </div>
               <h4 class="font-medium text-gray-400 mt-8">Kelasifikasi ({{ kelas.length }})</h4>
               <div v-if="kelas && kelas.length === 0" class="mt-4 italic">Tidak ada kelas</div>
               <div v-if="kelas && kelas.length !== 0" class="my-4">
                    <div v-for="(item, index) in kelas" :key="index" class="font-medium text-base flex items-center gap-3">
                         <span class="w-3 h-3 rounded-full border" :class="[item.warna]"></span><span>{{ item.namaKelas }}</span>
                    </div>
               </div>
               <button @click="toggleModal('ModalKelasifikasi', id)" class="w-full text-base border-2 py-2 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md mt-7 hover:bg-black hover:text-white">
                    Kelola Kelasifikasi
               </button>
               <h4 class="font-medium text-gray-400 mt-8">Deskripsi</h4>
               <div class="my-4">
                    <a class="font-medium text-blue-500" href="#">Lihat Deskripsi</a>
               </div>
          </div>
     </div>
</template>

<script setup>
import { useJadwalStore } from '../stores/jadwal';
import { computed } from 'vue';
const jadwalStore = useJadwalStore();
const kelas = computed(() => jadwalStore.kelas);
</script>

<script>
export default {
     name: 'setting',
     data() {
          return {
               kelas: null,
          };
     },
     props: {
          toggleModal: {
               type: Function,
               required: true,
          },
          id: {
               type: String,
               required: true,
          },
     },
};
</script>
