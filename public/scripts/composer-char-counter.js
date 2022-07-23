$(document).ready(function () {

  $('#tweet-text').on("input", onInput)

});

// Function responsible for character counter.
const onInput = function (event) {
  const value = $(this).val().length;
  let counter = $(this).siblings().children()[1];
  $(counter).text(140 - value)
  
  if (value > 140) {
    return $(counter).addClass('negative')
  }
    $(counter).removeClass('negative')
};