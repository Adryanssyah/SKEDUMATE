<template>
     <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50" @click.self="closeModal">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-md flex flex-col">
               <div class="flex items-center justify-between mb-8">
                    <h3 class="font-medium text-xl">Modal Jadwal Kosong</h3>
                    <span class="cursor-pointer" @click="closeModal">
                         <i class="bi bi-x-lg"></i>
                    </span>
               </div>
          </div>
     </div>
</template>

<script>
export default {
     name: 'modal-jadwal-kosong',
     methods: {
          closeModal() {
               this.$emit('close');
          },
     },
};
</script>

<style></style>
