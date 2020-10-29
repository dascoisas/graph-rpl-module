const Graph = require('./graphClass')

graph = new Graph("cccc::2")

const main = () => {
	graph.addCoordinator({ address: "a" })
	graph.addVertex({ address: "i", parents: ["d", "j", "k"] })
	graph.addVertex({ address: "j", parents: ["d", "i", "k"] })
	graph.addVertex({ address: "k", parents: ["d", "i", "j"] })
	graph.addVertex({ address: "l", parents: ["f"] })
	graph.addVertex({ address: "d", parents: ["b"] })
	graph.addVertex({ address: "e", parents: ["b"] })
	graph.addVertex({ address: "f", parents: ["c"] })
	graph.addVertex({ address: "g", parents: ["c"] })
	graph.addVertex({ address: "h", parents: ["c"] })
	graph.addVertex({ address: "b", parents: ["a"] })
	graph.addVertex({ address: "c", parents: ["a"] })
	console.log(graph.createPath("i", 0))
}

main()