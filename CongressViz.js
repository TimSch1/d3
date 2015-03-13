
function drawUI(nodes, links){
	console.log('Draw my UI');
	console.log('Length of nodes:', nodes.length);
	console.log('Length of links:', links.length);

	var width = 400,
    height = 300,
    root;

var force = d3.layout.force()
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link").data(links).enter().append("line").attr("class", "link").style("stroke-width", function(d) { return d.weight; });
var node = svg.selectAll(".node").data(nodes).enter().append("circle").attr("class", "node").attr("r", function(d) {return Math.sqrt(d.bet);}).style("fill", function(d) { return color(d.group); }).call(force.drag);

	
var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);	


function update(nodes, links) {

  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

   node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
	});
};
};



d3.json('JSONnodes.json', function(error, nodesdata){
	console.log('I got the data');
	if (error) {
		console.log(error);
		return;
	}
		
	d3.json('JSONlinks.json', function(error, linksdata){
		if (error){
			console.log(error);
			return;
		}
		console.log('I got more data');
		console.log(nodesdata.names[0]);
		var nodes = [];
		for(var i = 0; i < nodesdata.names.length; i++){
			var person = {
				name: nodesdata.names[i],
				group: nodesdata.group[i],
				eig: nodesdata.eig[i],
				bet: nodesdata.bet[i],
				res: nodesdata.res[i] 
			};
			nodes.push(person);
		}
		
		drawUI(nodes, linksdata);
	});
});