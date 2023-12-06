import { useUserStore } from '../stores/user';
import axios from 'axios';

const checkSession = () => {
     const load = async () => {
          try {
               const response = await axios.get(
                    'checkSession',

                    {
                         withCredentials: true,
                    }
               );
               const userStore = useUserStore();
               if (response.data) {
                    userStore.isAuthenticated = true;
                    userStore.user = response.data;
               } else {
                    userStore.$reset();
               }
          } catch (error) {
               console.error(error);
          }
     };

     return { load };
};

export default checkSession;
