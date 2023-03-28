import { ref, watchEffect } from 'vue';

export function useRelativeTime(timeString) {
     const timestamp = new Date(timeString).getTime();
     const now = new Date();
     now.setHours(now.getHours() + 7); // set timezone to WIB
     const difference = Math.abs(now.getTime() - timestamp);
     const minute = 60 * 1000;
     const hour = 60 * minute;
     const day = 24 * hour;

     const relativeTime = ref('');

     const updateTime = () => {
          if (difference < minute) {
               relativeTime.value = 'baru saja';
          } else if (difference < hour) {
               const minutes = Math.floor(difference / minute);
               relativeTime.value = `${minutes} menit yang lalu`;
          } else if (difference < day) {
               const hours = Math.floor(difference / hour);
               relativeTime.value = `${hours} jam yang lalu`;
          } else {
               const days = Math.floor(difference / day);
               relativeTime.value = `${days} hari yang lalu`;
          }
     };

     updateTime();

     // update relative time every minute
     const intervalId = setInterval(() => {
          updateTime();
     }, minute);

     // cleanup interval when component is unmounted
     watchEffect((onInvalidate) => {
          onInvalidate(() => clearInterval(intervalId));
     });

     return relativeTime;
}
