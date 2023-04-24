import { useUserStore } from '../stores/user';
import { useJadwalStore } from '../stores/jadwal';
import axios from 'axios';

const updateJadwal = () => {
     const loadUpdate = async () => {
          const userStore = useUserStore();
          const jadwalStore = useJadwalStore();
          try {
               const response = await axios.post(
                    'get-user',
                    { _id: userStore.user.id },
                    {
                         withCredentials: true,
                    }
               );
               if (response.status == 200) {
                    console.log(response.data);
                    userStore.user.jadwal = response.data.jadwal;
                    return response.data.jadwal;
               }
          } catch (error) {}
     };

     return { loadUpdate };
};

export default updateJadwal;
