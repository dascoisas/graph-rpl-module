const Graph = require('./index')

graph = new Graph("cccc::2", false)

const main = () => {
	graph.addCoordinator({ address: "aaaa" })
	graph.addVertex({ address: "b", parents: ["aaaa"] })
	graph.addVertex({ address: "c", parents: ["aaaa"] })
	graph.addVertex({ address: "d", parents: ["b"] })
	console.log(graph.parentList)
	console.log(graph.childList)
	//graph.addVertex({ address: "e", parents: ["b"] })
	//graph.addVertex({ address: "f", parents: ["c"] })
	//graph.addVertex({ address: "g", parents: ["c"] })
	//graph.addVertex({ address: "h", parents: ["c"] })
	//graph.addVertex({ address: "i", parents: ["d"] })
	//graph.addVertex({ address: "j", parents: ["d"] })
	//graph.addVertex({ address: "k", parents: ["d"] })
	//graph.addVertex({ address: "l", parents: ["f"] })
	//console.log(graph.getPath(Buffer.from("aaaa"), 0))
	//console.log(graph.getVisGraph())
	//console.log(graph.getVertex("l"))
	//graph.removeVertex("l")
	//console.log(graph.getPath("aaaa", 0))
	//console.log(graph.getPath("b", 0))
	//console.log(graph.getVertex("l"))
}

main()