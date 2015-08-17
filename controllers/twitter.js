var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');
 

 router.get('/', function(req,res){
 	// res.send('hello');
	  var client = new Twitter({
		  consumer_kgey: process.env.TWITTR_CONSUMER_KEY,
		  consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
		  access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
		  access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
		});
		var candidates = ['Hillary Clinton', 'Donald Trump', 'Bernie Sanders'];

		async.map(candidates, function(candidate, callback) {
		  console.log("Searching for tweets on  : " + candidate);
		 client.get('search/tweets', {'q': candidate + ' since:2015-08-01', 'count': 30, 'result\_type':'popular'}, 
			function(error, tweets, response){
			  if(error) throw error;
			   // console.log(tweets);  // The favorites. 
			   callback(null,{
			   	term:candidate,
			   	tweets:tweets
			   });

			});
		}, function(err,result) {
			// console.log(result);
			 res.render('twitter/index', {result: result})
			result.forEach(function(person){
				console.log(person.term);
				console.log(person.tweets.statuses.length);
				console.log(person.tweets.statuses.text);
				console.log('-----')
			})
		  	console.log("DONE WITH EVERYTHING");
		});

});

module.exports = router;