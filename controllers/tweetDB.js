var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req,res){

  db.channel.findAll().then(function(channels){
    db.tweet.findAll({include:[db.channel]}).then(function(tweets){
      res.render('tweetdb/index', {
        tweets: tweets,
        channels: channels
      });
    });

  });


});



//check limit on API
// client.get('application/rate_limit_status', function(error, limit, response){
//   if(error) throw error;
//   // console.log(response);  // Raw response object.
//  res.send(limit)
//  });

module.exports = router;

