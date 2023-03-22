<template>
     <div
          v-show="settingVisible"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-300"
          :class="{
               'md:max-w-[250px]': !mobile,
               'fixed top-0 left-0 w-full  h-full bg-black py-10 bg-opacity-70 flex justify-center items-center z-40': mobile,
          }"
          @click.self="toggleSetting"
     >
          <transition enter-active-class="transition-all duration-300" leave-active-class="transition-all duration-300" enter-from-class="transform scale-x-0" leave-to-class="transform scale-x-0">
               <div
                    v-if="settingVisible"
                    :class="{
                         'md:w-full md:pl-8 md:border-l-2 md:border-l-gray-300 md:dark:border-dark-2 md:sticky md:top-10 hidden md:block': !mobile,
                         'bg-white relative w-full mx-2 dark:bg-dark p-8  rounded-md max-h-full': mobile,
                    }"
               >
                    <div class="w-full mb-8 flex flex-wrap justify-between">
                         <h3 class="font-medium text-xl">Pengaturan</h3>
                         <span class="cursor-pointer" @click="toggleSetting">
                              <i class="bi bi-x-lg"></i>
                         </span>
                    </div>
                    <div :class="{ 'overflow-y-auto w-full pb-10 max-h-[500px]': mobile }">
                         <h4 class="font-medium text-gray-400">Jenis Akses</h4>
                         <div class="my-4">
                              <i class="bi bi-person-fill text-2xl mr-3"></i>
                              <span class="font-medium text-lg">Kelola Bersama</span>
                              <button
                                   @click="toggleModal('ModalJenisAkses', null)"
                                   class="w-full text-base border-2 py-2 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md mt-7 hover:bg-black hover:text-white"
                              >
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
                         <button @click="toggleModal('ModalKelasifikasi', id)" class="w-full text-base border-2 py-2 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md mt-3 hover:bg-black hover:text-white">
                              Kelola Kelasifikasi
                         </button>
                         <h4 class="font-medium text-gray-400 mt-8">Deskripsi</h4>
                         <div class="my-4 w-full text-center md:text-start">
                              <a class="font-medium text-blue-500" href="#">Lihat Deskripsi</a>
                         </div>
                    </div>
               </div>
          </transition>
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
     props: {
          toggleModal: {
               type: Function,
               required: true,
          },
          id: {
               type: String,
               required: true,
          },
          settingVisible: {
               type: Boolean,
               required: true,
          },
     },
     data() {
          return {
               kelas: null,
               mobile: null,
          };
     },
     created() {
          window.addEventListener('resize', this.checkScreen);
          this.checkScreen();
     },

     methods: {
          checkScreen() {
               this.windownWidth = window.innerWidth;
               if (this.windownWidth <= 768) {
                    this.mobile = true;
                    return;
               } else {
                    this.mobile = false;
               }
          },

          toggleSetting() {
               this.$emit('setting');
          },
     },
};
</script>
