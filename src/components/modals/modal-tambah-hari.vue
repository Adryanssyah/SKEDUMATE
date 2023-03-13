<template>
     <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50" @click.self="closeModal">
          <div class="bg-white p-8 rounded-md flex flex-col">
               <div class="flex items-center justify-between mb-8">
                    <h3 class="font-medium text-xl">Kegiatan Hari {{ param }}</h3>
                    <span class="cursor-pointer" @click="closeModal">
                         <i class="bi bi-x-lg"></i>
                    </span>
               </div>
               <form @submit.prevent="tambahHari" class="flex flex-col">
                    <input type="text" class="w-96 py-3 px-6 rounded-md border border-black text-md" placeholder="Nama jadwal" name="nama_jadwal" />
                    <div class="w-full mt-6 flex justify-end">
                         <button type="submit" class="bg-black text-white px-4 py-2 rounded-md">Buat <i class="bi bi-arrow-right ml-2"></i></button>
                    </div>
               </form>
          </div>
     </div>
</template>

<script>
export default {
     name: 'modal-tambah-hari',
     props: ['param'],
     methods: {
          closeModal() {
               this.$emit('close');
          },
     },
};
</script>

<style></style>
