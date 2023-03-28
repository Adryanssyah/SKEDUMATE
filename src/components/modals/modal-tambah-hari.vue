<template>
     <form @submit.prevent="tambahKegiatan" class="bg-white w-full max-h-full mx-2 max-w-[490px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <div class="flex items-center justify-between mb-8">
               <h3 class="font-medium text-xl">Kegiatan</h3>
               <span class="cursor-pointer" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
               </span>
          </div>
          <div
               class="flex flex-col gap-5 overflow-y-auto px-1 pb-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-dark dark:scrollbar-track-dark-3 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          >
               <div class="w-full flex justify-end">
                    hari <strong class="ml-1">{{ param.namaHari }}</strong>
               </div>
               <input
                    type="text"
                    class="w-full py-3 px-6 rounded-md border dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                    :class="{ 'border-red-500 dark:border-red-500': errors.title && dataKegiatan.title == '', 'border-black': !errors.title, 'border-black': errors.title && dataKegiatan.title != '' }"
                    placeholder="Nama Kegiatan"
                    name="nama_kegiatan"
                    v-model="dataKegiatan.title"
               />
               <div class="text-red-500 text-xs -mt-3 flex items-center" v-if="errors.title && dataKegiatan.title == ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.title }}</div>
               <div class="w-full flex gap-5">
                    <div class="w-full">
                         <label for="jam_start" class="text-sm">Mulai</label>
                         <input
                              type="time"
                              class="w-full py-3 px-6 rounded-md border cursor-pointer border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                              :class="{ 'border-red-500 dark:border-red-500': errors.start && dataKegiatan.start == '', 'border-black': !errors.start, 'border-black': errors.start && dataKegiatan.start != '' }"
                              placeholder="Nama Kegiatan"
                              id="jam_start"
                              v-model="dataKegiatan.start"
                         />
                         <div class="text-red-500 text-xs mt-2 flex items-center" v-if="errors.start && dataKegiatan.start == ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.start }}</div>
                    </div>
                    <div class="w-full">
                         <label for="jam_end" class="text-sm">Selesai</label>
                         <input
                              type="time"
                              class="w-full py-3 px-6 rounded-md border cursor-pointer border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                              :class="{ 'border-red-500 dark:border-red-500': errors.end && dataKegiatan.end == '', 'border-black': !errors.end, 'border-black': errors.end && dataKegiatan.end != '' }"
                              placeholder="Nama Kegiatan"
                              id="jam_end"
                              v-model="dataKegiatan.end"
                         />
                         <div class="text-red-500 text-xs mt-2 flex items-center" v-if="errors.end && dataKegiatan.end == ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.end }}</div>
                    </div>
               </div>
               <span class="font-medium text-gray-500">Pilih kelas </span>
               <div class="w-full flex gap-3 flex-wrap">
                    <label
                         for="none"
                         class="rounded-md cursor-pointer dark:bg-dark py-2 px-5 flex items-center justify-center gap-3"
                         :class="{
                              'border-2 border-blue-500 dark:border-blue-300': dataKegiatan.kelas == '',
                              'border border-gray-300 dark:border-gray-700': dataKegiatan.kelas != '',
                         }"
                    >
                         <span class="w-4 h-4 rounded-full border"></span> none
                         <input @change="pilihKelas" class="hidden" type="radio" name="kelas" id="none" value="" v-model="dataKegiatan.kelas" />
                    </label>
                    <label
                         v-for="(item, index) in kelases"
                         :key="index"
                         :for="item.namaKelas"
                         class="rounded-md cursor-pointer dark:bg-dark py-2 px-5 flex items-center justify-center gap-3"
                         :class="{
                              'border-2 border-blue-500 dark:border-blue-300': dataKegiatan.kelas == item.namaKelas,
                              'border border-gray-300 dark:border-gray-700': dataKegiatan.kelas != item.namaKelas,
                         }"
                    >
                         <span class="w-4 h-4 rounded-full border" :class="[item.warna]"></span> {{ item.namaKelas }}
                         <input @change="pilihKelas" class="hidden" type="radio" name="kelas" :id="[item.namaKelas]" :value="[item.namaKelas]" v-model="dataKegiatan.kelas" />
                    </label>
               </div>

               <div class="mt-3 flex justify-between cursor-pointer" @click="toggleDeskripsi">
                    <span class="font-medium text-gray-500">Deskripsi </span>
                    <div
                         class="transition-transform duration-500"
                         :class="{
                              'transform rotate-0': deskripsiVisible,
                              'transform -rotate-180': !deskripsiVisible,
                         }"
                    >
                         <i class="bi bi-chevron-up"></i>
                    </div>
               </div>
               <transition
                    enter-active-class="transform transition duration-300 ease-custom"
                    enter-from-class="-translate-y-1/2 scale-y-0 opacity-0"
                    leave-active-class="transform transition duration-300 ease-custom"
                    leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
               >
                    <div v-if="deskripsiVisible">
                         <textarea
                              rows="4"
                              class="block rounded-md py-4 px-6 w-full text-sm dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                              placeholder="Tuliskan deskripsi kegiatan disini..."
                              v-model="dataKegiatan.deskripsi"
                         ></textarea>
                    </div>
               </transition>
          </div>
          <div class="w-full mt-8 flex justify-end">
               <button
                    type="submit"
                    :disabled="isloading"
                    :class="{ 'bg-black dark:bg-yellow-400 dark:text-black text-white': !isloading, 'bg-gray-400 dark:bg-gray-600 dark:text-black text-white cursor-not-allowed': isloading }"
                    class="px-4 py-2 rounded-md flex gap-3"
               >
                    <span>{{ isloading ? 'Meyimpan ...' : 'Simpan' }}</span> <i v-if="!isloading" class="bi bi-arrow-right ml-2"></i>
               </button>
          </div>
     </form>
