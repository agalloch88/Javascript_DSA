// The problem presents a list a edges representing an unweighted, directed graph with at least one node. Write a function which returns a boolean representing whether the
// given graph contains a cycle.

// For the purpose of this question, a cycle is defined as any number of vetices, including solely one vertex, which are connected in a closed chain. A cycle
// may also be defined as a chain of at least one vertex in which the first vertex is the same as the last, which is known as a self-loop.

// The given list is what's called an adjacency list, and it represents a graph. The number of vertices in the graph is equal to the length of the edges input, where each
// index i in edges contained vertex i's outbound edges, in no particular order. Each individual edge is represented by a positive integer which denotes an index
// (also called a destination vertex) in the list which this vertex connects to. Note that these edges are directed, meaning that traversal is only possible from
// a particular vertex to its destination, not the other way around (unless the destination vertex itself has an outbound edge to the original vertex).

// Also note that this graph may contain self-loops. A self-loop is an edge which has the same destination and origin vertex. In other words, it's an edge which connects
// a vertex to itself. For the purpose of this question, a self-loop is considered a cycle.

// Sample Input:
// edges = [
//  [1, 3],
//  [2, 3, 4],
//  [0],
//  [],
//  [2, 5],
//  [],
// ]

// Sample Output:
// true
// multiple cycles in the above sample graph:
// 0 -> 1 -> 2 -> 0
// 0 -> 1 -> 4 -> 2 -> 0
// 1 -> 2 -> 0 -> 1

// Solution 1:

// recurisve solution using DFS and tracking which nodes are visited and currently in the stack to determine cycles

// O(v + e) time for traversing at most v vertices and e edges between vertices to determine whether at least one cycle exists
// O(v) space for storing visited and currentlyInStack vertices, where 2v converges to v

function cycleInGraph(edges) {
    // establish how many individual nodes there are
    let numberOfNodes = edges.length;
    // track which nodes visited by settng up new visited stack for the node indexes, initialized with all values as false
    let visited = new Array(numberOfNodes).fill(false);
    // set up stack for items currently in the stack, initialized with all values as false
    let currentlyInStack = new Array(numberOfNodes).fill(false);
    // iterate over all the nodes
    for (let node = 0; node < numberOfNodes; node++) {
        // if this node has been viosited, do nothing and continue
        if (visited[node]) {
            continue;
        }
        // set up variable containsCycle to hold return value from helper function checking to see if this node is in a cycle
        let containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack);
        // if the return value from isNodeInCycle is true, then return true
        if (containsCycle) {
            return true;
        }
    }
    // if no nodes were part of a cycle, then return false as there are no cycles
    return false;
}

function isNodeInCycle(node, edges, visited, currentlyInStack) {
    // set this specific node in both stacks to true
    visited[node] = true;
    currentlyInStack[node] = true;
    // find the neighbors by tapping into the edges input at position of this node
    let neighbors = edges[node];
    // iterate over every neighbor the node has
    for (let neighbor of neighbors) {
        // if this neighbor is not yet visited aka false, then recursively check if the neighbor contains a cycle
        if (!visited[neighbor]) {
            let containsCycle = isNodeInCycle(neighbor, edges, visited, currentlyInStack);
            // if the neighbor contains a cycle, return true
            if (containsCycle) {
                return true;
            }
        // if the neighbor is currently in the stack, then it also means its a cycle, so also return true then
        } else if (currentlyInStack[neighbor]) {
            return true;
        }
    }
    // if neither of those conditions hit, that node moves out of the stack, so set it to false, and also return false for this node being in a cycle
    currentlyInStack[node] = false;
    return false;
}