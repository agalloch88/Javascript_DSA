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

// recursive solution which finds desired split sum, checks whether the tree can be split, finds the optimal split edge, then returns the value or 0, accordingly

// O(n) time due to iterative over all n nodes in the tree
// O(h) space, where h is the height of the Binary Tree, as this is the max amount of calls on the call stack at a given moment

// main BinaryTree class, where every node has a value, and potentially a left and right pointer
class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// main function which takes in the input tree
function splitBinaryTree(tree) {
    // initialize variable desiredSubtreeSum and set equal to a call to helper function getTreeSum, passing in the input tree, and divide by 2 to find what the split should equal
    let desiredSubtreeSum = getTreeSum(tree) / 2;
    // initialize variable canBeSplit and set equal to a call to helper function trySubtrees, passing in the input tree and the current value of desiredSubtreeSum
    // above, and grabbing the value at index 1 of the returned array
    let canBeSplit = trySubtrees(tree, desiredSubtreeSum)[1];
    // return the ternary result for canBeSplit, which, if true, will return the desiredSubtreeSum which was calculatred, and if false, will return 0 since the tree
    // cannot be split
    return canBeSplit ? desiredSubtreeSum : 0;
}

// helper function which tries the various subtrees to find the optimal splitting edge, taking in the input tree and the desiredSubtreeSum to look for
function trySubtrees(tree, desiredSubtreeSum) {
    // base case
    // if no tree/no value, return 0 for the sum and false for the boolean value of canBeSplit
    if (tree === null) {
        return [0, false];
    }
    // recursive case
    // destructure variables leftSum and boolean leftCanBeSplit from the return value of trySubtrees helper function, passing in the tree.left and desiredSubtreeSum
    let [leftSum, leftCanBeSplit] = trySubtrees(tree.left, desiredSubtreeSum);
    // destructure variables rightSum and boolean rightCanBeSplit from the return value of trySubtrees helper function, passing in the tree.right and desiredSubtreeSum
    let [rightSum, rightCanBeSplit] = trySubtrees(tree.right, desiredSubtreeSum);
    // initialize variable currentTreeSum and set equal to the sum of tree.value, aka the root, plus leftSum and rightSum
    let currentTreeSum = tree.value + leftSum + rightSum;
    // set variable canBeSplit and set equal to a boolean, based on three conditions:
    // either leftCanBeSplit is true/false, OR rightCanBeSplit is true/false, OR currentTreeSum is equal to desiredTreeSum
    let canBeSplit = leftCanBeSplit || rightCanBeSplit || currentTreeSum === desiredSubtreeSum;
    // return an array containing currentTreeSum and the boolean for canBeSplit
    return [currentTreeSum, canBeSplit];
}

// helper function to find the sum of the whole tree, taking in an input tree
function getTreeSum(tree) {
    // base case
    // if no tree/no value, return 0
    if (tree === null) {
        return 0;
    }
    // recursive case
    // return the current tree.value plus recursive calls to getTreeSum, passing in tree.left and tree.right to proceed through the whole tree
    return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right);
}