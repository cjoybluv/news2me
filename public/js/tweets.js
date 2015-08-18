$(function(){
  var dataset = []
  var w = 800;
  var h = 500;
  var barPadding = 1;
  var svg = d3.select(".before-tweet-list").append("svg").attr("width",w).attr("height",h);
  var search_terms;

  console.log(dataset)
  var people_searched = {}

  // console.log(twitter_result);
  var i = 0;

  twitter_result.forEach(function(person) {
    var array = []
    console.log(person)
    people_searched[person.term] = array;
    person.tweets.statuses.forEach(function(tweet) {
        array.push({retweet_count: tweet.retweet_count,
        followers: tweet.user.followers_count,
        sentiment_score: tweet.sentiment.score,
        text: tweet.text
      });
    });

    i++;
    });
  // });

  // dataset = people_searched["Ben Carson"];
    console.log("people_searched",people_searched)



var barGraph = function(dataset){
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
    .delay(300)
    .duration(200)
     .attr("width", w / dataset.length - barPadding)
     .attr("height", function(d){
      return 4;
     })
     .attr("fill", function(d){
      if (d.sentiment_score < 2) {
        return "#FF6138";
      } else {
        return "#00A388";
      }
     })
      .attr("opacity",function(d){
        if (d.sentiment_score < 2) {
          return Math.abs(d.sentiment_score) * .1;
        } else {
          return (d.sentiment_score) * .1;
        }
     })
      .transition().attr("height", function(d,i){
        return d.retweet_count;})
      .attr("y", function(d,i){
        console.log("retweet count",d.retweet_count)
        return h - (d.retweet_count);
      });



  svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d){
    return d.retweet_count,d.sentiment_score;
   }).attr("x", function(d, i) {
        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;;
   })
   .attr("y", function(d) {
        return h - (d.retweet_count) + 15;
   }).attr("fill", "white")
   .attr("text-anchor", "middle");
}



var datasetPlot = [
                  // [ 5,     20 ],
                  // [ 480,   90 ],
                  // [ 250,   50 ],
                  // [ 100,   33 ],
                  // [ 330,   95 ],
                  // [ 410,   12 ],
                  // [ 475,   44 ],
                  // [ 25,    67 ],
                  // [ 85,    21 ],
                  // [ 220,   88 ]
              ];
var plotDiagram = function(datasetPlot) {
var dots = svg.selectAll("circle").data(datasetPlot).enter().append("circle");

  dots.attr("cx", function(d) {
        return d[0];
   }).attr("cy", function(d) {
        return d[1] + 50;
   }).attr("r", function(d){
    // console.log(Math.sqrt(h - d[1]));
    return Math.sqrt(d[0]);
   }).attr("fill", function(d){
      if (d.sentiment_score < 2) {
        return "#FF6138";
      } else {
        return "#00A388";
      }
     })
     .attr("opacity",function(d){
      if (d.sentiment_score < 2) {
        return (d.sentiment_score + 10) * .1;
      } else {
        return (d.sentiment_score) * .9;
      }
     });
}

  $(".before-tweet-list").append("Jeb Bush");
for (key in people_searched) {
  barGraph(people_searched["Jeb Bush"]);
  people_searched["Jeb Bush"].forEach(function(tweet){

  datasetPlot.push([tweet.retweet_count,tweet.sentiment_score]);

  })
  plotDiagram(datasetPlot)
}

// end
});