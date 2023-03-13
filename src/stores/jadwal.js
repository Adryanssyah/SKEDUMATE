import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useJadwalStore = defineStore({
     id: 'jadwal',
     state: () => ({
          jadwal: ref(null),
     }),
     actions: {
          loadJadwal() {
               return this.jadwal;
          },
     },
});
