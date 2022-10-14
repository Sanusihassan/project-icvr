const showPopupBtns = document.querySelectorAll('.js-show-popup');
const popups = document.querySelectorAll('.js-popup');
const body = document.body;
const overlay = document.querySelector('.js-overlay');

const CLASS_ACTIVE = 'active';
const CLASS_OVERFLOW = 'overflow';

const popupsFunc = (() => {
  const showPopup = (event) => {
    const openBtn = event.target.closest('.js-show-popup');
    const activePopup = document.querySelector('.js-popup.active');
    const targetPopup = document.querySelector(`[data-popup=${openBtn.dataset.trigger}]`);

    if (activePopup) {
      activePopup.classList.remove(CLASS_ACTIVE);
    }

    if (openBtn.dataset.tab) {
      targetPopup.querySelector(`[data-tab="${openBtn.dataset.tab}"]`).classList.add(CLASS_ACTIVE);
      targetPopup.querySelector(`[data-content="${openBtn.dataset.tab}"]`).classList.add(CLASS_ACTIVE);
    }

    targetPopup.classList.add(CLASS_ACTIVE);
    body.classList.add(CLASS_OVERFLOW);
    overlay.classList.add(CLASS_ACTIVE);
  };

  const hidePopup = (activePopup) => {
    if (!activePopup) {
      return;
    }
    body.classList.remove(CLASS_OVERFLOW);
    overlay.classList.remove(CLASS_ACTIVE);
    activePopup.classList.remove(CLASS_ACTIVE);

    if (document.querySelector('.active[data-content]') && document.querySelector('.active[data-tab]')) {
      document.querySelector('.active[data-content]').classList.remove(CLASS_ACTIVE);
      document.querySelector('.active[data-tab]').classList.remove(CLASS_ACTIVE);
    }
  };

  const showPopupInit = () => {
    if (showPopupBtns.length) {
      showPopupBtns.forEach((opener) => {
        opener.addEventListener('click', (event) => {
          showPopup(event);
        });
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        hidePopup(document.querySelector('.js-popup.active'));
      });
    }
    if (popups.length) {
      popups.forEach((popup) => {
        popup.addEventListener('click', (event) => {
          const closeBtn = event.target.closest('.js-popup-close');
          if (!closeBtn) {
            return;
          }
          hidePopup(popup);
        });
      });
    }
  };

  const init = () => {
    if (popups.length) {
      showPopupInit();
    }
  };

  return {
    init,
  };
})();

export default popupsFunc;
