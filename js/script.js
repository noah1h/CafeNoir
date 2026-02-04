window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

$(document).ready(function () {
  const $hamburgerMenu = $('.hamburger-menu');
  const $sidebar = $('.sidebar');

  $hamburgerMenu.on('click', function () {
    if ($sidebar.is(':visible')) {
      $sidebar.stop(true, true).slideUp();
    } else {
      $sidebar.stop(true, true).slideDown();
    }
  });
});

const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 30, // spacing between cards
  slidesPerView: 1, // default for mobile
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2, // tablets
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4, // desktop
      spaceBetween: 30,
    }
  }
});

