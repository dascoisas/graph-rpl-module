class Graph {
	constructor(rootAddress) {
		this.rootAddress = rootAddress
		this.adjList = new Map()
		this.memoPathList = new Map()
		this.maxLevel = 50
	}
	addCoordinator(vertex) {
		if (vertex.address) {
			this.coordAddress = vertex.address
			if (this.rootAddress != undefined) {
				this.adjList.set(vertex.address, [this.rootAddress])
				this.memoPathList.set(vertex.address, [this.createPath(vertex.address, 0)])
				this.memoPathList.set(this.rootAddress, [this.createPath(this.rootAddress, 0)])
			}
			else {
				this.rootAddress = vertex.address
				this.memoPathList.set(vertex.address, [this.createPath(vertex.address, 0)])
			}
		}
		else {
			throw new Error("Vertex object must have an address key")
		}
	}
	addVertex(vertex) {
		if (vertex.address && this.adjList.get(vertex.address) == undefined && vertex.parents) {
			let memoArray = []
			this.adjList.set(vertex.address, vertex.parents)
			vertex.parents.forEach((element, index) => {
				memoArray.push(this.createPath(vertex.address, index))
			})
			this.memoPathList.set(vertex.address, memoArray)
		}
		else {
			throw new Error("Vertex object must have an address and parents key and must not've been initialized")
		}
	}
	addOrUpdateVertex(vertex) {
		if (vertex.address && this.adjList.get(vertex.address) == undefined && vertex.parents) {
			this.addVertex(vertex)
		}
		else if (vertex.address && this.adjList.get(vertex.address) != undefined && vertex.parents) {
			this.updateVertex(vertex)
		}
		else {
			throw new Error("Add or Update method error, invalid input")
		}
	}
	getVertex(address) {
		let vertex = this.adjList.get(address)
		if (vertex == undefined) {
			return []
		}
		return this.adjList.get(address)
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
		if (!this.adjList.has(address)) {
			return []
		}
		let currLevel = 1
		let currAddressParents = this.adjList.get(address)
		let currAddress = currAddressParents[Math.min(parentLevel, currAddressParents.length - 1)]
		let path = [address, currAddress]
		while (currAddress != this.rootAddress && currLevel < this.maxLevel) {
			if (this.adjList.get(currAddress) == undefined) {
				return []
			}
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
		if (!this.adjList.has(address)) {
			return []
		}
		let pathsArray = this.memoPathList.get(address)
		if (pathsArray == undefined) {
			return []
		}
		return pathsArray[Math.min(parentLevel, pathsArray.length - 1)]
	}
	updateVertex(vertex) {
		if (vertex.address && this.adjList.get(vertex.address) != undefined && vertex.parents) {
			this.adjList.set(vertex.address, vertex.parents)
			this.rebuildAllPaths()
		}
		else {
			throw new Error("Vertex object must have an address and parents key and must have been initialized")
		}
	}
	removeVertex(address) {
		this.adjList.delete(address)
		let deletedQueue = [address]
		while (deletedQueue.length > 0) {
			let currentDeletedNode = deletedQueue.shift()
			for (let [nodeAddress, parentsArray] of this.adjList) {
				if (parentsArray.includes(currentDeletedNode)) {
					let newParentsArray = parentsArray.filter(value => {
						return value != currentDeletedNode
					})
					if (newParentsArray.length == 0) {
						this.adjList.delete(nodeAddress)
						deletedQueue.push(nodeAddress)
					}
					else {
						this.adjList.set(nodeAddress, newParentsArray)
					}
				}
			}
		}
		this.rebuildAllPaths()
	}
	rebuildAllPaths() {
		for (let [nodeAddress, parentsArray] of this.adjList) {
			let memoArray = []
			parentsArray.forEach((element, index) => {
				let tempPath = this.createPath(nodeAddress, index)
				if (tempPath == []) {
					console.log(`Problem on graph, no path found between ${nodeAddress} and root`)
				}
				memoArray.push(tempPath)
			})
			this.memoPathList.set(nodeAddress, memoArray)
		}
	}
}

module.exports = Graph