/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $('#tweet-button').on('submit', onSubmit)

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

  const data = $(this).serialize();

  if (data === "text=" || data === null) {
    alert("You need to hum something!");
  } else if (data.length > 145) {
    alert("You're humming too much!");
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
    <section class="tweet-article">
  <article>
    <header class="article-header">
      <span><img src="${escape(data.user.avatars)}"> ${escape(data.user.name)}</span>
      <span class="article-username"><strong>${escape(data.user.handle)}</strong></span>
    </header>
    <span class="article-sentence">${escape(data.content.text)}</span>
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
  <p>
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