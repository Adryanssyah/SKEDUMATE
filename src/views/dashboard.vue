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
               <button @click="toggleModal('ModalBuat')" class="bg-black dark:bg-yellow-400 dark:text-black text-white px-4 py-2 mt-4 rounded-md">Buat <i class="bi bi-arrow-right ml-2"></i></button>
          </div>
     </div>

     <div v-if="loading" class="loading w-full text-center py-28">
          <Spinner />
     </div>

     <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-all duration-300" leave-active-class="transition-all duration-300" name="modal-backdrop">
          <div v-show="showModal" class="fixed top-0 left-0 w-full py-5 h-full bg-black bg-opacity-70 flex justify-center items-center z-50" @click.self="closeModal">
               <Transition enter-active-class="transition-all duration-300" leave-active-class="transition-all duration-300" enter-from-class="transform scale-0" leave-to-class="transform scale-0" name="modal">
                    <keep-alive>
                         <component v-if="showModal" :is="currentModal" @close="toggleModal" @update="updateJadwal"></component>
                    </keep-alive>
               </Transition>
          </div>
     </Transition>
</template>

<script>
import Card from '@/components/cards/d-card.vue';
import Spinner from '../components/loader/spiner.vue';
import ModalBuat from '@/components/modals/modal-buat.vue';
import getJadwal from '../composables/getJadwal';
import { ref } from 'vue';

export default {
     name: 'dashboard',
     components: {
          Card,
          ModalBuat,
          Spinner,
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
          closeModal() {
               this.showModal = false;
          },
     },
     async mounted() {
          const { loadJadwal } = getJadwal();
          this.jadwals = await loadJadwal();
          this.loading = false;
     },
};
</script>

<style scoped>
.loading {
     margin-top: 200px;
}
</style>
