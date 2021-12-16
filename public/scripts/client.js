/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function() {

  const renderTweets = function(tweetDB) {
    $('#tweets-container').empty();

    for (let tweet of tweetDB) {
      let $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
    }
  };

  const createTweetElement = function(tweets) {
    const date = timeago.format(tweets.created_at);
    const $tweet = `<article> 
  <header class='nameNLogo'>
    <div class='ATLA'>
     <img src=${tweets.user.avatars}>
      ${tweets.user.name}
    </div>
    <div class='handle'>
      ${tweets.user.handle}
    </div>
  </header> 
  <h1 class='tweet'>${tweets.content.text}</h1>
  <footer class='footy'>
    <div class='PostTime'>
      ${date}
    </div>
    <div class='PressALike'>
      <i class="fas fa-bookmark"></i>
      <i class="fas fa-heart"></i>
      <i class="fas fa-retweet"></i>
    </div>
  </footer>
</article>`;

    return $tweet;
  };

  $('.sendTweet').submit(function(e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
    if ($('#txtbox').val().length < 1) {
      alert('form cannot be empty');

    } else if ($('#txtbox').val().length > 140) {
      alert('form cannot exceed 140 characters');

    } else {
      $.ajax({
        url: "/tweets",
        type: "post",
        data: serializedData
      })
        .then(() => {
          loadTweets();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    $('#txtbox').val('');
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(moreTweets) {
        console.log('Success: ', moreTweets);
        renderTweets(moreTweets);
      });
  };

  loadTweets();

});


// if form is empty
// form cannot be empty (alert)
// else if form.length > 140
// form cannot exceed 140 characters (alert)
// prevent submission

// do not clear form
