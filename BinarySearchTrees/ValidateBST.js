// Write a function which takes in a potentially invalid Binary Search Tree (BST), and returns
// a boolean representing whether the BST is valid.

// Each BST node has an integer value, a left child node, and a right child node. A node is
// said to be a valid BST node if and only if it satisfies the BST property: its value is
// strictly greater than the values of every node to its left, its value is less than or equal
// to the values of every node to its right, and its children nodes are either valid BST nodes
// themselves, or None/null.

// A BST is valid if and only if all of its nodes are valid BST nodes.

// Sample Input:
// tree =   10
//         /  \
//        5    15
//       / \   / \
//      2   5 13  22
//     /        \
//    1          14

// Sample Output:
// true

// Solution 1:

// recursive solution checking left value then right, bubbling up to root

// O(n) time due to checking n nodes from input tree
// O(d) space, where d is the max depth of the tree, as there are at most d recursive calls
// on the call stack at any given time

class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function validateBST(tree) {
    return validateBSTHelper(tree, -Infinity, Infinity);
}

function validateBSTHelper(tree, minValue, maxValue) {
    if (tree === null) {
        return true;
    }

    if (tree.value < minValue || tree.value >= maxValue) {
        return false;
    }

    let isLeftValid = validateBSTHelper(tree.left, minValue, tree.value);
    return isLeftValid && validateBSTHelper(tree.right, tree.value, maxValue);
}