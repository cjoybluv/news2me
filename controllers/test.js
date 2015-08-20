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

   // var defaultChannel = 'presidentElect2016';
   // var defaultChannel = 'earthChanges';
   // var defaultChannel = '@presidentialCandidates';

   db.channel.find({
      where:{
        id: req.session.currentChannel
      }
    }).then(function(channel){

      db.searchterm.findAll({
        where:{
          channelId: channel.get().id
        }
      }).then(function(searchTerms){
        // res.send(searchTerms);

        async.map(searchTerms, function(searchTerm, callback1) {
          console.log("Searching for tweets on  : " + searchTerm.term);
          client.get('search/tweets', {'q': searchTerm.term + ' since:2015-01-01', 'count': 30, 'result\_type':'popular'},
             function(error, tweets, response){
               // if(error) throw error;
                // console.log(tweets);  // The favorites.
                callback1(null,{
                    termId:searchTerm.id,
                    term:searchTerm.term,
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
                      where:{tweet_id:thisTweet.id.toString(),channelId:channel.id},
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
                        follower_count: thisTweet.user.followers_count,
                        searchtermId: search_term.termId
                      }
                    }).spread(function(tweet, created) {
                      console.log('tweet created',tweet);
                      if (!created) {
                        console.log('>>>> FOUND <<<<<<< DO UPDATE',tweet);
                        tweet.retweet_count = thisTweet.retweet_count;
                        tweet.favorite_count = thisTweet.favorite_count;
                        tweet.follower_count = thisTweet.user.followers_count;
                        tweet.searchtermId = search_term.termId
                        tweet.save();
                      }
                      callback3(null,tweet);
                    }).catch(function(error) {
                      console.log('ERROR - creating tweet',error);
                      callback3('Error - creating tweet',error);
                    });

                }, function(err) {
                  // console.log('done with everything');
                 callback2(null,search_term.term);

                });
                console.log('after loop');

              });
             res.send(result);

             });
            console.log("DONE WITH EVERYTHING");
         });

      });

});



//check limit on API
// client.get('application/rate_limit_status', function(error, limit, response){
//   if(error) throw error;
//   // console.log(response);  // Raw response object.
// 	res.send(limit)
// 	});

module.exports = router;

