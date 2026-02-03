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