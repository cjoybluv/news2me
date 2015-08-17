$(function(){

  // D3
  var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
  var w = 500;
  var h = 500;
  var barPadding = 1;
  var svg = d3.select(".d3-body").append("svg").attr("width",w).attr("height",h);
  // var circles = svg.selectAll("circle").data(dataset).enter().append("circle");

  // circles.attr("cx", function(d,i){
  //     return (i * 50) + 25;
  //   }).attr("cy", h/4).attr("r", function(d){
  //     return d;
  //   }).attr("class", "circle");

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
    .delay(100)
    .duration(1000)
     .attr("width", w / dataset.length - barPadding)
     .attr("height", function(d){
      return 4;
     }).attr("fill", function(d) {
    return "rgb(" + (d) + ", " + (d * 5) + " , " + (d * 10) + ")";
    }).transition().attr("height", function(d){
      return d * 4;
     }).attr("y", function(d){
      return h - (d * 4);
     });

  svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d){
    return d;
   }).attr("x", function(d, i) {
        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;;
   })
   .attr("y", function(d) {
        return h - (d * 4) + 15;
   }).attr("fill", "white")
   .attr("text-anchor", "middle");


var datasetPlot = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];
var dots = svg.selectAll("circle").data(datasetPlot).enter().append("circle");

  dots.attr("cx", function(d) {
        return d[0];
   }).attr("cy", function(d) {
        return d[1];
   }).attr("r", function(d){
    // console.log(Math.sqrt(h - d[1]));
    return Math.sqrt(d[1]);
   });

//  // end
});