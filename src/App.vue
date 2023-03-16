<template>
     <AppHeader v-if="!authPage" />
     <router-view />
     <AppFooter v-if="!authPage" />
</template>

<script setup>
import { useUserStore } from './stores/user';
import getJadwal from './composables/getJadwal';
import 'flowbite/dist/flowbite.js';

const userStore = useUserStore();
if (userStore.isAuthenticated) {
     userStore.setInitials;
     userStore.setTheme;
}
</script>

<script>
import AppHeader from './components/navigasi.vue';
import AppFooter from './components/footer.vue';

export default {
     name: 'app',
     components: {
          AppHeader,
          AppFooter,
     },
     data() {
          return {
               authPage: false,
          };
     },
     methods: {
          checkRoute() {
               if (this.$route.name === 'Login' || this.$route.name === 'Daftar' || this.$route.name === 'Join') {
                    this.authPage = true;
                    return;
               }
               this.authPage = false;
          },
     },
     watch: {
          $route() {
               this.checkRoute();
          },
     },
     mounted() {
          const { loadJadwal } = getJadwal();
          loadJadwal();
     },
};
</script>

<style></style>
