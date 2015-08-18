var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');
var sentiment = require('sentiment');

router.get('/', function(req,res){
 	// res.send('hello');
	  var client = new Twitter({
         consumer_key: process.env.TWITTR_CONSUMER_KEY,
         consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
         access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
         access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
		});

   var defaultChannel = 'presidentElect2016';
   // var defaultChannel = 'earthChanges';

   db.channel.find({
      where:{
        name: defaultChannel
      }
    }).then(function(channel){
      var result = channel.get().search_terms.split('///').map(function(term){
        // return '@'+term.replace(/ /gi, '').toLowerCase()});
        return term.toLowerCase()});


      console.log('@array',result);
      // // do something with this result HERE!!! like...

       var searchTerms = result;

       async.map(searchTerms, function(searchTerm, callback1) {
        console.log("Searching for tweets on  : " + searchTerm);
        client.get('search/tweets', {'q': searchTerm + ' since:2015-01-01', 'count': 30, 'result\_type':'popular'},
           function(error, tweets, response){
             // if(error) throw error;
              // console.log(tweets);  // The favorites.
              callback1(null,{
                  term:searchTerm,
                  tweets:tweets
              });

           });
       }, function(err,result) {
           // console.log(result);
           // res.render('twitter/index', {result: result});

           // // load record w/ sentiment stuff
           // result.forEach(function(search_term){
           async.map(result,function(search_term,callback2){
              var tweets = search_term.tweets.statuses

              async.map(tweets,function(thisTweet,callback3){

                var words = {'word':0};
                var tweetSentiment = sentiment(thisTweet.text,words);

                db.tweet.findOrCreate({
                  where:{tweet_id:thisTweet.id.toString()},
                  defaults:{
                    tweet_id: thisTweet.id.toString(),
                    tweet_created_at: new Date(thisTweet.created_at),
                    tweet_text: thisTweet.text,
                    tweet_source: thisTweet.source,
                    user_name: thisTweet.user.name,
                    user_url: thisTweet.user.url,
                    retweet_count: thisTweet.retweet_count,
                    favorite_count: thisTweet.favorite_count,
                    search_term: search_term.term,
                    sentiment_score: tweetSentiment.score,
                    sentiment_comparative: tweetSentiment.comparative,
                    sentiment_negative: tweetSentiment.negative.toString(),
                    sentiment_positive: tweetSentiment.positive.toString(),
                    channelId: channel.id,
                    follower_count: thisTweet.user.followers_count
                  }
                }).spread(function(tweet, created) {
                  console.log('tweet created',tweet);
                  callback3(null,tweet);
                }).catch(function(error) {
                  console.log('ERROR - creating tweet',error);
                  callback3('Error - creating tweet',error);
                });
              }, function(err) {
                // console.log('done with everything');
               console.log(search_term.term);
               console.log(search_term.tweets.statuses.length);
               console.log(search_term.tweets.statuses[0].text);
               console.log(search_term.tweets.statuses[0].created_at);
               console.log('-----');
               callback2(null,search_term.term);

              });
              console.log('after loop');


              // tweets.forEach(function(tweet) {
              //   db.tweet.findOrCreate({
              //     where:{tweet_id:tweet.id},
              //     defaults:{
              //       tweet_id: tweet.id,
              //       tweet_created_at: new Date(tweet.created_at),
              //       tweet_text: tweet.text,
              //       tweet_source: tweet.source,
              //       user_name: tweet.user.name,
              //       user_url: tweet.user.url,
              //       retweet_count: tweet.retweet_count,
              //       favorite_count: tweet.favorite_count,
              //       search_term: search_term.term
              //     }
              //   }).spread(function(tweet, created) {
              //     console.log('tweet created',tweet);
              //   }).catch(function(error) {
              //     console.log('ERROR - creating tweet',tweet);
              //   });
              // });


            });
           res.send(result);

           });
          console.log("DONE WITH EVERYTHING");
       });


  });



//check limit on API
// client.get('application/rate_limit_status', function(error, limit, response){
//   if(error) throw error;
//   // console.log(response);  // Raw response object.
// 	res.send(limit)
// 	});

module.exports = router;

