

var hashTags = function(tweet) {
  var result = [];
  if (tweet.indexOf('#') !== -1) {
    for (var i=0;tweet.length>0 && i<tweet.length;i++) {
      var endPt = tweet.indexOf(' ',tweet.indexOf('#'));
      if (endPt === -1) {
        endPt = tweet.length;
      }
      var r = result.push(tweet.substring(tweet.indexOf('#'),endPt).toLowerCase());
      tweet = tweet.slice(endPt+1);
      if (tweet.indexOf('#') === -1) {
        tweet = '';
      }
    }
  }
  return result;
};

var atTags = function(tweet) {
  var result = [];
  if (tweet.indexOf('@') !== -1) {
    for (var i=0;tweet.length>0 && i<tweet.length;i++) {
      var endPt = tweet.indexOf(' ',tweet.indexOf('@'));
      if (endPt === -1) {
        endPt = tweet.length;
      }
      var r = result.push(tweet.substring(tweet.indexOf('@'),endPt).toLowerCase());
      tweet = tweet.slice(endPt+1);
      if (tweet.indexOf('@') === -1) {
        tweet = '';
      }
    }
  }
  return result;
};


var tweetLinks = function(tweet) {
  var result = [];
  if (tweet.indexOf('http') !== -1) {
    for (var i=0;tweet.length>0 && i<tweet.length;i++) {
      var endPt = tweet.indexOf(' ',tweet.indexOf('http'));
      if (endPt === -1) {
        endPt = tweet.length;
      }
      var r = result.push(tweet.substring(tweet.indexOf('http'),endPt).toLowerCase());
      tweet = tweet.slice(endPt+1);
      if (tweet.indexOf('http') === -1) {
        tweet = '';
      }
    }
  }
  return result;
};




var tweets = [
'#Trump is "shaking the system to its core" and chosing @GovJVentura would be "ultimate independents joining forces" http://t.co/gVBAYeJnU7',

'Encuesta de CNN/ORC: Donald #Trump lidera en Iowa tras primer debate republicano http://t.co/VRLkUkotmq http://t.co/EDutV4ibMj',

'#BreakingBad star @BryanCranston weighed in on #Trump 2016 –hear what he had to say @JFKucinich @benfergusonshow #CNN http://t.co/kvg7uLjmSx',

'#Trump crossed the line from #crazy to #dangerous without missing a step. Again. https://t.co/Ags8x8MlCi',

'.@RickSantorum speaks to @ChrisCuomo from the #IowaStateFair about abortion, #Trump &amp; more. http://t.co/aCPiUbrI6O http://t.co/UXBz2PH0a3',

'WATCH: @charlescwcooke v. @AnnCoulter on #Trump. You"ve gotta see this: http://t.co/nCsuJSzdsW http://t.co/DWVDrRsUea',

'Describe #Trump in 3 emojis. http://t.co/LW3p5KzdoE',

'Nach sexist. Ausfällen will #Trump Frau als Vize? Er könnte auch etwas für die Versöhnung mit den Schwarzen tun und mit Bill Cosby antreten.',

'#Trump reacciona violentamente frente a negativa de dueños de Nacional de vender el club http://t.co/YV1AWlbu5J @nypost',

'Trump-Sanders 2016? Bernie #Sanders, like Donald #Trump, is a product of dissatisfaction with the status quo: Column http://t.co/u8f6VNdnjc'
];

var tweet = '#Trump is "shaking the system to its core" and chosing @GovJVentura would be "ultimate independents joining forces" http://t.co/gVBAYeJnU7';
// var tweet = '#Trump is "shaking the system to its core" and chosing @GovJVentura';


tweets.forEach(function(tweet) {
  console.log(tweet);
  console.log('hashTags',hashTags(tweet));
  console.log('atTags',atTags(tweet));
  console.log('links',tweetLinks(tweet));
  console.log('--------------------------------------------');
});

