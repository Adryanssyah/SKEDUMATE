<template>
     <div class="bg-white w-full mx-2 max-w-[450px] dark:bg-dark-2 p-8 rounded-md flex flex-col">
          <div class="flex items-center justify-between mb-8">
               <h3 class="font-medium text-xl">Kelola Akses</h3>
               <span class="cursor-pointer" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
               </span>
          </div>
          <form @submit.prevent="buatJadwal" class="flex flex-col">
               <input
                    type="text"
                    class="w-full py-3 px-6 rounded-md border border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 text-md"
                    :class="{ 'border-red-500 dark:border-red-500': errors.nama_jadwal }"
                    placeholder="Nama jadwal"
                    name="nama_jadwal"
                    v-model="nama_jadwal"
               />
               <div class="text-red-500 text-xs mt-2 flex items-center" v-if="errors.nama_jadwal !== ''"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i> {{ errors.nama_jadwal }}</div>
               <span class="font-medium text-gray-500 mt-5 mb-4">Jenis Akses</span>
               <div class="flex items-center gap-1 mb-6">
                    <span class="text-4xl px-6">
                         <i class="bi" :class="{ 'bi-person-fill': jenis == 'private', 'bi-people-fill': jenis == 'public' }"></i>
                    </span>
                    <div class="flex flex-col">
                         <div class="mb-1">
                              <select
                                   class="font-medium outline-none cursor-pointer w-full py-2 pr-10 rounded-md border-b border-slate-300 border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900 mb-1"
                                   name="jenis"
                                   v-model="jenis"
                              >
                                   <option selected value="public">Kelola bersama</option>
                                   <option value="private">Pribadi</option>
                              </select>
                         </div>
                         <span v-if="jenis == 'public'" class="text-sm text-gray-400 font-medium">Kelola jadwal bersama pengguna lain</span>
                         <span v-if="jenis == 'private'" class="text-sm text-gray-400 font-medium">Jadwal akan kamu kelola sendiri</span>
                    </div>
               </div>
               <input
                    v-if="jenis == 'public'"
                    type="text"
                    :maxlength="8"
                    @input="limitInput"
                    class="w-full py-3 tracking-widest rounded-md border text-md text-center border-black dark:bg-dark-3 dark:text-gray-100 dark:border-gray-900"
                    placeholder="Set Password"
                    name="pin"
                    v-model="password"
                    :class="{ 'border-red-500 dark:border-red-500': errors.password }"
               />
               <div class="text-red-500 text-xs mt-2 flex items-center" v-if="errors.password !== '' && jenis == 'public'"><i class="bi bi-exclamation-circle-fill text-md mr-2"></i> {{ errors.password }}</div>
               <div class="w-full mt-6 flex justify-between">
                    <button class="px-4">Bagikan</button>
                    <button type="submit" class="bg-black dark:bg-yellow-400 dark:text-black text-white px-4 py-2 rounded-md">Buat <i class="bi bi-arrow-right ml-2"></i></button>
               </div>
          </form>
     </div>
</template>

<script>
export default {
     name: 'modal-jenis-akses',
     data() {
          return {
               userId: '',
               nama_jadwal: '',
               jenis: 'private',
               password: '',
               errors: {
                    nama_jadwal: '',
                    password: '',
               },
          };
     },
     methods: {
          closeModal() {
               this.$emit('close');
          },
     },
};
</script>

<style></style>
