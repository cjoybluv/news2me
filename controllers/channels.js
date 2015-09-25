var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');
var sentiment = require('sentiment');


// CHANNEL LIST
router.get('/', function(req,res){
  var userId = req.session.user || 0;

  db.channel.findAll({
    where: db.channel.sequelize.or({userId:userId},{userId:0}),
    order:[
      ['userId'],
      [db.channel.sequelize.fn('upper',db.channel.sequelize.col('name')), 'ASC']]
  }).then(function(channels){

    db.channel.findAll({
      include:[db.tweet]
    }).then(function(allChannels){
      var viralChannels = allChannels.map(function(channel){
        var retweetTotal = channel.tweets.sort(date_desc).splice(0,50).reduce(function(a,b){
          return a + b.retweet_count;
        },0);
        return {channel:channel,retweetTotal:retweetTotal};
      });

      console.log('viralChannels BEFORE',viralChannels);

      var viralChannels = viralChannels.sort(retweet_sort).splice(0,5);

      console.log('viralChannels AFTER',viralChannels);
      res.render('channels/index', {
        viralChannels: viralChannels,
        channels: channels,
        currentUser: req.currentUser,
        currentChannel: req.session.currentChannel
      });

    });
  });
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
      db.channel.findById(req.params.id).then(function(thisChannel){

      var term = req.body.term
      if (term[0]==='@' || term[0] === '#') {
         term = term.slice(1,term.length);
      }

      client.get('search/tweets', {'q': term + ' since:2015-01-01', 'count': 30, 'result\_type':'popular'},
        function(error, tweets, response){
          //res.send(tweets)

            db.channel.findById(req.params.id).then(function(thisChannel){
              // thisChannel.createSearchterm({
                var image = 'https://pbs.twimg.com/profile_images/378800000700003994/53d967d27656bd5941e7e1fcddf47e0b_400x400.png';
                  // if (tweets.statuses[0].entities.media && tweets.statuses[0].entities.media.length > 0){
                  if (typeof tweets.statuses[0] != 'undefined' && tweets.statuses[0].entities.media && tweets.statuses[0].entities.media.length > 0){
                    image = tweets.statuses[0].entities.media[0].media_url_https + ':large'
                  }
                if (req.body.image_url !== ''){
                  image = req.body.image_url;
                }


              db.searchterm.findOrCreate({
                where:{
                  term: req.body.term,
                  channelId: thisChannel.id
                },
                defaults:{
                  term: req.body.term,
                  image_url: image,
                  channelId: thisChannel.id
                }
              }).spread(function(searchterm, created){
                async.each(tweets.statuses,function(tweet, callback){
                  var termId = parseInt(searchterm.id);

                  var words = {'word':0};
                  var tweetSentiment = sentiment(tweet.text,words);
                  var url = tweet.user.url;
                    if (typeof tweet.entities.urls[0] != 'undefined') {
                      url = tweet.entities.urls[0].url;
                  }
                  db.tweet.findOrCreate({
                    where:{tweet_id:tweet.id.toString(),channelId:req.params.id},
                    defaults:{
                      tweet_id: tweet.id.toString(),
                      tweet_created_at: new Date(tweet.created_at),
                      tweet_text: tweet.text,
                      tweet_source: tweet.source,
                      user_name: tweet.user.name,
                      // user_url: tweet.user.url,
                      user_url: url,
                      retweet_count: tweet.retweet_count,
                      favorite_count: tweet.favorite_count,
                      search_term: term,
                      sentiment_score: tweetSentiment.score,
                      sentiment_comparative: tweetSentiment.comparative,
                      sentiment_negative: tweetSentiment.negative.toString(),
                      sentiment_positive: tweetSentiment.positive.toString(),
                      channelId: req.params.id,
                      follower_count: tweet.user.followers_count,
                      searchtermId: termId
                    }
                  }).spread(function(tweet, created) {
                    if (!created) {
                      console.log('>>>> FOUND <<<<<<< DO UPDATE',tweet);
                      tweet.retweet_count = tweet.retweet_count;
                      tweet.favorite_count = tweet.favorite_count;
                      tweet.follower_count = tweet.user.followers_count;
                      tweet.user_url = tweet.entities.urls[0].url;
                      tweet.searchtermId = termId;
                      tweet.save();
                    }
                    callback();
                  }).catch(callback); // tweet.findOrCreate({
                },function(error){
                  res.redirect('/channels/'+thisChannel.id+'/terms/new');
                  // if(error){
                  //   res.send(error);
                  // }else{
                  //   res.redirect('/channels/'+thisChannel.id+'/terms/new');
                  // }
                }); //async.each
              }); //db.searchterm.findOrCreate({
            });
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

// DELETE CHANNEL with Cascade > SearchTerms & Tweets
router.get('/:id/delete', function(req,res) {
  db.channel.destroy({
    where:{id:req.params.id}
  }).then(function(result){
    res.redirect('/channels');
  });
});

// DELETE SEARCHTERM
router.get('/:id/terms/:termId/delete', function(req,res) {
  db.searchterm.destroy({
    where:{id:req.params.termId}
  }).then(function(result){
    // search term detroyed
    res.redirect('/channels/'+req.params.id+'/terms/new');
  });
});


// channel show
router.get('/:id', function(req, res){
  if (req.params.id) {
    req.session.currentChannel = req.params.id;
    res.redirect('/');
  } else {
    var nameArray = [];
    for (var key in req.params){
      nameArray.push({
            table: key,
            name: req.params[key]
          });
    }

    db.channel.find({
      where:{
        name: nameArray[0].name
      },
      include:[db.searchterm]
    }).then(function(thisChannel){
        var channelMetrics = [];
        var topTweets = [];

        thisChannel.getSearchterms().then(function(searchTerms) {
          async.map(searchTerms,function(term,callback1){
            var termMetric = {};
            termMetric.term = term.term;
            termMetric.image_url = term.image_url;

            db.tweet.findAll({
              where:{search_term: term.term},
              order:[['tweet_created_at','DESC']],
              limit: 15
            }).then(function(tweets){

                // res.send(tweets)
              termMetric.retweet_total = tweets.reduce(function(a,b){
                return a + b.retweet_count;
              },0);
              termMetric.favorite_total = tweets.reduce(function(a,b){
                return a + b.favorite_count;
              },0);
              var sentiment_avg = tweets.reduce(function(a,b){
                   return a + b.sentiment_score;
              },0);
              if(tweets.length) {
                sentiment_avg = parseInt(sentiment_avg/tweets.length);
              }else{
                sentiment_avg = 0;
              }
              termMetric.sentiment_avg = sentiment_avg;
              termMetric.tweets = tweets.sort(date_asc);
              var total = channelMetrics.push(termMetric);

              callback1(null,{
                channelMetrics: channelMetrics
              });
            });
          }, function(err,results) {
            var channelMetrics = results[0].channelMetrics;
            var metrics = channelMetrics.sort(retweet_sort);

            res.render('popular/index', {
              channel: thisChannel,
              search_terms: searchTerms,
              channelMetrics: metrics
              // topTweets: topTweets
            });
          });

        });
    });
  }
});

function date_desc(a,b) {
  if (a.tweet_created_at > b.tweet_created_at) {
    return -1;
  }
  else if(a.tweet_created_at < b.tweet_created_at) {
    return 1;
  }
  else {
    return 0;
  }
}

function retweet_sort(a,b) {
  if (a.retweetTotal < b.retweetTotal) {
    return 1;
  }
  else if (a.retweetTotal > b.retweetTotal) {
    return -1;
  }
  else {
    return 0;
  }
}


module.exports = router;
