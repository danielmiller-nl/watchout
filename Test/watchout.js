// start slingin' some d3 here.
var radius = 15;
var width = 800;
var height = 400;
var nodes = d3.range(20).map(function() { return {x: ( width * Math.random() ), y: ( height * Math.random() ), radius: 15 }; })

var currentScore = 0;
var highScore = 0;

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", dragmove);

var gameBoard = d3.select(".container")
              .selectAll("svg")
              .data([{x: width / 2, y: height / 2}])
              .enter()
              .append("svg")
              .attr("width",width)
              .attr("height",height);

var svgPlayer = d3.select(".container")
              .selectAll("svg").append("circle")
    .attr("r", 10)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("fill", "red")
    .call(drag);

var enemies = gameBoard.selectAll(".enemies")
                  .data(nodes)
                  .enter()
                .append("circle")
                  .attr("cx", function(d) {return d.x;})
                  .attr("cy", function(d) {return d.y;})
                  .attr("r",radius)
                  .attr("fill","blue");


function collisionDetection(enemy) {

  radiusSum = (parseFloat(enemy.attr('r')) + 10);
  xDiff = (parseFloat(enemy.attr('cx')) - parseFloat(svgPlayer.attr('cx')));
  yDiff = (parseFloat(enemy.attr('cy')) - parseFloat(svgPlayer.attr('cy')));

  separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  if (separation < radiusSum) {
    var tempScore = currentScore;
    currentScore = 0;
    d3.select('.current')
    .select('span')
    .html(currentScore);
    if(tempScore>highScore){
      highscore = tempScore;
      d3.select('.high')
        .select('span')
        .html(tempScore);
    }
    //set the game the score to 0
    //update high score if necessary
    //then continue to increment score
  }
}

function tweenWithCollisionDetection (enemiesData) {
  var enemy = d3.select(this);
  var startPos = {x: parseFloat( enemy.attr('cx') ), y: parseFloat( enemy.attr('cy') )};
  var endPos = {x: width * Math.random(), y: height * Math.random()};
  return function (t) {
    collisionDetection(enemy);
    var enemyNextPos = {x: startPos.x + (endPos.x - startPos.x)*t, y: startPos.y + (endPos.y - startPos.y)*t};
    enemy
    .attr('cx', enemyNextPos.x)
    .attr('cy', enemyNextPos.y);
  }
}

function update(){
      enemies.transition().duration(1400)
      .tween('custom', tweenWithCollisionDetection)
}

setInterval(function(){update()},2000);

function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(10, Math.min(width - 10, d3.event.x)))
      .attr("cy", d.y = Math.max(10, Math.min(height - 10, d3.event.y)));
}

function increaseScore(){
  currentScore++;
  d3.select('.current')
    .select('span')
    .html(currentScore);
}

setInterval(function(){increaseScore()},50);


// var shurikens = gameBoard.selectAll(".enemies")
//                 .data(nodes)
//                 .enter()
//                 .append("svg")
//                   .attr("width", "100.0pt")
//                   .attr("height", "100.0pt")
//                 .append("g")
//                   .attr("cx", function(d) {return d.x;})
//                   .attr("cy", function(d) {return d.y;})
//                   .attr("transform", "translate(0.000000,100.000000) scale(0.100000,-0.100000)")
//                 .append("path")
//                   .attr("d", "M425 824 c-42 -101 -78 -171 -90 -179 -11 -7 -89 -41 -172 -76 -84 -35 -153 -66 -153 -69 0 -3 73 -36 162 -74 90 -38 168 -74 174 -80 6 -6 42 -84 80 -173 38 -90 71 -163 74 -163 3 0 36 73 74 162 38 90 74 168 80 174 6 6 84 42 174 80 89 38 162 71 162 74 0 3 -69 34 -153 69 -83 35 -161 69 -172 76 -12 8 -48 78 -90 179 -38 91 -72 166 -75 166 -3 0 -36 -75 -75 -166z m148 -265 c26 -32 22 -94 -8 -124 -34 -35 -96 -35 -130 0 -27 26 -34 80 -14 116 26 50 114 54 152 8z")

// var svgPlayer = gameBoard.selectAll(".player")
//     .data([{x: width / 2, y: height / 2}])
//     .enter()
//     .append("circle")
//     .attr("r", radius)
//     .attr("cx", function(d) { return d.x; })
//     .attr("cy", function(d) { return d.y; })
//     .attr("fill", "red")
//     .call(drag);