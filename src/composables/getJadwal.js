import { useUserStore } from '../stores/user';
import { useJadwalStore } from '../stores/jadwal';
import axios from 'axios';

const getJadwal = () => {
     const loadJadwal = async () => {
          const userStore = useUserStore();
          const jadwalStore = useJadwalStore();
          try {
               const response = await axios.get('ambil-semua-jadwal/' + userStore.user.id, {
                    withCredentials: true,
               });
               jadwalStore.jadwal = response.data;
               return response.data;
          } catch (error) {}
     };

     return { loadJadwal };
};

export default getJadwal;
