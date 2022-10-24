// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import Swiper from 'swiper';
import burgerMenu from './components/burger-menu';
import popupsFunc from './components/popup';
import initSwiper from './components/slider';
import initSelects from './components/select';
import scrollTo from './components/scroll-to';

import mobHeight from './helpers/mob-height';
import initBodyHeight from './helpers/body-height';
import Popups from './components/full-popup';
import initTabs from './components/tabs';
// carousel plug-in
import './helpers/carousel-plugin';
// 3d hover plug-in
import './helpers/jquery.hover3d.min';
(($) => {
  // When DOM is ready
  $(() => {
    burgerMenu.init();
    popupsFunc.init();
    initSwiper();
    initSelects();
    scrollTo.init();
    initTabs();

    mobHeight();
    initBodyHeight();
    const popups = new Popups();

    //navigation
    if (document.querySelector('.js-menu')) {
      let lastId,
        topMenu = $('.js-menu'),
        menuItems = topMenu.find('a'),
        scrollItems = menuItems.map(function () {
          let item = $($(this).attr('href'));
          if (item.length) {
            return item;
          }
        });

      menuItems.click(function (e) {
        let href = $(this).attr('href'),
          offsetTop = href === '#' ? 0 : $(href).offset().top - 49;
        $('html, body').stop().animate(
          {
            scrollTop: offsetTop,
          },
          500
        );
        e.preventDefault();
      });

      $(window).scroll(function () {
        let fromTop = $(this).scrollTop() + 50;
        let cur = scrollItems.map(function () {
          if ($(this).offset().top < fromTop) return this;
        });
        cur = cur[cur.length - 1];
        let id = cur && cur.length ? cur[0].id : '';

        if (lastId !== id) {
          lastId = id;
          menuItems
            .parent()
            .removeClass('active')
            .end()
            .filter("[href='#" + id + "']")
            .parent()
            .addClass('active');
        }
      });
    }

    // toggle site theme
    const themeSwitchers = $('.js-theme-switch .theme-btn');

    themeSwitchers.each(function () {
      $(this).on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        setTheme($(this).attr('data-theme'));
      });
    });

    function setTheme(themeName) {
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    }

    // function to toggle active class between the two buttons of the theme section
    // depending on the initial value of the theme
    function activeToggler() {
      let theme = localStorage.getItem('theme');
      if (theme == 'theme-dark') {
        $('.js-theme-dark').addClass('active').next().removeClass('active');
      } else if (theme == 'light-theme') {
        $('.js-theme-light').addClass('active').prev().removeClass('active');
      }
    }
    (function () {
      if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-light');
        activeToggler();
      } else {
        setTheme('theme-dark');
        activeToggler();
      }
    })();

    //play btn
    // const video = document.getElementById('video');
    // const circlePlayButton = document.getElementById('play-btn');

    // function togglePlay() {
    //   if (video.paused || video.ended) {
    //     video.play();
    //   } else {
    //     video.pause();
    //   }
    // }

    // circlePlayButton.addEventListener('click', togglePlay);
    // video.addEventListener('playing', function () {
    //   circlePlayButton.style.opacity = 0;
    // });
    // video.addEventListener('pause', function () {
    //   circlePlayButton.style.opacity = 1;
    // });
  });
})(jQuery);

/* HOMEPAGE */

// Navmenu
$('ul.sub-menu').hide();
$('ul.menu__list > li, ul.sub-menu > li').hover(
  function () {
    if ($('> ul.sub-menu', this).length > 0) {
      $('> ul.sub-menu', this).stop().slideDown('slow');
    }
  },
  function () {
    if ($('> ul.sub-menu', this).length > 0) {
      $('> ul.sub-menu', this).stop().slideUp('slow');
    }
  }
);

// Onclick submenu
$('#introSection').hide();

$(document).on('click', '#immersive', function (event) {
  event.preventDefault();
  $('#introSection').show('slow');
  // zoom effect
  $('section#intro-home-section').addClass('zoom');
  $('.introPlay__playButton').toggleClass('active');
  $('.introPlay__playSE').toggleClass('active');
  $('.introPlay__playBE').toggleClass('active');
  $('.intro-home-section').toggleClass('intro-home-section__active').show('slow');
});
// the custom view cursor function
let viewEl = $('.intro-home-section span.view');
$(document).mousemove(function (e) {
  viewEl.css({
    left: e.pageX,
    top: e.pageY,
  });
});
function customViewCursor() {
  viewEl.css({
    opacity: 1,
  });
}
// Onclick button
$('.backgroundVideo').css('opacity', 0);
const docStyle = document.body.style;
$(document).on('click', '#bookconsultation', function (event) {
  event.preventDefault();
  // remove zoom effect
  $('section#intro-home-section').addClass('zoom-out');
  $('#introSection').fadeOut();
  $('.backgroundVideo').animate({ opacity: 1 }, function () {
    // change cursor to view element
    if (!docStyle.cursor) {
      docStyle.cursor = `none`;
      customViewCursor();
    } else docStyle.cursor = null;
    $('.backgroundVideo').toggleClass('active');
    $('.intro-home-section').toggleClass('videoStarted');
    $('.intro__contacts, .introPlay').css('display', 'none');
    // $('.introPlay').css('display', 'none');
  });
  $('.introPlay__playButton, .introPlay__playSE, .introPlay__playBE').toggleClass('hidden');
  // $('.introPlay__playSE').toggleClass('hidden');
  // $('.introPlay__playBE').toggleClass('hidden');
  scrollBanner();
});

