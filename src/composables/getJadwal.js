import { useUserStore } from '../stores/user';
import { useJadwalStore } from '../stores/jadwal';
import axios from 'axios';

const getJadwal = () => {
     const loadJadwal = async () => {
          const userStore = useUserStore();
          const jadwalStore = useJadwalStore();
          try {
               const response = await axios.post('ambil-semua-jadwal', userStore.user.jadwal, {
                    withCredentials: true,
               });
               if (response.status == 200) {
                    jadwalStore.jadwal = response.data;
                    return response.data;
               }
          } catch (error) {}
     };

     return { loadJadwal };
};

export default getJadwal;
