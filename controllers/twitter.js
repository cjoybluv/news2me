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
  var words = {
	  // 'dangerous': -3,
	  // 'abortion': -2,
	  // 'ultimate': 5,
	  // 'joining': 3,
	  // 'forces': 4,
	  // 'crazy': -1,
	  // 'dissatisfaction': 3,
	  // 'anncoulter': -2
	};
  db.channel.find({
     where:{
       name: defaultChannel
     }
   }).then(function(channel){
     var result = channel.get().search_terms.split('///').map(function(term){
       // return '@'+term.replace(/ /gi, '').toLowerCase()});
                return term});

     console.log('@array',result);
     // // do something with this result HERE!!! like...

      var candidates = result;

      async.map(candidates, function(candidate, callback) {
        console.log("Searching for tweets on  : " + candidate);
       client.get('search/tweets', {'q': candidate + ' since:2015-08-01', 'count': 15, 'result\_type':'popular'},
          function(error, tweets, response){
            if(error) throw error;
             // console.log(tweets);  // The favorites.

             tweets.statuses = tweets.statuses.map(function(status){
             	status.sentiment = sentiment(status.text,words);
             	return status
             });

             tweets.status = tweets.statuses.sort(function(a,b){
             	return b.retweet_count - a.retweet_count;
             });
             // console.log('sentiment', tweets.statuses)
             callback(null,{
                 term:candidate,
                 tweets:tweets
             });

          });
      }, function(err,result) {
          // console.log(result);
           // res.send({result: result});
         // res.send(result);
          res.render('twitter/index', {result: result});
          // result.forEach(function(person){
          //     console.log(person.term);
          //     console.log(person.tweets.statuses.length);
          //     console.log(person.tweets.statuses.text);
          //     console.log('-----')
          // })
            // console.log("DONE WITH EVERYTHING");
      });

   });

});

//  router.get('/', function(req,res){
//  	// res.send('hello');
// 	  var client = new Twitter({
//          consumer_key: process.env.TWITTR_CONSUMER_KEY,
//          consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
//          access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
//          access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
// 		});

//    var defaultChannel = 'presidentElect2016';

//    db.channel.find({
//       where:{
//         name: defaultChannel
//       }
//     }).then(function(channel){
//       var result = channel.get().search_terms.split('///').map(function(term){
//         // return '@'+term.replace(/ /gi, '').toLowerCase()});
// 				return term});

//       console.log('@array',result);
//       // // do something with this result HERE!!! like...

//        var candidates = result;

//        async.map(candidates, function(candidate, callback) {
//          console.log("Searching for tweets on  : " + candidate);
//          client.get('search/tweets', {'q': candidate + ' since:2015-08-01', 'count': 30, 'result\_type':'popular'},
//            function(error, tweets, response){
//              // if(error) throw error;
//               // console.log(tweets);  // The favorites.
//               callback(null,{
//                   term:candidate,
//                   tweets:tweets
//               });

//            });
//        }, function(err,result) {
//            // console.log(result);
//            // res.send(result);
//            res.render('twitter/index', {result: result});
//            result.forEach(function(person){
//                console.log(person.term);
//                console.log(person.tweets.statuses.length);
//                console.log(person.tweets.statuses.text);
//                console.log('-----')
//            })
//              console.log("DONE WITH EVERYTHING");
//        });

//     });


// });


// });


//check limit on API
// client.get('application/rate_limit_status', function(error, limit, response){
//   if(error) throw error;
//   // console.log(response);  // Raw response object.
//     res.send(limit)
//     });

module.exports = router;