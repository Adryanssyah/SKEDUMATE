import { defineStore } from 'pinia';

export const useUserStore = defineStore({
     id: 'user',
     state: () => ({
          isAuthenticated: false,
          user: null,
          initials: '',
          theme: '',
          role: '',
     }),

     getters: {
          setInitials() {
               if (this.user) {
                    this.initials = this.user.namaDepan.match(/(\b\S)?/g).join('') + this.user.namaBelakang.match(/(\b\S)?/g).join('');
                    return this.initials;
               }
          },

          setTheme() {
               if (this.user) {
                    this.theme = this.user.tema;
                    return this.theme;
               }
          },
     },
});
