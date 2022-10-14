const CLASS_ACTIVE = 'active';
const LOCATION_HREF = window.location.href;

const headerActive = (() => {
  const headerAddClass = () => {
    $().ready(() => {
      $('[href]').each(function () {
        if (this.href === LOCATION_HREF) {
          $(this).addClass(CLASS_ACTIVE);
        }
      });
    });
  };

  const init = () => {
    if (document.querySelectorAll('nav').length > 0) {
      headerAddClass();
    }
  };

  return {
    init,
  };
})();

export default headerActive;