</template>

<script setup></script>

<script>
import { computed } from 'vue';
import { useJadwalStore } from '../../stores/jadwal';
import { useUserStore } from '../../stores/user';
import axios from 'axios';
export default {
     name: 'modal-tambah-hari',
     props: ['param'],
     data() {
          return {
               dataKegiatan: { _id: this.param.id, start: '', end: '', title: '', kelas: '', deskripsi: '', hari: this.param.namaHari, maker: this.userStore.user.id, editor: this.userStore.user.id },
               errors: {
                    title: '',
                    start: '',
                    end: '',
               },
               isloading: false,
               deskripsiVisible: false,
          };
     },

     watch: {
          'dataKegiatan.start': function (newValue, oldValue) {
               this.dataKegiatan.start > this.dataKegiatan.end && this.dataKegiatan.end != '' ? (this.dataKegiatan.start = this.dataKegiatan.end) : '';
          },
          'dataKegiatan.end': function (newValue, oldValue) {
               this.dataKegiatan.start > this.dataKegiatan.end && this.dataKegiatan.start != '' ? (this.dataKegiatan.end = this.dataKegiatan.start) : '';
          },
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },

          toggleDeskripsi() {
               this.deskripsiVisible = !this.deskripsiVisible;
          },

          toggleToast(title, type) {
               this.$emit('toast', { title, type });
          },

          success(response) {
               const jadwalStore = useJadwalStore();
               jadwalStore.kegiatan[this.param.namaHari] = response.data.hari[this.param.namaHari];
               this.toggleToast('Berhasil menambahkan kegiatan baru', 'success');
               this.$emit('close');
               this.isloading = false;
          },

          async tambahKegiatan() {
               this.isloading = true;
               try {
                    const response = await axios.post('tambah-kegiatan', this.dataKegiatan, {
                         withCredentials: true,
                    });

                    if (response.data.errors) {
                         this.errors = response.data.errors.reduce(
                              (acc, error) => {
                                   acc[error.param] = error.msg;
                                   return acc;
                              },
                              {
                                   title: '',
                                   start: '',
                                   end: '',
                              }
                         );
                         this.isloading = false;
                         return this.errors;
                    }

                    if (response.status == 200) {
                         console.log(response.data);
                         this.success(response);
                    } else if (response.status == 500) {
                         this.isloading = false;
                         this.toggleToast('Server sedang mengalami gangguan', 'error');
                    }
               } catch (error) {
                    this.toggleToast(error.message, 'error');
                    this.isloading = false;
               }
          },
     },
     mounted() {
          document.documentElement.classList.add('overflow-hidden');
     },
     unmounted() {
          document.documentElement.classList.remove('overflow-hidden');
     },

     setup() {
          const jadwalStore = useJadwalStore();
          const userStore = useUserStore();
          const kelases = computed(() => jadwalStore.kelas);
          return {
               userStore,
               jadwalStore,
               kelases,
          };
     },
};
</script>

<style></style>
