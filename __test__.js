const Graph = require('./index')

graph = new Graph("cccc::2")

const main = () => {
	graph.addCoordinator({ address: "aaa" })
	graph.addVertex({ address: "b", parents: ["aaa"] })
	graph.addVertex({ address: "c", parents: ["aaa"] })
	graph.addVertex({ address: "d", parents: ["b"] })
	graph.addVertex({ address: "e", parents: ["b"] })
	graph.addVertex({ address: "f", parents: ["c"] })
	graph.addVertex({ address: "g", parents: ["c"] })
	graph.addVertex({ address: "h", parents: ["c"] })
	graph.addVertex({ address: "i", parents: ["d"] })
	graph.addVertex({ address: "j", parents: ["d"] })
	graph.addVertex({ address: "k", parents: ["d"] })
	graph.addVertex({ address: "l", parents: ["f"] })
	console.log(graph.getPath("l", 0))
	console.log(graph.getVisGraph())
	//console.log(graph.getVertex("l"))
	//graph.removeVertex("l")
	//console.log(graph.getPath("l", 0))
	//console.log(graph.getVertex("l"))
}

main()