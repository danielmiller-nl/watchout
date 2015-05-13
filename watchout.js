var radius = 20;
var width = 800;
var height = 400;

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

var gameBoard = d3.select(".container")
              .append("svg").attr("width",width).attr("height",height);

var enemyData = [];
for (var i = 0; i < 20; i++) {
  enemyData[i] = 0;
}

var svgPlayer = gameBoard.selectAll(".player")
    .data([{x: width / 2, y: height / 2}])
    .enter()
    .append("circle")
    .attr("r", radius)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("fill", "red")
    .call(drag);

var enemies = gameBoard.selectAll(".enemies")
                  .data(enemyData)
                  .enter()
                .append("circle")
                  .attr("cx", function(d) {return width * Math.random();})
                  .attr("cy", function(d) {return height * Math.random();})
                  .attr("r",radius)
                  .attr("fill","blue");

function update(){
  enemies.transition()
      .duration(500)
      .attr("cx", function(d) {return width * Math.random();})
      .attr("cy", function(d) {return height * Math.random();});
}

setInterval(function(){update()},1000);

function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
      .attr("cy", d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));
}