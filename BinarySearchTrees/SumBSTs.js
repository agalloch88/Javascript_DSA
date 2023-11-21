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

// recursive solution starting from leaf nodes and continually checking for sum, size, min and max values, plus whether current subtree adheres to BST property

// O(n) time due to checking all nodes within the tree
// O(h) time, where h is the height of the tree, due to potentially having h calls on call stack at any given time

// BinaryTree class, where every node has a value, and potentially left/right child nodes
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in the main Binary Tree to check
function sumBsts(tree) {
  // return a call to helper function, passing in the input tree, and accessing the totalSumBstNodes property which should return the answer
  return getTreeInfo(tree).totalSumBstNodes;
}

// helper function to obtain information about a specific tree or subtree
function getTreeInfo(tree) {
  // base case
  // check whether the tree is null, and if so, return some base information
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

  //   recursive case
  // initialize variaables leftTreeInfo and rightTreeInfo, and set equal to recursive calls to the left and right subtrees
  let leftTreeInfo = getTreeInfo(tree.left);
  let rightTreeInfo = getTreeInfo(tree.right);

  // initialize variable satisfiesBstProp to check whether there is a valid BST
  // set this equal to a boolean checking whether the current value of the tree is greater than the maxValue in the left subtree AND whether the current
  // value of the tree is less than or equal to the minValue in the right subtree
  let satisfiesBstProp =
    tree.value > leftTreeInfo.maxValue && tree.value <= rightTreeInfo.minValue;
  // initialize variable isBst and set equal to a boolean check of whether this current tree meets the satisfiesBstProp AND whether the left and right subtrees are both BST's
  let isBst = satisfiesBstProp && leftTreeInfo.isBst && rightTreeInfo.isBst;

  // initialize variable maxValue, and set equal to the max value between the current tree's value, and the max of the left and right subtrees
  let maxValue = Math.max(
    tree.value,
    Math.max(leftTreeInfo.maxValue, rightTreeInfo.maxValue),
  );
  //   initialize variable minValue, and set equal to the minimum value between the current tree's value, and the minimum value in the left and right subtrees
  let minValue = Math.min(
    tree.value,
    Math.min(leftTreeInfo.minValue, rightTreeInfo.minValue),
  );

  //  initialize variables bstSum and bstSize, and set equal to 0's at the outset since neither is known yet
  let bstSum = 0;
  let bstSize = 0;

  //   initialize variable totalSumBstNodes, and set equal to the sum of the left and right subtree values for this variable
  let totalSumBstNodes =
    leftTreeInfo.totalSumBstNodes + rightTreeInfo.totalSumBstNodes;

  //  if dealing with a valid BST, execute the below
  if (isBst) {
    // set bstSum equal to the current node's value in the tree, plus the bstSum of both the left and right subtrees
    bstSum = tree.value + leftTreeInfo.bstSum + rightTreeInfo.bstSum;
    // set bstSize equal to 1 (counting the current node) plus the bstSize of both the left and right subtrees
    bstSize = 1 + leftTreeInfo.bstSize + rightTreeInfo.bstSize;

    // check whether the BST is 3 or more nodes to comply with problem constraints, and if so, set totalSumBstNodes equal to the current value of bstSum
    if (bstSize >= 3) {
      totalSumBstNodes = bstSum;
    }
  }

//   return the following values for use in the main function
  return {
    isBst,
    maxValue,
    minValue,
    bstSum,
    bstSize,
    totalSumBstNodes,
  };
}
