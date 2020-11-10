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
			console.log(queue.length, cont)
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