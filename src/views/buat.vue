<template>
     <div v-if="jadwals !== null" class="w-full max-w-[1100px] py-10 flex px-5 xl:px-0">
          <div class="w-full md:pr-8 pr-0">
               <div class="flex justify-between items-center mb-10">
                    <h1 class="text-3xl font-semibold">{{ jadwals.nama_jadwal }}</h1>
               </div>
               <div class="flex gap-3 whitespace-nowrap mb-10 justify-between">
                    <div class="flex gap-3">
                         <button class="group relative text-xs border-2 py-2 px-4 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md">
                              <span>Hari</span>
                              <div class="absolute hidden dark:bg-dark-2 dark:border-gray-900 flex-col gap-3 bg-white z-50 shadow-md top-10 left-0 border border-gray-200 px-6 py-5 rounded-md text-base font-medium group-focus:flex">
                                   <label v-for="(hari, key) in jadwals.hari" :key="key" :for="[key]" class="custom-label cursor-pointer flex items-center gap-3">
                                        <input type="checkbox" :id="[key]" class="hidden" v-model="hari.visible" />
                                        <span class="w-5 h-5 border border-black dark:border-yellow-400 dark:bg-yellow-400 rounded flex justify-center items-center custom-check text-white">
                                             <i class="bi bi-check-lg hidden"></i>
                                        </span>
                                        <span>{{ key }}</span>
                                   </label>
                              </div>
                         </button>

                         <button class="text-xs border-2 py-2 px-4 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md hover:bg-black hover:text-white" @click="toggleModal('ModalJadwalKosong', id)">
                              Jadwal Kosong
                         </button>
                    </div>

                    <div>
                         <button
                              data-tooltip-target="tooltip-btn-setting"
                              data-tooltip-placement="bottom"
                              class="relative text-xs border-2 py-2 px-4 border-black dark:border-dark-2 dark:hover:bg-yellow-400 dark:bg-dark-2 rounded-md hover:bg-black hover:text-white"
                         >
                              <i class="bi bi-gear-fill"></i>
                         </button>
                         <Tooltip title="Toggle Setting" ids="tooltip-btn-setting" />
                    </div>
               </div>
               <div v-for="(hari, key) in kegiatan" :key="key">
                    <Hari v-if="hari.visible" :id="jadwals._id" :namaHari="key" :kegiatanHari="hari.kegiatan" :kelas="jadwals.kelas" :toggleModal="toggleModal" />
               </div>
          </div>
          <Setting :toggleModal="toggleModal" :id="jadwals._id" :kelas="jadwals.kelas" />
          <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-all duration-300" leave-active-class="transition-all duration-300" name="modal-backdrop">
               <div v-show="showModal" class="fixed top-0 left-0 w-full py-5 h-full bg-black bg-opacity-70 flex justify-center items-center z-50" @click.self="closeModal">
                    <Transition enter-active-class="transition-all duration-300" leave-active-class="transition-all duration-300" enter-from-class="transform scale-0" leave-to-class="transform scale-0" name="modal">
                         <component v-show="showModal" :is="currentModal" :param="param" @close="toggleModal" @reload="loadData"></component>
                    </Transition>
               </div>
          </Transition>
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
import Tooltip from '../components/tooltip/tooltip.vue';
import getJadwalDetail from '../composables/getJadwalDetail';
import { ref, computed } from 'vue';
import { useJadwalStore } from '../stores/jadwal';
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
          Tooltip,
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

          closeModal() {
               this.showModal = false;
          },
          async loadData() {
               const { loadDetail, schedule } = getJadwalDetail(this.id);
               await loadDetail();
               this.jadwals = schedule;
               const jadwalStore = useJadwalStore();
               jadwalStore.kelas = this.jadwals.kelas;
               jadwalStore.kegiatan = this.jadwals.hari;
          },
     },

     created() {
          this.loadData();
     },

     setup() {
          const jadwalStore = useJadwalStore();
          const kegiatan = computed(() => jadwalStore.kegiatan);
          return {
               kegiatan,
          };
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
