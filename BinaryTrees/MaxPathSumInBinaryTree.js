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

// recursive solution checking path and branch totals for highest count and returning optimal combo

// O(n) time due to checking n nodes in tree
// O(log (n)) space due to recursive calls on call stack

// main function which takes in binary tree
function maxPathSum(tree) {
  // set blank value and maxSum equal to call to helper function, passing in the tree
  let [_, maxSum] = findMaxSum(tree);
  // return the maxSum, which should be the final answer
  return maxSum;
}
// helper function to deduce answer
function findMaxSum(tree) {
  // base case
  // check whether the tree is null, and if so, return 0 and -Infinity for the maxSumAsBranch and maxPathSum, respectively
  if (tree === null) {
    return [0, -Infinity];
  }

  // recursive case
  // set leftMaxSumAsBranch and leftMaxPathSum equal to call of findMaxSum, passing in the tree.left value to look left
  let [leftMaxSumAsBranch, leftMaxPathSum] = findMaxSum(tree.left);
  // set rightMaxSumAsBranch and rightMaxPathSum equal to call of findMaxSum, passing in the tree.right value to look right
  let [rightMaxSumAsBranch, rightMaxPathSum] = findMaxSum(tree.right);
  // set maxChildSumAsBranch equal to the maximum of the previous two branch sums
  let maxChildSumAsBranch = Math.max(leftMaxSumAsBranch, rightMaxSumAsBranch);
  // destructure the value off of the tree, as this is the root and want to see whether this will be part of the path or not
  let { value } = tree;
  // set variable maxSumAsBranch equal to the max of the maxChildSumAsBranch plus the value, or the value itself, whichever is greater, using this as a branch itself
  let maxSumAsBranch = Math.max(maxChildSumAsBranch + value, value);
  // set variable maxSumAsRootNode equal to the maximum between the left and right MaxSumAsBranch totals, including the root node/value to make ^ shape, or just the maxSumAsBranch found above
  let maxSumAsRootNode = Math.max(
    leftMaxSumAsBranch + value + rightMaxSumAsBranch,
    maxSumAsBranch
  );
  // set final variable maxPathSum equal to the maximum between leftMaxPathSum, rightMaxPathSum, and maxSumAsRootNode, to determine the optimal value to return
  let maxPathSum = Math.max(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode);
  // return the maxSumAsBranch and maxPathSum values for use in next recursive call
  return [maxSumAsBranch, maxPathSum];
}

// Solution 2:

function maxPathSum(tree) {
    let max = -Infinity;
    let dfs = (tree) => {
        if (!tree) {
            return 0;
        }

        let left = Math.max(0, dfs(tree.left));
        let right = Math.max(0, dfs(tree.right));

        max = Math.max(max, left + right + tree.value);
        return Math.max(left, right) + tree.value;
    }
    dfs(tree);
    return max;
}