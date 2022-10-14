const SELECT_SELECTOR = '.js-select';
const BTN_SELECTOR = '.js-select-btn';
const LIST_SELECTOR = '.js-select-list';
const OPTION_SELECTOR = '.js-select-option';

const CLASS_ACTIVE = 'active';

const SELECTS = document.querySelectorAll('.js-select');

const initSelects = () => {
  if (!SELECTS.length) return;

  function closeAllSelect() {
    const btnList = document.querySelectorAll(BTN_SELECTOR);
    const selectList = document.querySelectorAll(LIST_SELECTOR);

    btnList.forEach((el) => el.classList.remove(CLASS_ACTIVE));
    selectList.forEach((el) => el.classList.remove(CLASS_ACTIVE));
  }

  SELECTS.forEach((select) => {
    const btn = select.querySelector(BTN_SELECTOR);
    const selectList = select.querySelector(LIST_SELECTOR);
    const optionList = selectList.querySelectorAll(OPTION_SELECTOR);

    btn.addEventListener('click', (e) => {
      const target = e.target.closest(BTN_SELECTOR);

      if (target.classList.contains(CLASS_ACTIVE)) {
        target.classList.remove(CLASS_ACTIVE);
        selectList.classList.remove(CLASS_ACTIVE);
      } else {
        closeAllSelect();
        target.classList.add(CLASS_ACTIVE);
        selectList.classList.add(CLASS_ACTIVE);
      }
    });

    selectList.addEventListener('click', (e) => {
      const target = e.target.closest(OPTION_SELECTOR);

      if (target) {
        const value = target.getAttribute('data-value');
        const content = target.innerHTML;

        optionList.forEach((option) => option.classList.remove(CLASS_ACTIVE));

        target.classList.add(CLASS_ACTIVE);
        btn.classList.remove(CLASS_ACTIVE);
        btn.innerHTML = content;
        btn.setAttribute('data-value', value);
        selectList.classList.remove(CLASS_ACTIVE);
      }
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;

    if (target && !target.closest(SELECT_SELECTOR)) {
      closeAllSelect();
    }
  });
};

export default initSelects;
