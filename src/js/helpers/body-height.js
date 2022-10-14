const WRAP_SELECTOR = '.js-wrap';
const HEAD_SELECTOR = '.js-head';
const BODY_SELECTOR = '.js-body';
const FOOTER_SELECTOR = '.js-footer';

const initBodyHeight = () => {
  const wrapList = document.querySelectorAll(WRAP_SELECTOR);

  if (!wrapList.length) return;

  const initHeight = (wrap) => {
    const head = wrap.querySelector(HEAD_SELECTOR),
      body = wrap.querySelector(BODY_SELECTOR),
      footer = wrap.querySelector(FOOTER_SELECTOR),
      wrapHeight = +window.getComputedStyle(wrap).height.slice(0, -2) - +window.getComputedStyle(wrap).paddingBottom.slice(0, -2);

    let outherHead = 0;

    if (head) {
      outherHead += head.scrollHeight;
    }

    if (footer) {
      outherHead += footer.scrollHeight;
    }

    if (outherHead && body) {
      body.style.height = wrapHeight - outherHead + 'px';
      body.style.overflow = 'hidden';
      body.style.overflowY = 'auto';
    }
  };

  wrapList.forEach((wrap) => {
    initHeight(wrap);
  });

  window.addEventListener('resize', () => {
    wrapList.forEach((wrap) => {
      initHeight(wrap);
    });
  });
};

export default initBodyHeight;
