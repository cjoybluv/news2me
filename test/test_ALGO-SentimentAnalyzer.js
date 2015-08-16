var async = require('async');

var algorithmia = require('algorithmia');

var client = algorithmia('simK2l2LKXoLJpJCCeNOl4qsU4F1');


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


// #Trump is "shaking the system to its core" and chosing @GovJVentura would be "ultimate independents joining forces" http://t.co/gVBAYeJnU7

// Encuesta de CNN/ORC: Donald #Trump lidera en Iowa tras primer debate republicano http://t.co/VRLkUkotmq http://t.co/EDutV4ibMj

// #BreakingBad star @BryanCranston weighed in on #Trump 2016 –hear what he had to say @JFKucinich @benfergusonshow #CNN http://t.co/kvg7uLjmSx

// #Trump crossed the line from #crazy to #dangerous without missing a step. Again. https://t.co/Ags8x8MlCi

// .@RickSantorum speaks to @ChrisCuomo from the #IowaStateFair about abortion, #Trump &amp; more. http://t.co/aCPiUbrI6O http://t.co/UXBz2PH0a3

// WATCH: @charlescwcooke v. @AnnCoulter on #Trump. You've gotta see this: http://t.co/nCsuJSzdsW http://t.co/DWVDrRsUea

// Describe #Trump in 3 emojis. http://t.co/LW3p5KzdoE

// Nach sexist. Ausfällen will #Trump Frau als Vize? Er könnte auch etwas für die Versöhnung mit den Schwarzen tun und mit Bill Cosby antreten.

// #Trump reacciona violentamente frente a negativa de dueños de Nacional de vender el club http://t.co/YV1AWlbu5J @nypost

// Trump-Sanders 2016? Bernie #Sanders, like Donald #Trump, is a product of dissatisfaction with the status quo: Column http://t.co/u8f6VNdnjc


// var input = 'This is really awesome.'.toUpperCase();





// var article = 'While most of the excitement over the past week has been about Donald Trump, another insurgent candidate is threatening the supposed front-runner: Bernie Sanders, the socialist senator from Vermont whos competing with Hillary Clinton in the race for the Democratic nomination. Even more than Trump, Sanders has all the excitement within his party. As Chris Stirewalt of Fox News comments: “If Sanders can pack nearly 30,000 souls into a Portland, Ore., arena, its fair to say that he is doing even better than Trump in harnessing the outrage that animates voters, particularly older, white ones, who believe that America is truly at the abyss. And remember that both Trump and Sanders share the view that a conspiracy between business and politics is at the core of the problem.” Trump-Sanders 2016? Well, that’s doubtful. But Sanders, like Trump, is the product of dissatisfaction with the status quo'
// var article = 'Eleanor "Jean" Kops will don a cap and gown on Saturday, walk across a stage, and finally receive her college diploma -- an event thats been nearly 70 years in the making. Kops, now 87, started school in 1945, but left after two years to marry sweetheart Lyle and begin a family near her hometown of Bassett, Nebraska. "I was just kind of tired of it," she told a University of Nebraska-Lincoln news site in 2013, explaining her decision to drop out. "There wasnt a whole lot of choices for women. I was enrolled in the teachers college."'
var article = 'Now THIS is how you troll effectively.
When Target announced last week that it would be taking a gender-neutral approach to signage in its stores by no longer designating items as being for "boys" or "girls" in certain departments, like toys and bedding, people -- predictably -- freaked out.
As so often happens when a corporation makes a controversial decision these days, the retailers Facebook page became a place for people to unleash their anger about the decision.
Mike Melgaard decided to take matters into his own hands and posed as a customer service rep for Target by making a fake Facebook account called "Ask ForHelp," which featured the companys unmistakable logo. He then used the account to expertly -- and hilariously -- troll the outraged Facebook users freaking out on Targets page.'


client.algo('/nlp/SentimentAnalysis').pipe(article).then(function(output){
  console.log(article,output.result);
});

return;


// var tweetSentiment = function(tweet) {
//   client.algo('/nlp/SentimentAnalysis').pipe(tweet).then(function(output){
//     return output.result;
//   });
// };



// var tweetsSentiment = tweets.map(tweetSentiment);

// console.log(tweets, tweetsSentiment);


  // client.algo('/nlp/SentimentAnalysis').pipe('Trump-Sanders 2016? Bernie #Sanders, like Donald #Trump, is a product of dissatisfaction with the status quo: Column http://t.co/u8f6VNdnjc').then(function(output){
  //   console.log(output.result);
  // });

// var result = tweetSentiment('Trump-Sanders 2016? Bernie #Sanders, like Donald #Trump, is a product of dissatisfaction with the status quo: Column http://t.co/u8f6VNdnjc');

// console.log(result);


var tweetsSentiment = [];

async.eachSeries(tweets,function(tweet,callback){
// async.eachLimit(subs,2,function(sub,callback){
  // console.log('before request',tweet);

  client.algo('/nlp/SentimentAnalysis').pipe(tweet).then(function(output){
    var ts = [tweet,output.result];
    var result = tweetsSentiment.push(ts);
    // console.log('got data...',tweet,output.result);
    callback();
  });


}, function(err) {
  // console.log('done with everything');
  // console.log(tweetsSentiment);
  tweetsSentiment.forEach(function(ts) {
    console.log('tweet',ts[0],'nlp',ts[1]);
    console.log('----------------------------');
  });

});
console.log('after loop');





