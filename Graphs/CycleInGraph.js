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