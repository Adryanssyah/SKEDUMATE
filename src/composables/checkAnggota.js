import axios from 'axios';
import { useUserStore } from '../stores/user';

const checkAnggota = (custom_id) => {
     const userStore = useUserStore();
     const _id = userStore.user.id;
     const load = async () => {
          try {
               const response = await axios.post(
                    'check-anggota',
                    { custom_id, _id },
                    {
                         withCredentials: true,
                    }
               );
               if (response.status == 200) {
                    return response.data;
               }
          } catch (error) {
               console.error(error);
          }
     };
     return { load };
};

export default checkAnggota;
