const slickSlider = (() => {
  const slickSliderInit = () => {
    $('.js-slider').slick({
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      centerMode: false,

      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
          },
        },
      ],
    });
  };

  const slickLinksSliderInit = () => {
    $('.js-link-slider').slick({
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,

      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
          },
        },
      ],
    });
  };

  const init = () => {
    slickSliderInit();
    slickLinksSliderInit();
  };

  return {
    init,
  };
})();
export default slickSlider;
