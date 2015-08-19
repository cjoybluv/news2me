var db = require('../../models');


db.tweet.findAll({
  where:{search_term: 'Jeb Bush'}
}).then(function(tweets){
  console.log(tweets[0].retweet_count);
  var retweet_total = tweets.reduce(function(a,b){
    return a + b.retweet_count;
    // console.log('a',a,'b',b);
    // return true;
  },0);
  console.log('retweet_total',retweet_total);
});
