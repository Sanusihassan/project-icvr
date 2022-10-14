const HEADER = document.querySelector('.js-fixed-header');
const CLASS_FIXED = 'fixed';

const headerFixed = (() => {
  const headerFixedInit = () => {
    if (!HEADER) return;

    const heightScroll = 1;
    //const heightScroll = HEADER.offsetTop;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= heightScroll) {
        HEADER.classList.add(CLASS_FIXED);
      } else {
        HEADER.classList.remove(CLASS_FIXED);
      }
    });

    /*    window.addEventListener('scroll', () => {
      const windowTop = window.pageYOffset
      const width = document.querySelector('body').scrollWidth

      if (media !== 'all') {
        if (width <= media) {
          changeClass()
        }
      } else {
        changeClass()
      }

      function changeClass() {
        if (windowTop >= heightScroll + 20) {
          head.classList.add(classFixed)
        } else {
          head.classList.remove(classFixed)
        }
      }
    }) */
  };

  const init = () => {
    headerFixedInit();
  };

  return {
    init,
  };
})();

export default headerFixed;
