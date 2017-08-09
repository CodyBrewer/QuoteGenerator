$(function() {
  var author = $('#author');
  var text = $('#quote');
  getQuote(author, text);

  $('#getQuote').click(function(event) {
    event.preventDefault();
    getQuote(author, text);
    $('#tweet').removeClass("disabled");

  })
});

function getQuote(author, text) {

  var forismaticURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"

  $.getJSON(forismaticURL, function(data) {

    text.html(data.quoteText);
    if (data.quoteAuthor) {
      author.html(data.quoteAuthor);
      author.attr("href", data.quoteLink);
    } else {
      author.removeAttr("href");
      author.html("<strong>Anonymous</strong>");
    }
    $('#tweet').click(function() {
      var tweetQuote = $("#quote").text() + $("#author").text();
        if (tweetQuote.length > 140) {
        tweetQuote = ""; 
        $(this).addClass("disabled");
   } else { window.open('https://twitter.com/intent/tweet?text="' + tweetQuote + '"', '_blank');
      };
    });
  });
}

