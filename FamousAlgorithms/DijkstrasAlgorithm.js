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

function dijkstrasAlgorithm(start, edges) {
    let numberOfVertices = edges.length;
    let minDistances = [];
  
    for (let i = 0; i < numberOfVertices; i++) {
      minDistances.push(Infinity);
    }
  
    minDistances[start] = 0;
    let visited = new Set();
  
    while (visited.size !== numberOfVertices) {
      let [vertex, currentMinDistance] = getVertexWithMinDistance(minDistances, visited);
  
      if (currentMinDistance === Infinity) {
        break;
      }
  
      visited.add(vertex);
  
      for (let edge of edges[vertex]) {
        let [destination, distanceToDestination] = edge;
  
        if (visited.has(destination)) {
          continue;
        }
  
        let newPathDistance = currentMinDistance + distanceToDestination;
        let currentDestinationDistance = minDistances[destination];
  
        if (newPathDistance < currentDestinationDistance) {
          minDistances[destination] = newPathDistance;
        }
      }
    }
    return minDistances.map(x => x === Infinity ? -1 : x);
  }
  
  function getVertexWithMinDistance(distances, visited) {
    let currentMinDistance = Infinity;
    let vertex = -1;
  
    for (let [vertexIdx, distance] of distances.entries()) {
      if (visited.has(vertexIdx)) {
        continue;
      }
  
      if (distance <= currentMinDistance) {
        vertex = vertexIdx;
        currentMinDistance = distance;
      }
    }
    return [vertex, currentMinDistance];
  }
  