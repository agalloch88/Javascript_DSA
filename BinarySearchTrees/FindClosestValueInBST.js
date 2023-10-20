// Write a function which takes in a Binary Search Tree (BST) and a target value, and returns the closest value to that target value contained in the BST.

// In this context, there will be only one closest value.

// Each BST node has an integer value, a left child node, and a right child node. A node is said
// to be a valid BST node if and only if it satisfies the BST property: its value is strictly greater
// than the values of every node to its left, its value is less than or equal to the values of every node
// to its right, and its children nodes are either valid BST nodes themselves or None/null values.

// Sample Input:
// tree =   10
//         / \
//        5   15
//       /\   / \
//      2  5 13  22
//     /      \
//    1        14

// target = 12

// Sample Output:
// 13

// Solution 1:

// recursive implementation

// O(log(n)) time on average due to eliminating half of BST values, O(n) at worst if single-branch tree
// O(log(n)) space on average due to recursive calls on stack, O(n) at worst if single-branch tree

function findClosestValueInBST(tree, target) {
  // return helper function
  return findClosestValueInBSTHelper(tree, target, tree.value);
}

function findClosestValueInBSTHelper(tree, target, closest) {
  // if reach a leaf node, return closest found thus far
  if (tree === null) {
    return closest;
  }

  if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
    closest = tree.value;
  }
  // determine whether right or left branch may possibly contain target, eliminate other branch
  if (target < tree.value) {
    return findClosestValueInBSTHelper(tree.left, target, closest);
  } else if (target > tree.value) {
    return findClosestValueInBSTHelper(tree.right, target, closest);
    // if not greater or smaller, there's zero difference and found optimal value
  } else {
    return closest;
  }
}

// class of the input tree

class BST {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

// Solution 2:

// iterative solution

// O(log(n)) time on average due to eliminating half of remaining values, O(n) at worst if single-branch tree
// O(1) space due to iterative solution and no extra data stored

// main function whcich takes in the BST and the target
function findClosestValueInBST(tree, target) {
  // return a call to the helper function below
  return findClosestValueInBSTHelper(tree, target, tree.value);
}

function findClosestValueInBSTHelper(tree, target, closest) {
  // grab the tree and store in variable currentNode
  let currentNode = tree;
  // keep looping so long as not at a leaf node/null
  while (currentNode !== null) {
    // if absolute value difference between target and closest is greater than absolute
    // value difference between the target and the value of currentNode, set closest equal
    // to the value of currentNode
    if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
      closest = currentNode.value;
    }
    // if the target is less than value of currentNode, set currentNode equal to currentNode's
    // left value to check again
    if (target < currentNode.value) {
      currentNode = currentNode.left;
      // otherwise, if target is greater than the currentNode's value, set currentNode equal to
      // currentNode's right value to check again
    } else if (target > currentNode.value) {
      currentNode = currentNode.right;
      // if not less than or greater than, then break
    } else {
      break;
    }
  }
  // return the current value for closest
  return closest;
}

// class of the input tree

class BST {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}
