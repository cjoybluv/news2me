var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');


router.get('/', function(req,res){
  db.channel.findAll().then(function(channels){
      // res.send(channels)
      var array = [];
      var newArray = []
      channels.forEach(function(data){
        array.push(data.name);
      })

      var counts = {};
      array.forEach(function(item) {
        if (counts[item]) {
          counts[item] += 1;
        } else {
          counts[item] = 1;
        }
      });
      for (var key in counts){
        newArray.push({
          name: key,
          count: counts[key]
        });
      }

      newArray.sort(function(a,b){
        return b.count - a.count
      })
      newArray = newArray.slice(0,5)
        // res.send(newArray)
         res.render('channels/index', {newArray: newArray});

    });
});

router.get('/:channel', function(req, res){
var nameArray = [];
for (var key in req.params){
    nameArray.push({
          table: key,
          name: req.params[key]
        });
}

  db.channel.find({
    where:{
      name: nameArray[0].name
    },
    include:[db.searchterm]
  }).then(function(thisChannel){
      var channelMetrics = [];
      var topTweets = [];
      req.session.currentChannel = thisChannel.id;

      thisChannel.getSearchterms().then(function(searchTerms) {

      // console.log('pre async',searchTerms.length);

      async.map(searchTerms,function(term,callback1){
        // do something asynchronous here
        var termMetric = {};
        termMetric.term = term.term;
        termMetric.image_url = term.image_url;

        db.tweet.findAll({
          where:{search_term: term.term},
          order:[['tweet_created_at','DESC']],
          limit: 15
        }).then(function(tweets){

            // res.send(tweets)
          termMetric.retweet_total = tweets.reduce(function(a,b){
            return a + b.retweet_count;
          },0);
          termMetric.favorite_total = tweets.reduce(function(a,b){
            return a + b.favorite_count;
          },0);
          var sentiment_avg = tweets.reduce(function(a,b){
               return a + b.sentiment_score;
          },0);
          if(tweets.length) {
            sentiment_avg = parseInt(sentiment_avg/tweets.length);
          }else{
            sentiment_avg = 0;
          }
          termMetric.sentiment_avg = sentiment_avg;
          termMetric.tweets = tweets.sort(date_asc);
          var total = channelMetrics.push(termMetric);

          // var tweetTotal = topTweets.push(tweets);
          callback1(null,{
            channelMetrics: channelMetrics
            // topTweets: topTweets
          });
        });
      }, function(err,results) {
        var channelMetrics = results[0].channelMetrics;
        var metrics = channelMetrics.sort(retweet_sort);
        // var topTweets = results[0].topTweets;

        // console.log('done with everything',channelMetrics);
        // res.send(topTweets);

        res.render('popular/index', {
          channel: thisChannel,
          search_terms: searchTerms,
          channelMetrics: metrics
          // topTweets: topTweets
        });
      });

    });
  });
})

function retweet_sort(a,b) {
  if (a.retweet_total < b.retweet_total)
    return 1;
  if (a.retweet_total > b.retweet_total)
    return -1;
  return 0;
}

function date_asc(a,b) {
  if (a.tweet_created_at < b.tweet_created_at)
    return -1;
  if(a.tweet_created_at > b.tweet_created_at)
    return 1;
  return 0;
}


module.exports = router;