<template>
     <div class="bg-white dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <div class="flex items-center justify-between mb-8">
               <h3 class="font-medium text-xl">Modal Anggota</h3>
               <span class="cursor-pointer" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
               </span>
          </div>
     </div>
</template>

<script>
export default {
     name: 'modal-anggota',
     methods: {
          closeModal() {
               this.$emit('close');
          },
     },
     mounted() {
          document.documentElement.classList.add('overflow-hidden');
     },
     unmounted() {
          document.documentElement.classList.remove('overflow-hidden');
     },
};
</script>

<style></style>
