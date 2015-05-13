var radius = 15;
var width = 800;
var height = 400;
var nodes = d3.range(20).map(function() { return {x: ( width * Math.random() ), y: ( height * Math.random() ), radius: 15 }; })

var currentScore = 0;
var highScore = 0;
var counter = 0;

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
                .append("svg:image")
                  .attr("xlink:href", "http://vignette3.wikia.nocookie.net/naruto/images/4/4d/Shuriken.svg/revision/latest?cb=20121108145307&path-prefix=answers")
                  .attr("width", 30)
                  .attr("height", 30)
                  .attr("x", function(d) {return width * Math.random();})
                  .attr("y", function(d) {return height * Math.random();})
                  .attr("class", "enemies")

function collisionDetection(enemy) {

  radiusSum = 25;
  xDiff = (parseFloat(enemy.attr('x')) - parseFloat(svgPlayer.attr('cx')));
  yDiff = (parseFloat(enemy.attr('y')) - parseFloat(svgPlayer.attr('cy')));

  separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  if (separation < radiusSum) {
    var tempScore = currentScore;
    currentScore = 0;
    counter++;
    d3.select('.current')
    .select('span')
    .html(currentScore);
    d3.select('.collisions')
    .select('span')
    .html(counter);
    if(tempScore>highScore){
      highScore = tempScore;
      d3.select('.high')
        .select('span')
        .html(highScore);
    }
  }
}

function tweenWithCollisionDetection (enemiesData) {
  var enemy = d3.select(this);
  var startPos = {x: parseFloat( enemy.attr('x') ), y: parseFloat( enemy.attr('y') )};
  var endPos = {x: width * Math.random(), y: height * Math.random()};
  return function (t) {
    collisionDetection(enemy);
    var enemyNextPos = {x: startPos.x + (endPos.x - startPos.x)*t, y: startPos.y + (endPos.y - startPos.y)*t};
    enemy
    .attr('x', enemyNextPos.x)
    .attr('y', enemyNextPos.y);
  }
}

function update(){
      enemies.transition().duration(2000)
      .tween('custom', tweenWithCollisionDetection);
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