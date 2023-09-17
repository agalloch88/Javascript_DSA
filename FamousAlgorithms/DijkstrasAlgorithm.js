// The problem presents an integer, start, and a list/array, edges, containing pairs of integers.

// The list/array is what's commonly referred to as an adjacency list, and it represents a graph. The number of vertices in the graph is equal to the length of list/array edges, where
// each index, i, in edges contains vertex i's outbound edges, in no particular order. Each individual edge is represented by a pair of two numbers, [destination, distance], where the destination
// is a positive integer denoting the destination vertex, and the distance is a positive integer representing the length of the edge (the distance from vertex i to vertex destination).
// Note that these edges are directed, meaning that it is only possible to travel from a particular vertex to its corresponding destination - not the other way around 
// (unless the destination vertex itself has an outbound edge to the original vertex).

// Write a function which computes the lengths of the shortest paths between start, and all of the other vertices in the graph using Dijkstra's algorithm, and which returns them in an array/list.
// Each index i in the output arrauu should represent the length of the shortest path between start and vertex i. If no path is found from start to vertex i, then output[i] should be -1.

// Note that the graph represented by edges will not contain any self-loops (vertices which have an outbound edge to themselves), and will only have positively-weighted edges (ie, no negative distances).

// Sample Input:

// start = 0
// edges = [
//  [[1, 7]],
//  [[2, 6], [3, 20], [4, 3]],
//  [[3, 14],
//  [[4, 2]],
//  [],
//  [],
// ]

// Sample Output:

// [0, 7, 13, 27, 10, -1]

// Solution 1:

// iterative solution finding all vertexes then checking different routes to find the minimum distance to traverse the positive weighted routes

// O(v^2 + e) time, for traversing v vertices twice and e edges in the graph
// O(v) space due to storing distances for vertices and visited information in array and set

// main function taking in the start node and the array of edges
function dijkstrasAlgorithm(start, edges) {
  // initialize variable numberOfVertices, and set equal to the length of the edges array
    let numberOfVertices = edges.length;
    // initialize variable minDistances to hold the distance information, and set equal to an empty array at the outset
    let minDistances = [];
    // loop for the numberOfVertices and push a value of Infinity into minDistances as a placeholder, since any value will be lower than Infinity
    for (let i = 0; i < numberOfVertices; i++) {
      minDistances.push(Infinity);
    }
    // set the value at the passed-in start index in minDistances to equal 0
    minDistances[start] = 0;
    // initialize variable visited and set equal to a new empty Set object
    let visited = new Set();
    // keep looping so long as the size of the visited Set object is NOT equal to the number of vertices, meaning there are still vertices to discover and traverse
    while (visited.size !== numberOfVertices) {
      // destructure the return from helper function into the values of vertex and currentMinDistance
      let [vertex, currentMinDistance] = getVertexWithMinDistance(minDistances, visited);
      // if currentMinDistance is equal to Infinity, this node is disconnected or otherwise unreachable, so break the while loop
      if (currentMinDistance === Infinity) {
        break;
      }
      // add the currentVertex into the visited Set
      visited.add(vertex);
      // loop over every edge of the current vertex in edges input
      for (let edge of edges[vertex]) {
        // destructure the current edge into destination and distanceToDestination
        let [destination, distanceToDestination] = edge;
        // check whether the visited Set contains the current destination, and if so, simply continue
        if (visited.has(destination)) {
          continue;
        }
        // initialize variable newPathDistance and set equal to the value of currentMinDistance plus the distanceToDestination
        let newPathDistance = currentMinDistance + distanceToDestination;
        // initialize variable currentDestinationDistance and set equal to the value of destination in minDistances
        let currentDestinationDistance = minDistances[destination];
        // check whether newPathDistance is shorter than the currentDestinationDistance, and if so, execute below
        if (newPathDistance < currentDestinationDistance) {
          // set value at destination in minDistances equal to the newPathDistance
          minDistances[destination] = newPathDistance;
        }
      }
    }
    // once all possible vertices and edges are checked, return the minDistances array, mapping over the array to replace every instance of Infinity with -1
    return minDistances.map(x => x === Infinity ? -1 : x);
  }
  
  // helper function to find the vertex via minimum distance, taking in the distances and the visited Set object
  function getVertexWithMinDistance(distances, visited) {
    // initialize variable currentMinDistance and set equal to Infinity, as any value will be smaller
    let currentMinDistance = Infinity;
    // initialize the variable vertex and set equal to -1, assuming there may be no path to this vertex
    let vertex = -1;
    // keep looping over every entry in distances, destructing the entries into vertexIdx and the distance
    for (let [vertexIdx, distance] of distances.entries()) {
      // if the vertexIdx already exists in the visited Set, do nothing and continue
      if (visited.has(vertexIdx)) {
        continue;
      }
      // if the distance of the current entry is less than or equal to the currentMinDistance value, execute below
      if (distance <= currentMinDistance) {
        // set vertex equal to the current vertexIdx
        vertex = vertexIdx;
        // set currentMinDistance equal to the current distance
        currentMinDistance = distance;
      }
    }
    // return the pair of vertex and currentMinDistance for use in main function
    return [vertex, currentMinDistance];
  }
  
// Solution 2:

class MinHeap {
  constructor(array) {
    this.vertexMap = array.reduce((obj, _, i) => {
      obj[i] = i;
      return obj;
    }, {});
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  buildHeap(array) {
    let firstParentIdx = Math.floor((array.length - 2) / 2);

    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;

    while (childOneIdx <= endIdx) {
      let childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;

      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);

    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  remove() {
    if (this.isEmpty()) {
      return;
    }

    this.swap(0, this.heap.length - 1, this.heap);
    let [vertex, distance] = this.heap.pop();
    delete this.vertexMap[vertex];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return [vertex, distance];
  }

  swap(i, j, heap) {
    this.vertexMap[heap[i][0]] = j;
    this.vertexMap[heap[j][0]] = i;
    let temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }

  update(vertex, value) {
    this.heap[this.vertexMap[vertex]] = [vertex, value];
    this.siftUp(this.vertexMap[vertex], this.heap);
  }
}