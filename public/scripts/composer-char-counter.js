$(document).ready(function() {
  // listen for textbox input
  // determine if adding or removing character
  $('#txtbox').on('input', function() {
    // get value of text area characters - using .length
    const $txtlength = $(this).val().length;

    // have max value count down one at a time
    const maxCharCount = 140 - $txtlength;

    // html counter displays the changing value
    const $counter = $(this).siblings('.submit-and-counter').find('.counter').html(maxCharCount);

    //if maxcharcount goes below 0 - add class - make the shit read
    //if maxcharcount goes above 0 - remove class - put colour back
    if (maxCharCount < 0) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }

    
  });
});



//addclass and removeclass