// let x = 0;
let y = 0;
let h = $(window).height();
let introHome = $('.intro-home-section');
let studiesSection = $('.studies-section');

let scrollDown = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = !executed;
      $('html,body').animate({ scrollTop: studiesSection.offset().top + studiesSection.css('padding-top').replace('px', '') }, 'slow');
      // change cursor back to where it is
      docStyle.cursor = 'default';
      viewEl.css({
        opacity: 0,
      });
      // $('.caseStudies').animate();
    }
  };
})();

function scrollBanner() {
  $(window).on('scroll', function () {
    y = $(window).scrollTop();
    $('.backgroundVideo').toggleClass('scrolled');
    // introHome.style['transform-style'] = 'preserve-3d';
    if (y >= h * 0.45) {
      introHome.attr('data-aos', 'flip-up');
      scrollDown();
    } else if (y < h * 0.45) {
      introHome.removeAttr('data-aos');
    }
  });
}

// add class active and remove from siblings
// function activeHelper(_this) {
//   _this.addClass('active').siblings().removeClass('active');
// }

// Case studies animation
// $('#carousel').Cloud9Carousel({
//   autoPlay: 1,
//   bringToFront: true,
//   speed: 6,
// });
// TODO: make custom auto carousel
$('#carousel').Cloud9Carousel({
  // yRadius: 60,
  speed: 3,
  // mirror: {
  //   gap: 3,
  //   height: 0.23,
  // },

  yOrigin: 42,
  yRadius: 48,
  mirror: {
    gap: 12,
    height: 0.2,
  },
  bringToFront: true,
  scaleTo: 1.5,
  onRendered: function (carousel) {
    // if ($(window).width() < 700) {
    // this.xOrigin = $('.awards-flat-carousel').width() / 8;
    // this.yOrigin = $('.awards-flat-carousel').height() / 3;
    // }
    // console.log(this.items);
  },
  autoPlay: 1,
});
// $(document).on('click', '.study-case', function (event) {
//   event.preventDefault();
//   $('.caseStudies').attr('data-case-center', this.id);
//   // if (this.id == 'studyCase1') centerCase1($('#studyCase1'));
//   // if (this.id == 'studyCase2') centerCase2($('#studyCase2'));
//   // if (this.id == 'studyCase3') centerCase3($('#studyCase3'));
//   // if (this.id == 'studyCase4') centerCase4($('#studyCase4'));
//   // if (this.id == 'studyCase5') centerCase5($('#studyCase5'));
// });
/*
function centerCase2(_this) {
  // add active class and remove from siblings
  activeHelper(_this);
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: -60, z: -800, x: 50 }, 0)
    .to('#studyCase2', 1, { xPercent: 0, z: 1, x: 0 }, 0)
    .to('#studyCase3', 1, { xPercent: 260, z: -800, x: 200 }, 0)
    .to('#studyCase4', 1, { xPercent: -10, z: 10 }, 0)
    .to('#studyCase5', 1, { xPercent: 280, z: 75, x: -100 }, 0);
}

function centerCase4(_this) {
  // add active class and remove from siblings
  activeHelper(_this);
  var tl = new TimelineMax();
  tl.to('#studyCase5', 1, { xPercent: 140, z: -800 }, 0)
    .to('#studyCase1', 1, { xPercent: -20, z: -190 }, 0)
    .to('#studyCase2', 1, { xPercent: 190, z: -380, x: 150 }, 0)
    .to('#studyCase3', 1, { xPercent: -140, z: -2000 }, 0)
    .to('#studyCase4', 1, { xPercent: 0, z: 1 }, 0);
}

function centerCase1(_this) {
  // add active class and remove from siblings
  activeHelper(_this);
  var tl = new TimelineMax();
  tl.to('#studyCase1', 1, { xPercent: 0, z: 1, x: 0 }, 0)
    .to('#studyCase2', 1, { xPercent: 130, z: -800, x: 350 }, 0)
    .to('#studyCase3', 1, { xPercent: -20, z: -90 }, 0)
    .to('#studyCase4', 1, { xPercent: 265, z: 0, x: -30 }, 0)
    .to('#studyCase5', 1, { xPercent: -50, z: -800, x: 150 }, 0);
}

function centerCase3(_this) {
  // add active class and remove from siblings
  activeHelper(_this);
  var tl = new TimelineMax();
  tl.to('#studyCase1', 1, { xPercent: 195, z: -240, x: 450 }, 0)
    .to('#studyCase2', 1, { xPercent: -60, z: -850, x: 50 }, 0)
    .to('#studyCase3', 1, { xPercent: 0, z: 1 }, 0)
    .to('#studyCase4', 1, { xPercent: 130, z: -800, x: 400 }, 0)
    .to('#studyCase5', 1, { xPercent: 0, z: 40, x: 50 }, 0);
}

function centerCase5(_this) {
  // add active class and remove from siblings
  activeHelper(_this);
  var tl = new TimelineMax();
  tl.to('#studyCase1', 1, { xPercent: 238, z: -615, x: 50 }, 0)
    .to('#studyCase2', 1, { xPercent: -80, z: -850 }, 0)
    .to('#studyCase3', 1, { xPercent: 300, z: -175, x: 100 }, 0)
    .to('#studyCase4', 1, { xPercent: 5, z: -800 }, 0)
    .to('#studyCase5', 1, { xPercent: 30, z: 1 }, 0);
}

$(function () {
  centerCase2($('#studyCase2'));
});
*/
// Case studies animation END
// Awards animation
// showcase.Cloud9Carousel({
// yOrigin: 130,

