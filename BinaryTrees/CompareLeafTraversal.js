// Write a function which takes in the root nodes of two Binary Trees, and returns a boolean
// representing whether their leaf traversals are the same.

// The leaf traversal of a Binary Tree traverses only its leaf nodes from left to right. A leaf
// node is any node that has no left or right children.

// For example, the leaf traversal of the following Binary Tree is 1, 3, 2:

//  4
// / \
// 1  5
//   / \
//  3   2

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree1 =  1
//         / \
//        2   3
//       / \   \
//      4   5   6
//         / \
//        7   8

// tree2 =  1
//         / \
//        2   3
//       / \   \
//      4   7   5
//             / \
//            8   6

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

function compareLeafTraversal(tree1, tree2) {
    leaves1 = [];
    leaves2 = [];

    leafTraversal(tree1, leaves1);
    leafTraversal(tree2, leaves2);

    if (leaves1.length !== leaves2.length) {
        return false;
    }

    for (let i = 0; i < leaves1.length; i++) {
        if (leaves1[i] !== leaves2[i]) {
            return false;
        }
        
    }
    return true;
}

function leafTraversal(root, leaves) {
    if (root !== null) {
        if (root.left === null && root.right === null) {
            leaves.push(root.value);
        } else {
            leafTraversal(root.left, leaves);
            leafTraversal(root.right, leaves)
        }
    }
}