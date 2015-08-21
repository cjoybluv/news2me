var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');
var sentiment = require('sentiment');

router.get('/', function(req,res){
  // db.channel.findAll().then(function(channels){
  //   res.render('channels/index',{
  //     channels: channels
  //   });

  // });
  db.channel.findAll().then(function(channels){
      // res.send(channels)
      var array = [];
      var newArray = []
      channels.forEach(function(data){
        // dh push full channel rec so se have id
        array.push(data);
      })

      var counts = {}, ids = {};
      array.forEach(function(item) {
        if (counts[item]) {
          counts[item.name] += 1;
        } else {
          counts[item.name] = 1;
          // build parallel object to counts to hold 1st Id of each unique channel.name
          ids[item.name] = item.id;
        }
      });

      // DH 8/20 1:24P pass channel.id for deleteBtn
      for (var key in counts){
        newArray.push({
          name: key,
          id: ids[key],
          count: counts[key]
        });
      }

      newArray.sort(function(a,b){
        return b.count - a.count
      })
      newArray = newArray.slice(0,5)
        // res.send(newArray)
         res.render('channels/index', {newArray: newArray,
         channels: channels,
         currentUser: req.currentUser,
         currentChannel: req.session.currentChannel});
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
                  if (tweets.statuses[0].entities.media && tweets.statuses[0].entities.media.length > 0){
                    image = tweets.statuses[0].entities.media[0].media_url_https + ':large'
                  }
                // if (req.body.image_url !== ''){
                //   if (tweets.statuses[0].entities.media && tweets.statuses[0].entities.media.length > 0){
                //     image = tweets.statuses[0].entities.media[0].media_url_https + ':large'
                //   }
                // }
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
                      tweet.searchtermId = termId
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


// DELETE SEARCHTERM
router.get('/:id/terms/:termId/delete', function(req,res) {
  db.searchterm.destroy({
    where:{id:req.params.termId}
  }).then(function(result){
    // search term detroyed
    res.redirect('/channels/'+req.params.id+'/terms/new');
  });
})


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

      // console.log('pre async',searchTerms.length);

      async.map(searchTerms,function(term,callback1){
        // do something asynchronous here
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

          // var tweetTotal = topTweets.push(tweets);
          callback1(null,{
            channelMetrics: channelMetrics
            // topTweets: topTweets
          });
        });
      }, function(err,results) {
        var channelMetrics = results[0].channelMetrics;
        var metrics = channelMetrics.sort(retweet_sort);
        // var topTweets = results[0].topTweets;

        // console.log('done with everything',channelMetrics);
        // res.send(topTweets);

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
