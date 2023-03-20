<template lang="">
     <div :id="[ids]" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-dark-3">
          {{ title }}
          <div class="tooltip-arrow" data-popper-arrow></div>
     </div>
</template>
<script>
export default {
     name: 'tooltip',
     props: {
          ids: {
               type: String,
          },
          title: {
               type: String,
          },
     },
};
</script>
<style lang=""></style>
