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

  // Function responsible for fetching tweets from the http://localhost:8080/tweets page.
  $.get('/tweets')
    .then(data => {
      renderTweets(data)
    })

};

const onSubmit = function (event) {
  event.preventDefault();

  $("#error").slideUp()
  $("#error-msg").text("")

  // Data validation before sending form to server.
  const tweetText = $("#tweet-text").val()

  // Verify if tweet is empty or null.
  if (tweetText === "" || tweetText === null) {

    $("#error").slideDown("slow", () => {
      $("#error-msg").text("You need to hum something!")
    });

    // Verify if tweet is over 140 characters.
  } else if (tweetText.length > 140) {

    $("#error").slideDown("slow", () => {
      $("#error-msg").text("You are humming too much!")

    });

  } else {

    // Serialize the form data and send it to the server as a query string.
    data = $(this).serialize()

    $.post('/tweets', data)
      .then(() => {
        $("#tweet-text").val("")
        $(".char-counter").val(140)
        loadTweets()
      })
  }
};

// Function that generates the structure for a tweet.
const createTweetElement = function (data) {

  const escape = function (str) {
    let div = document.createElement("div");
    div.append(document.createTextNode(str));
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

// Function takes in an array of tweet objects and appends each one to the #tweets-container.
const renderTweets = function (tweets) {

  const container = $('#tweets-container').empty();

  for (let tweet of tweets) {
    const element = createTweetElement(tweet)
    container.prepend(element)
  }
};