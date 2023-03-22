<template>
     <div class="bg-white w-full mx-2 max-w-[450px] dark:bg-dark-2 p-8 rounded-md flex flex-col md:w-[450px]">
          <div class="flex items-center justify-between mb-8">
               <h3 class="font-medium text-xl">Modal Kelasifikasi</h3>
               <span class="cursor-pointer" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
               </span>
          </div>
          <form @submit.prevent="tambahKelas" v-if="!loading" class="flex flex-col">
               <span class="font-medium text-gray-500 mb-4">Daftar kelas</span>
               <span v-if="daftarKelas.length == 0" class="italic">Kelas Kosong</span>
               <div v-if="daftarKelas !== null" class="flex gap-3 flex-wrap mb-6">
                    <button @click.prevent type="button" v-for="kelas in daftarKelas" :key="kelas" class="group relative rounded-md border border-black dark:bg-dark-2 dark:border-gray-500 flex justify-between gap-1 items-center py-2 px-2">
                         <div class="flex gap-2" :title="[kelas.namaKelas]">
                              <div class="border-r border-gray-300 dark:border-gray-500 pr-2">
                                   <div class="border-2 w-5 h-5 rounded-full" :class="[kelas.warna]"></div>
                              </div>
                              <div class="font-medium whitespace-nowrap text-sm pl-2">{{ kelas.namaKelas }}</div>
                         </div>
                         <span><i class="bi bi-three-dots-vertical cursor-pointer"></i></span>
                         <div class="absolute bg-white dark:bg-dark-3 dark:border-gray-900 hidden z-40 top-12 right-0 p-3 rounded shadow-md border font-medium text-sm group-focus:flex flex-col text-start">
                              <p @click="hapusKelas(kelas)" class="text-red-500 cursor-pointer hover:text-red-700 w-full py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-dark-2">Hapus</p>
                              <p class="cursor-pointer w-full py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-dark-2">Edit</p>
                         </div>
                    </button>
               </div>
               <span class="font-medium text-gray-500 mb-4">Tambah kelas</span>
               <div v-if="!maxKelas" class="flex flex-col max-h-[50px] md:flex-row gap-3 mb-7">
                    <div class="">
                         <input
                              type="text"
                              class="py-3 w-full md:w-auto px-6 rounded-md border border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                              :class="{ 'border-red-500 dark:border-red-500': errors.namaKelas }"
                              placeholder="Nama Kelas"
                              name="nama_kelas"
                              v-model="namaKelas"
                         />
                         <div class="text-red-500 text-xs flex mt-2 items-center" v-if="errors.namaKelas"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>{{ errors.pesan }}</div>
                    </div>
                    <div class="w-full grid grid-cols-2 gap-3">
                         <div ref="node" @click="handleClick" class="relative min-h-[49.6px] flex items-center justify-center rounded-md border border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md">
                              <div @click="handleClick" class="w-5 h-5 cursor-pointer rounded-full dark:border-gray-900 border-2" :class="[warna]"></div>
                              <div v-if="isOpen && !isClickOutside" class="absolute top-14 bg-white border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 z-50 shadow-md rounded-md border w-44 px-5">
                                   <p class="text-gray-500 dark:text-gray-100 text-sm mt-3 mb-2">Pilih Warna</p>
                                   <div class="grid grid-cols-4 gap-2 w-full border-t dark:border-gray-900 py-3">
                                        <div v-for="(w, index) in daftarWarna" :key="index" class="flex">
                                             <label class="border-2 w-7 h-7 rounded-full cursor-pointer" :class="[w]" :for="[w]"></label>
                                             <input type="radio" :id="[w]" name="warna" :value="[w]" class="hidden" v-model="warna" />
                                        </div>
                                        <div class="flex">
                                             <label class="border-2 border-black w-7 h-7 rounded-full cursor-pointer" for="default"></label>
                                             <input type="radio" id="default" name="warna" value="border-black" class="hidden" v-model="warna" />
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div
                              @click="pushKelas"
                              class="px-6 flex min-h-[49.6px] items-center justify-center rounded-md border border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 dark:hover:bg-yellow-400 text-md cursor-pointer hover:bg-black hover:text-white"
                         >
                              <i class="bi bi-check-lg text-xl"></i>
                         </div>
                    </div>
               </div>

               <div v-if="maxKelas" class="w-full text-center text-sm dark:text-gray-400">Jumlah kelas sudah maksimal</div>

               <div class="w-full mt-16 md:mt-6 flex justify-end">
                    <button
                         type="submit"
                         :disabled="isloading"
                         :class="{ 'bg-black dark:bg-yellow-400 dark:text-black  text-white': !isloading, 'bg-gray-400 dark:bg-gray-600 dark:text-black text-white cursor-not-allowed': isloading }"
                         class="px-4 py-2 rounded-md flex gap-3"
                    >
                         <span>{{ isloading ? 'Meyimpan ...' : 'Simpan' }}</span> <i v-if="!isloading" class="bi bi-arrow-right ml-2"></i>
                    </button>
               </div>
          </form>

          <div v-if="loading" class="w-full text-center py-12">
               <Spinner />
          </div>
     </div>
