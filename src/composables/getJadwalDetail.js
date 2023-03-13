import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import axios from 'axios';

const getJadwalDetail = (custom_id) => {
     const schedule = ref([]);
     const error = ref(null);
     const loadDetail = async () => {
          const userStore = useUserStore();
          try {
               const response = await axios.get('jadwal-detail/' + custom_id + '/' + userStore.user.id, {
                    withCredentials: true,
               });
               schedule.value = await response.data[0];
          } catch (err) {
               error.value = err.message;
               console.log(error.value);
          }
     };

     return { loadDetail, error, schedule };
};

export default getJadwalDetail;
