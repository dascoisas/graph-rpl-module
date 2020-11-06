class Graph {
	constructor(rootAddress) {
		this.rootAddress = rootAddress
		this.adjList = new Map()
		this.memoPathList = new Map()
		this.maxLevel = 20
	}
	addCoordinator(vertex) {
		if (vertex.address) {
			this.coordAddress = vertex.address
			if (this.rootAddress != undefined) {
				this.adjList.set(vertex.address, [this.rootAddress])
			}
			else {
				this.rootAddress = vertex.address
			}
		}
	}
	addVertex(vertex) {
		if (this.adjList.get(vertex.address) == undefined && vertex.parents) {
			let memoArray = []
			this.adjList.set(vertex.address, vertex.parents)
			vertex.parents.forEach((element, index) => {
				memoArray.push(this.createPath(vertex.address, index))
			})
			this.memoPathList.set(vertex.address, memoArray)
		}
	}
	getVertex(address) {
		let vertex = this.adjList.get(address)
		if (vertex == undefined) {
			return []
		}
		return this.adjList.get(address)
	}
	removeVertex(address) {
		this.adjList.delete(address)
		this.memoPathList.delete(address)
		//TODO: iterate over all elements and remove this address from them as well and rebuilding the memoPathList
		for (let [node, parentsArray] of this.adjList) {
			if (parentsArray.includes(address)) {
				let newParentsArray = parentsArray.splice(parentsArray.indexOf(address), 1)
				this.adjList.set(address, newParentsArray)
				//TODO: rebuild all paths of this node
			}
		}
	}
	getGraph() {
		return this.adjList
	}
	getVisGraph() {
		let auxGraph = {}
		let visGraph = []
		let graphLength = 0
		for (let [node, parentsArray] of this.adjList) {
			for (let parent of parentsArray) {
				if (!auxGraph[parent]) {
					auxGraph[parent] = { _id: graphLength++, edges: [] }
				}
				auxGraph[parent].edges.push(node)
			}
		}
		for (let key in auxGraph) {
			visGraph.push({ id: key, node: { edges: auxGraph[key].edges } })
		}
		return visGraph
	}
	createPath(address, parentLevel) {
		if (!this.coordAddress) {
			return []
		}
		if (address == this.rootAddress) {
			return [address]
		}
		let currLevel = 1
		let currAddressParents = this.adjList.get(address)
		let currAddress = currAddressParents[Math.min(parentLevel, currAddressParents.length - 1)]
		let path = [address, currAddress]
		while (currAddress != this.rootAddress && currLevel < this.maxLevel) {
			currAddress = this.adjList.get(currAddress)[0]
			path.push(currAddress)
			currLevel++
		}
		if (currAddress != this.rootAddress) {
			return []
		}
		return path.reverse()
	}
	getPath(address, parentLevel) {
		let pathsArray = this.memoPathList.get(address)
		if (pathsArray == undefined) {
			return []
		}
		return pathsArray[Math.min(parentLevel, pathsArray.length - 1)]
	}
}

module.exports = Graph