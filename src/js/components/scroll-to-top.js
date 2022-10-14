// const ACTIVE = 'active';
const TOP_BTN = document.getElementById('js-top');

const scrollTopFunc = (() => {
  const scrollFunc = () => {
    const y = window.scrollY - 500;

    if (y > 0) {
      TOP_BTN.className = 'btn-top show';
    } else {
      TOP_BTN.className = 'btn-top hide';
    }
  };

  window.addEventListener('scroll', scrollFunc);

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;

    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
  };

  const init = () => {
    TOP_BTN.click(() => scrollToTop());
  };

  return {
    init,
  };
})();

export default scrollTopFunc;
