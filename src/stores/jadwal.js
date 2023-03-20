import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useJadwalStore = defineStore({
     id: 'jadwal',
     state: () => ({
          jadwal: ref(null),
          kelas: null,
          kegiatan: null,
     }),
     actions: {
          loadJadwal() {
               return this.jadwal;
          },
          loadKelas() {
               return this.kelas;
          },

          setKelas(daftarKelas) {
               this.kelas = daftarKelas;
          },
     },
});
