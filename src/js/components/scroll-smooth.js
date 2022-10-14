const HEADER_EL_HEIGHT = document.querySelector('.menu').clientHeight;

const scrollSmooth = (() => {
  const smoothScroll = () => {
    const scroll = function (targetEl, duration) {
      const targets = document.querySelector(targetEl);
      const targetsPosition = targets.getBoundingClientRect().top - HEADER_EL_HEIGHT;
      const startsPosition = window.pageYOffset;
      let startTime = null;

      const ease = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t -= 1;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = function (currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startsPosition, targetsPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    };

    const scrollTo = function () {
      const links = document.querySelectorAll('.js-smooth-scroll');
      links.forEach((each) => {
        each.addEventListener('click', function () {
          const currentTarget = this.getAttribute('href');
          scroll(currentTarget, 1000);
        });
      });
    };
    scrollTo();
  };

  const init = () => {
    smoothScroll();
  };

  return {
    init,
  };
})();

export default scrollSmooth;
