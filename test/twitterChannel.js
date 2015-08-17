var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');


 router.get('/', function(req,res){
 	// res.send('hello');
	  var client = new Twitter({
		  consumer_key: 'V52R2iRmZlA3RowHVnKYRoqHE',
		  consumer_secret: 'ufZZyF9SnLBZ1mNRLHIevQaG13kC8mG4GlN8BUQ7RfvNlrj0U1',
		  access_token_key: '18682848-BrD9Z1S7ZLj7NnwkwIfE9PVsMA7TjaOJ6lGs8LxKY',
		  access_token_secret: 'VTvJ515RX5TR9sLRQH7MAcOcJl2Wdez48axmopZ9OoDfh'
		});


   db.channel.find({
    var defaultChannel = 'presidentElect2016';
      where:{
        name: defaultChannel
      }
    }).then(function(channel){
      var result = channel.get().search_terms.split('///').map(function(term){
        return '@'+term.replace(/ /gi, '').toLowerCase()});


      console.log('@array',result);
      // // do something with this result HERE!!! like...
      res.render('twitter/index', {
        channel_name: channel.get().name,
        search_terms: result
      });
    });


    client.get('search/tweets', {'q':' hillary or trump  since:2015-08-01', 'count': 10, 'result\_type':'popular'}, function(error, tweets, response){
      if(error) throw error;
      //  console.log(tweets);  // The favorites.
      // console.log(response);  // Raw response object.

    	res.render('twitter/index', {tweets: tweets})
    	// res.render('twitter', {tweets: tweets})
    });


});



//check limit on API
// client.get('application/rate_limit_status', function(error, limit, response){
//   if(error) throw error;
//   // console.log(response);  // Raw response object.
// 	res.send(limit)
// 	});

module.exports = router;