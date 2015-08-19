$(function(){
 var dataset = []
 var w = .8 * ($(window).width());
 var h = 500;
 var barPadding = 2;
 var svg = d3.select(".before-tweet-list").append("svg").attr("width",w).attr("height",h);
 var search_terms;

 var colors = d3.scale.linear()
    .domain([0,468])
    .range(['#FF6138','#00A388']);
 var tempOpacity = 0;

 var people_searched = {}

 var formatTime = d3.time.format("%e %B");


var div = d3.select(".before-tweet-list").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
 // console.log(twitter_result);

 twitter_result.forEach(function(person) {
   var array = []
   console.log(person)
   people_searched[person.term] = array;
   person.tweets.statuses.forEach(function(tweet) {
       array.push({retweet_count: tweet.retweet_count,
       followers: tweet.user.followers_count,
       sentiment_score: tweet.sentiment.score,
       text: tweet.text,
       url: 'url'
     });
   });

   // i++;
   });
 // });
 dataset = people_searched["Hillary Clinton"];
   console.log("people_searched",people_searched)
 $(".before-tweet-list").append("Hillary Clinton");

var retweet_count_by_term = [];

dataset.forEach(function(tweet){
  retweet_count_by_term.push(tweet.retweet_count);
})

var yScale = d3.scale.linear()
        .domain([0, d3.max(retweet_count_by_term)])
        .range([0, (h-30)]);

var xScale = d3.scale.ordinal()
        .domain(d3.range(0,dataset.length))
        .rangeBands([0, w])

 console.log('max data', d3.max(retweet_count_by_term))
 console.log(dataset.length)

var barGraph = function(dataset){
 svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d,i){
     return xScale(i);
    })
    .attr("y", function(d){
     return h;
    }).on("mouseover", function(d){
      tempOpacity = d3.select(this).attr('opacity');
      d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity",1)
      div.transition()
          .duration(200)
          .style("opacity", .8);
      div.html('<i class="fa fa-twitter"></i> ' + d.text)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 80) + "px");
      }).on("mouseout", function(d) {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('opacity',tempOpacity)
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
    .transition()
    .delay(100)
    .duration(1000)
    .attr("width", xScale.rangeBand())
    .attr("height", function(d){
     return yScale(4);
    })
    .attr("fill", function(d){
      if(d.sentiment_score === 0) {
        return "#ffffff";
      }
       else if (d.sentiment_score < 2) {
         return "#FF6138";
       } else {
         return "#00A388";
       }
    })
     .attr("opacity",function(d){
      if (d.sentiment_score === 0) {
        return .8;
      } else if (d.sentiment_score < 0) {
         return (Math.abs(d.sentiment_score) + 2) * .1;
      } else {
         return (d.sentiment_score + 1) * .1;
      }})
     .attr("height", function(d,i){
       return yScale(d.retweet_count);})
     .attr("y", function(d,i){
       console.log("retweet count",d.retweet_count)
       return h - yScale(d.retweet_count);})
     .attr("stroke","#777");

    //  .append("svg:title")
    // .text(function(d) {
    //   return d.text;
    // });


 svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d){
   return d.retweet_count;
  }).attr("x", function(d, i) {
       return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;;
  })
  .attr("y", function(d) {
       return h - yScale(d.retweet_count) - 5;
  }).attr("fill", "#777777")
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
// var plotDiagram = function(datasetPlot) {
// var dots = svg.selectAll("circle").data(datasetPlot).enter().append("circle");

//  dots.attr("cx", function(d) {
//        return d[0];
//   }).attr("cy", function(d) {
//        return d[1] + 50;
//   }).attr("r", function(d){
//    // console.log(Math.sqrt(h - d[1]));
//    return Math.sqrt(d[0]);
//   }).attr("fill", function(d){
//      if (d.sentiment_score < 2) {
//        return "#FF6138";
//      } else {
//        return "#00A388";
//      }
//     })
//     .attr("opacity",function(d){
//      if (d.sentiment_score < 2) {
//        return (d.sentiment_score + 10) * .1;
//      } else {
//        return (d.sentiment_score) * .9;
//      }
//     });
// }
barGraph(dataset)


// for (key in people_searched) {
//  barGraph(people_searched["Jeb Bush"]);
 // people_searched["Jeb Bush"].forEach(function(tweet){

 // var yScale = d3.scale.linear()
        // .domain([0, d3.max(people_searched["Jeb Bush"].retweet_count)]);
 // datasetPlot.push([tweet.retweet_count,tweet.sentiment_score]);

 // })
 // plotDiagram(datasetPlot)
// }

// end
});