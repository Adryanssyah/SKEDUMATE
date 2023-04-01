<template lang="">
     <label data-tooltip-target="tooltip-toggle-dark" for="toggle" data-tooltip-placement="bottom" class="relative inline-flex items-center cursor-pointer md:order-2">
          <input type="checkbox" id="toggle" :checked="!isLightMode" class="sr-only peer" @change="toggleMode" aria-label="ToggleDark" />
          <div
               class="w-11 h-6 bg-gray-200 rounded-full relative peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-600 dark:bg-dark-2 peer-checked:after:translate-x-full peer-checked:after:border-gray-800 after:absolute after:flex after:justify-center after:items-center text-xs after:pt-0.5 after:dark:text-gray-400 after:top-0.5 after:left-[2px] after:content-['🌞'] dark:after:content-['🌙'] after:bg-white after:dark:bg-dark-2 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-900 peer-checked:bg-dark-3"
          ></div>
     </label>
     <Tooltip title="Toggle Dark Mode" ids="tooltip-toggle-dark" />
</template>
<script>
import Tooltip from '../tooltip/tooltip.vue';
export default {
     name: 'toggle',
     emits: ['toggle'],
     components: {
          Tooltip,
     },
     data() {
          return {
               isLightMode: true,
               dark: 'dark',
          };
     },
     methods: {
          toggleMode() {
               this.isLightMode = !this.isLightMode;
               this.saveMode();
               this.$emit('toggle');
          },
          loadMode() {
               if (localStorage.getItem('isLightMode')) {
                    document.documentElement.classList.remove(this.dark);
               } else {
                    document.documentElement.classList.add(this.dark);
               }
               this.isLightMode = localStorage.getItem('isLightMode');
          },
          saveMode() {
               if (localStorage.getItem('isLightMode')) {
                    localStorage.removeItem('isLightMode');
               } else {
                    localStorage.setItem('isLightMode', true);
               }
               document.documentElement.classList.toggle('dark', !this.isLightMode);
          },
     },
     created() {
          this.loadMode();
     },
};
</script>
<style scoped>
.after {
     content: '';
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
}

.peer-checked:after {
     content: '';
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
}

.peer-checked:after::before {
     content: '\f185';
     font-family: 'bootstrap-icons';
     font-size: 1.2rem;
     color: #fadb14;
}

.peer-checked:after::after {
     content: '\f186';
     font-family: 'bootstrap-icons';
     font-size: 1.2rem;
     color: #ffd700;
}
</style>
