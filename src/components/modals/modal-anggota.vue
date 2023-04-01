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
                    <div class="flex flex-wrap gap-3 py-5">
                         <div v-for="peserta in filteredAnggota('Pemilik')" :key="peserta.userId" class="rounded-md border dark:border-gray-500 border-gray-400 flex gap-4 px-3 py-3 justify-between items-center text-sm cursor-pointer">
                              <div class="w-8 h-8 flex justify-center items-center text-black text-center cursor-pointer rounded-full uppercase" :class="[peserta.tema]">{{ peserta.initials }}</div>
                              <span class="capitalize">{{ peserta.namaDepan }} {{ peserta.namaBelakang }}</span>
                              <i v-if="peserta.userId === userId" title="Saya" class="bi bi-person-fill"></i>
                         </div>
                    </div>
               </div>
               <div v-if="filteredAnggota('Editor').length > 0" class="w-full border-b dark:border-dark">
                    <h5>Editor</h5>
                    <div class="flex flex-wrap gap-3 py-5">
                         <div v-for="peserta in filteredAnggota('Editor')" :key="peserta.userId" class="rounded-md border dark:border-gray-500 border-gray-400 flex gap-4 px-3 py-3 justify-between items-center text-sm cursor-pointer">
                              <div class="w-8 h-8 flex justify-center items-center text-black text-center cursor-pointer rounded-full uppercase" :class="[peserta.tema]">{{ peserta.initials }}</div>
                              <span class="capitalize">{{ peserta.namaDepan }} {{ peserta.namaBelakang }}</span>
                              <i v-if="peserta.userId === userId" title="Saya" class="bi bi-person-fill"></i>
                         </div>
                    </div>
               </div>
               <div v-if="filteredAnggota('Anggota').length > 0" class="w-full border-b dark:border-dark">
                    <h5>Anggota</h5>
                    <div class="flex flex-wrap gap-3 py-5">
                         <div v-for="peserta in filteredAnggota('Anggota')" :key="peserta.userId" class="rounded-md border dark:border-gray-500 border-gray-400 flex gap-4 px-3 py-3 justify-between items-center text-sm cursor-pointer">
                              <div class="w-8 h-8 flex justify-center items-center text-black text-center cursor-pointer rounded-full uppercase" :class="[peserta.tema]">{{ peserta.initials }}</div>
                              <span class="capitalize">{{ peserta.namaDepan }} {{ peserta.namaBelakang }}</span>
                              <i v-if="peserta.userId === userId" title="Saya" class="bi bi-person-fill"></i>
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
export default {
     name: 'modal-anggota',
     props: ['param'],
     components: {
          Spinner,
     },
     data() {
          return {
               anggota: '',
               anggotaFinal: null,
               loading: true,
          };
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },
          filteredAnggota(role) {
               return this.anggota
                    .filter((user) => user.role === role)
                    .map((user) => {
                         const anggotaFinal = this.anggotaFinal.find((data) => data.userId === user.userId);
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
               this.anggotaFinal = response.data;
               this.loading = false;
          }
     },
     unmounted() {
          document.documentElement.classList.remove('overflow-hidden');
     },

     setup() {
          const userStore = useUserStore();
          const userId = userStore.user.id;
          return {
               userId,
          };
     },
};
</script>

<style></style>
