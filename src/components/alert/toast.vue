<template lang="">
     <transition
          enter-active-class="transition-all ease-in-out duration-300"
          leave-active-class="transition-all ease-in-out duration-300"
          enter-from-class="transform  translate-y-24 opacity-0"
          leave-to-class="transform  translate-y-24 opacity-0"
     >
          <div v-if="toast.visible" class="fixed z-50 bottom-10 shadow-md flex justify-center items-center gap-4 overflow-y-hidden left-auto rounded-xl border-2 border-black px-8 py-3 bg-white dark:bg-dark-2 dark:border-gray-500">
               <i
                    class="text-2xl bi"
                    :class="{
                         'bi-check-circle text-green-500 dark:text-green-300': toast.type == 'success',
                         'bi-exclamation-circle text-yellow-400 dark:text-yellow-300': toast.type == 'warning',
                         'bi-x-circle text-red-500 dark:text-red-500': toast.type == 'error',
                    }"
               ></i>
               <span>{{ toast.title }}</span>
          </div>
     </transition>
</template>
<script>
export default {
     name: 'toast',
     data() {
          return {
               duration: 2300,
          };
     },

     props: {
          toast: {
               type: Object,
               required: true,
          },
     },

     watch: {
          'toast.visible': function (newVal, oldVal) {
               if (newVal === true) {
                    setTimeout(() => {
                         this.$emit('toast');
                    }, this.duration);
               }
          },
     },
};
</script>
<style lang=""></style>
