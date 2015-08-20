var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');

router.get('/', function(req, res) {
  res.render('channels/index')
});

// ENTER NEW CHANNEL
router.get('/new', function(req, res) {
  if (!req.session.user) {
    req.flash('danger','You must be logged in to create a channel.');
    res.redirect('/auth/login');
  } else {
    res.render('channels/form',{
      action: 'Create',
      thisChannel: null
    });
  }
});

// CREATE CHANNEL
router.post('/new', function(req, res) {
  db.channel.create({
    name: req.body.name,
    userId: req.session.user
  }).then(function(thisChannel) {
    // res.send(thisChannel);
    res.redirect('/channels/'+thisChannel.id+'/terms/new');
  });
});

// ENTER NEW SEARCH TERM
router.get('/:id/terms/new', function(req, res) {
  // res.send(req.params.id);
  db.channel.find({
    where:{id: req.params.id},
    include:[db.searchterm]
  }).then(function(thisChannel){
    res.render('channels/newterm',{
      thisChannel: thisChannel
  });
    });
});

// CREATE SEARCHTERM
router.post('/:id/terms', function(req,res) {
	 var client = new Twitter({
         consumer_key: process.env.TWITTR_CONSUMER_KEY,
         consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
         access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
         access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
		});
  // res.send(req.body);
  db.channel.findById(req.params.id).then(function(thisChannel){
    thisChannel.createSearchterm({
      term: req.body.term,
      image_url: req.body.image_url
    }).then(function(searchterm){
    	var term = searchterm.term
    	client.get('search/tweets', {'q': term + ' since:2015-01-01', 'count': 30, 'result\_type':'popular'},
        function(error, tweets, response){
             	//res.send(tweets.statuses)
             	tweets.statuses.forEach(function(tweet){
             		 //res.send(tweet.user.profile_image_url + 'g')
             		 // db.searchterm.create({
                //       where:{channelId:req.params.id},
                //       image_url: tweet.user.profile_image_url + 'g' 
                //   }).then(function(data){
                //   	console.log(data);
                //   })


             	db.tweet.findOrCreate({
                      where:{tweet_id:tweet.id.toString(),channelId:req.params.id},
                      defaults:{
                        tweet_id: tweet.id.toString(),
                        tweet_created_at: new Date(tweet.created_at),
                        tweet_text: tweet.text,
                        tweet_source: tweet.source,
                        user_name: tweet.user.name,
                        user_url: tweet.user.url,
                        retweet_count: tweet.retweet_count,
                        favorite_count: tweet.favorite_count,
                        search_term: term,
                        channelId: req.params.id,
                        follower_count: tweet.user.followers_count,
                        searchtermId: term.id
                      }
                    }).spread(function(tweet, created) {
                      console.log('tweet created',tweet);
                      if (!created) {
                        console.log('>>>> FOUND <<<<<<< DO UPDATE',tweet);
                        tweet.retweet_count = tweet.retweet_count;
                        tweet.favorite_count = tweet.favorite_count;
                        tweet.follower_count = tweet.user.followers_count;
                        tweet.searchtermId = term.id
                        tweet.save();
                      }
                      callback3(null,tweet);
                    }).catch(function(error) {
                      console.log('ERROR - creating tweet',error);
                      callback3('Error - creating tweet',error);
                    });
             	})


        });
      res.redirect('/channels/'+thisChannel.id+'/terms/new');
    });
  });
});

// EDIT CHANNEL
//     .com/channels/##/edit
router.get('/:id/edit', function(req,res) {
  // res.send(req.params.id);
  db.channel.find({
    where:{id:req.params.id},
    include:[db.searchterm]
  }).then(function(thisChannel){
    res.render('channels/form',{
      action: 'Edit',
      thisChannel: thisChannel
    });
  });
});

// UPDATE CHANNEL
//    .com/channels/##/edit
router.post('/:id/edit', function(req,res) {
  // res.send(req.body);
  db.channel.find({
    where:{id:req.params.id},
    include:[db.searchterm]
  }).then(function(thisChannel){
    thisChannel.name = req.body.name;
    thisChannel.save();
    res.redirect('/channels/'+thisChannel.id+'/terms/new');
  });
});

  //    MSHARIF34   GET IMAGE FROM TWITTER FOR DEFAULT IMAGE_URL >> NEEDS IMPLEMENTING
  //
  // // get default term imageUrl from twitter
  // var client = new Twitter({
  //   consumer_key: process.env.TWITTR_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
  //   access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
  //   access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
  // });
  // client.get('search/tweets', {'q': term + ' since:2015-08-01', 'count': 15, 'result\_type': 'popular'},
  //   function(error, tweets, response) {
  //     if (error) throw error;
  //     var url = tweets.statuses[0].user.profile_image_url
  // });



module.exports = router;
