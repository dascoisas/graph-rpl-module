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

			})

			this.memoPathList.set(vertex.address, [])
		}
	}
	getGraph() {
		return this.adjList
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
		return path.reverse()
	}
}

module.exports = Graph