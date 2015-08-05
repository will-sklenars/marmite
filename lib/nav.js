var $ = require('jquery')

$(document).ready(function () {
  $('.open_nav').on('click', function () {
    $('nav').animate({
      top: 0
    });
     $('.open_nav').fadeOut('fast')
  });

  $('.close_nav').on('click', function () {
    $('nav').animate({
      top: '-250px'
    });
    $('.open_nav').fadeIn('slow')
  });
});
