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
    const $tweet = `
    <article> 
  <header class='nameNLogo'>
    <div class='ATLA'>
     <img class='img' src=${tweets.user.avatars}>
      ${tweets.user.name}
    </div>
    <div class='handle'>
      ${tweets.user.handle}
    </div>
  </header> 
  <p class='tweet'>${escape(tweets.content.text)}</p>
  <footer class='footy'>
    <div class='PostTime'>
      ${date}
    </div>
    <div class='PressALike'>
      <i class="bas fas fa-bookmark"></i>
      <i class="bas fas fa-heart"></i>
      <i class="bas fas fa-retweet"></i>
    </div>
  </footer>
</article>`;

    return $tweet;
  };

  $('.sendTweet').submit(function(e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
    
    $('#tweetTooShort').slideUp();
    $('#tweetTooLong').slideUp();

    if ($('#txtbox').val().length < 1) {
      $('#tweetTooShort').slideDown();

    } else if ($('#txtbox').val().length > 140) {
      $('#tweetTooLong').slideDown();

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
    $('.counter').val(140);
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(moreTweets) {
        console.log('Success: ', moreTweets);
        renderTweets(moreTweets);
      });
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();

});


