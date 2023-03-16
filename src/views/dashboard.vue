<template>
     <div v-if="!loading" class="w-full flex flex-col justify-center items-center px-5">
          <div v-if="jadwals.length !== 0" class="w-full max-w-[1100px] py-10 flex flex-col">
               <h1 class="font-bold text-2xl">Kegiatan Saya</h1>
               <div class="w-full flex justify-between items-center py-8">
                    <h2 class="font-medium text-xl">Terakhir dilihat</h2>
                    <button @click="toggleModal('ModalBuat')" class="bg-black dark:bg-yellow-400 dark:text-black text-white px-4 py-2 rounded-md">Buat <i class="bi bi-arrow-right ml-2"></i></button>
               </div>
               <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1">
                    <Card v-for="(jadwal, index) in jadwals" :key="jadwal.custom_id" :jadwal="jadwal" />
               </div>
          </div>
          <div v-if="jadwals.length == 0" class="py-[13%] w-full max-w-[1100px] flex flex-col justify-center items-center text-center gap-2">
               <h2 class="font-medium text-2xl">Kamu belum memiliki jadwal.</h2>
               <p class="text-gray-400 font-medium">Klik tombol di bawah untuk memulai</p>
               <button @click="toggleModal('ModalBuat')" class="bg-black text-white px-4 py-2 mt-4 rounded-md">Buat <i class="bi bi-arrow-right ml-2"></i></button>
          </div>
     </div>
     <div class="w-full flex flex-col justify-center items-center px-5">
          <Loader v-if="loading" />
     </div>
     <keep-alive>
          <component v-if="showModal" :is="currentModal" @close="toggleModal" @update="updateJadwal"></component>
     </keep-alive>
</template>

<script>
import Card from '../components/cards/d-card.vue';
import Loader from '../components/loader/skeleton.vue';
import ModalBuat from '../components/modals/modal-buat.vue';
import getJadwal from '../composables/getJadwal';
import { useJadwalStore } from '../stores/jadwal';
import { ref } from 'vue';
import { watchEffect } from 'vue';

export default {
     name: 'dashboard',
     components: {
          Card,
          ModalBuat,
          Loader,
     },
     data() {
          return {
               showModal: false,
               currentModal: '',
               jadwals: ref(null),
               loading: true,
          };
     },
     methods: {
          toggleModal(jenisModal) {
               this.showModal = !this.showModal;
               this.currentModal = jenisModal;
          },

          updateJadwal(jadwalBaru) {
               this.jadwals.push(jadwalBaru);
          },
     },
     async created() {
          const { loadJadwal } = getJadwal();
          const jadwalStore = useJadwalStore();
          if (jadwalStore.jadwal === null) {
               this.jadwals = await loadJadwal();
          } else {
               this.jadwals = jadwalStore.jadwal;
          }

          console.log(this.jadwals);

          watchEffect(() => {
               if (this.jadwals.value !== null) {
                    this.loading = false;
               }
          });
     },
};
</script>

<style></style>
