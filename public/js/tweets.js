$(function(){
 var dataset = []
 var w = 1000;
 var h = 500;
 var barPadding = 1;
 var svg = d3.select(".tweet-list").append("svg").attr("width",w).attr("height",h);

 console.log(twitter_result);

 twitter_result.forEach(function(person){
   // var person_tweets = {}
   console.log(person)
   // person.forEach(function(tweets){
   person.tweets.statuses.forEach(function(tweet) {
     dataset.push({
       person: person.term,
       retweet_count: tweet.retweet_count,
       followers: tweet.user.followers_count
     // })
   })

   });
   console.log(dataset)
 });


 svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d,i){
     return i * (w / dataset.length);
    })
    .attr("y", function(d){
     return h;
    }).transition()
   .delay(0)
   .duration(100)
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d){
     return 4;
    })
    .attr("fill", function(d) {
     return "rgb(" + (d) + ", " + (d * 5) + " , " + (d * 10) + ")";})
    .transition().attr("height", function(d,i){
     return d.retweet_count;
    }).attr("y", function(d,i){
     return h - (d.retweet_count);
    });

 // svg.selectAll("text")
 //  .data(dataset)
 //  .enter()
 //  .append("text")
 //  .text(function(d){
 //   return d;
 //  }).attr("x", function(d, i) {
 //       return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;;
 //  })
 //  .attr("y", function(d) {
 //       return h - (d * 4) + 15;
 //  }).attr("fill", "white")
 //  .attr("text-anchor", "middle");

// end
});