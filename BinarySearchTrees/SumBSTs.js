// The problem presents a Binary Tree. As with any Binary Tree, the tree may contain one or more Binary
// Search Trees (BSTs), and it may even be a BST itself.

// Write a function which returns the sum of all the values of nodes in this tree which are part
// of a BST containing at least three nodes.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children nodes
// can either be BinaryTree nodes themselves, or None/null.

// A BST is a special type of Binary Tree whose nodes all satisfy the BST property. A node satisfies
// the BST property if its value is strictly greater than the values of every node to its left, its
// value is less than or equal to the values of every node to its right, and its children nodes are
// either valid BST nodes themselves, or None/null.

// Sample Input # 1:

// tree =   8
//         / \
//        2   9
//       / \   \
//      1  10   5

// Sample Output # 1:

// 13
// 1, 2 and 10 form the only BST containing at least 3 nodes

// Sample Input # 2:

// tree =       20
//             /  \
//            7    10
//           / \  /  \
//          0  8  5   15
//            / \ /\  / \
//           7  9 2 5 13 22
//               /      \
//              1        14

// Sample Inoput # 2:

// 0
// The subtrees rooted at 8 and 2 are both BSTs, however they only contain 2 nodes each

// Solution 1:

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function sumBsts(tree) {
  return getTreeInfo(tree).totalSumBstNodes;
}

function getTreeInfo(tree) {
  if (tree === null) {
    return {
      isBst: true,
      maxValue: -Infinity,
      minValue: Infinity,
      bstSum: 0,
      bstSize: 0,
      totalSumBstNodes: 0,
    };
  }

  let leftTreeInfo = getTreeInfo(tree.left);
  let rightTreeInfo = getTreeInfo(tree.right);

  let satisfiesBstProp =
    tree.value > leftTreeInfo.maxValue && tree.value <= rightTreeInfo.minValue;
  let isBst = satisfiesBstProp && leftTreeInfo.isBst && rightTreeInfo.isBst;

  let maxValue = Math.max(
    tree.value,
    Math.max(leftTreeInfo.maxValue, rightTreeInfo.maxValue),
  );
  let minValue = Math.min(
    tree.value,
    Math.min(leftTreeInfo.minValue, rightTreeInfo.minValue),
  );

  let bstSum = 0;
  let bstSize = 0;

  let totalSumBstNodes =
    leftTreeInfo.totalSumBstNodes + rightTreeInfo.totalSumBstNodes;

  if (isBst) {
    bstSum = tree.value + leftTreeInfo.bstSum + rightTreeInfo.bstSum;
    bstSize = 1 + leftTreeInfo.bstSize + rightTreeInfo.bstSize;

    if (bstSize >= 3) {
      totalSumBstNodes = bstSum;
    }
  }

  return {
    isBst,
    maxValue,
    minValue,
    bstSum,
    bstSize,
    totalSumBstNodes,
  };
}
