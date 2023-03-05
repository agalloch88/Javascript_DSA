// Write a function which takes in a Binary Tree and returns its max path sum.

// A path is a collection of connected nodes in a tree, where no node is connected to more than
// two other nodes. A path sum, therefore, is the sum of the values of the nodes in a particular
// path.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree = 1
//       / \
//      2   3
//     / \ / \
//    4  5 6  7

// Sample Output:

// 18
// 5 + 2 + 1 + 3 + 7

// Solution 1:

function maxPathSum(tree) {
  let [_, maxSum] = findMaxSum(tree);
  return maxSum;
}

function findMaxSum(tree) {
  if (tree === null) {
    return [0, -Infinity];
  }

  let [leftMaxSumAsBranch, leftMaxPathSum] = findMaxSum(tree.left);
  let [rightMaxSumAsBranch, rightMaxPathSum] = findMaxSum(tree.right);
  let maxChildSumAsBranch = Math.max(leftMaxSumAsBranch, rightMaxSumAsBranch);

  let { value } = tree;
  let maxSumAsBranch = Math.max(maxChildSumAsBranch + value, value);
  let maxSumAsRootNode = Math.max(leftMaxSumAsBranch + value + rightMaxSumAsBranch, maxSumAsBranch);
  let maxPathSum = Math.max(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode);

  return [maxSumAsBranch, maxPathSum];
}
