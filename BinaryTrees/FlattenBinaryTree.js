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
