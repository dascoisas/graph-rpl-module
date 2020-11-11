const Graph = require('./index_with_memo')

graph = new Graph("root", true)

const main = () => {
	graph.addCoordinator({ address: "a" })
	graph.addVertex({ address: "b", parents: ["a"] })
	graph.addVertex({ address: "c", parents: ["a"] })
	graph.addVertex({ address: "d", parents: ["a"] })
	graph.addVertex({ address: "e", parents: ["a"] })
	graph.addVertex({ address: "f", parents: ["b"] })
	graph.addVertex({ address: "g", parents: ["c", "d"] })
	graph.addVertex({ address: "h", parents: ["d", "g"] })
	graph.addVertex({ address: "i", parents: ["e"] })
	graph.addVertex({ address: "j", parents: ["i"] })
	graph.addVertex({ address: "k", parents: ["j", "h"] })
	//console.log(graph.getPath("k", 0))
	graph.updateVertex({ address: "d", parents: ["a"] })
	//graph.addCoordinator({ address: "aaaa" })
	//graph.addVertex({ address: "b", parents: ["aaaa"] })
	//graph.addVertex({ address: "c", parents: ["aaaa"] })
	//graph.addVertex({ address: "d", parents: ["b"] })
	//console.log(graph.getPath("aaaa", 0))
	//console.log(graph.getPath("b", 0))
	//console.log(graph.getPath("c", 0))
	//console.log(graph.getPath("d", 0))
	//console.log(graph.getPath("cccc:12", 0))
	//graph.addVertex({ address: "e", parents: ["b"] })
	//graph.addVertex({ address: "f", parents: ["c"] })
	//graph.addVertex({ address: "g", parents: ["c"] })
	//graph.addVertex({ address: "h", parents: ["c"] })
	//graph.addVertex({ address: "i", parents: ["d"] })
	//graph.addVertex({ address: "j", parents: ["d"] })
	//graph.addVertex({ address: "k", parents: ["d"] })
	//graph.addVertex({ address: "l", parents: ["f"] })
	//console.log(graph.getPath("l", 0))
	//console.log(graph.parentList)
	//console.log(graph.childList)
	//console.log(graph.getVisGraph())
	//console.log(graph.bfs("c"))
	//graph.removeVertex("c")
	//console.log(graph.parentList)
	//console.log(graph.childList)
	//console.log(graph.getPath(Buffer.from("aaaa"), 0))
	//console.log(graph.getVisGraph())
	//console.log(graph.getVertex("l"))
	//graph.removeVertex("l")
	//console.log(graph.getPath("aaaa", 0))
	//console.log(graph.getPath("b", 0))
	//console.log(graph.getVertex("l"))
}

main()