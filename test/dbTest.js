var db = require('../models');


var id = 632341131301359600;

db.tweet.findOrCreate({
  where:{tweet_id:id.toString()},
  defaults:{
    tweet_id: id.toString(),
    tweet_created_at: new Date("Mon Aug 17 19:24:03 +0000 2015"),
    tweet_text: "Jeb Bush is just as bad for women as Donald Trump. http://t.co/2W2YOpeQz",
    tweet_source: '<a href="https://about.twitter.com/products/tweetdeck" rel="nofollow">TweetDeck</a>',
    user_name: "The Democrats",
    user_url: "http://t.co/Bya9RDk",
    retweet_count: 182,
    favorite_count: 131,
    search_term: "Jeb Bush"
  }
}).spread(function(tweet, created) {
  console.log('tweet created',tweet);
}).catch(function(error) {
  console.log('ERROR - creating tweet',tweet);
});


// db.user.create({ email: 'cjoybluv@gmail.com', password: 'wafflesNow', name: 'Dave' })
//   .then(function(data) {
//       console.log('<<<  USER CREATED >>>');
//   });



// INIT CHANNEL
// var searchTerms = [
//   "Jeb Bush",
//   "Ben Carson",
//   "Chris Christie",
//   "Ted Cruz",
//   "Carly Fiorina",
//   "Jim Gilmore",
//   "Lindsey Graham",
//   "Mike Huckabee",
//   "Bobby Jindal",
//   "John Kasich",
//   "Rand Paul",
//   "George Pataki",
//   "Rick Perry",
//   "Marco Rubio",
//   "Rick Santorum",
//   "Donald Trump",
//   "Scott Walker",
//   "Hillary Clinton",
//   "Martin O'Malley",
//   "Bernie Sanders",
//   "Lincoln Chafee",
//   "Jim Webb"
// ];

// var strTerms = searchTerms.toString().replace(/,/gi,'///');

// // console.log('str_terms',strTerms);
// db.channel.findById(1).then(function(channel) {
//   channel.search_terms = strTerms;
//   channel.save();
// });
//   END INIT CHANNEL





// db.channel.create({ name: 'presidentElect2016', search_terms: search_terms })
//   .then(function(data) {
//       console.log('<<<  CHANNEL CREATED >>>');
//   });

 // db.user.findOrCreate({where: {name: "Dave"}}).spread(function(user, created) {
//   user.createPost({email: "cjoybluv@gmail.com", password: "pargolf72", name: "Dave"}).then(function(uer) {
//     console.log(post.get());
//   })
// });
