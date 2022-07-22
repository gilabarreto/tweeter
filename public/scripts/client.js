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

  const data = $(this).serialize()
  const newData = data.replace(/%20/g," ").slice(5).trim()

  if (newData === "" || newData === null) {

    $("#error").slideDown("slow", () => {
      $("#error-msg").text("You need to hum something!")
    });

  } else if (newData.length > 140) {
    console.log(newData)
    $("#error").slideDown("slow", () => {
      $("#error-msg").text("You are humming too much!")
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
    console.log("str", str)
    console.log("document", document.createTextNode(str));
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  let $tweet = `
  <section>
  <article class="tweet-article">
    <header class="article-header">
      <span><img src="${data.user.avatars}"> ${data.user.name}</span>
      <span class="article-username">${data.user.handle}</span>
    </header>
    <div class="article-sentence">${escape(data.content.text)}</div>
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