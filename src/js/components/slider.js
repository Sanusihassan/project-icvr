function initSwiper() {
  //slider
  const projSlider = document.querySelector('.js-proj-slider');

  if (projSlider) {
    const slider1 = new Swiper('.js-proj-slider', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        768: {
          spaceBetween: -10,
        },
        1024: {
          spaceBetween: 0,
        },
        1920: {
          spaceBetween: 150,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  const newsSlider = document.querySelector('.js-news-slider');

  if (newsSlider) {
    const slider2 = new Swiper('.js-news-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      grid: {
        fill: 'column',
        rows: 2,
      },
      breakpoints: {
        768: {
          spaceBetween: 30,
          slidesPerView: 1.6,
          slidesPerGroup: 1,
        },
        1024: {
          spaceBetween: 40,
          slidesPerView: 2,
        },
        1440: {
          spaceBetween: 80,
          slidesPerView: 2,
        },
      },
    });
  }
}

export default initSwiper;
