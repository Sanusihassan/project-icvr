const video = (() => {
  const overlay = document.getElementById('overlay');
  const vid = document.getElementById('video');

  const videoInit = () => {
    if (document.getElementById('video')) {
      if (overlay.addEventListener) {
        // eslint-disable-next-line no-use-before-define
        overlay.addEventListener('click', play, false);
      } else if (overlay.attachEvent) {
        // eslint-disable-next-line no-use-before-define
        overlay.attachEvent('onclick', play);
      }

      // eslint-disable-next-line no-inner-declarations
      function play() {
        if (vid.paused) {
          vid.play();
          overlay.className = 'hide';
        } else {
          vid.pause();
          overlay.className = 'show';
        }
      }
    }
  };

  const init = () => {
    videoInit();
  };
  return {
    init,
  };
})();

export default video;
