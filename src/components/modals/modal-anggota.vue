<template>
     <div class="bg-white max-h-full w-full mx-2 md:max-w-[1000px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <div class="flex items-center justify-between mb-8">
               <h3 class="font-medium text-xl">Kelola Anggota</h3>
               <span class="cursor-pointer" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
               </span>
          </div>

          <div v-if="!loading" class="flex flex-col gap-5">
               <div v-if="filteredAnggota('Pemilik').length > 0" class="w-full border-b dark:border-dark">
                    <h5>Pemilik</h5>
                    <div ref="btn" class="flex flex-wrap gap-3 py-5">
                         <div class="relative" v-for="peserta in filteredAnggota('Pemilik')" :key="peserta.userId">
                              <div class="rounded-md border dark:border-gray-500 border-gray-400 flex gap-4 px-3 py-3 justify-between items-center text-sm cursor-pointer">
                                   <div class="w-8 h-8 flex justify-center items-center text-black dark:text-white text-xs text-center cursor-pointer rounded-full uppercase" :class="[peserta.tema]">{{ peserta.initials }}</div>
                                   <span class="capitalize">{{ peserta.namaDepan }} {{ peserta.namaBelakang }}</span>
                                   <i v-if="peserta.userId === userId" title="Saya" class="bi bi-person-fill"></i>
                              </div>
                         </div>
                    </div>
               </div>
               <div v-if="filteredAnggota('Editor').length > 0" class="w-full border-b dark:border-dark">
                    <h5>Editor</h5>
                    <div class="flex flex-wrap gap-3 py-5">
                         <div v-for="peserta in filteredAnggota('Editor')" :key="peserta.userId" class="rounded-md border w-auto dark:border-gray-500 border-gray-400 flex gap-4 px-3 py-3 justify-between items-center text-sm cursor-pointer">
                              <div class="w-8 h-8 flex justify-center items-center text-black dark:text-white text-xs text-center cursor-pointer rounded-full uppercase" :class="[peserta.tema]">{{ peserta.initials }}</div>
                              <span class="capitalize">{{ peserta.namaDepan }} {{ peserta.namaBelakang }}</span>
                              <i v-if="peserta.userId === userId" title="Saya" class="bi bi-person-fill"></i>
                              <div v-if="userRole === 'Pemilik' && !isLoading" class="border-l border-gray-200 dark:border-dark-3 pl-2">
                                   <button @click="ubahRole(peserta.userId, peserta.role)" title="Turunkan Jadi Anggota"><i class="bi bi-arrow-down-short text-red-400 hover:text-red-300 text-2xl"></i></button>
                              </div>
                         </div>
                    </div>
               </div>
               <div v-if="filteredAnggota('Anggota').length > 0" class="w-full border-b dark:border-dark">
                    <h5>Anggota</h5>
                    <div class="flex flex-wrap gap-3 py-5">
                         <div v-for="peserta in filteredAnggota('Anggota')" :key="peserta.userId" class="rounded-md border dark:border-gray-500 border-gray-400 flex gap-4 px-3 py-3 justify-between items-center text-sm cursor-pointer">
                              <div class="w-8 h-8 flex justify-center items-center text-black dark:text-white text-xs text-center cursor-pointer rounded-full uppercase" :class="[peserta.tema]">{{ peserta.initials }}</div>
                              <span class="capitalize">{{ peserta.namaDepan }} {{ peserta.namaBelakang }}</span>
                              <i v-if="peserta.userId === userId" title="Saya" class="bi bi-person-fill"></i>
                              <div v-if="userRole !== 'Anggota' && !isLoading" class="border-l border-gray-200 dark:border-dark-3 pl-2">
                                   <button @click="ubahRole(peserta.userId, peserta.role)" title="Promosikan Jadi Editor"><i class="bi bi-arrow-up-short text-green-400 hover:text-green-300 text-2xl"></i></button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>

          <div v-if="loading" class="w-full text-center py-12">
               <Spinner />
          </div>
     </div>
</template>

<script>
import Spinner from '../loader/spiner.vue';
import axios from 'axios';
import { useUserStore } from '../../stores/user';
import { ref } from 'vue';
export default {
     name: 'modal-anggota',
     props: ['param'],
     components: {
          Spinner,
     },
     data() {
          return {
               focusedIndex: null,
               anggota: ref(''),
               loading: true,
               isLoading: false,
          };
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },

          toggleToast(title, type) {
               this.$emit('toast', { title, type });
          },

          updateUserRole(anggota, userId, role) {
               let newRole = '';
               role === 'Editor' ? (newRole = 'Anggota') : (newRole = 'Editor');
               const index = anggota.findIndex((user) => user.userId == userId);
               if (index !== -1) {
                    anggota[index].role = newRole;
                    this.param.peserta = anggota.filter((obj) => obj.role !== 'Pemilik');
               }
               return anggota;
          },

          filteredAnggota(role) {
               return this.anggota
                    .filter((user) => user.role === role)
                    .map((user) => {
                         const anggotaFinal = this.anggota.find((data) => data.userId === user.userId);
                         return {
                              userId: anggotaFinal.userId,
                              namaDepan: anggotaFinal.namaDepan,
                              namaBelakang: anggotaFinal.namaBelakang,
                              role: anggotaFinal.role,
                              tema: anggotaFinal.tema,
                              initials: anggotaFinal.initials,
                         };
                    });
          },
          closeButton() {
               this.focusedIndex = null;
          },

          async ubahRole(userId, role) {
               this.isLoading = true;
               try {
                    const _id = this.param._id;
                    const response = await axios.post(
                         'ubah-role',
                         {
                              _id,
                              userId,
                              role,
                         },
                         {
                              withCredentials: true,
                         }
                    );
                    if (response.status == 200) {
                         this.updateUserRole(this.anggota, userId, role);
                         this.isLoading = false;
                         this.toggleToast('Berhasil', 'success');
                    } else {
                         this.isLoading = false;
                         this.toggleToast('Terjadi kesalahan', 'error');
                    }
               } catch (error) {
                    console.error(error);
                    this.isLoading = false;
                    this.toggleToast('Terjadi kesalahan', 'error');
               }
          },
     },

     async mounted() {
          document.documentElement.classList.add('overflow-hidden');
          this.anggota = [
               {
                    userId: this.param.pemilik,
                    role: 'Pemilik',
               },
               ...this.param.peserta.map((item) => ({
                    userId: item.userId,
                    role: item.role,
               })),
          ];

          const response = await axios.post('get-anggota', this.anggota, {
               withCredentials: true,
          });
          if (response.status == 200) {
               this.anggota = response.data;

               this.loading = false;
          }
     },
     unmounted() {
          document.documentElement.classList.remove('overflow-hidden');
     },

     setup() {
          const userStore = useUserStore();
          const userId = userStore.user.id;
          const userRole = userStore.role;
          return {
               userRole,
               userId,
          };
     },
};
</script>

<style></style>
