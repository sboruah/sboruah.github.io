var points = [
  [153, 150],
  [153, 103],
  [153, 103],
  [153,87],
  [15, 87],
  [205, 242],
  [80,245],
  [80, 220],
  [80, 220],
  [80, 87],
  [80, 87],
  [169, 80],
  [155, 138],
  [110, 157],
  [110, 157],
  [190, 242],
  [80,245],
  [80, 220],
  [80, 220]
];

var svg = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 500);

var path = svg.append("path")
    .data([points])
    .attr("d", d3.svg.line()
    .tension(0) // Catmull–Rom
    .interpolate("basis"));

svg.selectAll(".point")
    .data(points)
  .enter().append("circle")
    .attr("r", 0)
    .attr("transform", function(d) { return "translate(" + d + ")"; });


var circle = svg.append("circle")
    .attr("r", 0)
    .style("fill", "blue")
    .style("fill-opacity", 1)
    .attr("transform", "translate(" + points[0] + ")");

transition();

function transition() {
  circle.transition()
      .duration(7000)
      .ease(Math.sqrt)
      .style("stroke-opacity", 1e-6)
      .attrTween("transform", translateAlong(path.node()))
      .each("end", transition);
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path) {
  var l = path.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);
      svg.append("svg:circle")
      .attr("cx", p.x)
      .attr("cy", p.y)
      .attr("r", 1e-6)
      .style("stroke", "54C6C6")
      .style("stroke-opacity", 1)
    .transition()
      .duration(5000)
      .ease(Math.sqrt)
      .attr("r", 20)
      .style("stroke-opacity", 1e-6)
      .remove();
       return "translate(" + p.x + "," + p.y + ")";
    };
  };
}

</script>