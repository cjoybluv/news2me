var db = require('../models');
var express = require('express');
var async = require('async');
var router = express.Router();

// console.log('made it to router')

router.get("/", function(req, res) {
    // console.log('hey i got it!!!!')
  var defaultChannel = 'presidentElect2016';
  // var defaultChannel = 'earthChanges';
  db.channel.find({
    where:{
      name: defaultChannel
    },
    include:[db.searchterm]
  }).then(function(thisChannel){
      var channelMetrics = [];

      thisChannel.getSearchterms().then(function(searchTerms) {

      console.log('pre async',searchTerms.length);

      async.map(searchTerms,function(term,callback1){
        // do something asynchronous here
        var termMetric = {};
        termMetric.term = term.term;

        db.tweet.findAll({
          where:{search_term: term.term}
        }).then(function(tweets){

          termMetric.retweet_total = tweets.reduce(function(a,b){
            return a + b.retweet_count;
          },0);
          termMetric.favorite_total = tweets.reduce(function(a,b){
            return a + b.favorite_count;
          },0);
          // var sentiment_avg = parseInt(tweets.reduce(function(a,b){
          //      return a + b.sentiment_score;
          // },0)/tweets.length);
          var total = channelMetrics.push(termMetric);
          callback1(null,channelMetrics);
        });
      }, function(err,channelMetrics) {
        console.log('done with everything',channelMetrics);
        // callback1(err,'something');
        // res.send(channelMetrics[0]);
        res.render('main/indexDH', {
          channel: thisChannel,
          search_terms: searchTerms,
          channelMetrics: channelMetrics[0]
        });
      });
      console.log('after loop');

      // console.log(searchTerms.length);
      // res.send(channelMetrics);

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



module.exports = router;