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

// iterative solution going through edges and vertices using boolean value to represent colors

// O(v + e) time, where v is the number of nodes/vertices and e is the number of edges/connections, since traversing potentially all of them
// O(v) space, since storing the colors array and stack, where 2v converges to v

function twoColorable(edges) {
  // initialize variable colors and set it equal to the length of the edges input value, with null at every index initially
  let colors = edges.map((_) => null);
  // set the first index value of colors array equal to true, with this representing the first of two colors
  colors[0] = true;
  // set up a stack and start with this first value from colors array
  let stack = [0];
  // so long as there are values to check in the stack, keep looping
  while (stack.length > 0) {
    // initialize variable node and set it equal to the top value popped off the stack
    let node = stack.pop();
    // for every connection this node value has in the edges input, execute the below
    for (let connection of edges[node]) {
      // if the connection has a null value in the colors array, it has not been checked yet, so execute the below
      if (colors[connection] === null) {
        // set the value of this connection in the colors array equal to the opposite value of the current node in the colors array
        colors[connection] = !colors[node];
        // push the current connection on top of the stack
        stack.push(connection);
        // if the connection value in colors array is the same as the node value in the colors array, execute the below
      } else if (colors[connection] === colors[node]) {
        // the condition here would violate the two-colorable rule, so therefore, return false
        return false;
      }
    }
  }
  // if the while loop breaks, the stack is empty, all nodes in the graph are visited, and never returned false, so this graph is two-colorable and can return true
  return true;
}
