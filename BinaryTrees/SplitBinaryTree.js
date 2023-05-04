// Write a unction which takes in a Binary Tree containing at least one node, and which checks if the Binary Tree can be split into two Binary Trees of equal sum by removing a single
// edge. If the split is possible given the constraints, return the new sum of each Binary Tree; if not, return 0. Nore than for the purposes of the problem, it is not required
// to return the removed edge.

// The sum of a Binary Tree is the sum of all values in said Binary Tree.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =   1
//         / \
//        3  -2
//       / \ / \
//      6 -5 5  2
//     /
//    2

// Sample Output:

// 6
// Removing the edge to the left of the root node, which creates two trees, each with sums of 6

// Solution 1:

class BinaryTree {
    constructor(value) {
        this.node = node;
        this.left = null;
        this.right = null;
    }
}

function splitBinaryTree(tree) {
    let desiredSubtreeSum = getTreeSum(tree) / 2;
    let canBeSplit = trySubtrees(tree, desiredSubtreeSum)[1];
    return canBeSplit ? desiredSubtreeSum : 0;
}

function trySubtrees(tree, desiredSubtreeSum) {
    if (tree === null) {
        return [0, false];
    }

    let [leftSum, leftCanBeSplit] = trySubtrees(tree.left, desiredSubtreeSum);
    let [rightSum, rightCanBeSplit] = trySubtrees(tree.right, desiredSubtreeSum);

    let currentTreeSum = tree.value + leftSum + rightSum;
    let canBeSplit = leftCanBeSplit || rightCanBeSplit || currentTreeSum === desiredSubtreeSum;
    return [currentTreeSum, canBeSplit];
}

function getTreeSum(tree) {
    if (tree === null) {
        return 0;
    }
    return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right);
}