// xRadius: 100,
// yRadius: 100,

//   farScale: 1,
//   bringToFront: true,
//   // onRendered: function(carousel) {
//   //   $('h2').text(carousel.nearestItem().element.alt);
//   //   $('#descr').text(carousel.nearestItem().element.title);
//   // },
//   // onLoaded: function() {
//   //   showcase.css('visibility', 'visible')
//   //   showcase.css('display', 'none')
//   //   showcase.fadeIn(1500)
//   // }
// })
let awardsHeight = $('.awards-flat-carousel').height(),
  awardsWidth = $('.awards-flat-carousel').height();
let isDesktop = $(window).width() >= 992;
// console.log(awardsWidth *);
$('.awards-flat-carousel').Cloud9Carousel({
  yOrigin: 50,
  // xOrigin: 10,
  yRadius: 80,
  xRadius: 210,

  mirror: {
    gap: 12,
    height: 0.2,
  },
  speed: 3,
  bringToFront: true,
  frontItemClass: 'front',
  autoPlay: 1,
  onRendered: function (carousel) {
    let frontElWrap = $('.awards-flat-carousel .front .award__wrap');
    let pseudoEl = document.querySelector('.awards-scroll .front .pseudo');
    $(pseudoEl).css({ width: frontElWrap.width(), height: frontElWrap.height() });
    let s = getComputedStyle(pseudoEl);
    $('.awards-flat-carousel .front .award__wrap').css({
      marginLeft: s.marginLeft,
      // marginRight: s.marginRight,
    });
    // if (isDesktop) {
    // }
  },
});
// $('.awards-flat-carousel').Cloud9Carousel({
//   autoPlay: 1,
//   bringToFront: true,
//   speed: 6,

