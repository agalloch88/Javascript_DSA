// The problem presents the root node of a Binary Tree. Write a function which returns true if this Binary Tree is height-balanced, and false if it is not.

// A Binary Tree is height-balanced if, for each node in the tree, the difference between the height of its left subtree and its right subtree is, at most, 1.

// Each Binary Tree node has an integer value, a left child node, and a right child node. Children nodes can either be Binary Tree nodes themselves, or None/null.

// Sample Input:
// tree =       1
//             / \
//            2   3
//           / \   \
//          4   5   6
//             / \
//            7   8

// Sample Output:
// true

// Solution 1:

// recursive solution which passes variables tracking whether a subtree is balanced, and height, all the way back up to root for final return of boolean

// O(n) time due to iterating over n nodes in tree
// O(h) space where h is the height of the longest branch, as there will be at most h frames on call stack at any given time

// provided class for Binary Tree
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// create class for TreeInfo object which has properties to track boolean of whether subtrees are balanced, and the height
class TreeInfo {
  constructor(isBalanced, height) {
    this.isBalanced = isBalanced;
    this.height = height;
  }
}

function heightBalancedBinaryTree(tree) {
  // create variable to store info on tree, calling getTreeInfo helper on given tree
  let treeInfo = getTreeInfo(tree);
  // since isBalanced is tracked all the way, if false for isBalanced at any point, it will bubble up and return here
  return treeInfo.isBalanced;
}

function getTreeInfo(node) {
  // base case of hitting a leaf or non-branching node
  if (node === null) {
    return new TreeInfo(true, -1);
  }

  // recursive case to grab info on left and right subtrees
  let leftSubTreeInfo = getTreeInfo(node.left);
  let rightSubTreeInfo = getTreeInfo(node.right);
  // determine if subtree is balanced by seeing if left/right are balanced, and if difference in height is not more than 1
  let isBalanced =
    leftSubTreeInfo.isBalanced &&
    rightSubTreeInfo.isBalanced &&
    Math.abs(leftSubTreeInfo.height - rightSubTreeInfo.height) <= 1;
  // determine height by taking maximum height between left and right subtrees, and add 1 for current node
  let height = Math.max(leftSubTreeInfo.height, rightSubTreeInfo.height) + 1;
  // pass these running variables up for the next recursive call
  return new TreeInfo(isBalanced, height);
}
