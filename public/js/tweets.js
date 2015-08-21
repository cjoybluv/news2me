// $(function(){

function updateTermInfo(twitter_result){

  //TODO: clear old graph



  //... code from existing tweets.js

  var dataset = [];
  var w = .8 * ($(window).width());
  var h = 300;
  var barPadding = 2;
  var svg = d3.select(".before-tweet-list").append("svg").attr("width",w).attr("height",h);

  var colors = d3.scale.linear()
    .domain([0,468])
    .range(['#FF6138','#00A388']);
  var tempOpacity = 0;

  var terms_searched = {}

  var formatTime = d3.time.format("%e %B");

  var div = d3.select(".before-tweet-list").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  var array = []
     terms_searched[twitter_result.term] = array;
     twitter_result.tweets.forEach(function(tweet) {
         array.push({retweet_count: tweet.retweet_count,
         followers: tweet.followers_count,
         sentiment_score: tweet.sentiment_score,
         text: tweet.tweet_text,
         url: 'url'
       });
     });
  dataset = terms_searched[twitter_result.term];

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
        var tooltipX = d3.event.pageX + 400 > $('body').width() ? d3.event.pageX - 350 : d3.event.pageX;
        div.html('<i class="fa fa-twitter"></i> ' + d.text + "</br><em>Sentiment score: " + d.sentiment_score + "</em>")
            .style("left", tooltipX + "px")
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
    .delay(200)
    .duration(3000)
    .attr("width", xScale.rangeBand())
    .attr("height", function(d){
     return yScale(4);
    })
    .attr("fill", function(d){
      if(d.sentiment_score === 0) {
        return "transparent";
      }
       else if (d.sentiment_score < 0) {
         return "#FF6138";
       } else {
         return "#00A388";
       }
    })
     .attr("opacity",function(d){
      if (d.sentiment_score === 0) {
        return .5;
      } else if (d.sentiment_score < 0) {
         return (Math.abs(d.sentiment_score) + 4) * .1;
      } else {
         return (d.sentiment_score + 4) * .1;
      }})
     .attr("height", function(d,i){
       return yScale(d.retweet_count);})
     .attr("y", function(d,i){
       return h - yScale(d.retweet_count);})
     .attr("stroke","#333");

     svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function(d){
       return d.retweet_count;
      }).attr("x", function(d, i) {
           return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;;
      }).attr("y", h - 10)
      .attr("id",function(d,i){
        return "number" + i
      })
      .transition()
        .delay(200)
        .duration(3000)
      .attr("y", function(d) {
           return h - yScale(d.retweet_count) - 5;
      }).attr("fill", "#333")
      .attr("text-anchor", "middle");
  }

// to be used for animating counts on leaderboard

  function animateValue(id, start, end, duration) {
      var range = end - start;
      var current = start;
      var increment = end > start? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));
      var obj = document.getElementById(id);
      var timer = setInterval(function() {
          current += increment;
          obj.innerHTML = current;
          if (current == end) {
              clearInterval(timer);
          }
      }, stepTime);
  }

// var getNumber = function()

// animateValue("number", 0, 25, 2000);

barGraph(dataset)

}
$(function() {


$(".search-items").on('click', '.search-item', function(metrics){
  console.log(this);
  var index = $(this).index();
  // updateTermInfo(metrics[index]);
});


  console.log($('.tooltip').position())
})

// end
// });