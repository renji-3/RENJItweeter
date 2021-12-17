/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function() {

  const renderTweets = function(tweetDB) {
    $('#tweets-container').empty(); //empty text box after tweet is sent

    for (let tweet of tweetDB) { //go thru tweet database
      let $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement); //prepend tweets to the tweets container
    }
  };

  const createTweetElement = function(tweets) { //create tweets based on this template
    const date = timeago.format(tweets.created_at);
    const $tweet = `
    <article> 
  <header class='nameNLogo'>
    <div class='ATLA'>
     <img class='pic' src=${tweets.user.avatars}>
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
      <i class="inters fas fa-bookmark"></i>
      <i class="inters fas fa-heart"></i>
      <i class="inters fas fa-retweet"></i>
    </div>
  </footer>
</article>`;

    return $tweet;
  };

  $('.buildTweet').submit(function(e) { // pressing the tweet button
    e.preventDefault();
    const serializedData = $(this).serialize(); 
    
    $('#tweetTooShort').slideUp(); //remove error messages
    $('#tweetTooLong').slideUp();

    if ($('#txtbox').val().length < 1) { //cause for empty box error
      return $('#tweetTooShort').slideDown();

    } else if ($('#txtbox').val().length > 140) { //cause for exceeding character limit error
      return $('#tweetTooLong').slideDown();

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
    
    $('#txtbox').val(''); //empty the textbook
    $('.counter').val(140); //reset counter to 140
  });

  const loadTweets = function() { //load tweets
    $.ajax('/tweets', { method: 'GET' })
      .then(function(moreTweets) {
        console.log('Success: ', moreTweets);
        renderTweets(moreTweets);
      });
  };

  const escape = function(str) { // prevents xss attacks
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();

});


