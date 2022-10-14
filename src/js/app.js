// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import burgerMenu from './components/burger-menu';
import popupsFunc from './components/popup';
import initSwiper from './components/slider';
import initSelects from './components/select';
import scrollTo from './components/scroll-to';

import mobHeight from './helpers/mob-height';
import initBodyHeight from './helpers/body-height';
import Popups from './components/full-popup';
import initTabs from './components/tabs';

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
    const themeSwitchers = document.querySelectorAll('.js-theme-switch');

    themeSwitchers.forEach((item) =>
      item.addEventListener('click', (event) => {
        const button = event.target.closest('button');

        if (!button || button.classList.contains('active')) return;

        const activeBtn = event.currentTarget.querySelector('.active');
        const isDark = button.classList.contains('js-theme-dark');

        activeBtn.classList.remove('active');
        button.classList.add('active');

        toggleTheme(isDark);
      })
    );

    function setTheme(themeName) {
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    }

    function toggleTheme(isDark) {
      if (isDark) {
        setTheme('theme-dark');
      } else {
        setTheme('theme-light');
      }
    }

    (function () {
      if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-light');
      } else {
        setTheme('theme-dark');
      }
    })();

    //play btn
    const video = document.getElementById('video');
    const circlePlayButton = document.getElementById('play-btn');

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    circlePlayButton.addEventListener('click', togglePlay);
    video.addEventListener('playing', function () {
      circlePlayButton.style.opacity = 0;
    });
    video.addEventListener('pause', function () {
      circlePlayButton.style.opacity = 1;
    });
  });
})(jQuery);

/* HOMEPAGE */

// Navmenu
$('ul.sub-menu').hide();
$('ul.menu__list > li, ul.sub-menu > li').hover(function () {
  if ($('> ul.sub-menu', this).length > 0) {
    $('> ul.sub-menu', this).stop().slideDown('slow');
  }
}, function () {
  if ($('> ul.sub-menu', this).length > 0) {
    $('> ul.sub-menu', this).stop().slideUp('slow');
  }
});

// Onclick submenu
$("#introSection").hide();
$(document).on('click', '#immersive', function (event) {
  event.preventDefault();
  $("#introSection").show("slow");
  $('.introPlay__playButton').toggleClass('active');
  $('.introPlay__playSE').toggleClass('active');
  $('.introPlay__playBE').toggleClass('active');
  $('.intro-home-section').toggleClass('intro-home-section__active').show("slow");
});

// Onclick button
$(".backgroundVideo").hide();
$(document).on('click', '#bookconsultation', function (event) {
  event.preventDefault();
  $(".backgroundVideo").show(0, function () {
    $('.backgroundVideo').toggleClass('active');
    $('.intro-home-section').toggleClass('videoStarted');
    $('.intro__contacts').css("display","none");
    $('.introPlay').css("display","none");
    
  });
  $('.introPlay__playButton').toggleClass('hidden');
  $('.introPlay__playSE').toggleClass('hidden');
  $('.introPlay__playBE').toggleClass('hidden');
  scrollBanner();
});

let x = 0
let y = 0
function scrollBanner() {
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (x === 0) {
      $('.backgroundVideo').toggleClass('scrolled');
      x = 1
    }
    //$('.intro-home-section').toggleClass('scrolled');
    $('.intro-home-section').css({
      //width: (100 + scroll / 5) + "%",
      //transform: `rotateX(${(scroll * 90)}deg)`,
      transform: `rotateX(${(scroll * 0.1)}deg)`,
      //transitionDuration: `3s`,
      transformOrigin: "top"
    })
    if (y === 0) {
      //$(".caseStudies").hide();
      //$('.caseStudies').show(3000, "slow");
      //$('.caseStudies').slideUp('slow');
      y = 1
    }
  });
}

// Case studies animation
$(document).on('click', '.study-case', function (event) {
  event.preventDefault();
  $('.caseStudies').attr("case-center", this.id);
  if (this.id == "studyCase1") centerCase1();
  if (this.id == "studyCase2") centerCase2();
  if (this.id == "studyCase3") centerCase3();
  if (this.id == "studyCase4") centerCase4();
  if (this.id == "studyCase5") centerCase5();
})