</template>

<script>
import { ref } from 'vue';
import useClickOutside from '../../composables/element/detectOutside';
import { useJadwalStore } from '../../stores/jadwal';
import Spinner from '../loader/spiner.vue';
import axios from 'axios';
export default {
     name: 'modal-kelasifikasi',
     props: ['param'],
     components: {
          Spinner,
     },
     data() {
          return {
               daftarKelas: [],
               namaKelas: '',
               errors: {
                    namaKelas: false,
                    pesan: '',
               },
               daftarWarna: ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'rose', 'pink', 'teal', 'indigo'],
               warna: 'border-black',
               pilihWarna: false,
               loading: true,
               maxKelas: false,
               isloading: false,
          };
     },
     watch: {
          daftarKelas: {
               handler: function (newValue, oldValue) {
                    newValue.length >= 5 ? (this.maxKelas = true) : (this.maxKelas = false);
               },
               deep: true,
          },
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },

          toggleToast(title, type) {
               this.$emit('toast', { title, type });
          },

          togglePilih() {
               this.pilihWarna = !this.pilihWarna;
          },

          hapusKelas(kelas) {
               this.daftarKelas = this.daftarKelas.filter((item) => {
                    return kelas !== item;
               });
          },

          pushKelas() {
               if (this.namaKelas !== '') {
                    const result = this.daftarKelas.find((kelas) => kelas.namaKelas === this.namaKelas);

                    if (result) {
                         this.errors.namaKelas = true;
                         this.errors.pesan = 'Kelas ' + result.namaKelas + ' sudah ada!';
                         return;
                    } else {
                         const kelasBaru = {
                              namaKelas: this.namaKelas,
                              warna: this.warna[0],
                         };
                         this.namaKelas = '';
                         this.errors.namaKelas = false;
                         this.warna = 'border-black';
                         this.daftarKelas.push(kelasBaru);
                    }
               } else {
                    this.errors.namaKelas = true;
                    this.errors.pesan = 'Tidak Boleh Kosong!';
               }
          },

          async tambahKelas() {
               this.isloading = true;
               try {
                    const response = await axios.post(
                         'tambah-kelas',
                         {
                              id: this.param,
                              dataKelas: this.daftarKelas,
                         },
                         {
                              withCredentials: true,
                         }
                    );
                    if (response.status == 200) {
                         const jadwalStore = useJadwalStore();
                         jadwalStore.kelas = this.daftarKelas;
                         jadwalStore.kegiatan = jadwalStore.kegiatan;
                         this.toggleToast('Berhasil mengupdate kelas', 'success');
                         this.isloading = false;
                         this.$emit('close');
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

     setup() {
          const isOpen = ref(false);
          const { node, isClickOutside } = useClickOutside();

          const handleClick = () => {
               isOpen.value = true;
          };

          return {
               isOpen,
               handleClick,
               node,
               isClickOutside,
          };
     },

     async mounted() {
          try {
               const response = await axios.get('ambil-kelas/' + this.param, {
                    withCredentials: true,
               });

               if (response.status == 200) {
                    this.loading = false;
               }
               if (response.data.length != 0) {
                    this.daftarKelas = response.data;
               }
          } catch (error) {
               console.error('error nih bro: ' + error);
          }
     },
};
</script>

<style></style>
