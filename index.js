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
		queue.push(startAddress)
		visited.add(startAddress)
		while (queue.length > 0) {
			//TODO: implement our own queue, since .shift has a O(n) complexity instead of O(1)
			let currentAddress = queue.shift()
			for (let neighbourAddress of this.childList.get(currentAddress)) {
				if (!visited.has(neighbourAddress)) {
					queue.push(neighbourAddress)
					visited.add(neighbourAddress)
				}
			}
		}
		return visited
	}
	addCoordinator(vertex) {
		if (vertex.address) {
			this.coordAddress = vertex.address
			if (this.rootAddress != undefined) {
				this.parentList.set(vertex.address, new Set([this.rootAddress]))
				this.childList.set(this.rootAddress, new Set([vertex.address]))
				if (this.useMemo) {
					this.memoPathList.set(vertex.address, [[this.rootAddress]])
				}
			}
			else {
				this.rootAddress = vertex.address
			}
		}
	}
	addVertex(vertex) {
		if (this.parentList.get(vertex.address) == undefined && vertex.parents) {
			this.parentList.set(vertex.address, new Set([vertex.parents]))
			vertex.parents.forEach(element => {
				let tempSet = this.childList.get(element)
				if (tempSet == undefined) {
					this.childList.set(element, new Set([vertex.address]))
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
				//TODO: need to update all child nodes paths as well, otherwise they will have a wrong path to root
			}
		}
	}

}

module.exports = Graph