
function drawUI(nodes, links){
	console.log('Draw my UI');
	console.log('Length of nodes:', nodes.length);
	console.log('Length of links:', links.length);

	var width = 800,
    height = 800,
    root;


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

	
var force = d3.layout.force()
    .charge(-250)
    .linkDistance(function(d){return 120/d.value})
	.gravity(0.75)
    .size([width, height]);	

var color = function(party){
	if(party === "R") { return 'red'}
	else { return 'blue'};
}
	
var link = svg.selectAll(".link")
	.data(links)
	.enter()
	.append("line")
	.attr("class", "link")
	.style("stroke-width", function(d) { return d.value; });

var node = svg.selectAll(".node")
	.data(nodes)
	.enter()
	.append("circle")
	.attr("r", function(d) {return d.eig*20 | 3;})
	.style("fill", function(d) { return color(d.group); })
	.attr("class", "node")
	.call(force.drag);
	



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
        nodes.push({
                name: nodesdata.names[0],
                group: nodesdata.group[0],
                eig: nodesdata.eig[0],
                bet: nodesdata.bet[0],
                res: nodesdata.res[0]
            });
           
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