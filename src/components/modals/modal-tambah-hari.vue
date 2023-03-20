<template>
     <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50" @click.self="closeModal">
          <div class="bg-white w-full mx-2 max-w-[450px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
               <div class="flex items-center justify-between mb-8">
                    <h3 class="font-medium text-xl">Kegiatan</h3>
                    <span class="cursor-pointer" @click="closeModal">
                         <i class="bi bi-x-lg"></i>
                    </span>
               </div>
               <form @submit.prevent="" class="flex flex-col gap-5">
                    <div class="w-full flex justify-end">
                         hari <strong class="ml-1">{{ param }}</strong>
                    </div>
                    <input type="text" class="w-full py-3 px-6 rounded-md border border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md" placeholder="Nama Kegiatan" name="nama_kegiatan" v-model="namaKegiatan" />

                    <div class="w-full flex gap-5">
                         <div class="w-full">
                              <label for="jam_mulai" class="text-sm">Mulai</label>
                              <input
                                   type="time"
                                   class="w-full py-3 px-6 rounded-md border cursor-pointer border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                                   placeholder="Nama Kegiatan"
                                   id="jam_mulai"
                                   v-model="mulai"
                              />
                         </div>
                         <div class="w-full">
                              <label for="jam_selesai" class="text-sm">Selesai</label>
                              <input
                                   type="time"
                                   class="w-full py-3 px-6 rounded-md border cursor-pointer border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                                   placeholder="Nama Kegiatan"
                                   id="jam_selesai"
                                   v-model="selesai"
                              />
                         </div>
                    </div>
                    <span class="font-medium text-gray-500">Pilih kelas</span>
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
                         <button type="submit" class="bg-black dark:bg-yellow-400 dark:text-black text-white px-4 py-2 rounded-md">Simpan <i class="bi bi-arrow-right ml-2"></i></button>
                    </div>
               </form>
          </div>
     </div>
</template>

<script setup>
import { useJadwalStore } from '../../stores/jadwal';
import { computed } from 'vue';
const jadwalStore = useJadwalStore();
const kelas = computed(() => jadwalStore.kelas);
</script>

<script>
export default {
     name: 'modal-tambah-hari',
     props: ['param'],
     data() {
          return {
               namaKegiatan: '',
               mulai: '',
               selesai: '',
               kelases: '',
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

          pilihKelas() {
               console.log(this.kelases);
          },
     },
};
</script>

<style></style>
