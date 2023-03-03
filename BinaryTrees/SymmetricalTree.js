// Write a function which takes in a Binary Tree, and returns if the input tree is symmetrical. A tree is symmetrical if the left and right subtrees are mirror images of each other.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =   1
//         / \
//        2   2
//       / \ / \
//      3  4 4  3
//     / \     / \
//    5   6   6   5

// Sample Output:

// true

// Solution 1:

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function symmetricalTree(tree) {
    return treesAreMirrored(tree.left, tree.right);
}

function treesAreMirrored(left, right) {
    if (left !== null && right !== null && left.value === right.value) {
        return treesAreMirrored(left.left, right.right) && treesAreMirrored(left.right, right.left);
    }
    return left === right;
}