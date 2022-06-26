// You're given a Node class which has a name, and an array of optional children nodes. When put togther, nodes form an acyclic tree-like structure.

// Implement the Depth-First Search method on the Node class, which takes in an empty array, traverses the tree using the Depth-First Search approach,
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
// ["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"]

// Solution 1:

// depthFirstSearch Big O:
// O(v + e) time, where v is each node, ie "A", and e is each edge, ie \
// O(v) space since storing each node name in array

class Node {
    constructor(name) {
        this.name = name;
        this.children = [];
    }

    addChild(name) {
        this.children.push(new Node(name));
        return this;
    }

    depthFirstSearch(array) {
        array.push(this.name);
        for (const child of this.children) {
            child.depthFirstSearch(array);
        }
        return array;
    }
}