var db = require('../models');


var term = 'portland';
if (term[0]==='@' || term[0] === '#') {
  term = term.slice(1,term.length);
}
console.log(term);


// hello

// db.channel.find({
//   where:{id:1},
//   include:[db.user]
// }).then(function(thisChannel){
//   console.log(thisChannel.getUser().id);
// });

// // create 1st search_term
// db.channel.findById(1).then(function(channel){
//   channel.createSearchterm({
//     term: 'Jeb Bush',
//     image_url: 'https://pbs.twimg.com/profile_images/591000793303547905/eu1KYXqx_400x400.jpg'
//   }).then(function(searchterm){
//     console.log(searchterm);
//   });
// });

// db.searchterm.findById(1).then(function(thisTerm){
//   // console.log(thisTerm.getTweets().length);
//   thisTerm.getTweets().then(function(tweets) {
//     console.log(tweets.length);
//   })
// });

// db.channel.findById(1).then(function(thisChannel){
//   // console.log(thisTerm.getTweets().length);
//   thisChannel.getSearchterms().then(function(searchTerms) {
//     console.log(searchTerms.length);
//   });
// });




// // 1st tweet create
// var id = 632341131301359600;
// db.tweet.findOrCreate({
//   where:{tweet_id:id.toString()},
//   defaults:{
//     tweet_id: id.toString(),
//     tweet_created_at: new Date("Mon Aug 17 19:24:03 +0000 2015"),
//     tweet_text: "Jeb Bush is just as bad for women as Donald Trump. http://t.co/2W2YOpeQz",
//     tweet_source: '<a href="https://about.twitter.com/products/tweetdeck" rel="nofollow">TweetDeck</a>',
//     user_name: "The Democrats",
//     user_url: "http://t.co/Bya9RDk",
//     retweet_count: 182,
//     favorite_count: 131,
//     search_term: "Jeb Bush"
//   }
// }).spread(function(tweet, created) {
//   console.log('tweet created',tweet);
// }).catch(function(error) {
//   console.log('ERROR - creating tweet',tweet);
// });


// db.user.create({ email: 'cjoybluv@gmail.com', password: 'wafflesNow', name: 'Dave' })
//   .then(function(data) {
//       console.log('<<<  USER CREATED >>>');
//   });



// INIT CHANNEL
// var searchTerms = [
//   "Jeb Bush",
//   "Ben Carson",
//   "Chris Christie",
//   "Ted Cruz",
//   "Carly Fiorina",
//   "Jim Gilmore",
//   "Lindsey Graham",
//   "Mike Huckabee",
//   "Bobby Jindal",
//   "John Kasich",
//   "Rand Paul",
//   "George Pataki",
//   "Rick Perry",
//   "Marco Rubio",
//   "Rick Santorum",
//   "Donald Trump",
//   "Scott Walker",
//   "Hillary Clinton",
//   "Martin O'Malley",
//   "Bernie Sanders",
//   "Lincoln Chafee",
//   "Jim Webb"
// ];

// var strTerms = searchTerms.toString().replace(/,/gi,'///');

// // console.log('str_terms',strTerms);
// db.channel.findById(1).then(function(channel) {
//   channel.search_terms = strTerms;
//   channel.save();
// });
//   END INIT CHANNEL

// // INIT channel.termImageUrl
// var termImageUrls = [
//   "https://pbs.twimg.com/profile_images/591000793303547905/eu1KYXqx_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/572756176442388480/che-Fiex_400x400.jpeg",
//   "https://pbs.twimg.com/profile_images/614760759965265920/8ahsjx48_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/478888071518093312/Rdiy3UhY_400x400.jpeg",
//   "https://pbs.twimg.com/profile_images/595179129013538816/weoj-HQY_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/563729300243763202/n-4m6sLC_400x400.jpeg",
//   "https://pbs.twimg.com/profile_images/2167513251/LG_Testifying2_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/595604836667691008/34kTwIqb_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/626079151460450304/1k_c5vMg_400x400.png",
//   "https://pbs.twimg.com/profile_images/1965906561/2FA7_1.11_John_Kasich_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/378800000172093378/1fdc56b3070dfe288553f20ebb49e92a_400x400.jpeg",
//   "https://pbs.twimg.com/profile_images/603934306193383424/wbiabKhJ_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/467390551830970368/80rkMI5v_400x400.jpeg",
//   "https://pbs.twimg.com/profile_images/588332605969342464/l3r5Akro_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/583694454915076096/YEhBSmOi_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/611918888872226817/AQ401NFI_400x400.png",
//   "https://pbs.twimg.com/profile_images/633311764214587392/8BNvFIAO_400x400.png",
//   "https://pbs.twimg.com/profile_images/623344834401685504/PrYH3-HB_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/621424033700052992/qNHXgcpM_400x400.png",
//   "https://pbs.twimg.com/profile_images/378800000433899667/8238019d8e6e4b2117a79850576e5069_400x400.jpeg",
//   "https://pbs.twimg.com/profile_images/603792003298656258/uAchir_7_400x400.jpg"
// ];

// var strUrls = termImageUrls.toString().replace(/,/gi,'///');

// db.channel.findById(1).then(function(channel) {
//   channel.termImageUrl = strUrls;
//   channel.save();
// });
// // END INIT CHANNEL

// var termImageUrls = [
//   "https://pbs.twimg.com/profile_images/633318704818683904/aSE7bGdi_400x400.png",
//   "https://pbs.twimg.com/media/CMm3ZNMWoAAPjbX.jpg",
//   "https://pbs.twimg.com/profile_images/824835461/pic-volcano_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/824835461/pic-volcano_400x400.jpg",
//   "https://pbs.twimg.com/profile_images/2629080684/b164f1486c1bc10172ad18712d0abe7b_400x400.png",
//   "https://pbs.twimg.com/profile_images/1061306948/icon-tsunami_400x400.gif",
//   "https://pbs.twimg.com/profile_images/569235246839631872/LTY0HWMd_400x400.jpeg",
//   "https://pbs.twimg.com/profile_images/486539514010013696/nwAvlZ0v_400x400.png"
//   ];

// var strUrls = termImageUrls.toString().replace(/,/gi,'///');
// console.log('strUrls',strUrls);
// db.channel.findById(3).then(function(channel) {
//   channel.termImageUrl = strUrls;
//   channel.save();
// });
//   // END INIT CHANNEL




// db.channel.create({ name: 'presidentElect2016', search_terms: search_terms })
//   .then(function(data) {
//       console.log('<<<  CHANNEL CREATED >>>');
//   });

 // db.user.findOrCreate({where: {name: "Dave"}}).spread(function(user, created) {
//   user.createPost({email: "cjoybluv@gmail.com", password: "pargolf72", name: "Dave"}).then(function(uer) {
//     console.log(post.get());
//   })
// });
