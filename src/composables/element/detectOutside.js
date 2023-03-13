import { onMounted, onUnmounted, ref } from 'vue';

const useClickOutside = () => {
     const isClickOutside = ref(false);

     const handleClickOutside = (event) => {
          if (node.value && !node.value.contains(event.target)) {
               isClickOutside.value = true;
          } else {
               isClickOutside.value = false;
          }
     };

     const node = ref(null);

     onMounted(() => {
          document.addEventListener('click', handleClickOutside);
     });

     onUnmounted(() => {
          document.removeEventListener('click', handleClickOutside);
     });

     return {
          node,
          isClickOutside,
     };
};

export default useClickOutside;
