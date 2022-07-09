// Write a function which takes in a Binary Tree, and returns a list of its branch sums ordered from leftmost branch sum to rightmost branch sum.

// A branch sum is the sum of all values in a Binary Tree branch. A Binary Tree branch is a path of nodes in a tree which starts at the root
// node, and ends at any leaf node.

// Each Binary Tree node has an integer value, a left child node, and a right child node. Children nodes can be Binary Tree nodes themselves, or None/null.

// Sample Input:
// tree =   1
//         / \
//        2   3
//       / \ / \
//      4  5 6  7
//     / \ /
//    8  9 10

// Sample Output:
// [15, 16, 18, 10, 11]

// Solution 1:

// O(n) time due to visiting n nodes
// O(n) space due to log(n) frames on call stack due to recursive calls and less than n values in sums array

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    } 
}

function branchSums(root) {
    let sums = [];
    calculateBranchSums(root, 0, sums);
    return sums;
}

function calculateBranchSums(node, runningSum, sums) {
    if (!node) {
        return;
    }

    let newRunningSum = runningSum + node.value;
    if (!node.left && !node.right) {
        sums.push(newRunningSum);
        return;
    }

    calculateBranchSums(node.left, newRunningSum, sums);
    calculateBranchSums(node.right, newRunningSum, sums);
}