<template lang="">
     <div v-if="!loading" class="bg-white w-full max-h-full mx-2 max-w-[500px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <div class="flex items-center justify-between mb-5">
               <h3 class="font-semibold text-xl">{{ param.kegiatan.title }}</h3>
          </div>
          <div
               class="flex max-h-full flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-dark dark:scrollbar-track-dark-3 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          >
               <div class="w-1/2 text-sm font-semibold flex flex-col gap-2 whitespace-nowrap">
                    <div class="grid grid-cols-2">
                         <span class="opacity-50 w-11">Hari</span> <span>{{ param.dataJadwal.namaHari }}</span>
                    </div>
                    <div class="grid grid-cols-2">
                         <span class="opacity-50 w-11">Waktu</span> <span>{{ param.kegiatan.start }} - {{ param.kegiatan.end }}</span>
                    </div>
                    <div class="grid grid-cols-2">
                         <span class="opacity-50 w-11">Kelas</span>
                         <span>{{ param.kegiatan.kelas[0] }}</span>
                    </div>
               </div>
               <div class="w-full mt-8 relative border rounded-md py-3 pt-6 px-4 text-sm border-gray-300 dark:border-gray-600">
                    <span class="absolute -top-2 px-2 left-2 text-xs bg-white dark:bg-dark-2">Deskripsi</span>
                    <span>{{ param.kegiatan.deskripsi != '' ? param.kegiatan.deskripsi : '-' }}</span>
               </div>
          </div>
          <div class="w-full mt-12 flex gap-8 justify-between items-center">
               <div class="text-xs">
                    diubah <span class="">{{ relativeTime }}</span> oleh <span class="font-semibold capitalize">{{ editor }}</span>
               </div>
               <span @click="closeModal" class="cursor-pointer bg-gray-400 dark:text-black text-white px-4 py-2 rounded-md">Tutup</span>
          </div>

          <div v-if="loading" class="w-full text-center py-12">
               <Spinner />
          </div>
     </div>
</template>

<script>
import axios from 'axios';
import { useRelativeTime } from '../../composables/relativeTime';
import Spinner from '../loader/spiner.vue';
export default {
     name: 'modal-edit',
     props: ['param'],
     data() {
          return {
               editor: '',
               loading: true,
          };
     },
     components: {
          Spinner,
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },

          toggleToast(title, type) {
               this.$emit('toast', { title, type });
          },

          async ambilNama() {
               try {
                    const response = await axios.post(
                         'ambil-nama',
                         {
                              _id: this.param.kegiatan.editor,
                         },
                         {
                              withCredentials: true,
                         }
                    );

                    if (response.status == 200) {
                         console.log(response.data);
                         this.editor = response.data;
                         this.loading = false;
                    } else if (response.status == 500) {
                         this.loading = false;
                         this.toggleToast('Server sedang mengalami gangguan', 'error');
                    }
               } catch (error) {
                    this.toggleToast(error.message, 'error');
                    this.loading = false;
               }
          },
     },

     mounted() {
          this.ambilNama();
     },

     setup(props) {
          const relativeTime = useRelativeTime(props.param.kegiatan.date);

          return {
               relativeTime,
          };
     },
};
</script>
<style lang=""></style>
