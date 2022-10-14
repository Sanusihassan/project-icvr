// const ACTIVE = 'active';
const NAV_LINKS = document.querySelectorAll('.js-link-to');


const scrollTo = (() => {

  const initScroll = () => {

    if(!NAV_LINKS.length) return;

    NAV_LINKS.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const href = e.currentTarget.getAttribute('href').substring(1);
        
        top(href);
      })
    });
  };

  const top = (id) => {
    const scrollTarget = document.getElementById(id);

    if(!scrollTarget) return;

    let topOffset = 0;
    const fixHeader = document.querySelector('.js-fixed-header');

    if(fixHeader) {
      topOffset = fixHeader.offsetHeight;
    }

    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });
  };

  const init = () => {
    initScroll();
  };

  return {
    init,
    top
  };
})();

export default scrollTo;
