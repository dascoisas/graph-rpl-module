class Graph {
	constructor(rootAddress, useMemo) {
		this.rootAddress = rootAddress
		this.useMemo = true
		if (useMemo != undefined) {
			this.useMemo = useMemo
		}
		this.parentList = new Map()
		this.childList = new Map()
		this.memoPathList = new Map()
		this.maxLevel = 20
	}
	bfs(startAddress) {
		let visited = new Set()
		let queue = []
		let cont = 0
		queue.push(startAddress)
		while (cont < queue.length) {
			let currentAddress = queue[cont++]
			let tempSet = this.childList.get(currentAddress)
			if (tempSet != undefined) {
				for (let neighbourAddress of tempSet) {
					if (!visited.has(neighbourAddress)) {
						queue.push(neighbourAddress)
						visited.add(neighbourAddress)
					}
				}
			}
		}
		return visited
	}
	addCoordinator(vertex) {
		if (vertex.address) {
			this.coordAddress = vertex.address
			if (this.rootAddress != "") {
				let parentSet = new Set()
				let childSet = new Set()
				parentSet.add(this.rootAddress)
				childSet.add(vertex.address)
				this.parentList.set(vertex.address, parentSet)
				this.childList.set(this.rootAddress, childSet)
				if (this.useMemo) {
					this.memoPathList.set(vertex.address, [this.createPath(vertex.address, 0)])
					this.memoPathList.set(this.rootAddress, [this.createPath(this.rootAddress, 0)])
				}
			}
			else {
				this.rootAddress = vertex.address
				this.memoPathList.set(vertex.address, [this.createPath(vertex.address, 0)])
			}
		}
	}
	/*
	removeVertex(address) {
		//TODO: Hell implementation, need to verify all it's children and delete each one, recursively
		//First, do a BFS to search for all it's childs
		let childSet = this.bfs(address)
		let parentSet = this.parentList.get(address)
		let removedVertices = [address]
		for (let parent of parentSet) {
			let childParentSet = this.childList.get(parent)
			childParentSet.delete(address)
		}
		//Verify childrens parents, if this node is the only one, and mark them to future delete
		for (let child of childSet) {
			let childParentSet = this.parentList.get(child)
			removedVertices.forEach(removedItem => {
				childParentSet.delete(removedItem)
			})
			if (childParentSet.size == 0) {
				removedVertices.push(child)

				//Need to verify if it's children parent exists, if so, delete this item from it's childList
				//Iterate over all this children parents array, and remove this node from its parentList
			}
		}
		//console.log(removedVertices)
	}
	*/
	updateVertex(vertex) {
		if (this.parentList.get(vertex.address) != undefined && vertex.parents) {
			//Get nodes parents
			let oldParent = this.parentList.get(vertex.address)
			//Iterate over it's parents to remove this node, from its childList
			for (let parentAddress of oldParent) {
				let tempSet = this.childList.get(parentAddress)
				tempSet.delete(vertex.address)
			}
			this.parentList.set(vertex.address, new Set(vertex.parents))
			//Update to it's new parents
			let newParent = this.parentList.get(vertex.address)
			for (let parentAddress of newParent) {
				let tempSet = this.childList.get(parentAddress)
				tempSet.add(vertex.address)
			}
			//If we need to memoize, update all paths
			if (this.useMemo) {
				let childSet = this.bfs(vertex.address)
			}
		}
	}
	addVertex(vertex) {
		if (this.parentList.get(vertex.address) == undefined && vertex.parents) {
			this.parentList.set(vertex.address, new Set(vertex.parents))
			vertex.parents.forEach(element => {
				let tempSet = this.childList.get(element)
				if (tempSet == undefined) {
					let childSet = new Set()
					childSet.add(vertex.address)
					this.childList.set(element, childSet)
				}
				else {
					tempSet.add(vertex.address)
				}
			})
			if (this.useMemo) {
				let memoArray = []
				vertex.parents.forEach((element, index) => {
					memoArray.push(this.createPath(vertex.address, index))
				})
				this.memoPathList.set(vertex.address, memoArray)
			}
		}
	}
	createPath(address, parentLevel) {
		if (!this.coordAddress) {
			return []
		}
		if (address == this.rootAddress) {
			return [address]
		}
		let currLevel = 1
		let currAddressParents = Array.from(this.parentList.get(address))
		let currAddress = currAddressParents[Math.min(parentLevel, currAddressParents.length - 1)]
		let path = [address, currAddress]
		while (currAddress != this.rootAddress && currLevel < this.maxLevel) {
			currAddress = this.parentList.get(currAddress).values().next().value
			path.push(currAddress)
			currLevel++
		}
		if (currAddress != this.rootAddress) {
			return []
		}
		return path.reverse()
	}
	getPath(address, parentLevel) {
		if (!this.useMemo) {
			return this.createPath(address, parentLevel)
		}
		let pathsArray = this.memoPathList.get(address)
		if (pathsArray == undefined) {
			return []
		}
		return pathsArray[Math.min(parentLevel, pathsArray.length - 1)]
	}
	getVisGraph() {
		let visGraph = []
		for (let [address, childSet] of this.childList) {
			visGraph.push({ id: address, node: { edges: [...childSet] } })
		}
		return visGraph
	}
}

module.exports = Graph