// Write a function which takes in a Binary Tree and returns its diameter. The diameter of a Binary Tree is defined as the length of its longest path, even if that
// path does not pass through the root of the tree.

// A path is a collection of connected nodes in a tree, where no node is connected to more than two other nodes. The length of a path is the number of edges between
// the path's first node and its last node.

// Each Binary Tree node has an integer value, a left child node, and a right child node. Children nodes can either be Binary Tree nodes themselves, or None/null.

// Sample Input:
// tree =           1
//                 / \
//                3   2
//               / \
//              7   4
//             /     \
//            8       5
//           /         \
//          9           6

// Sample Output:
// 6, for the path [9, 8, 7, 3, 4, 5, 6]

// Solution 1:

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// set up new class to parse diameter and height of tree
class TreeInfo {
    constructor(diameter, height) {
        this.diameter = diameter;
        this.height = height;
    }
}

function binaryTreeDiameter(tree) {
    return getTreeInfo(tree).diameter;
}

function getTreeInfo(tree) {
    // base case
    if (tree === null) {
        return new TreeInfo(0, 0);
    }

    // recursive case
    let leftTreeInfo = getTreeInfo(tree.left);
    let rightTreeInfo = getTreeInfo(tree.right);
    // calculate longest path through root node by adding left + right
    let longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
    // take the max of the diameters
    let maxDiameterSoFar = Math.max(leftTreeInfo.diameter, rightTreeInfo.diameter);
    // determine which of previous two is greater
    let currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);
    let currentHeight = 1 + Math.max(leftTreeInfo.height, rightTreeInfo.height);

    return new TreeInfo(currentDiameter, currentHeight);
}

