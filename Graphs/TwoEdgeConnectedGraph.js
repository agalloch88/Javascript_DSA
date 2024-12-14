// The problem presents a list/array of `edges` representing an unweighted and undirected graph. Write a function which returns a boolean representing whether the given graph
// is two-edge-connected.

// A graph is connected if, for every pair of vertices in the graph, there is a path of one or more edges connecting the given vertices. A graph which is not
// connected is said to be disconnected.

// A graph is two-edge-connected if, for every one of its edges, the edge's removal from the graph does not cause the graph to become disconnected. If the removal of any
// single edge disconnects the graph, then the graph is not two-edge-connected. If the given graph is already disconnected, then it also i snot two-edge-connected.
// An empty graph is considered two-edge-connected.

// The input list/array is what's called an adjacency list, and it represents a graph. The number of vertices in the graph is equal to the length of `edges`, where each index `i`
// in `edges` contains vertex `i`'s outbound edges, in no particular order. Each outbound edge is represented by a positive integer which denotes an index (a destination vertex) in
// the list/array  that this vertex is connected to. Note that these edges are undirected, meaning that one can travel from a particular vertex to its destination, and from the 
// destination back to that originating vertex. Since these edges are undirected, if vertex `i` has an outbound edge to vertex `j`, then vertex `j` is guaranteed to have an outbound
// edge to vertex `i`. For example, an undirected graph with two vertices and one edge would be represented by the following adjacency list `edges = [[1], [0]].

// Note that the input graph will never contain parallel edges (meaning, edges which share the same source and destination vertices). In other words, there will never be
// more than one edge which connected the same two vertices to each other.

// Sample Input:

// edgess = [
//     [1, 2, 5],
//     [0, 2],
//     [0, 1, 3],
//     [2, 4, 5],
//     [3, 5],
//     [0, 3, 4],
// ]

// Sample Output:

// true

// Solution 1:

// DFS traversal of graph to track discovery times and bridge connections to uncover connectivity

// O(v + e) time due to visiting every vertex and edge in DFS plus connectivity checks
// O(v) space due to storing arrivalTimes array and call stack recursion via DFS

function twoEdgeConnectedGraph(edges) {
    // If the graph has no edges (is empty), it's trivially two-edge-connected
    if (edges.length === 0) {
        return true;
    }

    // Initialize arrivalTimes array to keep track of discovery times of vertices during DFS
    let arrivalTimes = new Array(edges.length).fill(-1);

    // Start the DFS from vertex 0
    let startVertex = 0;

    // Perform DFS and check if there's a bridge (a critical edge whose removal disconnects the graph)
    if (getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes, edges) === -1) {
        // If any bridge is found, the graph is not two-edge-connected
        return false;
    }

    // Ensure all vertices are visited, confirming the graph is connected
    return areAllVerticesVisited(arrivalTimes);
}

function areAllVerticesVisited(arrivalTimes) {
    // Check if all vertices were visited during the DFS
    for (let time of arrivalTimes) {
        if (time === -1) {
            return false; // If any vertex wasn't visited, the graph is not connected
        }
    }
    return true;
}

function getMinimumArrivalTimeOfAncestors(currentVertex, parent, currentTime, arrivalTimes, edges) {
    // Set the current vertex's discovery time
    arrivalTimes[currentVertex] = currentTime;

    // Initialize the minimum arrival time for this vertex
    let minimumArrivalTime = currentTime;

    // Explore all neighbors of the current vertex
    for (let destination of edges[currentVertex]) {
        // If the neighbor hasn't been visited, perform DFS recursively
        if (arrivalTimes[destination] === -1) {
            minimumArrivalTime = Math.min(
                minimumArrivalTime,
                getMinimumArrivalTimeOfAncestors(destination, currentVertex, currentTime + 1, arrivalTimes, edges),
            );
        } 
        // If the neighbor is not the parent, update the minimum arrival time
        else if (destination !== parent) {
            minimumArrivalTime = Math.min(minimumArrivalTime, arrivalTimes[destination]);
        }
    }

    // If the current vertex is a bridge (disconnects the graph), return -1
    if (minimumArrivalTime === currentTime && parent !== -1) {
        return -1;
    }

    return minimumArrivalTime;
}
