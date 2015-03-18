
function drawUI(nodes, links){
	console.log('Draw my UI');
	console.log('Length of nodes:', nodes.length);
	console.log('Length of links:', links.length);

	var width = 1000,
    height = 650,
    root;


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

	
var force = d3.layout.force()
    .charge(-300)
	.linkDistance(function(d){return 200/d.value | 50;})
	.gravity(0.7)
    .size([width, height])
	.nodes(nodes)
	.links(links)
	.start();	

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

	
  force.on("tick", function(){
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
		
	node.append("title")
      .text(function(d) { return d.name; });
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
                name: "",
                group: "",
                eig: 0,
                bet: 0,
                res: 0
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