function centerCase2() {
  $('#studyCase2').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase4').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: -60, z: -800 ,x:50}, 0)
    .to('#studyCase2', 1, { xPercent: 0, z: 1,x:0 }, 0)
    .to('#studyCase3', 1, { xPercent: 260, z: -800,x:200 }, 0)
    .to('#studyCase4', 1, { xPercent: -10, z: 10 }, 0)
    .to('#studyCase5', 1, { xPercent: 280, z: 75 ,x:-100}, 0)
}

function centerCase4() {
  $('#studyCase4').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase5', 1, { xPercent: 140, z: -800 }, 0)
    .to('#studyCase1', 1, { xPercent: -20, z: -190 }, 0)
    .to('#studyCase2', 1, { xPercent: 190, z: -380,x:150 }, 0)
    .to('#studyCase3', 1, { xPercent: -140, z: -2000 }, 0)
    .to('#studyCase4', 1, { xPercent: 0, z: 1 }, 0)
}

function centerCase1() {
  $('#studyCase1').toggleClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase4').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: 0, z: 1,x:0 }, 0)
    .to('#studyCase2', 1, { xPercent: 130, z: -800,x:350 }, 0)
    .to('#studyCase3', 1, { xPercent: -20, z: -90 }, 0)
    .to('#studyCase4', 1, { xPercent: 265, z: 0 ,x:-30}, 0)
    .to('#studyCase5', 1, { xPercent: -50, z: -800,x:150 }, 0)
}

function centerCase3() {
  $('#studyCase3').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase4').removeClass('active');
  $('#studyCase5').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: 195, z: -240 ,x:450}, 0)
    .to('#studyCase2', 1, { xPercent: -60, z: -850,x:50 }, 0)
    .to('#studyCase3', 1, { xPercent: 0, z: 1 }, 0)
    .to('#studyCase4', 1, { xPercent: 130, z: -800,x:400 }, 0)
    .to('#studyCase5', 1, { xPercent: 0, z: 40,x:50 }, 0)
}

function centerCase5() {
  $('#studyCase5').toggleClass('active');
  $('#studyCase1').removeClass('active');
  $('#studyCase2').removeClass('active');
  $('#studyCase3').removeClass('active');
  $('#studyCase4').removeClass('active');
  var tl = new TimelineMax()
    .to('#studyCase1', 1, { xPercent: 238, z: -615,x:50 }, 0)
    .to('#studyCase2', 1, { xPercent: -80, z: -850 }, 0)
    .to('#studyCase3', 1, { xPercent: 300, z: -175,x:100 }, 0)
    .to('#studyCase4', 1, { xPercent: 5, z: -800 }, 0)
    .to('#studyCase5', 1, { xPercent: 30, z: 1 }, 0)
}

$(function () {
  centerCase2();
})
// Case studies animation END

// Awards animation
$(document).on('click', '.award', function (event) {
  event.preventDefault();
  $('.caseAwards').attr("award-center", this.id);
  if (this.id == "award1") centerAward1();
  if (this.id == "award2") centerAward2();
  if (this.id == "award3") centerAward3();
  if (this.id == "award4") centerAward4();
  if (this.id == "award5") centerAward5();
})

function centerAward1() {
  var tl = new TimelineMax()
    .to('#award1', 1, { scale: 1.1, xPercent: 0, z: 1 }, 0)
    .to('#award2', 1, { scale: 0.9, xPercent: 130, y: -65, z: 0 }, 0)
    .to('#award3', 1, { scale: 0.8, xPercent: 95, y: -80, z: 0 }, 0)
    .to('#award4', 1, { scale: 1.1, xPercent: 296, y: -36, z: 0 }, 0)
    .to('#award5', 1, { scale: 0.8, xPercent: -50, y: 30, z: 0 }, 0)
  
}

