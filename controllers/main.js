var db = require('../models');
var express = require('express');
var async = require('async');
var router = express.Router();

// console.log('made it to router')


router.get("/", function(req, res) {
  // var defaultChannel = 'presidentElect2016';
  // var defaultChannel = 'earthChanges';
  // var defaultChannel = '@presidentialCandidates';
  if (!req.session.currentChannel) {
    req.session.currentChannel = 1;
  }

  db.channel.find({
    where:{id:req.session.currentChannel},
    include:[db.searchterm]
  }).then(function(thisChannel){
      var channelMetrics = [];
      var topTweets = [];

      thisChannel.getSearchterms().then(function(searchTerms) {

      // console.log('pre async',searchTerms.length);

      async.map(searchTerms,function(term,callback1){
        // do something asynchronous here
        var termMetric = {};
        termMetric.id = term.id;
        termMetric.term = term.term;
        termMetric.image_url = term.image_url;

        db.tweet.findAll({
          where:{search_term: term.term},
          order:[['tweet_created_at','DESC']],
          limit: 15,
          include:[db.searchterm]
        }).then(function(tweets){

          termMetric.retweet_total = tweets.reduce(function(a,b){
            return a + b.retweet_count;
          },0);
          termMetric.favorite_total = tweets.reduce(function(a,b){
            return a + b.favorite_count;
          },0);
          var sentiment_avg = tweets.reduce(function(a,b){
               return a + b.sentiment_score;
          },0);
          if (tweets.length) {
            var nonZeroCnt = 0;
            for(var i = 0;i<tweets.length;i++) {
              if (tweets[i].sentiment_score != 0) {
                nonZeroCnt +=1;
              }
            }
            if (nonZeroCnt != 0) {
              sentiment_avg = parseInt(sentiment_avg/nonZeroCnt);
            } else {
              sentiment_avg = 0;
            }
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

        res.render('main/index', {
          channel: thisChannel,
          search_terms: searchTerms,
          channelMetrics: metrics
          // topTweets: topTweets
        });
      });

    });
  });
});

//GET /restricted
//an example restricted page
router.get('/restricted',function(req,res){
  if(req.currentUser){
    res.render('main/restricted');
  } else {
    res.redirect('/');
  }
});

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