<template>
     <div v-if="jadwals !== null" class="w-full max-w-[1100px] py-10 flex px-5 xl:px-0">
          <div class="w-full md:pr-8 pr-0">
               <div class="flex justify-between items-center mb-10">
                    <h1 class="text-3xl font-semibold">{{ jadwals.nama_jadwal }}</h1>
                    <div class="flex gap-3 whitespace-nowrap">
                         <button class="w-full text-xs border-2 py-2 px-4 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md hover:bg-black hover:text-white" @click="toggleModal('ModalJadwalKosong', null)">
                              Jadwal Kosong
                         </button>
                         <button class="group relative w-full text-xs border-2 py-2 px-4 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md">
                              <span>Hari</span>
                              <div class="absolute hidden dark:bg-dark-2 dark:border-gray-900 flex-col gap-3 bg-white z-50 shadow-md top-10 right-0 border border-gray-200 px-6 py-5 rounded-md text-base font-medium group-focus:flex">
                                   <label v-for="(hari, key) in jadwals.hari" :key="key" :for="[key]" class="custom-label cursor-pointer flex items-center gap-3">
                                        <input type="checkbox" :id="[key]" class="hidden" v-model="hari.visible" />
                                        <span class="w-5 h-5 border border-black dark:border-yellow-400 dark:bg-yellow-400 rounded flex justify-center items-center custom-check text-white">
                                             <i class="bi bi-check-lg hidden"></i>
                                        </span>
                                        <span>{{ key }}</span>
                                   </label>
                              </div>
                         </button>
                    </div>
               </div>
               <div v-for="(hari, key) in jadwals.hari" :key="key">
                    <Hari v-if="hari.visible" :namaHari="key" :kegiatanHari="hari.kegiatan" :toggleModal="toggleModal" />
               </div>
          </div>

          <Setting :toggleModal="toggleModal" :id="jadwals._id" :kelas="jadwals.kelas" />

          <component v-if="showModal" :is="currentModal" :param="param" @close="toggleModal" @reload="loadData"></component>
     </div>
</template>

<script>
import ModalTambahHari from '../components/modals/modal-tambah-hari.vue';
import ModalKelasifikasi from '../components/modals/modal-kelasifikasi.vue';
import ModalJadwalKosong from '../components/modals/modal-jadwal-kosong.vue';
import ModalAnggota from '../components/modals/modal-anggota.vue';
import ModalJenisAkses from '../components/modals/modal-jenis-akses.vue';
import Hari from '../components/hari.vue';
import Setting from '../components/setting.vue';
import getJadwalDetail from '../composables/getJadwalDetail';
import { ref } from 'vue';
export default {
     name: 'Buat',
     props: ['id'],
     components: {
          Hari,
          Setting,
          ModalTambahHari,
          ModalKelasifikasi,
          ModalJadwalKosong,
          ModalAnggota,
          ModalJenisAkses,
     },
     data() {
          return {
               hariVisible: true,
               jadwals: ref(null),
               showModal: false,
               currentModal: '',
               param: null,
          };
     },
     watch: {
          hariVisible(newValue) {
               this.jadwals.hari.Senin.visible = newValue;
          },
     },

     methods: {
          toggleModal(jenisModal, param) {
               this.showModal = !this.showModal;
               this.currentModal = jenisModal;
               this.param = param;
          },
          async loadData() {
               const { loadDetail, error, schedule } = getJadwalDetail(this.id);
               await loadDetail();
               this.jadwals = schedule;
               console.log(this.jadwals.hari.Senin);
          },
     },

     created() {
          this.loadData();
     },
};
</script>

<style scoped>
.custom-label input:checked + .custom-check {
     background-color: black;
}
.custom-label input:checked + .custom-check i {
     display: block !important;
}
</style>
