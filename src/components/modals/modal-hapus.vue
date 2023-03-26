<template>
     <div class="bg-white w-full mx-2 max-w-[400px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <form @submit.prevent="hapus" class="flex flex-col justify-center gap-5">
               <div class="my-3 flex justify-center">
                    <span class="text-3xl p-5 rounded-2xl bg-gray-200 dark:bg-dark-3">🤔</span>
               </div>
               <div class="text-center font-medium">
                    Anda yakin ingin menghapus kegiatan
                    <span class="text-yellow-400">{{ param.kegiatan.title }}</span
                    >?
               </div>
               <div class="text-center mt-2 text-gray-600 dark:text-gray-500 text-sm font-medium">Jika yakin klik tombol <span class="text-blue-400">Hapus</span>, klik <span class="text-blue-400">Batal</span> jika berubah piikiran</div>
               <div class="w-full mt-8 flex gap-3 justify-end">
                    <span @click="closeModal" class="items-center cursor-pointer bg-gray-400 dark:text-black text-white px-4 py-2 rounded-md flex gap-3">Batal</span>
                    <button
                         type="submit"
                         :disabled="isloading"
                         :class="{ 'bg-red-500  text-white': !isloading, 'bg-gray-400 dark:bg-gray-600 dark:text-black text-white cursor-not-allowed': isloading }"
                         class="px-4 py-2 rounded-md flex gap-3"
                    >
                         <span>{{ isloading ? 'Menghapus ...' : 'Hapus' }}</span>
                    </button>
               </div>
          </form>
     </div>
</template>

<script>
import { useJadwalStore } from '../../stores/jadwal';
import axios from 'axios';
export default {
     name: 'modal-hapus',
     props: ['param'],
     data() {
          return {
               dataHapus: {
                    _id: this.param.dataJadwal.id,
                    hari: this.param.dataJadwal.namaHari,
                    id: this.param.kegiatan.id,
               },
               isloading: false,
          };
     },

     methods: {
          closeModal() {
               this.$emit('close');
          },

          toggleToast(title, type) {
               this.$emit('toast', { title, type });
          },

          success(response) {
               const jadwalStore = useJadwalStore();
               jadwalStore.kegiatan[this.dataHapus.hari].kegiatan = response.data;
               this.toggleToast('Berhasil menghapus kegiatan', 'success');
               this.$emit('close');
               this.isloading = false;
          },

          async hapus() {
               this.isloading = true;
               try {
                    const response = await axios.post('hapus-kegiatan', this.dataHapus, {
                         withCredentials: true,
                    });

                    if ((response.status = 200)) {
                         this.success(response);
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
