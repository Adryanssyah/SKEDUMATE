let handleOutsideClick;
export default {
     mounted(el, binding) {
          handleOutsideClick = (e) => {
               e.stopPropagation();
               const { handler, exclude } = binding.value;
               let clickedOnExcludedEl = false;
               if (binding.instance && binding.instance.$refs) {
                    exclude.forEach((refName) => {
                         const excludedEl = binding.instance.$refs[refName];
                         if (excludedEl && excludedEl.contains(e.target)) {
                              clickedOnExcludedEl = true;
                         }
                    });
               }
               if (!el.contains(e.target) && !clickedOnExcludedEl) {
                    binding.instance[handler]();
               }
          };
          document.addEventListener('click', handleOutsideClick);
          document.addEventListener('touchstart', handleOutsideClick);
     },
     beforeUnmount() {
          document.removeEventListener('click', handleOutsideClick);
          document.removeEventListener('touchstart', handleOutsideClick);
     },
};