//   farScale: 1,
// });
// $(document).on('click', '.award', function (event) {
//   event.preventDefault();
//   $('.caseAwards').attr('award-center', this.id);
//   if (this.id == 'award1') centerAward1();
//   if (this.id == 'award2') centerAward2();
//   if (this.id == 'award3') centerAward3();
//   if (this.id == 'award4') centerAward4();
//   if (this.id == 'award5') centerAward5();
// });
/*
function centerAward1() {
  var tl = new TimelineMax();
  tl.to('#award1', 1, { scale: 1.1, xPercent: 0, z: 1 }, 0)
    .to('#award2', 1, { scale: 0.9, xPercent: 130, y: -65, z: 0 }, 0)
    .to('#award3', 1, { scale: 0.8, xPercent: 95, y: -80, z: 0 }, 0)
    .to('#award4', 1, { scale: 1.1, xPercent: 296, y: -36, z: 0 }, 0)
    .to('#award5', 1, { scale: 0.8, xPercent: -50, y: 30, z: 0 }, 0);
}

function centerAward2() {
  var tl = new TimelineMax();
  tl.to('#award1', 1, { scale: 0.8, xPercent: '83%', y: -85, z: -800 }, 0)
    .to('#award2', 1, { scale: 1.5, xPercent: '222%', z: 1 }, 0)
    .to('#award3', 1, { scale: 1.1, xPercent: 8, y: 16, z: 0 }, 0)
    .to('#award4', 1, { xPercent: 306, y: -190, z: 0 }, 0)
    .to('#award5', 1, { xPercent: -145, z: 75 }, 0);
}

function centerAward3() {
  var tl = new TimelineMax();
  tl.to('#award1', 1, { xPercent: 68, y: -232, z: 0 }, 0)
    .to('#award2', 1, { scale: 1.1, xPercent: 388, z: 0 }, 0)
    .to('#award3', 1, { scale: 1.5, xPercent: 183, y: 100, z: 1 }, 0)
    .to('#award4', 1, { xPercent: 130, z: -800 }, 0)
    .to('#award5', 1, { scale: 1.1, xPercent: -265, y: 200, z: 0 }, 0);
}

function centerAward4() {
  var tl = new TimelineMax();
  tl.to('#award5', 1, { scale: 1.1, xPercent: 15, y: 185, z: 0 }, 0)
    .to('#award1', 1, { xPercent: -120, y: -58, z: 0 }, 0)
    .to('#award2', 1, { xPercent: 146, z: -380 }, 0)
    .to('#award3', 1, { scale: 0.8, xPercent: 240, y: -67, z: 0 }, 0)
    .to('#award4', 1, { scale: 1.5, xPercent: 130, z: 1 }, 0);
}

function centerAward5() {
  var tl = new TimelineMax();
  tl.to('#award1', 1, { xPercent: -25, y: -226, z: 0 }, 0)
    .to('#award2', 1, { scale: 0.8, xPercent: 360, y: -200, z: 0 }, 0)
    .to('#award3', 1, { scale: 1.1, xPercent: 305, z: -575 }, 0)
    .to('#award4', 1, { scale: 1.1, xPercent: 5, y: 20, z: 0 }, 0)
    .to('#award5', 1, { scale: 1.5, xPercent: -100 }, 0);
}
*/
// $(function () {
//   centerAward3();
// });
// Awards animation END

// 3d news hover effect
// $('.news__wrap').on('mousemove', function (e) {
//   // console.log(e);
//   // let xAxis = $(this).width() / 2 - e.pageX;
//   // let yAxis = $(this).height() / 2 - e.pageY;
//   // $(this).css('transform', `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`);
// });
$('.swiper-slide').hover3d({
  selector: '.news',
  shine: false,
  sensitivity: 50,
});

// card.addEventListener('mousemove', function(e) {
//   let xAxis = (window.innerWidth / 2 - e.pageX) / 10;
//   let yAxis = (window.innerHeight / 2 - e.pageY) / 5;
//   this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
// });

function scrollStudies() {
  let x = 0;
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('#intro-home-section').height();
    if (scroll > ihs - 200) {
      if (x === 0) {
        $('.tag1').css({
          opacity: 0,
          animation: 'fadeIn .2s ease-in both',
        });
        $('.tag2').css({
          opacity: 0,
          animation: 'fadeIn 1s ease-in both',
        });
        $('.tag3').css({
          opacity: 0,
          animation: 'fadeIn 1.8s ease-in both',
        });
        $('.tag4').css({
          opacity: 0,
          animation: 'fadeIn 2.6s ease-in both',
        });
        $('.section-title').toggleClass('active');
      }
      x = 1;
    }
  });
}

function scrollAwards() {
  let x = 0;
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('.studies-section').height() + $('#intro-home-section').height();
    if (scroll > ihs) {
      if (x === 0) {
        $('#award1').css({
          animation: 'fadeIn 0.0s ease-in both',
        });
        $('#award2').css({
          animation: 'fadeIn 0.0s ease-in both',
        });
        $('#award3').css({
          animation: 'fadeIn 0.0s ease-in both',
        });
        $('#award4').css({
          animation: 'fadeIn 0.0s ease-in both',
        });
        $('#award5').css({
          animation: 'fadeIn 0.0s ease-in both',
        });
        $('#awardEmpty1').css({
          animation: 'fadeIn 0.0s ease-in both',
        });
        $('#awardEmpty2').css({
          animation: 'fadeIn 0.0s ease-in both',
        });
        $('.awards-title-main').toggleClass('active');
      }
      x = 1;
    }
  });
}

function scrollNews() {
  let x = 0;
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('.awards-section').height() + $('.studies-section').height() + $('#intro-home-section').height();
    if (scroll > ihs) {
      if (x === 0) {
        $('.newsSlide1').css({
          transform: 'translateZ(-50%)',
        });
        $('.newsSlide2').css({
          animation: 'slide 0.5s forwards',
        });
        $('.news-title').toggleClass('active');
      }
      x = 1;
    }
  });
}

scrollStudies();
scrollAwards();
scrollNews();

window.addEventListener(
  'scroll',
  () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  },
  false
);
