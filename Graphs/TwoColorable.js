// The problem presents a list of edges representing a connected, unweighted, undirected graph 
// with at least one node. Write a function which returns a boolean representing whether the
// given graph is two-colorable.

// A graph is two-colorable (also called a bipartite) if all of the nodes can be assigned one
// of two colors, such that no nodes of the same color which are connected by an edge.

// The given list is what's called an adjacency list, and it represents a graph. The number
// of vertices in a graph is equal to the length of edges, where each index i in edges contains 
// vertex i's siblings, in no particular order. Each individual edge is represented by a 
// positive integer which denotes an index in the list that this vertex is connected with.
// Note that the graph is undirected, meaning that if a vertex appears in the edge list of
// another vertex, then the inverse will also be true.

// Also note that the graph may contain self-loops. A self-loop is an adge which has the same
// direction and origin. In other words, it's an edge that connects a vertex to itself. Any
// self-loop should make a graph non-two-colorable.

// Sample Input:

// edges = [
//  [1, 2],
//  [0, 2],
//  [0, 1]
// ]

// Sample Output:

// False
// Nodes 1 and 2 must be different colors than node 0. However, nodes 1 and 2 are connected,
// meaning they must also have a different color, which is impossible with only 2 available colors.

// Solution 1: