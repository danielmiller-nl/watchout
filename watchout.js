// start slingin' some d3 here.
var gameBoard = d3.select(".container").append("svg").attr("width",800).attr("height",400);

var enemyData = [];
for (var i = 0; i < 20; i++) {
  enemyData[i] = 0;
}

var enemies = gameBoard.selectAll(".enemies")
                  .data(enemyData)
                  .enter()
                .append("circle")
                  .attr("cx", function(d) {return 800 * Math.random();})
                  .attr("cy", function(d) {return 400 * Math.random();})
                  .attr("r",20)
                  .attr("fill","blue");