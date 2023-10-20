// You're given a Node class which has a name, and an array of optional children nodes. When put togther, nodes form an acyclic tree-like structure.

// Implement the Breadth-First Search method on the Node class, which takes in an empty array, traverses the tree using the Breadth-First Search approach,
// specifically navigating the tree from left to right, stores all of the nodes' names in the input array, and returns it.

// Sample Input:
// graph =      A
//            / | \
//           B  C  D
//          / \   / \
//         E  F  G   H
//           / \  \
//          I   J  K

// Sample Output:
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

// Solution 1:

// breadthFirstSearch Big O:
// O(v + e) time due to passing over v nodes, and going along e edges to reach the nodes
// O(v) space due to storing v nodes in array, and at most v nodes at a time in queue

class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  addChild(name) {
    this.children.push(new Node(name));
    return this;
  }

  breadthFirstSearch(array) {
    const queue = [this];

    while (queue.length > 0) {
      const current = queue.shift();
      array.push(current.name);

      for (const child of current.children) {
        queue.push(child);
      }
    }

    return array;
  }
}
