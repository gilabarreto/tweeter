/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $('#tweet-form').on('submit', onSubmit)

  $("#error").hide()

  loadTweets()

});

const loadTweets = function () {
  $.get('/tweets')
    .then(data => {
      renderTweets(data)
    })
};

const onSubmit = function (event) {
  event.preventDefault();

  $("#error").slideUp()
  $("#error-msg").text("")

  const data = $(this).serialize();

  if (data === "text=" || data === null) {

    $("#error").slideDown("slow", () => {
      $("#error-msg").text("You need to hum something!")
    });

  } else if (data.length > 145) {

    $("#error").slideDown("slow", () => {
      $("#error-msg").text("You need to humming too much!")
    });

  } else {
    $.post('/tweets', data)
      .then(() => {
        loadTweets()
      })
  }
};

const createTweetElement = function (data) {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  let $tweet = `
  <section>
  <article class="tweet-article">
    <header class="article-header">
      <span><img src="${escape(data.user.avatars)}"> ${escape(data.user.name)}</span>
      <span class="article-username">${escape(data.user.handle)}</span>
    </header>
    <div class="article-sentence">${escape(data.content.text)}</div>
    <footer class="article-footer">
      <span class="article-counter">${escape(timeago.format(data.created_at))}</span>
      <span class="article-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  </section>
  `;

  return $tweet;

};

const renderTweets = function (tweets) {

  const container = $('#tweets-container')

  container.empty()

  for (let tweet of tweets) {
    const element = createTweetElement(tweet)
    container.prepend(element)
  }
}