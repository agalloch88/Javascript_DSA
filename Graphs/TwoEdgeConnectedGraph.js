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

function twoEdgeConnectedGraph(edges) {
    if (edges.length === 0) {
        return true;
    }

    let arrivalTimes = new Array(edges.length).fill(-1);
    let startVertex = 0;

    if (getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes, edges) === -1) {
        return false;
    }

    return areAllVerticesVisited(arrivalTimes);
}

function areAllVerticesVisited(arrivalTimes) {
    for ( let time of arrivalTimes) {
        if (time === -1) {
            return false;
        }
    }
    return true;
}

function getMinimumArrivalTimeOfAncestors(currentVertex, parent, currentTime, arrivalTimes, edges) {
    arrivalTimes[currentVertex] = currentTime;

    let minimumArrivalTime = currentTime;

    for (let destination of edges[currentVertex]) {
        if (arrivalTimes[destination] === -1) {
            minimumArrivalTime = Math.min(minimumArrivalTime, getMinimumArrivalTimeOfAncestors(destination, currentVertex, currentTime + 1, arrivalTimes, edges),);
        } else if (destination !== parent) {
            minimumArrivalTime = Math.min(minimumArrivalTime, arrivalTimes[destination]);
        }
    }
    if (minimumArrivalTime === currentTime && parent !== -1) {
        return -1;
    }

    return minimumArrivalTime;
}