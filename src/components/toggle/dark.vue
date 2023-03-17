<template lang="">
     <label data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" class="relative inline-flex items-center cursor-pointer md:order-2">
          <input type="checkbox" :checked="!isLightMode" class="sr-only peer" @change="toggleMode" />
          <div
               class="w-11 h-6 bg-gray-200 rounded-full relative peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-600 dark:bg-dark-2 peer-checked:after:translate-x-full peer-checked:after:border-gray-800 after:absolute after:flex after:justify-center after:items-center text-xs after:pt-0.5 after:dark:text-gray-400 after:top-0.5 after:left-[2px] after:content-['🌞'] dark:after:content-['🌙'] after:bg-white after:dark:bg-dark-2 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-900 peer-checked:bg-dark-3"
          ></div>
     </label>

     <div id="tooltip-bottom" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-dark-2">
          Toggle Dark Mode
          <div class="tooltip-arrow" data-popper-arrow></div>
     </div>
</template>
<script>
export default {
     name: 'toggle',
     data() {
          return {
               isLightMode: true,
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
                    document.documentElement.classList.remove('dark');
               } else {
                    document.documentElement.classList.add('dark');
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
          console.log(localStorage.getItem('isLightMode'));
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
