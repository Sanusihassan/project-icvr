const CLASS_WRAP = 'js-accordion-wrap';
const CLASS_ACCORDION = 'js-accordion';
const CLASS_HEAD = 'js-accordion-head';
const CLASS_OPENER = 'js-accordion-open';
const CLASS_CONTENT = 'js-accordion-content';
const CLASS_DESCRIPTION = 'js-accordion-descr';
const CLASS_OPEN = 'js-open';

const CLASS_ACTIVE = 'active';

function initAccordion() {
  const accordionList = document.querySelectorAll(`.${CLASS_ACCORDION}`);
  const openList = document.querySelectorAll(`.${CLASS_ACCORDION}.${CLASS_OPEN}`);

  if (accordionList.length) {
    accordionList.forEach((accordion) => {
      const wrap = accordion.closest(`.${CLASS_WRAP}`);
      const open = accordion.querySelector(`.${CLASS_OPENER}`);

      open.addEventListener('click', (e) => {
        const target = e.target;
        const btn = target.closest(`.${CLASS_OPENER}`);
        const head = target.closest(`.${CLASS_HEAD}`);
        const trigger = head ? head : btn;

        if (wrap && wrap.getAttribute('data-only') != undefined) {
          const group = wrap.querySelector(`.${CLASS_ACCORDION}`).getAttribute('data-group');
          let contentList = [];

          if (group) {
            const currentAccordionList = wrap.querySelectorAll(`[data-group="${group}"]`);
            currentAccordionList.forEach((accordion) => {
              contentList.push(accordion.querySelector(`.${CLASS_CONTENT}`));
            });
          } else {
            contentList = wrap.querySelectorAll(`.${CLASS_CONTENT}`);
          }

          showAccordion(trigger, contentList, false);
        } else {
          showAccordion(trigger);
        }
      });
    });

    resize();
  }

  if (openList.length) {
    clickAccordion(openList);
  }

  function getDesctiptionHeight(currentAccordion) {
    const description = currentAccordion.querySelector(`.${CLASS_DESCRIPTION}`);
    const height = description.offsetHeight;
    const computedStyle = window.getComputedStyle(description);
    const marginTop = +computedStyle.marginTop.replace('px', '');
    const marginBottom = +computedStyle.marginBottom.replace('px', '');

    return height + marginTop + marginBottom;
  }

  function showAccordion(head, contentAccordion = [], all = true) {
    const currentContent = head.nextElementSibling;
    const parent = currentContent.closest(`.${CLASS_ACCORDION}`);

    if (head.classList.contains(CLASS_ACTIVE)) {
      head.classList.remove(CLASS_ACTIVE);
      parent.classList.remove(CLASS_ACTIVE);
      currentContent.style.maxHeight = '0';
    } else {
      if (!all && contentAccordion.length) {
        contentAccordion.forEach((content) => {
          content.previousElementSibling.classList.remove(CLASS_ACTIVE);
          content.style.maxHeight = '0';
        });
      }

      const heightDescription = getDesctiptionHeight(currentContent);

      let parentDescription;

      let paretnContent;

      function changeParent(el) {
        parentDescription = el.closest(`.${CLASS_DESCRIPTION}`);

        if (parentDescription) {
          paretnContent = parentDescription.closest(`.${CLASS_CONTENT}`);
        } else {
          paretnContent = null;
        }
      }

      changeParent(currentContent);

      if (paretnContent) {
        do {
          const oldHeight = paretnContent.scrollHeight;
          paretnContent.style.maxHeight = `${oldHeight + heightDescription}px`;

          changeParent(paretnContent);
        } while (paretnContent);
      }

      head.classList.add(CLASS_ACTIVE);
      parent.classList.add(CLASS_ACTIVE);
      currentContent.style.maxHeight = heightDescription + 'px';
    }
  }

  function updateResize() {
    const activeAccordions = document.querySelectorAll(`.${CLASS_ACCORDION}.${CLASS_ACTIVE}`);
    const activeOpeners = document.querySelectorAll(`.${CLASS_OPENER}.${CLASS_ACTIVE}`);
    const activeHeads = document.querySelectorAll(`.${CLASS_HEAD}.${CLASS_ACTIVE}`);
    const activeContents = document.querySelectorAll(`.${CLASS_CONTENT}.${CLASS_ACTIVE}`);

    if (activeOpeners.length) {
      activeOpeners.forEach((el) => el.classList.remove(`.${CLASS_ACTIVE}`));
    }
    if (activeHeads.length) {
      activeHeads.forEach((el) => el.classList.remove(`.${CLASS_ACTIVE}`));
    }
    if (activeContents.length) {
      activeContents.forEach((el) => {
        el.classList.remove(`.${CLASS_ACTIVE}`);
        el.style.maxHeight = '0';
      });
    }

    if (activeAccordions.length) {
      activeAccordions.forEach((el) => el.classList.remove(`.${CLASS_ACTIVE}`));

      clickAccordion(activeAccordions);
      clickAccordion(activeAccordions);
    }
  }

  function clickAccordion(list) {
    list.forEach((open) => {
      const btn = open.querySelector(`.${CLASS_OPENER}`);

      if (btn) {
        btn.click();
      }
    });
  }

  function resize() {
    let changed = false;
    window.addEventListener('resize', () => {
      if (changed !== false) {
        clearTimeout(changed);
      }

      changed = setTimeout(updateResize, 200);
    });
  }
}

export default initAccordion;
