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
  $.post('/tweets', data)
    .then(() => {
      loadTweets()
    })
};

const createTweetElement = function (data) {

  let $tweet = `
    <section class="tweet-article">
  <article>
    <header class="article-header">
      <span><img src="${data.user.avatars}"> ${data.user.name}</span>
      <span class="article-username"><strong>${data.user.handle}</strong></span>
    </header>
    <span class="article-sentence">${data.content.text}</span>
    <footer class="article-footer">
      <span class="article-counter">${timeago.format(data.created_at)}</span>
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
    container.append(element)
  }
}