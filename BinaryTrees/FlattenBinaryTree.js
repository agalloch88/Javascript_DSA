// Write a function which takes in a Binary Tree, flattens it, and returns the Binary Tree's
// leftmost node.

// A flattened Binary Tree is a structure which is nearly identical to a Doubly-Linked List
// (except that nodes have left and right pointers, rather than prev and next pointers),
// where nodes follow the original tree's left-to-right order.

// Note that if the input Binary Tree happens to be a valid Binary Search Tree, the nodes in
// the flattened tree will be sorted.

// The flattening of the Binary Tree should be done in place, meaning that the original data
// structure should be mutated, and no new data structure should be created.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =   1
//         / \
//        2   3
//       / \ /
//      4  5 6
//        / \
//       7   8

// Sample Output:

// 4 <-> 2 <-> 7 <-> 5 <-> 8 <-> 1 <-> 6 <-> 3
// returns 4, the leftmost node

// Solution 1:

// solution utilizing in order traversal BST technique to update the left and right pointers
// of each node

// O(n) time due to checking and updating all n nodes in input tree
// O(n) space due to storing array of inOrderNodes

// main BinaryTree class, where each node has a value and potentially a left/right child
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

// main function which takes in the root of the BinaryTree to flatten
function flattenBinaryTree(root) {
  // initialize variable inOrderNodes, and set equal to a call to helper, passing in the root
  // and an empty array to hold the flattened tree
  let inOrderNodes = getNodesInOrder(root, []);

  // iterate over all the items in inOrderNodes array
  for (let i = 0; i < inOrderNodes.length - 1; i++) {
    // initialize variable leftNode, and set equal to current value of i in inOrderNodes
    let leftNode = inOrderNodes[i];
    // initialize variable rightNode, and set equal to current value of i plus 1 in inOrderNodes
    let rightNode = inOrderNodes[i + 1];
    // set the right pointer of leftNode equal to the value of rightNode
    leftNode.right = rightNode;
    // set the left pointer of rightNode equal to the value of leftNode
    rightNode.left = leftNode;
  }
  // return the 0 index value
  return inOrderNodes[0];
}

// helper which performs an in order traversal of the BinaryTree to grab and store the nodes
function getNodesInOrder(tree, array) {
  // base case
  // check whether the tree is empty, and if not, execute below
  if (tree !== null) {
    // standard in order traversal, recursively calling to get the left subtree, then grabbing
    // the current node, then recursively calling to get the right subtree
    getNodesInOrder(tree.left, array);
    array.push(tree);
    getNodesInOrder(tree.right, array);
  }
  // once finished, return the populated array for use as input for inOrderNodes in main function
  return array;
}

// Solution 2:

// optimized solution targeting the leftmost node in right subtree and rightmost node in left subtree, and performing the flattening in place without using an extra data structure

// O(n) time due to flattening all n nodes in the input BinaryTree
// O(d) time due to at most d nodes on call stack at once, where d is the depth of the tree

// main BinaryTree class, where every node has a value, and potentially a left/right pointer
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in the root of the BinaryTree to flatten
function flattenBinaryTree(root) {
  // destructure leftMost, and empty variable, and set equal to the return value of flattenTree helper passing in the root node
  let [leftMost, _] = flattenTree(root);
  // return the leftMost value as the problem requires
  return leftMost;
}

// function which actually flattens the BinaryTree, taking in a node to start from
function flattenTree(node) {
  // initialize variables leftMost and rightMost
  let leftMost, rightMost;

  // check whether the left subtree of the input node is null, and if so, execute below
  // this is a base case check, and will occur when at a leaf node already
  if (node.left === null) {
    // set leftMost to equal the current node
    leftMost = node;
  // otherwise, if the left is NOT null, execute below
  } else {
    // destructure variables leftSubtreeLeftMost and leftSubtreeRightMost into the return value of recursive calls to function, passing in the left value of current node
    let [leftSubtreeLeftMost, leftSubtreeRightMost] = flattenTree(node.left);
    // call the connectNodes helper to reassign pointer values, passing in the leftSubtreeRightMost and the current node as the left and right values, respectively
    connectNodes(leftSubtreeRightMost, node);
    // set leftMost to equal the leftSubtreeLeftMost value
    leftMost = leftSubtreeLeftMost;
  }

  // check whether the right subtree of the input node is null, and if so, execute below
  // this is a base case check, and will occur when at a leaf node already
  if (node.right === null) {
    // set rightMost to equal the current node
    rightMost = node;
  // otherwise, if the right is NOT null, execute below
  } else {
    // destructure variables rightSubtreeLeftMost and rightSubtreeRightMost into the return value of recursive calls to function, passing in the right value of current node
    let [rightSubtreeLeftMost, rightSubtreeRightMost] = flattenTree(node.right);
    // call the connectNodes helper to reassign pointer values, passing in the current node and rightSubtreeLeftMost as the left and right values, respectively
    connectNodes(node, rightSubtreeLeftMost);
    // set rightMost to equal the rightSubtreeRightMost
    rightMost = rightSubtreeRightMost;
  }

  // return pair of values leftMost and rightMost for use in main function
  return [leftMost, rightMost];
}

// helper function which reassigns pointer values, taking in a left and right node
function connectNodes(left, right) {
  // set the right pointer of the left node to equal the value of right input
  left.right = right;
  // set the left pointer of the right node to equal the value of the left input
  right.left = left;
}
