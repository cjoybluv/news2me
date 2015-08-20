var db = require('../../models');
var async = require('async');

var channelId = 1;

// get searchterms for channel conv to Array, & image_urls
db.searchterm.findAll({
  where:{channelId: channelId}
}).then(function(terms){

  async.eachSeries(terms,function(term,callback1){
    // do something asynchronous here
    console.log('callback1 before',callback1);
    db.tweet.findAll({
      where:{search_term: term.term}
    }).then(function(tweets){
      async.eachSeries(tweets,function(tweet,callback2){
        tweet.searchtermId = term.id;
        tweet.save();
        callback2(null,tweet);
      }, function(err){
        console.log('tweet save err',err);
        callback2(err,tweet);
      });
      callback1(null,term);
    });
  }, function(err) {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log('done with everything');
    callback1(err,terms);
=======
    // console.log('done with everything');
    // callback1(err,terms);
>>>>>>> 9a91f405ec73cb22b6ba5002a9139f133b6d6ebd
=======
    // console.log('done with everything');
    // callback1(err,terms);
=======
    console.log('done with everything');
    callback1(err,terms);
>>>>>>> cherylafitz-master
>>>>>>> d47ff55a8774fe5e13c387adcd07adc0f34dfa17
  });
  console.log('after loop');
});
