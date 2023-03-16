<template>
     <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50" @click.self="closeModal">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-md flex flex-col w-80 md:w-[450px]">
               <div class="flex items-center justify-between mb-8">
                    <h3 class="font-medium text-xl">Modal Kelasifikasi</h3>
                    <span class="cursor-pointer" @click="closeModal">
                         <i class="bi bi-x-lg"></i>
                    </span>
               </div>
               <form @submit.prevent="tambahKelas" v-if="!loading" class="flex flex-col">
                    <span class="font-medium text-gray-500 mb-4">Daftar kelas</span>
                    <span v-if="daftarKelas.length == 0" class="italic">Kelas Kosong</span>
                    <div v-if="daftarKelas !== null" class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                         <button v-for="kelas in daftarKelas" :key="kelas" class="group relative rounded-md border border-black flex justify-between gap-1 items-center py-2 px-2">
                              <div class="flex gap-2 overflow-hidden" :title="[kelas.namaKelas]">
                                   <div class="border-r border-gray-300 pr-2">
                                        <div class="border-2 w-5 h-5 rounded-full" :class="[kelas.warna]"></div>
                                   </div>
                                   <div class="font-medium whitespace-nowrap text-sm pl-2 overflow-hidden">{{ kelas.namaKelas }}</div>
                              </div>
                              <span><i class="bi bi-three-dots-vertical cursor-pointer"></i></span>
                              <div class="absolute bg-white hidden z-40 top-12 right-0 p-3 rounded shadow-md border font-medium text-sm group-focus:flex flex-col text-start">
                                   <p @click="hapusKelas(kelas)" class="text-red-500 cursor-pointer hover:text-red-700 w-full py-1 px-2 rounded hover:bg-gray-100">Hapus</p>
                                   <p class="cursor-pointer w-full py-1 px-2 rounded hover:bg-gray-100">Edit</p>
                              </div>
                         </button>
                    </div>
                    <span class="font-medium text-gray-500 mb-4">Tambah kelas</span>
                    <div class="flex flex-col md:flex-row gap-3 mb-7">
                         <div class="">
                              <input type="text" class="py-3 w-full md:w-auto px-6 rounded-md border border-black text-md" placeholder="Nama Kelas" name="nama_kelas" v-model="namaKelas" />
                         </div>
                         <div class="w-full grid grid-cols-2 gap-3">
                              <div ref="node" @click="handleClick" class="relative flex items-center justify-center rounded-md border border-black text-md">
                                   <div @click="handleClick" class="w-5 h-5 cursor-pointer rounded-full border" :class="[warna]"></div>
                                   <div v-if="isOpen && !isClickOutside" class="absolute top-14 bg-white z-50 shadow-md rounded-md border w-44 px-5">
                                        <p class="text-gray-500 text-sm mt-3 mb-2">Pilih Warna</p>
                                        <div class="grid grid-cols-4 gap-2 w-full border-t py-3">
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
                              <div @click="pushKelas" class="px-6 flex items-center justify-center rounded-md border border-black text-md cursor-pointer hover:bg-black hover:text-white">
                                   <i class="bi bi-check-lg text-xl"></i>
                              </div>
                         </div>
                    </div>
                    <div class="text-red-500 text-xs -mt-4 flex items-center" v-if="errors.namaKelas"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i>Tidak Boleh Kosong</div>
                    <div class="w-full mt-6 flex justify-end">
                         <button type="submit" class="bg-black text-white px-4 py-2 rounded-md">Simpan <i class="bi bi-arrow-right ml-2"></i></button>
                    </div>
               </form>

               <div v-if="loading" class="w-full text-center py-12">
                    <Spinner />
               </div>
          </div>
     </div>
</template>

<script>
import { ref } from 'vue';
import useClickOutside from '../../composables/element/detectOutside';
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
               },
               daftarWarna: ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'amber', 'pink', 'teal', 'indigo'],
               warna: 'border-black',
               pilihWarna: false,
               loading: true,
          };
     },
     methods: {
          closeModal() {
               this.$emit('close');
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
                    const kelasBaru = {
                         namaKelas: this.namaKelas,
                         warna: this.warna[0],
                    };
                    this.namaKelas = '';
                    this.errors.namaKelas = false;
                    this.warna = 'border-black';
                    this.daftarKelas.push(kelasBaru);
               } else {
                    this.errors.namaKelas = true;
               }

               console.log(this.daftarKelas);
          },

          async tambahKelas() {
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
                    this.$emit('reload');
               } catch (error) {}
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
               console.log(response.data);
          } catch (error) {}
     },
};
</script>

<style></style>
