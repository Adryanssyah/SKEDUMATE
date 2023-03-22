<template>
     <div class="bg-white w-full mx-2 max-w-[450px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <div class="flex items-center justify-between mb-8">
               <h3 class="font-medium text-xl">Kegiatan</h3>
               <span class="cursor-pointer" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
               </span>
          </div>
          <form @submit.prevent="tambahKegiatan" class="flex flex-col gap-5">
               <div class="w-full flex justify-end">
                    hari <strong class="ml-1">{{ param.namaHari }}</strong>
               </div>
               <input
                    type="text"
                    class="w-full py-3 px-6 rounded-md border dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                    :class="{ 'border-red-500 dark:border-red-500': errors.title && namaKegiatan == '', 'border-black': !errors.title, 'border-black': errors.title && namaKegiatan != '' }"
                    placeholder="Nama Kegiatan"
                    name="nama_kegiatan"
                    v-model="namaKegiatan"
               />
               <div class="text-red-500 text-xs -mt-3 flex items-center" v-if="errors.title && namaKegiatan == ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.title }}</div>
               <div class="w-full flex gap-5">
                    <div class="w-full">
                         <label for="jam_mulai" class="text-sm">Mulai</label>
                         <input
                              type="time"
                              class="w-full py-3 px-6 rounded-md border cursor-pointer border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                              :class="{ 'border-red-500 dark:border-red-500': errors.start && mulai == '', 'border-black': !errors.start, 'border-black': errors.start && mulai != '' }"
                              placeholder="Nama Kegiatan"
                              id="jam_mulai"
                              v-model="mulai"
                         />
                         <div class="text-red-500 text-xs mt-2 flex items-center" v-if="errors.start && mulai == ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.start }}</div>
                    </div>
                    <div class="w-full">
                         <label for="jam_selesai" class="text-sm">Selesai</label>
                         <input
                              type="time"
                              class="w-full py-3 px-6 rounded-md border cursor-pointer border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                              :class="{ 'border-red-500 dark:border-red-500': errors.end && selesai == '', 'border-black': !errors.end, 'border-black': errors.end && selesai != '' }"
                              placeholder="Nama Kegiatan"
                              id="jam_selesai"
                              v-model="selesai"
                         />
                         <div class="text-red-500 text-xs mt-2 flex items-center" v-if="errors.end && selesai == ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.end }}</div>
                    </div>
               </div>
               <span class="font-medium text-gray-500">Pilih kelas <span class="text-xs opacity-70">(opsional)</span></span>
               <div class="w-full flex gap-3 flex-wrap">
                    <label
                         v-for="(item, index) in kelas"
                         :key="index"
                         :for="item.namaKelas"
                         class="rounded-md cursor-pointer dark:bg-dark py-2 px-5 flex items-center justify-center gap-3"
                         :class="{
                              'border-2 border-blue-500 dark:border-blue-300': kelases == item.namaKelas,
                              'border border-gray-300 dark:border-gray-700': kelases != item.namaKelas,
                         }"
                    >
                         <span class="w-4 h-4 rounded-full border" :class="[item.warna]"></span> {{ item.namaKelas }}
                         <input @change="pilihKelas" class="hidden" type="radio" name="kelas" :id="[item.namaKelas]" :value="[item.namaKelas]" v-model="kelases" />
                    </label>
               </div>
               <div class="w-full mt-6 flex justify-end">
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
     </div>
</template>

<script setup>
import { useJadwalStore } from '../../stores/jadwal';
import { computed } from 'vue';
const jadwalStore = useJadwalStore();
const kelas = computed(() => jadwalStore.kelas);
</script>

<script>
import { useJadwalStore } from '../../stores/jadwal';
import axios from 'axios';
export default {
     name: 'modal-tambah-hari',
     props: ['param'],
     data() {
          return {
               mulai: '',
               selesai: '',
               namaKegiatan: '',
               kelases: '',
               hari: this.param.namaHari,
               errors: {
                    title: '',
                    start: '',
                    end: '',
               },
               isloading: false,
          };
     },

     watch: {
          mulai() {
               this.mulai > this.selesai && this.selesai != '' ? (this.mulai = this.selesai) : '';
          },
          selesai() {
               this.mulai > this.selesai && this.mulai != '' ? (this.selesai = this.mulai) : '';
          },
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },

          toggleToast(title, type) {
               this.$emit('toast', { title, type });
          },

          async tambahKegiatan() {
               this.isloading = true;
               try {
                    const response = await axios.post(
                         'tambah-kegiatan',
                         {
                              id: this.param.id,
                              start: this.mulai,
                              end: this.selesai,
                              title: this.namaKegiatan,
                              kelas: this.kelases,
                              hari: this.param.namaHari,
                         },
                         {
                              withCredentials: true,
                         }
                    );

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
                         const jadwalStore = useJadwalStore();
                         jadwalStore.kegiatan[this.hari] = response.data.hari[this.hari];
                         this.toggleToast('Berhasil menambahkan kegiatan baru', 'success');
                         (this.isloading = false), this.$emit('close');
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
};
</script>

<style></style>