function centerAward2() {
  var tl = new TimelineMax()
    .to('#award1', 1, { scale: 0.8, xPercent: '83%', y: -85, z: -800 }, 0)
    .to('#award2', 1, { scale: 1.5, xPercent: '222%', z: 1 }, 0)
    .to('#award3', 1, { scale: 1.1, xPercent: 8, y: 16, z: 0 }, 0)
    .to('#award4', 1, { xPercent: 306, y: -190, z: 0 }, 0)
    .to('#award5', 1, { xPercent: -145, z: 75 }, 0)
}

function centerAward3() {
  var tl = new TimelineMax()
    .to('#award1', 1, { xPercent: 68, y: -232, z: 0 }, 0)
    .to('#award2', 1, { scale: 1.1, xPercent: 388, z: 0 }, 0)
    .to('#award3', 1, { scale: 1.5, xPercent: 183, y: 100, z: 1 }, 0)
    .to('#award4', 1, { xPercent: 130, z: -800 }, 0)
    .to('#award5', 1, { scale: 1.1, xPercent: -265, y: 200, z: 0 }, 0)
}

function centerAward4() {
  var tl = new TimelineMax()
    .to('#award5', 1, { scale: 1.1, xPercent: 15, y: 185, z: 0 }, 0)
    .to('#award1', 1, { xPercent: -120, y: -58, z: 0 }, 0)
    .to('#award2', 1, { xPercent: 146, z: -380 }, 0)
    .to('#award3', 1, { scale: 0.8, xPercent: 240, y: -67, z: 0 }, 0)
    .to('#award4', 1, { scale: 1.5, xPercent: 130, z: 1 }, 0)
}

function centerAward5() {
  var tl = new TimelineMax()
    .to('#award1', 1, { xPercent: -25, y: -226, z: 0 }, 0)
    .to('#award2', 1, { scale: 0.8, xPercent: 360, y: -200, z: 0 }, 0)
    .to('#award3', 1, { scale: 1.1, xPercent: 305, z: -575 }, 0)
    .to('#award4', 1, { scale: 1.1, xPercent: 5, y: 20, z: 0 }, 0)
    .to('#award5', 1, { scale: 1.5, xPercent: -100 }, 0)
}

$(function () {
  centerAward3();
})
// Awards animation END

function scrollStudies() {
  let x = 0
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('#intro-home-section').height()
    if (scroll > ihs - 200) {
      if (x === 0) {
        $('.tag1').css({
          opacity: 0,
          animation: "fadeIn .2s ease-in both"
        })
        $('.tag2').css({
          opacity: 0,
          animation: "fadeIn 1s ease-in both"
        })
        $('.tag3').css({
          opacity: 0,
          animation: "fadeIn 1.8s ease-in both"
        })
        $('.tag4').css({
          opacity: 0,
          animation: "fadeIn 2.6s ease-in both"
        })
        $('.section-title').toggleClass('active');
      }
      x = 1
    }
  });
}

function scrollAwards() {
  let x = 0
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('.studies-section').height() + $('#intro-home-section').height()
    if (scroll > ihs) {
      if (x === 0) {
        $('#award1').css({
          animation: "fadeIn 0.0s ease-in both"
        })
        $('#award2').css({
          animation: "fadeIn 0.0s ease-in both"
        })
        $('#award3').css({
          animation: "fadeIn 0.0s ease-in both"
        })
        $('#award4').css({
          animation: "fadeIn 0.0s ease-in both"
        })
        $('#award5').css({
          animation: "fadeIn 0.0s ease-in both"
        })
        $('#awardEmpty1').css({
          animation: "fadeIn 0.0s ease-in both"
        })
        $('#awardEmpty2').css({
          animation: "fadeIn 0.0s ease-in both"
        })
        $('.awards-title-main').toggleClass('active');
      }
      x = 1
    }
  });
}

function scrollNews() {
  let x = 0
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    let ihs = $('.awards-section').height() + $('.studies-section').height() + $('#intro-home-section').height()
    if (scroll > ihs) {
      if (x === 0) {
        /*$('.newsSlide1').css({
          transform: "translateZ(-50%)"
        })
        $('.newsSlide2').css({
          animation: "slide 0.5s forwards"
        })*/
        $('.news-title').toggleClass('active');
      }
      x = 1
    }
  });
}

scrollStudies();
scrollAwards();
scrollNews();

window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);