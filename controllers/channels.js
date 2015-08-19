var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');


router.get('/', function(req,res){
  res.render('channels/index')
});

router.post('/', function(req, res){
  var client = new Twitter({
    consumer_key: process.env.TWITTR_CONSUMER_KEY,
    consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
    access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
  });

	var term = req.body.term

	// if(Array.isArray(term)){

	// }

 client.get('search/tweets', {'q': term + ' since:2015-08-01', 'count': 15, 'result\_type':'popular'},
          function(error, tweets, response){
            if(error) throw error;
            tweets.statuses.forEach(function(tweet){
            	var url = tweet.user.profile_image_url
			      db.channel.create({
					name: req.body.name,
					search_terms: term,
					termImageUrl: url
					}).then(function(data){
						console.log(data.search_terms)
					});
            })



          });

		 res.redirect('/channels');
});

module.exports = router;