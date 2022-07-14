/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <span class="article-counter">${data.created_at}</span>
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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {

  let result = [];

  for (let tweet of tweets) {
    result.push(createTweetElement(tweet))
  }
  return result
}

const $tweet = renderTweets(data);

$('#tweets-container').append($tweet);