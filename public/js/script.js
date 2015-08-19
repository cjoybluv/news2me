$(function(){


  $('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
  })




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
     })
     .attr("fill", function(d) {
      return "rgb(" + (d) + ", " + (d * 5) + " , " + (d * 10) + ")";})
     .transition().attr("height", function(d){
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

// images

var thumbnails = {"chafee":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/chafee-square-150.jpg",
"clinton":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/clinton-square-150.jpg",
"omalley":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/omalley-square-150.jpg",
"sanders":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/sanders-square-150.jpg",
"webb":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/webb-square-150.jpg",
"biden":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/biden-square-150.jpg",
"warren":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/warren-square-150.jpg",
"bush":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/bush-square-150.jpg",
"carson":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/carson-square-150.jpg",
"christie":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/christie-square-150.jpg",
"cruz":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/cruz-square-150.jpg",
"fiorina":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/fiorina-square-150.jpg",
"gilmore":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/gilmore-square-150.jpg",
"graham":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/graham-square-150.jpg",
"huckabee":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/huckabee-square-150.jpg",
"jindal":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/jindal-square-150.jpg",
"kasich":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/kasich-square-150.jpg",
"pataki":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/pataki-square-150.jpg",
"paul":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/paul-square-150.jpg",
"perry":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/perry-square-150.jpg",
"rubio":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/rubio-square-150.jpg",
"santorum":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/santorum-square-150.jpg",
"trump":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/trump-square-150.jpg",
"walker":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/walker-square-150.jpg",
"romney":"http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/romney-square-150.jpg"}


for (key in thumbnails) {
  var image = $("." + key);
 // console.log(image.attr('src'));
  image.attr("src",thumbnails[key])
}










//  // end




});