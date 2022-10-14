import initBodyHeight from './../helpers/body-height';

class Popups {
  constructor() {
    this.handlers();
  }

  POPUP_SHOW = document.querySelectorAll('[data-trigger]');
  POPUPS_LIST = document.querySelectorAll('[data-popup]');
  OVERLAY = document.querySelector('.js-overlay');
  BODY = document.querySelector('body');
  CLOSE_BTN = document.querySelectorAll('.js-popup-close');
  SELECTOR_CLOSE = '.js-popup-close';
  SELECTOR_SHOW = '[data-trigger]';
  CLASS_ACTIVE = 'active';
  CLASS_OVERFLOW = 'overflow';

  handlers = () => {
    if (this.POPUP_SHOW.length) {
      this.POPUP_SHOW.forEach((opener) => {
        opener.addEventListener('click', (e) => {
          e.preventDefault();

          const overlay = e.target.closest(this.SELECTOR_SHOW).dataset.overlay;
          const trigger = e.target.closest(this.SELECTOR_SHOW).dataset.trigger;

          this.showPopup(trigger, overlay);
        });
      });
    }

    if (this.OVERLAY) {
      this.OVERLAY.addEventListener('click', (e) => {
        e.target.classList.remove(this.CLASS_ACTIVE);
        this.POPUPS_LIST.forEach((popup) => {
          popup.classList.remove(this.CLASS_ACTIVE);
        });
        this.BODY.classList.remove(this.CLASS_OVERFLOW);
      });
    }

    if (this.CLOSE_BTN.length) {
      this.CLOSE_BTN.forEach((closure) => {
        closure.addEventListener('click', (e) => {
          this.hidePopup();
        });
      });
    }
  };

  hidePopup = () => {
    this.POPUPS_LIST.forEach((popup) => {
      popup.classList.remove(this.CLASS_ACTIVE);
    });
    this.BODY.classList.remove(this.CLASS_OVERFLOW);

    if (this.OVERLAY && this.OVERLAY.classList.contains(this.CLASS_ACTIVE)) {
      this.OVERLAY.classList.remove(this.CLASS_ACTIVE);
    }
  };

  showPopup = (target, overlay) => {
    const currentPopup = document.querySelector(`[data-popup="${target}"]`);

    this.POPUPS_LIST.forEach((popup) => {
      popup.classList.remove(this.CLASS_ACTIVE);
    });

    currentPopup.classList.add(this.CLASS_ACTIVE);
    this.BODY.classList.add(this.CLASS_OVERFLOW);

    if (overlay != null || overlay != undefined) {
      if (!overlay) {
        this.showOberlay();
      } else {
        const media = +overlay;

        if (this.BODY.scrollWidth >= media) {
          this.showOberlay();
        }
      }
    }

    initBodyHeight();
  };

  showOberlay() {
    if (this.OVERLAY && !this.OVERLAY.classList.contains(this.CLASS_ACTIVE)) {
      this.OVERLAY.classList.add(this.CLASS_ACTIVE);
    }
  }
}

export default Popups;
