$(document).ready(function () {
  console.log("Hello World")
  $('#tweet-text').on("input", function () {
    const value = $(this).val().length;
    let counter = $(this).siblings().children()[1];
    $(counter).text(140 - value)
    if (value > 140) {
      $(counter).addClass('negative')
    } else {
      $(counter).removeClass('negative')
    }
  })
});