const CLASS_ACTIVE = 'active';
const wrapList = document.querySelectorAll('.js-tabs');

function initTabs() {
  if (!wrapList.length) return;
  wrapList.forEach((wrap) => attachEvents(wrap));

  function attachEvents(parent) {
    const tabList = parent.querySelectorAll('[data-tab]'),
      contentList = parent.querySelectorAll('[data-content]');

    if (!tabList.length) return;

    tabList.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        tabList.forEach((btn) => btn.classList.remove(CLASS_ACTIVE));
        e.currentTarget.classList.add(CLASS_ACTIVE);

        const idContent = e.currentTarget.dataset.tab;

        if (idContent === 'all') {
          contentList.forEach((content) => content.classList.add(CLASS_ACTIVE));
        } else {
          const currentContentList = parent.querySelectorAll(`[data-content="${idContent}"]`);

          contentList.forEach((content) => content.classList.remove(CLASS_ACTIVE));

          currentContentList.forEach((content) => content.classList.add(CLASS_ACTIVE));
        }
      });
    });
  }
}

export default initTabs;