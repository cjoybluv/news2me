var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');


  // res.send('hello');
    var client = new Twitter({
      consumer_key: process.env.TWITTR_CONSUMER_KEY,
      consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
      access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
    });

  client.get('search/tweets', {'q':' hillary  since:2015-08-01', 'count': 50, 'result\_type':'popular'},
    function(error, tweets, response){
      if(error) throw error;
       console.log(tweets.statuses[0]);  // The favorites.
      // console.log(response);  // Raw response object.

      // res.render('twitter/index', {tweets: tweets})

  });


 router.get('/', function(req,res){
  // res.send('hello');

client.get('search/tweets', {'q':' hillary or trump  since:2015-08-01', 'count': 10, 'result\_type':'popular'}, function(error, tweets, response){
  if(error) throw error;
  //  console.log(tweets);  // The favorites.
  // console.log(response);  // Raw response object.

  res.render('twitter/index', {tweets: tweets})
  // res.render('twitter', {tweets: tweets})
});
//check limit on API
// client.get('application/rate_limit_status', function(error, limit, response){
//   if(error) throw error;
//   // console.log(response);  // Raw response object.
//  res.send(limit)
//  });
 // db.channel.find({
  // var defaultChannel = 'presidentElect2016';
 //    where:{
 //      name: defaultChannel
 //    }
 //  }).then(function(channel){
 //    var result = channel.get().search_terms.split('///').map(function(term){
 //      return '@'+term.replace(/ /gi, '').toLowerCase()});


 //    console.log('@array',result);
 //    // // do something with this result HERE!!! like...
 //    res.render('twitter/index', {
 //      channel_name: channel.get().name,
 //      search_terms: result
 //    });
 //  });

});

module.exports = router;